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
        CAPPluginMethod(name: "openInExternalBrowser", returnType: CAPPluginReturnPromise)
    ]

    private var plugin: OSIABEngine?

    override public func load() {
        self.plugin = .init(application: .shared)
    }

    @objc func openInExternalBrowser(_ call: CAPPluginCall) {
        if self.plugin == nil { 
            self.load() 
        }

        guard let plugin else {
            return call.reject("Capacitor bridge is not initialized.")
        }

        guard let url = call.getString("url") else {
            return call.reject("The input parameters for 'openInExternalBrowser' are invalid.")
        }
        
        if plugin.openExternalBrowser(url) == true {
            call.resolve()
        } else {
            call.reject("Couldn't open '\(url)' using Safari.")
        }
    }
}
