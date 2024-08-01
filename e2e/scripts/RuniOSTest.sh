#!/bin/bash

TEST_FILE=$1

START_DIR=$(pwd)
APPS_DIR="$START_DIR/e2e/apps"

if command -v maestro &> /dev/null; then
    cd ./example-app
    npm i && npm run build && npx cap sync ios
    PROJECT_NAME="App"
    SCHEME="App"
    CONFIGURATION="Debug"
    SDK="iphonesimulator"
    cd ./ios/App/
    xcodebuild archive clean -archivePath "$APPS_DIR/App.xcarchive" -workspace "${PROJECT_NAME}.xcworkspace" -scheme $SCHEME -configuration $CONFIGURATION -sdk "iphonesimulator" -destination "generic/platform=iOS Simulator" CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO
    cd "$START_DIR/e2e"
    cp -R ./apps/App.xcarchive/Products/Applications/App.app $APPS_DIR
    rm -rf ./apps/App.xcarchive

    cd $START_DIR
    
    DEVICE_TYPE="iPhone 15 Pro"
    OS_VERSION="17-5"
    booted_sim=$(xcrun simctl list devices booted | grep "OSTesterDeviceiOS" | grep -Eo '[0-9A-F\-]{36}')
    if [[ -z "$booted_sim" ]]; then
        unbooted_sim=$(xcrun simctl list devices available | grep "OSTesterDeviceiOS" | grep -Eo '[0-9A-F\-]{36}')
        if [[ -z "$unbooted_sim" ]]; then
            echo "Creating simulator..."
            xcrun simctl create "OSTesterDeviceiOS" "$DEVICE_TYPE" "com.apple.CoreSimulator.SimRuntime.iOS-$OS_VERSION"
            unbooted_sim=$(xcrun simctl list devices available | grep "OSTesterDeviceiOS" | grep -Eo '[0-9A-F\-]{36}')
        fi
        xcrun simctl boot "$unbooted_sim"
    fi
    booted_sim=$(xcrun simctl list devices booted | grep "OSTesterDeviceiOS" | grep -Eo '[0-9A-F\-]{36}')
    echo "Sim: $booted_sim"
    open -a "Simulator"
    xcrun simctl install $booted_sim "$APPS_DIR/App.app"
    maestro --device "$booted_sim" test $TEST_FILE

    rm -rf "$START_DIR/e2e/apps/App.app"
else
    echo "Maestro is not available. Please install it."
fi