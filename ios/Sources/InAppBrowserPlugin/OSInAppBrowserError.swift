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
            result = "Capacitor bridge isn't initialized."
        case .invalidURLScheme:
            result = "The URL provided must begin with either http:// or https://."
        case .inputArgumentsIssue(let target):
            let targetString = switch target {
            case .externalBrowser: "openInExternalBrowser"
            case .systemBrowser: "openInSystemBrowser"
            case .webView: "openInWebView"
            }

            result = "The '\(targetString)' input parameters aren't valid."
        case .failedToOpen(url: let url, onTarget: let target):
            let targetString = switch target {
            case .externalBrowser: "External browser"
            case .systemBrowser: "SafariViewController"
            case .webView: "The WebView"
            }

            result = "\(targetString) couldn't open the following URL: '\(url)'"
        case .noBrowserToClose:
            result = "There's no browser view to close."
        }

        return result
    }

    var code: String {
        let baseCode: Int
        switch self {
        case .invalidURLScheme:
            baseCode = 3
        case .inputArgumentsIssue(let target):
            baseCode = switch target {
            case .externalBrowser: 5
            case .systemBrowser: 6
            case .webView: 7
            }
        case .failedToOpen(_, let target):
            baseCode = switch target {
            case .externalBrowser: 8
            case .systemBrowser: 9
            case .webView: 11
            }
        case .noBrowserToClose:
            baseCode = 12
        case .bridgeNotInitialised:
            baseCode = 13
        }
        return "OS-PLUG-IABP-\(String(format: "%04d", baseCode))"
    }

}
