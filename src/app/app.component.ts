import {Component, ViewChild, OnDestroy} from '@angular/core';
import {Nav, Platform, MenuController, AlertController} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AbstractDataRepository} from "./service/index";
import {ComponentBase} from "../components/component-extension/component-base";
import {AppAvailability} from "@ionic-native/app-availability";
import {Device} from '@ionic-native/device';
import {DeviceData} from "./model/index";
import {System} from "./core/app-core";
import {CartService} from "./service/cart-service";
import {ConnectivityService} from "./service/connectivity-service";

export interface PageInterface {
  title: string;
  name?: string;
  component?: any;
  icon?: string;
  index?: number;
}

declare var FCMPlugin: any;

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
    {title: 'Категории', name: 'Categories', component: 'CategoriesPage', index: 1, icon: 'ios-list-outline'},
    {title: 'Профиль', name: 'Account', component: 'AccountMenuPage', index: 2, icon: 'ios-person-outline'},
  ];
  infoPages: PageInterface[] = [
    {title: 'Магазины', name: 'Map', component: 'MapPage', index: 0, icon: 'ios-map-outline'},
    {title: 'Акции', name: 'Actions', component: 'ActionsPage', index: 1, icon: 'ios-briefcase-outline'},
    {title: 'Новости', name: 'News', component: 'ManageNewsMenuPage', index: 2, icon: 'ios-book-outline'},
    {title: 'Контакты', name: 'Contacts', component: 'ContactsPage', index: 3, icon: 'ios-information-circle-outline'},
    {title: 'Поддержка', name: 'Support', component: 'SupportPage', index: 4, icon: 'ios-text-outline'},
  ];

  private noveltyPushEventDescriptor: any;
  private actionPushEventDescriptor: any;

  constructor(private platform: Platform, private alertCtrl: AlertController, private splashScreen: SplashScreen,
              public menuCtrl: MenuController, private repo: AbstractDataRepository,
              private appAvailability: AppAvailability, private device: Device, private cartService: CartService,
              private connService: ConnectivityService) {
    super();
    this.initLocalization();
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

      if (this.device.cordova) {
        if (this.userService.isAuth && this.userService.token) {
          // Getting FCM device token and send device data
          FCMPlugin.getToken((token) => {
            if (token) {
              // Collecting and send data about device including device FCM token
              this.collectAndSendDeviceData(token).catch((err) => console.log(`Sending device's data err: ${err}`));
            }
          });
        }
        // Subscribing this device to the main topic to send PUSH-notifications to this topic
        FCMPlugin.subscribeToTopic('main');
        // Handling incoming PUSH-notifications
        FCMPlugin.onNotification((data) => {
          if (data.wasTapped) {
            //Notification was received on device tray and tapped by the user.
            this.pushNotificationHandling(data).catch();
          } else {
            //Notification was received in foreground. Maybe the user needs to be notified.
            this.pushNotificationHandling(data).catch();
          }
        });

        //let readyness = await this.platform.ready();
        if (ready && ready !== '') {
          this.splashScreen.hide();
          //this.backgroundMode.enable();
        }
      }
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

  signOut() {
    this.userService.logOut();
    this.nav.setRoot('HomePage').catch(err => {
      console.log(`Didn't set nav root: ${err}`);
    });
    this.menuCtrl.close().catch(err => {
      console.log(`Couldn't close the menu: ${err}`);
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
    let model = this.device.manufacturer + ' ' + this.device.model;
    let os = this.device.platform + ' ' + this.device.version;
    let height = this.platform.height();
    let width = this.platform.width();
    let deviceData = new DeviceData(model, os, height, width, pushDeviceToken);
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
}

