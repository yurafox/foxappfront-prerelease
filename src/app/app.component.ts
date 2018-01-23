import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AbstractDataRepository} from "./service/index";
import {ComponentBase} from "../components/component-extension/component-base";
import {AppAvailability} from "@ionic-native/app-availability";
import {Device} from '@ionic-native/device';
import {Push, PushObject, PushOptions} from '@ionic-native/push';
import {DeviceData} from "./model/index";

export interface PageInterface {
  title: string;
  name?: string;
  component?: any;
  icon?: string;
  index?: number;
}

declare var ExoPlayer: any;

@Component({
  templateUrl: 'app.html'
})
export class FoxApp extends ComponentBase {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';

  readonly LOCAL_VIDEO_URL = 'file:///android_asset/www/assets/video/'; // Default path if file located in assets/video
  videoFileName = 'video';  // Set the name of video file

  // Parameters of the external app
  scheme: string;
  appUrl: string;
  userToken: string;

  appPages: PageInterface[] = [
    {title: 'Главная', name: 'Home', component: 'HomePage', index: 0, icon: 'ios-home-outline'},
    {title: 'Категории', name: 'Categories', component: 'CategoriesPage', index: 1, icon: 'ios-list-outline'},
    /*{title: 'Ваши Заказы', name: 'Orders', component: 'MyOrderPage', index: 2, icon: 'ios-cart-outline'},*/
    {title: 'Профиль', name: 'Account', component: 'AccountMenuPage', index: 3, icon: 'ios-person-outline'},
  ];
  infoPages: PageInterface[] = [
    {title: 'Магазины на карте', name: 'Map', component: 'MapPage', index: 0, icon: 'ios-map-outline'},
    {title: 'Акции', name: 'Actions', component: 'ActionsPage', index: 1, icon: 'ios-briefcase-outline'},
    {title: 'О нас', name: 'About', index: 2, icon: 'ios-information-circle-outline'},
    {title: 'Поддержка', name: 'Support', component: 'SupportPage', index: 3, icon: 'ios-text-outline'}
  ];

  constructor(private platform: Platform, statusBar: StatusBar,
              private splashScreen: SplashScreen, public menuCtrl: MenuController,
              private repo: AbstractDataRepository, private appAvailability: AppAvailability,
              private device: Device, private push: Push) {
    super();
    //this.rootPage = HomePage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    });
    // Setting up external app params
    this.scheme = 'com.facebook.katana';
    this.appUrl = 'fb://page/';
    this.userToken = '192385130800097';
  }

  async ngOnInit() {
    super.ngOnInit();
    if (!this.userService.isAuth && this.userService.isNotSignOutSelf()) {
      await this.userService.shortLogin();
    }
    this.platform.ready().then(() => {
      this.splashScreen.hide();

      if (this.device.platform && (this.device.platform !== null)) {
        this.collectAndSendDeviceData();
      }

      // this.pushNotify();
    });
  }

  openPage(page: PageInterface) {

    if ((this.userService.isAuth === false) && (page.component === 'AccountMenuPage')) {
      this.nav.push('LoginPage').catch((err: any) => {
        console.log(`Couldn't navigate to LoginPage: ${err}`);
      });
    } else {
      switch (page.name) {
        case 'Home': {
          this.nav.setRoot('HomePage').catch((err: any) => {
            console.log(`Didn't set nav root: ${err}`);
          });
          break;
        }
        case 'About': {
          try {
            this.playVideo();
          } catch(err) {
            console.log(err);
          }
          break;
        }
        case 'Game': {
          try {
            this.openExternalApp();
          } catch(err) {
            console.log(err);
          }
          break;
        }
        default: {
          this.nav.push(page.component).catch((err: any) => {
            console.log(`Couldn't push this page: ${page.component.toString()}: ${err}`);
          });
          break;
        }
      }
    }
  }

  signOut() {
    this.userService.logOut();
    this.nav.setRoot('HomePage').catch(err => {
      console.log(`Didn't set nav root: ${err}`);
    });
    this.menuCtrl.close().catch(err => {
      console.log(`Couldn't close the menu: ${err}`);
    });
  }

  // To play video when device is ready
  playVideo() {
    this.platform.ready().then(() => {
      // ExoPlayer
      this.playExoPlayer();
    }).catch(err => {
      console.log('Error occurred: ' + err);
    });
  }

  // Function to play Google's ExoPlayer
  playExoPlayer() {
    let successCallback = json => {
      // Exit player on phones BACK button
      if (json.eventType === 'KEY_EVENT' && json.eventKeycode === 'KEYCODE_BACK') {
        ExoPlayer.close();
      }
      // Show controls on tap on the screen
      if (json.eventType === 'TOUCH_EVENT' && json.eventAction === 'ACTION_UP') {
        ExoPlayer.showController();
      }
      // Play video again (from 0 ms) if it ended
      if (json.eventType === 'STATE_CHANGED_EVENT') {
        if (json.position >= (json.duration - 1)) {
          ExoPlayer.seekTo(0);
        }
      }
    };
    let errorCallback = error => {
      console.log(error);
    };
    // Parameters for player
    let params = {
      url: this.LOCAL_VIDEO_URL + this.videoFileName + '.mp4',
      userAgent: 'FoxPlayer', // default is 'ExoPlayerPlugin'
      aspectRatio: 'FIT_SCREEN', // default is FIT_SCREEN
      hideTimeout: 3000, // Hide controls after this many milliseconds, default is 5 sec
      autoPlay: true, // When set to false stream will not automatically start
      // seekTo: 10 * 60 * 60 * 1000, // Start playback 10 minutes into video specified in ms, default is 0
      forwardTime: 60 * 1000, // Amount of time in ms to use when skipping forward, default is 1 min
      rewindTime: 60 * 1000, // Amount of time in ms to use when skipping backward, default is 1 min
      // subtitleUrl: 'http://url.to/subtitle.srt', // Optional subtitle url
      controller: { // If this object is not present controller will not be visible
        // streamImage: 'http://url.to/channel.png',
        // streamTitle: 'Cool channel / movie',
        // streamDescription: '2nd line you can use to display whatever you want like current program epg or movie description',
        hideProgress: false, // Hide entire progress timebar
        hidePosition: false, // If timebar is visible hide current position from it
        hideDuration: false, // If timebar is visible Hide stream duration from it
        controlIcons: {}
      }
    };
    // Start player
    ExoPlayer.show(params, successCallback, errorCallback);
  }

  // Opens external application
  openExternalApp() {
    let scheme: string = this.scheme;
    let appUrl: string = this.appUrl;
    let userToken: string = this.userToken;
    this.platform.ready().then(() => {
      this.appAvailability.check(scheme).then(
        ()=> {  // Success callback
          window.open(appUrl + userToken, '_system', 'location=no');
          console.log('App is available');
        },
        () => {  // Error callback
          window.open('https://www.facebook.com/' + userToken, '_system', 'location=yes');
          console.log('App is not installed');
          return;
        })
    }).catch((err) => {
      window.open('https://www.facebook.com/' + userToken, '_system', 'location=yes');
      console.log(`Error occurred while opening external app: ${err}`);
      return;
    });
  }

  toLogIn() {
    if (this.userService.isAuth === false) {
      this.nav.push('LoginPage').catch((err: any) => {
        console.log(`Couldn't navigate to LoginPage: ${err}`);
      });
    }
  }

  // Collects and sends device's data about model, operation system + it's version and screen size
  private collectAndSendDeviceData() {
    let model = this.device.model;
    let os = this.device.platform + ' ' + this.device.version;
    let height = this.platform.height();
    let width = this.platform.width();
    let deviceData = new DeviceData(model, os, height, width);
    this.repo.sendDeviceData(deviceData).catch(err => {
      console.log(`Couldn't send device data: ${err}`);
    });
  }

  pushNotify() {
    try {
      // to check if we have permission
      this.push.hasPermission()
        .then((res: any) => {

          if (res.isEnabled) {
            console.log('We have permission to send push notifications');
          } else {
            console.log('We do not have permission to send push notifications');
          }

        });

      // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
      this.push.createChannel({
        id: "Novelty1",
        description: "My first test channel",
        // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
        importance: 3
      }).then(() => console.log('Channel created'));

      // Delete a channel (Android O and above)
      this.push.deleteChannel('Novelty1').then(() => console.log('Channel deleted'));

      // Return a list of currently configured channels
      this.push.listChannels().then((channels) => console.log('List of channels', channels));

      // to initialize push notifications

      const options: PushOptions = {
        android: {
          senderID: '431639834815'
        }
      };

      const pushObject: PushObject = this.push.init(options);


      pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

      pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

      pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    } catch (err) {
      console.log(`Push plugin error: ${err}`);
    }
  }
}

