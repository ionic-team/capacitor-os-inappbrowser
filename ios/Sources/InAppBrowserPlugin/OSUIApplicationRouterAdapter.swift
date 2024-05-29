import OSInAppBrowserLib
import UIKit

struct OSApplicationRouterAdapter {
    private let application: UIApplication
    
    init(_ application: UIApplication) {
        self.application = application
    }
}

extension OSApplicationRouterAdapter: OSIABRouter {
    func openInSafari(_ urlString: String) -> Bool {
        guard let url = URL(string: urlString), self.application.canOpenURL(url) else { return false }
        DispatchQueue.main.async {
            self.application.open(url)
        }
        return true
    }
}

extension OSIABEngine {
    init(application: UIApplication) {
        let routerAdapater = OSApplicationRouterAdapter(application)
        self.init(router: routerAdapater)
    }
}
