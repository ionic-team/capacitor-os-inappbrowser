import OSInAppBrowserLib

struct OSInAppBrowserInputArgumentsSystemBrowserModel: Decodable {
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

extension OSInAppBrowserInputArgumentsSystemBrowserModel {
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

extension OSIABDismissStyle: Decodable {
    init(_ value: Int) {
        switch value {
        case 0: self = .close
        case 1: self = .cancel
        case 2: self = .done
        default: self = .defaultValue
        }
    }
}

extension OSIABViewStyle: Decodable {
    init(_ value: Int) {
        switch value {
        case 0: self = .pageSheet
        case 1: self = .formSheet
        case 2: self = .fullScreen
        default: self = .defaultValue
        }
    }
}
extension OSIABAnimationEffect: Decodable {
    init(_ value: Int) {
        switch value {
        case 0: self = .flipHorizontal
        case 1: self = .crossDissolve
        case 2: self = .coverVertical
        default: self = .defaultValue
        }
    }
}
