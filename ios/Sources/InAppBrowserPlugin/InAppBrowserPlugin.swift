import Capacitor
import OSInAppBrowserLib
import UIKit

typealias OSInAppBrowserEngine = OSIABEngine<OSIABApplicationRouterAdapter, OSIABSafariViewControllerRouterAdapter, OSIABWebViewRouterAdapter>

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(InAppBrowserPlugin)
public class InAppBrowserPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "InAppBrowserPlugin"
    public let jsName = "InAppBrowser"
    public let pluginMethods: [CAPPluginMethod] = [
        .init(name: "openInExternalBrowser", returnType: CAPPluginReturnPromise),
        .init(name: "openInSystemBrowser", returnType: CAPPluginReturnPromise),
        .init(name: "openInWebView", returnType: CAPPluginReturnPromise),
        .init(name: "close", returnType: CAPPluginReturnPromise)
    ]

    private var engine: OSInAppBrowserEngine?
    private var openedViewController: UIViewController?

    override public func load() {
        self.engine = .init()
    }

    @objc func openInExternalBrowser(_ call: CAPPluginCall) {
        guard let engine = loadEngineIfNeeded(call) else { return }
        handleBrowserCall(call, target: .externalBrowser) { url in
            self.delegateExternalBrowser(engine, url, call)
        }
    }

    @objc func openInSystemBrowser(_ call: CAPPluginCall) {
        guard let engine = loadEngineIfNeeded(call) else { return }
        handleBrowserCall(call, target: .systemBrowser) { url in
            guard let options: OSInAppBrowserSystemBrowserModel = self.createModel(for: call.getObject("options")) else {
                return self.error(call, type: .inputArgumentsIssue(target: .systemBrowser))
            }
            DispatchQueue.main.async {
                engine.openSystemBrowser(url, options.toSystemBrowserOptions(), { [weak self] event, viewControllerToOpen in
                    self?.handleResult(event, for: call, checking: viewControllerToOpen, data: nil, error: .failedToOpen(url: url.absoluteString, onTarget: .systemBrowser))
                })
            }
        }
    }

    @objc func openInWebView(_ call: CAPPluginCall) {
        guard let engine = loadEngineIfNeeded(call) else { return }
        handleBrowserCall(call, target: .webView) { url in
            guard let options: OSInAppBrowserWebViewModel = self.createModel(for: call.getObject("options")) else {
                return self.error(call, type: .inputArgumentsIssue(target: .webView))
            }
            let customHeaders = call.getObject("customHeaders")?.compactMapValues {
                ($0 as? String) ?? ($0 as? NSNumber)?.stringValue
            }
            DispatchQueue.main.async {
                engine.openWebView(
                    url: url,
                    options: options.toWebViewOptions(),
                    customHeaders: customHeaders,
                    onDelegateClose: { [weak self] in
                        self?.bridge?.viewController?.dismiss(animated: true)
                    },
                    onDelegateURL: { [weak self] url in
                        self?.delegateExternalBrowser(engine, url, call)
                    },
                    onDelegateAlertController: { [weak self] alert in
                        self?.bridge?.viewController?.presentedViewController?.show(alert, sender: nil)
                    }, completionHandler: { [weak self] event, viewControllerToOpen, data  in
                        self?.handleResult(event, for: call, checking: viewControllerToOpen, data: data, error: .failedToOpen(url: url.absoluteString, onTarget: .webView))
                    }
                )
            }
        }
    }

    @objc func close(_ call: CAPPluginCall) {
        guard loadEngineIfNeeded(call) != nil else { return }
        guard let openedViewController else {
            error(call, type: .noBrowserToClose)
            return
        }
        DispatchQueue.main.async {
            openedViewController.dismiss(animated: true) { [weak self] in
                self?.success(call)
            }
        }
    }
}

private extension InAppBrowserPlugin {
    func loadEngineIfNeeded(_ call: CAPPluginCall) -> OSInAppBrowserEngine? {
        if self.engine == nil { load() }
        guard let engine else {
            self.error(call, type: .bridgeNotInitialised)
            return nil
        }
        return engine
    }
    
    func handleBrowserCall(_ call: CAPPluginCall, target: OSInAppBrowserTarget, action: (URL) -> Void) {
        let urlString = call.getString("url", "")
        guard self.isSchemeValid(urlString) else {
            return self.error(call, type: .invalidURLScheme)
        }
        guard let url = URL(string: urlString) else {
            return self.error(call, type: .inputArgumentsIssue(target: target))
        }
        action(url)
    }
    
    func delegateExternalBrowser(_ engine: OSInAppBrowserEngine, _ url: URL, _ call: CAPPluginCall) {
        DispatchQueue.main.async {
            engine.openExternalBrowser(url) { [weak self] success in
                guard let self else { return }
                if success {
                    self.success(call)
                } else {
                    self.error(call, type: .failedToOpen(url: url.absoluteString, onTarget: .externalBrowser))
                }
            }
        }
    }

    func handleResult(_ event: OSIABEventType?, for call: CAPPluginCall, checking viewController: UIViewController?, data: [String: Any]?, error: OSInAppBrowserError) {
        if let event {
            if event == .pageClosed {
                openedViewController = nil
            }
            notifyListeners(event.rawValue, data: data)
        } else if let viewController {
            present(viewController) { [weak self] in
                self?.openedViewController = viewController
                self?.success(call)
            }
        } else {
            self.error(call, type: error)
        }
    }
}

private extension InAppBrowserPlugin {
    func createModel<T: Decodable>(for inputArgument: JSObject?) -> T? {
        guard let argumentsDictionary = inputArgument,
              let argumentsData = try? JSONSerialization.data(withJSONObject: argumentsDictionary),
              let argumentsModel = try? JSONDecoder().decode(T.self, from: argumentsData)
        else { return nil }
        return argumentsModel
    }

    func present(_ viewController: UIViewController, _ completionHandler: (() -> Void)?) {
        let showNewViewController: () -> Void = {
            self.bridge?.viewController?.present(viewController, animated: true, completion: completionHandler)
        }

        if let presentedViewController = self.bridge?.viewController?.presentedViewController, presentedViewController == self.openedViewController {
            presentedViewController.dismiss(animated: true, completion: showNewViewController)
        } else {
            showNewViewController()
        }
    }

    func isSchemeValid(_ urlScheme: String) -> Bool {
        ["http://", "https://"].contains(where: urlScheme.hasPrefix)
    }

    func success(_ call: CAPPluginCall) {
        call.resolve()
    }

    func error(_ call: CAPPluginCall, type errorType: OSInAppBrowserError) {
        call.reject(errorType.description, errorType.code)
    }
}

private extension OSInAppBrowserEngine {
    
    func openExternalBrowser(_ url: URL, _ completionHandler: @escaping (Bool) -> Void) {
        let router = OSIABApplicationRouterAdapter()
        openExternalBrowser(url, routerDelegate: router, completionHandler)
    }

    func openSystemBrowser(_ url: URL, _ options: OSIABSystemBrowserOptions, _ completionHandler: @escaping (OSIABEventType?, UIViewController?) -> Void) {
        let router = OSIABSafariViewControllerRouterAdapter(
            options,
            onBrowserPageLoad: { completionHandler(.pageLoadCompleted, nil) },
            onBrowserClosed: { completionHandler(.pageClosed, nil) }
        )
        openSystemBrowser(url, routerDelegate: router) { completionHandler(nil, $0) }
    }

    func openWebView(
        url: URL,
        options: OSIABWebViewOptions,
        customHeaders: [String: String]? = nil,
        onDelegateClose: @escaping () -> Void,
        onDelegateURL: @escaping (URL) -> Void,
        onDelegateAlertController: @escaping (UIAlertController) -> Void,
        completionHandler: @escaping (OSIABEventType?, UIViewController?, [String: Any]?) -> Void
    ) {
        let callbackHandler = OSIABWebViewCallbackHandler(
            onDelegateURL: onDelegateURL,
            onDelegateAlertController: onDelegateAlertController,
            onBrowserPageLoad: { completionHandler(.pageLoadCompleted, nil, nil) },
            onBrowserClosed: { isAlreadyClosed in
                if !isAlreadyClosed {
                    onDelegateClose()
                }
                completionHandler(.pageClosed, nil, nil)
            }, onBrowserPageNavigationCompleted: { url in
                completionHandler(.pageNavigationCompleted, nil, ["url": url ?? ""])
            }
        )
        let router = OSIABWebViewRouterAdapter(options: options, customHeaders: customHeaders, cacheManager: OSIABBrowserCacheManager(dataStore: .default()), callbackHandler: callbackHandler)
        openWebView(url, routerDelegate: router) { completionHandler(nil, $0, nil) }
    }
}

enum OSIABEventType: String {
    case pageClosed = "browserClosed"
    case pageLoadCompleted = "browserPageLoaded"
    case pageNavigationCompleted = "browserPageNavigationCompleted"
}
