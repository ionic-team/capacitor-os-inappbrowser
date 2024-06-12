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
        .init(name: "openInWebView", returnType: CAPPluginReturnPromise)
    ]
    
    private var plugin: OSInAppBrowserEngine?
    private var openedRouter: (any OSIABRouter)?
    
    override public func load() {
        self.plugin = .init()
    }
    
    @objc func openInExternalBrowser(_ call: CAPPluginCall) {
        if self.plugin == nil {
            self.load()
        }
        
        guard let plugin else {
            return self.error(call, type: .bridgeNotInitialised)
        }
        
        let target = OSInAppBrowserTarget.externalBrowser
        
        guard
            let urlString = call.getString("url"),
            let url = URL(string: urlString)
        else {
            return self.error(call, type: .inputArgumentsIssue(target: target))
        }
        
        delegateExternalBrowser(plugin, url, call)
    }
    
    @objc func openInSystemBrowser(_ call: CAPPluginCall) {
        if self.plugin == nil {
            self.load()
        }
        
        guard let plugin else {
            return self.error(call, type: .bridgeNotInitialised)
        }
        
        let target = OSInAppBrowserTarget.systemBrowser
        
        func delegateSystemBrowser(_ url: URL, _ options: OSIABSystemBrowserOptions) {
            DispatchQueue.main.async {
                self.openedRouter = plugin.openSystemBrowser(url, options, { [weak self] event, safariViewController in
                    guard let self else { return }
                    
                    if let event {
                        self.notifyListeners(event.rawValue, data: nil)
                    } else if let safariViewController {
                        self.bridge?.viewController?.show(safariViewController, sender: nil)
                        self.success(call)
                    } else {
                        self.error(call, type: .failedToOpen(url: url.absoluteString, onTarget: target))
                    }
                })
            }
        }
        
        guard
            let urlString = call.getString("url"),
            let options: OSInAppBrowserSystemBrowserModel = self.createModel(for: call.getObject("options")),
            let url = URL(string: urlString)
        else { return self.error(call, type: .inputArgumentsIssue(target: target)) }
        
        delegateSystemBrowser(url, options.toSystemBrowserOptions())
    }
    
    @objc func openInWebView(_ call: CAPPluginCall) {
        if self.plugin == nil {
            self.load()
        }
        
        guard let plugin else {
            return self.error(call, type: .bridgeNotInitialised)
        }
        
        let target = OSInAppBrowserTarget.webView
        
        func delegateWebView(_ url: URL, _ options: OSIABWebViewOptions) {
            DispatchQueue.main.async {
                self.openedRouter = plugin.openWebView(
                    url,
                    options,
                    onDelegateClose: { [weak self] in
                        self?.bridge?.viewController?.dismiss(animated: true)
                    },
                    onDelegateURL: { [weak self] url in
                        self?.delegateExternalBrowser(plugin, url, call)
                    },
                    onDelegateAlertController: { [weak self] alert in
                        self?.bridge?.viewController?.presentedViewController?.show(alert, sender: nil)
                    }, { [weak self] event, hostingController in
                        guard let self else { return }
                        
                        if let event {
                            self.notifyListeners(event.rawValue, data: nil)
                        } else if let hostingController {
                            self.bridge?.viewController?.show(hostingController, sender: nil)
                            self.success(call)
                        } else {
                            self.error(call, type: .failedToOpen(url: url.absoluteString, onTarget: target))
                        }
                    }
                )
            }
        }
        
        guard
            let urlString = call.getString("url"),
            let options: OSInAppBrowserWebViewModel = self.createModel(for: call.getObject("options")),
            let url = URL(string: urlString)
        else { return self.error(call, type: .inputArgumentsIssue(target: target)) }
        
        let customUserAgent = self.bridge?.config.overridenUserAgentString
        delegateWebView(url, options.toWebViewOptions(with: customUserAgent))
    }
}

private extension InAppBrowserPlugin {
    func delegateExternalBrowser(_ plugin: OSInAppBrowserEngine, _ url: URL, _ call: CAPPluginCall) {
        DispatchQueue.main.async {
            plugin.openExternalBrowser(url, { [weak self] success in
                guard let self else { return }
                
                if success {
                    self.success(call)
                } else {
                    self.error(call, type: .failedToOpen(url: url.absoluteString, onTarget: .externalBrowser))
                }
            })
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
    
    func success(_ call: CAPPluginCall) {
        call.resolve()
    }
    
    func error(_ call: CAPPluginCall, type errorType: OSInAppBrowserError) {
        call.reject(errorType.description)
    }
}

private extension OSInAppBrowserEngine {
    func openExternalBrowser(_ url: URL, _ completionHandler: @escaping (Bool) -> Void) {
        let router = OSIABApplicationRouterAdapter(UIApplication.shared)
        self.openExternalBrowser(url, routerDelegate: router, completionHandler)
    }
    
    func openSystemBrowser(_ url: URL, _ options: OSIABSystemBrowserOptions, _ completionHandler: @escaping (OSIABEventType?, UIViewController?) -> Void) -> SystemBrowser {
        let router = OSIABSafariViewControllerRouterAdapter(
            options,
            onBrowserPageLoad: { completionHandler(.pageLoadCompleted, nil) },
            onBrowserClosed: { completionHandler(.pageClosed, nil) }
        )
        self.openSystemBrowser(url, routerDelegate: router) { completionHandler(nil, $0) }
        return router
    }
    
    func openWebView(
        _ url: URL,
        _ options: OSIABWebViewOptions,
        onDelegateClose: @escaping () -> Void,
        onDelegateURL: @escaping (URL) -> Void,
        onDelegateAlertController: @escaping (UIAlertController) -> Void,
        _ completionHandler: @escaping (OSIABEventType?, UIViewController?) -> Void
    ) -> WebView {
        let callbackHandler = OSIABWebViewCallbackHandler(
            onDelegateURL: onDelegateURL,
            onDelegateAlertController: onDelegateAlertController,
            onBrowserPageLoad: { completionHandler(.pageLoadCompleted, nil) },
            onBrowserClosed: { isAlreadyClosed in
                if !isAlreadyClosed {
                    onDelegateClose()
                }
                completionHandler(.pageClosed, nil)
            }
        )
        let router = OSIABWebViewRouterAdapter(options, cacheManager: OSIABBrowserCacheManager(dataStore: .default()), callbackHandler: callbackHandler)
        self.openWebView(url, routerDelegate: router) { completionHandler(nil, $0) }
        return router
    }
}

enum OSIABEventType: String {
    case pageClosed = "browserClosed"
    case pageLoadCompleted = "browserPageLoaded"
}
