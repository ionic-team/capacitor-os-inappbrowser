enum OSInAppBrowserTarget {
    case externalBrowser
    case systemBrowser
    case webView
}

enum OSInAppBrowserError: Error {
    case bridgeNotInitialised
    case invalidURLScheme
    case inputArgumentsIssue(target: OSInAppBrowserTarget)
    case failedToOpen(url: String, onTarget: OSInAppBrowserTarget)
    case noBrowserToClose
    
    var description: String {
        let result: String
        
        switch self {
        case .bridgeNotInitialised:
            result = "Capacitor bridge is not initialized."
        case .invalidURLScheme:
            result = "The provided URL must start with http:// or https://."
        case .inputArgumentsIssue(let target):
            let targetString: String
            
            switch target {
            case .externalBrowser: targetString = "openInExternalBrowser"
            case .systemBrowser: targetString = "openInSystemBrowser"
            case .webView: targetString = "openInWebView"
            }
            
            result = "The input parameters for '\(targetString)' are invalid."
        case .failedToOpen(url: let url, onTarget: let target):
            let targetString: String
            
            switch target {
            case .externalBrowser: targetString = "Safari"
            case .systemBrowser: targetString = "SFSafariViewController"
            case .webView: targetString = "WebView"
            }
            
            result = "Couldn't open '\(url)' using \(targetString)."
        case .noBrowserToClose:
            result = "No browser view to close."
        }
        
        return result
    }
}
