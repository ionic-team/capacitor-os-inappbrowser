// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorInappbrowser",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "CapacitorInappbrowser",
            targets: ["InAppBrowserPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0"),
        .package(url: "https://github.com/OutSystems/OSInAppBrowserLib-iOS.git", exact: "2.3.1")
    ],
    targets: [
        .target(
            name: "InAppBrowserPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm"),
                .product(name: "OSInAppBrowserLib", package: "OSInAppBrowserLib-iOS")
            ],
            path: "ios/Sources/InAppBrowserPlugin"),
        .testTarget(
            name: "InAppBrowserPluginTests",
            dependencies: ["InAppBrowserPlugin"],
            path: "ios/Tests/InAppBrowserPluginTests")
    ]
)
