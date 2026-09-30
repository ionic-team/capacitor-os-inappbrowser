// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorInappbrowser",
    platforms: [.iOS(.v16)],
    products: [
        .library(
            name: "CapacitorInappbrowser",
            targets: ["InAppBrowserPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor.git", from: "9.0.0-alpha.7"),
        .package(url: "https://github.com/OutSystems/OSInAppBrowserLib-iOS.git", exact: "2.3.2")
    ],
    targets: [
        .target(
            name: "InAppBrowserPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor"),
                .product(name: "OSInAppBrowserLib", package: "OSInAppBrowserLib-iOS")
            ],
            path: "ios/Sources/InAppBrowserPlugin"),
        .testTarget(
            name: "InAppBrowserPluginTests",
            dependencies: ["InAppBrowserPlugin"],
            path: "ios/Tests/InAppBrowserPluginTests")
    ]
)
