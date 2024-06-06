import Capacitor
import OSInAppBrowserLib
import UIKit

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
        .init(name: "openInSystemBrowser", returnType: CAPPluginReturnPromise)
    ]

    private var plugin: OSIABEngine<OSIABApplicationRouterAdapter, OSIABSafariViewControllerRouterAdapter>?
    private var currentlyOpenedBrowser: (any OSIABRouter)?

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

        let target = OSInAppBrowserTarget.openInExternalBrowser
        
        func delegateExternalBrowser(_ url: String) {
            DispatchQueue.main.async {
                plugin.openExternalBrowser(url, { [weak self] success in
                    guard let self else { return }
                    
                    if success {
                        self.success(call)
                    } else {
                        self.error(call, type: .failedToOpen(url: url, onTarget: target))
                    }
                })
            }
        }

        guard let url = call.getString("url") else {
            return self.error(call, type: .inputArgumentsIssue(target: target))
        }
        
        delegateExternalBrowser(url)
    }
    
    @objc func openInSystemBrowser(_ call: CAPPluginCall) {
        if self.plugin == nil {
            self.load()
        }

        guard let plugin else {
            return self.error(call, type: .bridgeNotInitialised)
        }
        
        let target = OSInAppBrowserTarget.openInSystemBrowser
        
        func delegateSystemBrowser(_ url: String, _ options: OSIABSystemBrowserOptions) {
            DispatchQueue.main.async {
                self.currentlyOpenedBrowser = plugin.openSystemBrowser(url, options, { [weak self] event, safariViewController in
                    guard let self else { return }
                    
                    if let event {
                        self.notifyListeners(event.rawValue, data: nil)
                    } else if let safariViewController {
                        self.bridge?.viewController?.show(safariViewController, sender: nil)
                        self.success(call)
                    } else {
                        self.error(call, type: .failedToOpen(url: url, onTarget: target))
                    }
                })
            }
        }
        
        guard let url = call.getString("url"),
              let options: OSInAppBrowserInputArgumentsSystemBrowserModel = self.createModel(for: call.getObject("options"))
        else { return self.error(call, type: .inputArgumentsIssue(target: target)) }
        
        delegateSystemBrowser(url, options.toSystemBrowserOptions())
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

private extension OSIABEngine where ExternalBrowser == OSIABApplicationRouterAdapter {
    func openExternalBrowser(_ url: String, _ completionHandler: @escaping (Bool) -> Void) {
        let router = OSIABApplicationRouterAdapter(UIApplication.shared)
        self.openExternalBrowser(url, routerDelegate: router, completionHandler)
    }
}

private extension OSIABEngine where SystemBrowser == OSIABSafariViewControllerRouterAdapter {
    func openSystemBrowser(_ url: String, _ options: OSIABSystemBrowserOptions, _ completionHandler: @escaping (OSIABEventType?, UIViewController?) -> Void) -> SystemBrowser {
        let router = OSIABSafariViewControllerRouterAdapter(
            options,
            onBrowserPageLoad: { completionHandler(.pageLoadCompleted, nil) },
            onBrowserClosed: { completionHandler(.pageClosed, nil) }
        )
        self.openSystemBrowser(url, routerDelegate: router) { completionHandler(nil, $0) }
        return router
    }
}

enum OSIABEventType: String {
    case pageClosed = "browserClosed"
    case pageLoadCompleted = "browserPageLoaded"
}
