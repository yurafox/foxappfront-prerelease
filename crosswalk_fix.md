https://stackoverflow.com/questions/49162538/running-cordova-build-android-unable-to-find-attribute-androidfontvariation/49200782#49200782

$ ionic cordova plugin add cordova-plugin-crosswalk-webview

### Google released the new version 28.0.0-alpha1 of com.android.support:support-v4 which is adding 2 new attributes(android:fontVariationSettings and android:ttcIndex). Some of the plugins are using the latest android-support libraries which results in unwanted incompatibilities.

### Option 1: Install cordova-android-support-gradle-release plugin.

### Well documented plugin which "aligns various versions of the Android Support libraries specified by other plugins to a specific version". Tested without any destructive behavior.
cordova plugin add cordova-android-support-gradle-release –fetch

### Read the documentation for a full set of options: https://github.com/dpa99c/cordova-android-support-gradle-release

### Option 2: Add next code snippet in build.gradle under platforms/android

/**
IMPORTANT - Manually added
Problem: 8 March 2018 - Google released version support-v4:28.0.0-alpha1
which breaks the project with following error: unable to find attribute
android:fontVariationSettings and android:ttcIndex

Effect: Force a specific version of the library
*/

configurations.all {
    resolutionStrategy.force 'com.android.support:support-v4:27.1.0'
}

### Warning: code in build.gradle will be overwritten if you remove/add the Android platform. If you don't want to use the plugin for some reason or somehow is not working for you, instead create a hook and overwrite the file every time. Check next --->
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
