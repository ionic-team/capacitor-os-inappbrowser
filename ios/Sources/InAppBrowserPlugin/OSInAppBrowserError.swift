enum OSInAppBrowserTarget {
    case externalBrowser
    case systemBrowser
    case webView
}

enum OSInAppBrowserError: Error {
    case bridgeNotInitialised
    case inputArgumentsIssue(target: OSInAppBrowserTarget)
    case failedToOpen(url: String, onTarget: OSInAppBrowserTarget)
    case noBrowserToClose
    
    private var code: Int {
        let result: Int
        
        switch self {
        case .bridgeNotInitialised: result = 0
        case .inputArgumentsIssue: result = 0
        case .failedToOpen: result = 0
        case .noBrowserToClose: result = 0
        }
        
        return result
    }
    
    var description: String {
        let result: String
        
        switch self {
        case .bridgeNotInitialised:
            result = "Capacitor bridge is not initialized."
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
            result = "No browser view to close"
        }
        
        return result
    }
}
