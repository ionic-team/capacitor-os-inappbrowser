import OSInAppBrowserLib

extension OSIABDismissStyle: @retroactive Decodable {
    init(_ value: Int) {
        switch value {
        case 0: self = .close
        case 1: self = .cancel
        case 2: self = .done
        default: self = .defaultValue
        }
    }
}

extension OSIABViewStyle: @retroactive Decodable {
    init(_ value: Int) {
        switch value {
        case 0: self = .pageSheet
        case 1: self = .formSheet
        case 2: self = .fullScreen
        default: self = .defaultValue
        }
    }
}

extension OSIABAnimationEffect: @retroactive Decodable {
    init(_ value: Int) {
        switch value {
        case 0: self = .flipHorizontal
        case 1: self = .crossDissolve
        case 2: self = .coverVertical
        default: self = .defaultValue
        }
    }
}

extension OSIABToolbarPosition: @retroactive Decodable {
    init(_ value: Int) {
        switch value {
        case 0: self = .top
        case 1: self = .bottom
        default: self = .defaultValue
        }
    }
}
