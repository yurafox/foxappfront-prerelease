[![pipeline status](http://gitlab.mc.gcf/dit/foxtrot-mobile-app/badges/develop/pipeline.svg)](http://gitlab.mc.gcf/dit/foxtrot-mobile-app/commits/develop)

### Installing and preparing to work with the Ionic CLI:

        ```
        $ npm install -g ionic cordova
        $ npm install
        ```

### 1. Install these plugins strictly using these commands:
       
       ```
       $ ionic cordova plugin add cordova-android-play-services-gradle-release --variable PLAY_SERVICES_VERSION=15.+
       $ ionic cordova plugin add cordova-android-firebase-gradle-release  --variable FIREBASE_VERSION=15.+
       $ ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyAKDQzb3RKdVlh0gqZMhY4MEjl53Lh-Dmk" --variable API_KEY_FOR_IOS="AIzaSyAKDQzb3RKdVlh0gqZMhY4MEjl53Lh-Dmk" --variable PLAY_SERVICES_VERSION=15.+
       $ ionic cordova plugin add phonegap-plugin-push@2.2.2 --variable SENDER_ID=431639834815 --variable FCM_VERSION=15.+
       $ ionic cordova plugin add cordova-support-google-services
       ```

### Then:

        ```
        $ ionic cordova platform add android
        ```
	
### 2. Read crosswalk_fix.md which is located in projects main folder.
