#!/bin/bash

TEST_FILE=$1

START_DIR=$(pwd)
APPS_DIR="$START_DIR/e2e/apps"

if command -v maestro &> /dev/null; then
    cd ./example-app
    npm i && npm run build && npx cap sync android
    cd android
    ./gradlew assembleDebug
    cp ./app/build/outputs/apk/debug/app-debug.apk "$APPS_DIR/App.apk"
    rm -rf ./app/build
    
    cd $START_DIR
    
    # Check if the AVD manager is available
    if ! command -v avdmanager &> /dev/null
    then
        echo "avdmanager could not be found. Please ensure that Android SDK is installed and 'avdmanager' is in your PATH."
        exit 1
    fi

    # Check if the emulator is available
    if ! command -v emulator &> /dev/null
    then
        echo "emulator could not be found. Please ensure that Android SDK is installed and 'emulator' is in your PATH."
        exit 1
    fi

    # Name of the emulator
    AVD_NAME="OSTesterSim"

    if "$ANDROID_HOME/cmdline-tools/latest/bin/avdmanager" list avd | grep -q "${AVD_NAME}"
    then
        echo "AVD ${AVD_NAME} already exists. Skipping creation."
    else 
        echo "Fetching system image for Android 14..."
        "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" "system-images;android-34;google_apis;arm64-v8a"

        # Create the AVD
        echo "Creating AVD ${AVD_NAME}..."
        echo "no" | "$ANDROID_HOME/cmdline-tools/latest/bin/avdmanager" create avd -n "${AVD_NAME}" -k "system-images;android-34;google_apis;arm64-v8a" --device "pixel"

        echo "AVD ${AVD_NAME} created successfully."
    fi

    sleep 1
    echo "Starting AVD ${AVD_NAME}..."
    "$ANDROID_HOME/emulator/emulator" -avd "${AVD_NAME}" -no-snapshot-load -no-boot-anim > /dev/null 2>&1 &

    # Wait for the emulator to start (check every 10 seconds)
    echo "Waiting for the emulator to start..."
    BOOT_COMPLETED="no"
    while [ "${BOOT_COMPLETED}" != "1" ]; do
        BOOT_COMPLETED=$(adb -e shell getprop sys.boot_completed 2>/dev/null)
        if [ "${BOOT_COMPLETED}" = "1" ]; then
            echo "Emulator started successfully."
            break
        fi
        echo -n "."
        sleep 10
    done

    adb install "$APPS_DIR/App.apk"

    EMULATOR_ID=$(adb devices | grep emulator | cut -f1)
    if [ -z "$EMULATOR_ID" ]; then
        echo "Failed to get emulator ID."
        exit 1
    else
        echo "Emulator ID: $EMULATOR_ID"
    fi

    maestro --device $EMULATOR_ID test $TEST_FILE

    rm -rf "$START_DIR/e2e/apps/App.apk"
else
    echo "Maestro is not available. Please install it."
fi