import OSInAppBrowserLib

struct OSInAppBrowserSystemBrowserModel: Decodable {
    struct iOS: Decodable {
        let closeButtonText: OSIABDismissStyle
        let viewStyle: OSIABViewStyle
        let animationEffect: OSIABAnimationEffect
        let enableBarsCollapsing: Bool
        let enableReadersMode: Bool
        
        enum CodingKeys: CodingKey {
            case closeButtonText
            case viewStyle
            case animationEffect
            case enableBarsCollapsing
            case enableReadersMode
        }
        
        init(from decoder: Decoder) throws {
            let container = try decoder.container(keyedBy: CodingKeys.self)
            let dismissStyleValue = try container.decode(Int.self, forKey: .closeButtonText)
            let viewStyleValue = try container.decode(Int.self, forKey: .viewStyle)
            let animationValue = try container.decode(Int.self, forKey: .animationEffect)
            
            self.closeButtonText = .init(dismissStyleValue)
            self.viewStyle = .init(viewStyleValue)
            self.animationEffect = .init(animationValue)
            self.enableBarsCollapsing = try container.decode(Bool.self, forKey: .enableBarsCollapsing)
            self.enableReadersMode = try container.decode(Bool.self, forKey: .enableReadersMode)
        }
    }
    
    let iOS: iOS
}

extension OSInAppBrowserSystemBrowserModel {
    func toSystemBrowserOptions() -> OSIABSystemBrowserOptions {
        .init(
            dismissStyle: self.iOS.closeButtonText,
            viewStyle: self.iOS.viewStyle,
            animationEffect: self.iOS.animationEffect,
            enableBarsCollapsing: self.iOS.enableBarsCollapsing,
            enableReadersMode: self.iOS.enableReadersMode
        )
    }
}
