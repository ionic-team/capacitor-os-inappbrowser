// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorInappbrowser",
    platforms: [.iOS(.v13)],
    products: [
        .library(
            name: "CapacitorInappbrowser",
            targets: ["InAppBrowserPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", branch: "main")
    ],
    targets: [
        .target(
            name: "InAppBrowserPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/InAppBrowserPlugin"),
        .testTarget(
            name: "InAppBrowserPluginTests",
            dependencies: ["InAppBrowserPlugin"],
            path: "ios/Tests/InAppBrowserPluginTests")
    ]
)
