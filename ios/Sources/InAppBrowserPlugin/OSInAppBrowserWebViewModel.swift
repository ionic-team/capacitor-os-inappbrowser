import OSInAppBrowserLib

struct OSInAppBrowserWebViewModel: Decodable {
    // swiftlint:disable:next type_name
    struct iOS: Decodable {
        let allowOverScroll: Bool
        let enableViewportScale: Bool
        let allowInLineMediaPlayback: Bool
        let surpressIncrementalRendering: Bool
        let viewStyle: OSIABViewStyle
        let animationEffect: OSIABAnimationEffect

        enum CodingKeys: CodingKey {
            case allowOverScroll
            case enableViewportScale
            case allowInLineMediaPlayback
            case surpressIncrementalRendering
            case viewStyle
            case animationEffect
        }

        init(from decoder: Decoder) throws {
            let container = try decoder.container(keyedBy: CodingKeys.self)

            let viewStyleValue = try container.decode(Int.self, forKey: .viewStyle)
            let animationValue = try container.decode(Int.self, forKey: .animationEffect)

            self.allowOverScroll = try container.decode(Bool.self, forKey: .allowOverScroll)
            self.enableViewportScale = try container.decode(Bool.self, forKey: .enableViewportScale)
            self.allowInLineMediaPlayback = try container.decode(Bool.self, forKey: .allowInLineMediaPlayback)
            self.surpressIncrementalRendering = try container.decode(Bool.self, forKey: .surpressIncrementalRendering)
            self.viewStyle = .init(viewStyleValue)
            self.animationEffect = .init(animationValue)
        }
    }

    let iOS: iOS

    let showURL: Bool
    let showToolbar: Bool
    let clearCache: Bool
    let clearSessionCache: Bool
    let mediaPlaybackRequiresUserAction: Bool
    let closeButtonText: String
    let toolbarPosition: OSIABToolbarPosition
    let showNavigationButtons: Bool
    let leftToRight: Bool
    let customWebViewUserAgent: String?

    enum CodingKeys: CodingKey {
        case iOS
        case showURL
        case showToolbar
        case clearCache
        case clearSessionCache
        case mediaPlaybackRequiresUserAction
        case closeButtonText
        case toolbarPosition
        case showNavigationButtons
        case leftToRight
        case customWebViewUserAgent
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)

        let toolbarPositionValue = try container.decode(Int.self, forKey: .toolbarPosition)

        self.showURL = try container.decode(Bool.self, forKey: .showURL)
        self.showToolbar = try container.decode(Bool.self, forKey: .showToolbar)
        self.clearCache = try container.decode(Bool.self, forKey: .clearCache)
        self.clearSessionCache = try container.decode(Bool.self, forKey: .clearSessionCache)
        self.mediaPlaybackRequiresUserAction = try container.decode(Bool.self, forKey: .mediaPlaybackRequiresUserAction)
        self.closeButtonText = try container.decode(String.self, forKey: .closeButtonText)
        self.toolbarPosition = .init(toolbarPositionValue)
        self.showNavigationButtons = try container.decode(Bool.self, forKey: .showNavigationButtons)
        self.leftToRight = try container.decode(Bool.self, forKey: .leftToRight)
        self.customWebViewUserAgent = try container.decodeIfPresent(String.self, forKey: .customWebViewUserAgent)
        self.iOS = try container.decode(OSInAppBrowserWebViewModel.iOS.self, forKey: .iOS)
    }
}

extension OSInAppBrowserWebViewModel {
    func toWebViewOptions() -> OSIABWebViewOptions {
        OSIABWebViewOptions(
            showURL: self.showURL,
            showToolbar: self.showToolbar,
            clearCache: self.clearCache,
            clearSessionCache: self.clearSessionCache,
            mediaPlaybackRequiresUserAction: self.mediaPlaybackRequiresUserAction,
            closeButtonText: self.closeButtonText,
            toolbarPosition: self.toolbarPosition,
            leftToRight: self.leftToRight,
            allowOverScroll: self.iOS.allowOverScroll,
            enableViewportScale: self.iOS.enableViewportScale,
            allowInLineMediaPlayback: self.iOS.allowInLineMediaPlayback,
            surpressIncrementalRendering: self.iOS.surpressIncrementalRendering,
            viewStyle: self.iOS.viewStyle,
            animationEffect: self.iOS.animationEffect,
            customUserAgent: self.customWebViewUserAgent
        )
    }
}
