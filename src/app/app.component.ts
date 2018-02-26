import {Component, ViewChild, OnDestroy, AfterViewInit} from '@angular/core';
import {Nav, Platform, MenuController, AlertController, ToastController} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AbstractDataRepository} from "./service/index";
import {ComponentBase} from "../components/component-extension/component-base";
import {AppAvailability} from "@ionic-native/app-availability";
import {Device} from '@ionic-native/device';
import {DeviceData} from "./model/index";
import {System} from "./core/app-core";
import {CartService} from "./service/cart-service";
import {Network} from '@ionic-native/network';
import {Subscription} from 'rxjs/Subscription';

export interface PageInterface {
  title: string;
  name?: string;
  component?: any;
  icon?: string;
  index?: number;
}

declare var ExoPlayer: any;
declare var FCMPlugin: any;

@Component({
  templateUrl: 'app.html'
})
export class FoxApp extends ComponentBase implements AfterViewInit, OnDestroy {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';

  // Default path if file located in assets/video
  readonly LOCAL_VIDEO_URL = 'file:///android_asset/www/assets/video/';
  // Set name of the video file
  videoFileName = 'video';

  // Parameters of the external app
  scheme: string;
  appUrl: string;
  _token: string;

  appPages: PageInterface[] = [
    {title: 'Главная', name: 'Home', component: 'HomePage', index: 0, icon: 'ios-home-outline'},
    {title: 'Категории', name: 'Categories', component: 'CategoriesPage', index: 1, icon: 'ios-list-outline'},
    {title: 'Профиль', name: 'Account', component: 'AccountMenuPage', index: 2, icon: 'ios-person-outline'},
  ];
  infoPages: PageInterface[] = [
    {title: 'Магазины на карте', name: 'Map', component: 'MapPage', index: 0, icon: 'ios-map-outline'},
    {title: 'Акции', name: 'Actions', component: 'ActionsPage', index: 1, icon: 'ios-briefcase-outline'},
    {title: 'О нас', name: 'About', index: 2, icon: 'ios-information-circle-outline'},
    {title: 'Поддержка', name: 'Support', component: 'SupportPage', index: 3, icon: 'ios-text-outline'}
  ];

  private noveltyPushEventDescriptor: any;
  private actionPushEventDescriptor: any;

  connected: Subscription;
  disconnected: Subscription;

  constructor(private platform: Platform, private alertCtrl: AlertController, private splashScreen: SplashScreen,
              public menuCtrl: MenuController, private repo: AbstractDataRepository,
              private appAvailability: AppAvailability, private device: Device, private cartService: CartService,
              private network: Network, private toast: ToastController) {
    super();
    // Setting up external app params
    // TODO: Change these params to Foxtrot game's
    this.scheme = 'com.facebook.katana';
    this.appUrl = 'fb://page/';
    this._token = '192385130800097';
  }

  async ngOnInit() {
    super.ngOnInit();
    if (!this.userService.isAuth && this.userService.isNotSignOutSelf()) {
      await this.userService.shortLogin();
    }

    /**
     * Subscribing to the push events and putting our dynamic components to special pushStore dictionary in PushContainer
     */
    this.noveltyPushEventDescriptor = this.evServ.events['noveltyPushEvent'].subscribe(data => {
      System.PushContainer.pushStore[`novelty${data.innerId}`] = data;
    });
    this.actionPushEventDescriptor = this.evServ.events['actionPushEvent'].subscribe(data => {
      System.PushContainer.pushStore[`action${data.innerId}`] = data;
    });

    if (this.device.cordova) {
      this.checkAndHandleConnectionState();
      // Getting FCM device token and send device data
      FCMPlugin.getToken((token) => {
        if (token) {
          // Collecting and send data about device including device FCM token
          this.collectAndSendDeviceData(token).catch((err) => console.log(`Sending device's data err: ${err}`));
        }
      });
      // Subscribing this device to the main topic to send PUSH-notifications to this topic
      FCMPlugin.subscribeToTopic('main');
      // Handling incoming PUSH-notifications
      FCMPlugin.onNotification((data) => {
        if (data.wasTapped) {
          //Notification was received on device tray and tapped by the user.
          this.pushNotificationHandling(data);
        } else {
          //Notification was received in foreground. Maybe the user needs to be notified.
          this.pushNotificationHandling(data);
        }
      });
    }
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  ngOnDestroy() {
    this.noveltyPushEventDescriptor.unsubscribe();
    this.actionPushEventDescriptor.unsubscribe();
    this.connected.unsubscribe();
    this.disconnected.unsubscribe();
  }

  openPage(page: PageInterface) {
    if ((this.userService.isAuth === false) && (page.component === 'AccountMenuPage')) {
      this.nav.push('LoginPage', {continuePage: 'AccountMenuPage'}).catch((err: any) => {
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
          } catch (err) {
            console.log(err);
          }
          break;
        }
        case 'Game': {
          try {
            this.openExternalApp();
          } catch (err) {
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
  private playVideo() {
    this.platform.ready().then(() => {
      // ExoPlayer
      this.playExoPlayer();
    }).catch(err => {
      console.log('Error occurred: ' + err);
    });
  }

  // Function to play Google's ExoPlayer
  private playExoPlayer() {
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
  private openExternalApp() {
    let scheme: string = this.scheme;
    let appUrl: string = this.appUrl;
    let token: string = this._token;
    this.platform.ready().then(() => {
      this.appAvailability.check(scheme).then(
        () => {  // Success callback
          window.open(appUrl + token, '_system', 'location=no');
          console.log('App is available');
        },
        () => {  // Error callback
          window.open('https://www.facebook.com/' + token, '_system', 'location=yes');
          console.log('App is not installed');
          return;
        })
    }).catch((err) => {
      window.open('https://www.facebook.com/' + token, '_system', 'location=yes');
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

  // Collects and sends device's data about model, operation system + it's version and screen size, and FCM device token
  private async collectAndSendDeviceData(pushDeviceToken: any) {
    let model = this.device.model;
    let os = this.device.platform + ' ' + this.device.version;
    let height = this.platform.height();
    let width = this.platform.width();
    let userToken = this.userService.token;
    let deviceData = new DeviceData(model, os, height, width, pushDeviceToken, userToken);
    this.repo.postDeviceData(deviceData).catch(err => {
      console.log(`Couldn't send device data: ${err}`);
    });
  }

  // Handling incoming PUSH-notifications
  private async pushNotificationHandling(data) {
    let target = data.target;
    let noveltyTitle = this.locale['NoveltyTitle'];
    let noveltyMessage = this.locale['NoveltyMessage'];
    let promoTitle = this.locale['PromoTitle'];
    let promoMessage = this.locale['PromoMessage'];
    let promocodeTitle = this.locale['PromocodeTitle'];
    let promocodeMessage = this.locale['PromocodeMessage'];
    let cancel = this.locale['Cancel'];
    switch (target) {
      case 'novelty': {
        if (data.id) {
          let alert = this.alertCtrl.create({
            title: noveltyTitle,
            message: noveltyMessage,
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  let noveltySketch = System.PushContainer.pushStore[`novelty${data.id}`];
                  if (noveltySketch.novelty && noveltySketch.product) {
                    noveltySketch.openNovelty();
                  }
                }
              },
              {
                text: cancel
              }
            ]
          });
          alert.present().catch((err) => console.log(`Alert error: ${err}`));
        }
        break;
      }
      case 'action' || 'promotion' || 'promo': {
        if (data.id) {
          let alert = this.alertCtrl.create({
            title: promoTitle,
            message: promoMessage,
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  let actionSketch = System.PushContainer.pushStore[`action${data.id}`];
                  if (actionSketch.action) {
                    actionSketch.openAction();
                  }
                }
              },
              {
                text: cancel
              }
            ]
          });
          alert.present().catch((err) => console.log(`Alert error: ${err}`));
        }
        break;
      }
      case 'promocode': {
        if (data.promocode) {
          this.cartService.promoCode = data.promocode;
          if (this.cartService.cartItemsCount > 0) {
            this.cartService.calculateCart().catch((err) => {
              console.log(`Couldn't get discount:${err}`);
            });
          }
          this.evServ.events['cartUpdateEvent'].emit();
          this.evServ.events['cartItemsUpdateEvent'].emit();
          let alert = this.alertCtrl.create({
            title: promocodeTitle,
            message: promocodeMessage,
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.nav.push('CartPage').catch((err: any) => {
                    console.log(`Couldn't navigate to CartPage: ${err}`);
                  })
                }
              },
              {
                text: cancel
              }
            ]
          });
          alert.present().catch((err) => console.log(`Alert error: ${err}`));
        }
        break;
      }
      default: {
        console.log('The target is not valid');
        break;
      }
    }
  }


  /**
   * Checking network status
   */
  checkAndHandleConnectionState() {
    this.connected = this.network.onConnect().subscribe(data => {
      //console.log(data);
      if (data) {
        this.displayNetworkUpdate(data.type);
      }
    }, error => console.error(error));

    this.disconnected = this.network.onDisconnect().subscribe(data => {
      //console.log(data);
      if (data) {
        this.displayNetworkUpdate(data.type);
      }
    }, error => console.error(error))
  }
  displayNetworkUpdate(connectionState: string){
    let networkType = this.network.type;
    let message: string;
    if (connectionState === 'online') {
      message = `${this.locale['OnlineMessage']} ${networkType}`;
    } else {
      message = `${this.locale['OfflineMessage']} ${connectionState}`;
    }
    this.toast.create({
      message: message,
      duration: 3000
    }).present();
  }
}

