[![pipeline status](http://gitlab.mc.gcf/dit/foxtrot-mobile-app/badges/develop/pipeline.svg)](http://gitlab.mc.gcf/dit/foxtrot-mobile-app/commits/develop)

### Installing and preparing to work with the Ionic CLI:
        ```
        $ npm install -g ionic cordova
        $ npm install
        ```
### Remove platform, if it's already installed:
        ```
        $ ionic cordova platform remove android
        ```

### 1. Install plugins play-services-gradle-release, firebase-gradle-release, googlemaps phonegap-plugin-push and crosswalk-webview strictly using these commands:
       ```
       $ ionic cordova plugin add cordova-android-play-services-gradle-release --variable PLAY_SERVICES_VERSION=15.+
       $ ionic cordova plugin add cordova-android-firebase-gradle-release  --variable FIREBASE_VERSION=15.+
       $ ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyAKDQzb3RKdVlh0gqZMhY4MEjl53Lh-Dmk" --variable API_KEY_FOR_IOS="AIzaSyAKDQzb3RKdVlh0gqZMhY4MEjl53Lh-Dmk" --variable PLAY_SERVICES_VERSION=15.+
       $ ionic cordova plugin add phonegap-plugin-push@2.2.2 --variable SENDER_ID=431639834815 --variable FCM_VERSION=15.+
       $ ionic cordova plugin add cordova-plugin-crosswalk-webview
       ```

### Then:
        ```
        $ ionic cordova platform add android@7.1.0
        ```

### When platform is installed copy google-services.json file from project's root folder to platforms/android/app.

### Now build with:
        $ ionic cordova build android --aot
### or run on device/emulator:
        $ ionic cordova run android --aot --device
	
### If you're experiencing build errors like "ERROR: In <declare-styleable> FontFamilyFont, unable to find attribute ..." read crosswalk_fix.md which is located in project's root folder to fix issue with crosswalk-webview plugin.
