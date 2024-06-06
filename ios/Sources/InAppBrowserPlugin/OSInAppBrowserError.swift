enum OSInAppBrowserTarget {
    case openInExternalBrowser
    case openInSystemBrowser
}

enum OSInAppBrowserError: Error {
    case bridgeNotInitialised
    case inputArgumentsIssue(target: OSInAppBrowserTarget)
    case failedToOpen(url: String, onTarget: OSInAppBrowserTarget)
    
    private var code: Int {
        let result: Int
        
        switch self {
        case .bridgeNotInitialised: result = 0
        case .inputArgumentsIssue: result = 0
        case .failedToOpen: result = 0
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
            case .openInExternalBrowser: targetString = "openInExternalBrowser"
            case .openInSystemBrowser: targetString = "openInSystemBrowser"
            }
            
            result = "The input parameters for '\(targetString)' are invalid."
        case .failedToOpen(url: let url, onTarget: let target):
            let targetString: String
            
            switch target {
            case .openInExternalBrowser: targetString = "Safari"
            case .openInSystemBrowser: targetString = "SFSafariViewController"
            }
            
            result = "Couldn't open '\(url)' using \(targetString)."
        }
        
        return result
    }
}
