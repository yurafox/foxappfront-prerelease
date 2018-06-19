import {Component, ViewChild, OnDestroy} from '@angular/core';
import {Nav, Platform, MenuController, AlertController, ModalController} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ComponentBase} from "../components/component-extension/component-base";
import {AppAvailability} from "@ionic-native/app-availability";
import {Device} from '@ionic-native/device';
import {System} from "./core/app-core";
import {CartService} from "./service/cart-service";
import {ConnectivityService} from "./service/connectivity-service";
import {StatusBar} from '@ionic-native/status-bar';
import {BackgroundMode} from "@ionic-native/background-mode";
import {AbstractDataRepository} from './service/repository/abstract/abstract-data-repository';
import {DeviceData} from './model/device-data';
import {Push, PushObject, PushOptions} from '@ionic-native/push';

export interface PageInterface {
  title: string;
  name?: string;
  component?: any;
  icon?: string;
  index?: number;
}

@Component({
  templateUrl: 'app.html'
})
export class FoxApp extends ComponentBase implements OnDestroy {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';

  appPages: PageInterface[] = [
    {title: 'Главная', name: 'Home', component: 'HomePage', index: 0, icon: 'ios-home-outline'},
    {title: 'Категории', name: 'Categories', component: 'CategoryTreePage', index: 1, icon: 'ios-list-outline'},
//    {title: 'Профиль', name: 'Account', component: 'AccountMenuPage', index: 2, icon: 'ios-person-outline'},
  ];
  infoPages: PageInterface[] = [
    {title: 'Магазины', name: 'Map', component: 'MapPage', index: 0, icon: 'ios-map-outline'},
    {title: 'Акции', name: 'Actions', component: 'ActionsPage', index: 1, icon: 'ios-briefcase-outline'},
    {title: 'Новости', name: 'News', component: 'ManageNewsMenuPage', index: 2, icon: 'ios-book-outline'},
    {title: 'Контакты', name: 'Contacts', component: 'ContactsPage', index: 3, icon: 'ios-information-circle-outline'},
    //{title: 'Поддержка', name: 'Support', component: 'SupportPage', index: 3, icon: 'ios-text-outline'},
  ];

  noveltyPushEventDescriptor: any;
  actionPushEventDescriptor: any;

  constructor(public platform: Platform, public alertCtrl: AlertController, public splashScreen: SplashScreen,
              public menuCtrl: MenuController, public repo: AbstractDataRepository,
              public appAvailability: AppAvailability, public device: Device, public cartService: CartService,
              public connService: ConnectivityService, public statusBar: StatusBar,
              public modalCtrl: ModalController, public backgroundMode: BackgroundMode, public push: Push) {
    super();
    this.initLocalization();

    platform.ready().then(() => {
      statusBar.overlaysWebView(true);
      statusBar.backgroundColorByHexString('#EBEBEC');
      statusBar.styleDefault();
    });
  }

  async ngOnInit() {
    this.connService.nav = this.nav;
    if (!this.userService.isAuth && this.userService.token) {
      this.userService.userMutex = true;
      await this.userService.shortLogin();
      this.userService.userMutex = false;
    }

    this.platform.ready().then((ready) => {
      /**
       * Subscribing to the push events and putting our dynamic components to special pushStore dictionary in PushContainer
       */
      this.noveltyPushEventDescriptor = this.evServ.events['noveltyPushEvent'].subscribe(data => {
        System.PushContainer.pushStore[`novelty${data.innerId}`] = data;
      });
      this.actionPushEventDescriptor = this.evServ.events['actionPushEvent'].subscribe(data => {
        System.PushContainer.pushStore[`action${data.innerId}`] = data;
      });

      /**
       * Getting FCM device token and sending device data to back-end
       */
      this.push.hasPermission().then((res: any) => {
        if (res.isEnabled) {
          const options: PushOptions = {
            android: {
              senderID: "431639834815",
              clearNotifications: false
            },
            ios: {
              alert: "true",
              badge: "true",
              sound: "true"
            }
          };

          const pushObject: PushObject = this.push.init(options);

          /**
           * Subscribing this device to the main topic to send PUSH-notifications to this topic
           */
          pushObject.subscribe('main').catch((err) => console.error(err));

          pushObject.on('notification').subscribe((notification: any) => {
            /**
             * Handling incoming PUSH-notifications
             */
            this.pushNotificationHandling(notification).catch((err) => console.error(err));
          });

          pushObject.on('registration').subscribe((registration: any) => {
            if (registration.registrationId) {
              /**
               * Collecting and sending data about device including device FCM token
               */
              this.collectAndSendDeviceData(registration.registrationId).catch((err) => console.log(`Sending device's data err: ${err}`));
            }
          });

          pushObject.on('error').subscribe(error => {
            console.error('Error with Push plugin', error.message);
          });
        } else {
          console.log('We do not have permission to send push notifications');
        }
      });

      this.splashScreen.hide();
      this.backgroundMode.enable();
      this.backgroundMode.setDefaults({silent: true}).catch((err) => console.error(err));
    });
  }

  ngOnDestroy() {
    this.noveltyPushEventDescriptor.unsubscribe();
    this.actionPushEventDescriptor.unsubscribe();
  }

  openPage(page: PageInterface) {
    if (!(this.userService.isAuth) && (page.component === 'AccountMenuPage')) {
      this.nav.push('LoginPage', {continuePage: null}).catch((err: any) => {
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
        default: {
          this.nav.push(page.component).catch((err: any) => {
            console.log(`Couldn't push this page: ${page.component.toString()}: ${err}`);
          });
          break;
        }
      }
    }
  }

  register() {
    this.nav.push('RegisterPage').catch((err)=>console.error(err));
  }

  account() {
    this.nav.push('AccountMenuPage').catch((err)=>console.error(err));
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

  openBalancePage() {
    this.nav.push('BalancePage').catch((err)=>console.error(err));
  }

  toLogIn() {
    if (this.userService.isAuth === false) {
      this.nav.push('LoginPage').catch((err: any) => {
        console.log(`Couldn't navigate to LoginPage: ${err}`);
      });
    }
  }

  callMe() {
    const callMeModal = this.modalCtrl.create('CallMePage');
    callMeModal.present().catch((err)=>console.error(err));
  }

  support() {
    const supportModal = this.modalCtrl.create('SupportPage');
    supportModal.present().catch((err)=>console.error(err));
  }

  /**
   * Collects and sends device's data about model, operation system + it's version and screen size, and FCM device token
   *
   * @param pushDeviceToken
   * @returns {Promise<void>}
   */
  public async collectAndSendDeviceData(pushDeviceToken: any) {
    let model = this.device.manufacturer + ' ' + this.device.model;
    let os = this.device.platform + ' ' + this.device.version;
    let height = this.platform.height();
    let width = this.platform.width();
    let deviceData = new DeviceData(model, os, height, width, pushDeviceToken);
    this.repo.postDeviceData(deviceData).catch(err => {
      console.log(`Couldn't send device data: ${err}`);
    });
  }

  /**
   * Handles incoming PUSH-notifications
   *
   * @param data
   * @returns {Promise<void>}
   */
  public async pushNotificationHandling(data) {
    let target = data.additionalData.target;
    let additionalData = data.additionalData;
    let noveltyTitle = this.locale['NoveltyTitle'];
    let noveltyMessage = this.locale['NoveltyMessage'];
    let promoTitle = this.locale['PromoTitle'];
    let promoMessage = this.locale['PromoMessage'];
    let promocodeTitle = this.locale['PromocodeTitle'];
    let promocodeMessage = this.locale['PromocodeMessage'];
    let cancel = this.locale['Cancel'];
    switch (target) {
      case 'novelty': {
        if (additionalData.id) {
          this.showNoveltyAlert(noveltyTitle, noveltyMessage, additionalData, cancel);
        }
        break;
      }
      case 'action': {
        if (additionalData.id) {
          this.showPromoAlert(promoTitle, promoMessage, additionalData, cancel);
        }
        break;
      }
      case 'promotion': {
        if (additionalData.id) {
          this.showPromoAlert(promoTitle, promoMessage, additionalData, cancel);
        }
        break;
      }
      case 'promo': {
        if (additionalData.id) {
          this.showPromoAlert(promoTitle, promoMessage, additionalData, cancel);
        }
        break;
      }
      case 'promocode': {
        if (additionalData.promocode) {
          this.usePromocodeAndShowAlert(additionalData, promocodeTitle, promocodeMessage, cancel);
        }
        break;
      }
      default: {
        console.log('The target is not valid');
        break;
      }
    }
  }

  showNoveltyAlert(noveltyTitle, noveltyMessage, additionalData, cancel) {
    let alert = this.alertCtrl.create({
      title: noveltyTitle,
      message: noveltyMessage,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            let noveltySketch = System.PushContainer.pushStore[`novelty${additionalData.id}`];
            if (noveltySketch.novelty && noveltySketch.product) {
              noveltySketch.openNovelty();
            }
          }
        },
        {
          text: cancel
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present().catch((err) => console.log(`Alert error: ${err}`));
  }

  showPromoAlert(promoTitle, promoMessage, additionalData, cancel) {
    let alert = this.alertCtrl.create({
      title: promoTitle,
      message: promoMessage,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            let actionSketch = System.PushContainer.pushStore[`action${additionalData.id}`];
            if (actionSketch.action) {
              actionSketch.openAction();
            }
          }
        },
        {
          text: cancel
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present().catch((err) => console.log(`Alert error: ${err}`));
  }

  usePromocodeAndShowAlert(additionalData, promocodeTitle, promocodeMessage, cancel) {
    this.cartService.promoCode = additionalData.promocode;
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
      ],
      enableBackdropDismiss: false
    });
    alert.present().catch((err) => console.log(`Alert error: ${err}`));
  }
}

