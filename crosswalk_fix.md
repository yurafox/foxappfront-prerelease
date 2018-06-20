### Google released the new version 28.0.0-alpha1 of com.android.support:support-v4 which is adding 2 new attributes(android:fontVariationSettings and android:ttcIndex). Some of the plugins are using the latest android-support libraries which results in unwanted incompatibilities.

### Just put following in build-extras.gradle. Create this file in platform/android, if you don't have one.

configurations.all {
    resolutionStrategy {
        force 'com.android.support:support-v4:27.1.0'
    }
}

### If the problem is persistent you may try:

cordova platform rm android
cordova platform add android

### OR
### Make sure you don't have a previous version of the app installed on the device you test because you'll receive an ambiguous error when it tries to downgrade the existing version: "INSTALL_FAILED_VERSION_DOWNGRADE" and "UnhandledPromiseRejectionWarning: Unhandled promise rejection"

### Origin:
https://stackoverflow.com/questions/49162538/running-cordova-build-android-unable-to-find-attribute-androidfontvariation/49200782#49200782