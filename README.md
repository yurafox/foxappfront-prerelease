[![pipeline status](http://gitlab.mc.gcf/dit/foxtrot-mobile-app/badges/develop/pipeline.svg)](http://gitlab.mc.gcf/dit/foxtrot-mobile-app/commits/develop)

### Installing and preparing to work with the Ionic CLI:

```bash
$ npm install -g ionic cordova
$ npm install
```

### Pre-fixing some plugin issues

### 1. The main issue is that cordova-plugin-fcm and cordova-plugin-googlemaps need to use the same google play services version, but they don't by default.

### Go to <project's folder>/plugins/cordova-plugin-fcm/plugin.xml and find two lines starting with "<framework src="com.google.firebase:firebase-core" and "<framework src="com.google.firebase:firebase-messaging". Change them to be:
		<framework src="com.google.firebase:firebase-core:11.4.2" />
    <framework src="com.google.firebase:firebase-messaging:11.4.2" />
		
### Go to <project's folder>/plugins/cordova-plugin-googlemaps/plugin.xml and find line starting with "<preference name="PLAY_SERVICES_VERSION"". Change it to be:
		<preference name="PLAY_SERVICES_VERSION" default="11.4.2" />
		
### Go to <project's folder>/node_modules/cordova-plugin-googlemaps/plugin.xml and find line starting with "<preference name="PLAY_SERVICES_VERSION"". Change it to be:
		<preference name="PLAY_SERVICES_VERSION" default="11.4.2" />

### Then:
```bash
$ ionic cordova platform add android
```

### After platform have been installed go to <project's folder>/platforms/android/cordova-plugin-fcm/android-FCMPlugin.gradle and add this line to dependencies:
        classpath 'com.google.gms:google-services:3.1.2'
### to be like: 
	dependencies {
        classpath 'com.android.tools.build:gradle:+'
        classpath 'com.google.gms:google-services:3.1.2'
    }
	
### 2. Second main issue is related to cordova-plugin-crosswalk-webview. Read crosswalk_fix.md which is located in projects main folder.
