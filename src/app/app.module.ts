import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {GoogleMaps} from '@ionic-native/google-maps';
import { Ionic2RatingModule } from 'ionic2-rating';

import { FoxApp } from './app.component';

import {
  HomePage,
  AboutPage,
  PopoverPage,
  AccountPage,
  SupportPage,
  LoginPage,
  RegisterPage,
  ChangePasswordPage,
  ForgotPasswordPage,
  CartPage,
  CategoriesPage,
  CategoryPage,
  ItemPage,
  MapPage,
  ModalItemOptionPage,
  MyOrderPage,
  OrderConfirmPage,
  ItemDetailPage
} from '../pages/index';

import {AppConstants} from './app-constants';
import {
  EventService,
  AbstractAccountRepository,
  MockAccountRepository,
  AbstractLocalizationRepository,
  MockLocalizationRepository,
  AbstractNewsSubscribeService,
  MockNewsSubscribeService,
  AbstractDataRepository,
  AppDataRepository,
  NewsSubscribeService,
  UserService,
  CurrencyStore
} from '../app/service/index';

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {WebApiService} from './service/webapi/web-api-service';
import {RefInjector} from './core/app-core';
import {ComponentsModule} from '../components/components.module';
import {PipesModule} from "./pipe/pipes.module";



@NgModule({
  declarations: [
    FoxApp,
    AboutPage,
    AccountPage,
    HomePage,
    LoginPage,
    RegisterPage,
    PopoverPage,
    SupportPage,
    ChangePasswordPage,
    ForgotPasswordPage,
    CartPage,
    CategoriesPage,
    CategoryPage,
    ItemPage,
    MapPage,
    ModalItemOptionPage,
    MyOrderPage,
    OrderConfirmPage,
    ItemDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(WebApiService, {delay: 1000}),
    IonicModule.forRoot(FoxApp, {},{
      links: [
        { component: HomePage, name: 'HomePage', segment: 'home'},
        { component: CategoriesPage, name: 'CategoriesPage', segment: 'categories'},
        { component: CategoryPage, name: 'CategoryPage', segment: 'category/:categoryId'},
        { component: MapPage, name: 'Map', segment: 'map' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' }
      ]
    }),
    ComponentsModule,
    Ionic2RatingModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    FoxApp,
    AboutPage,
    AccountPage,
    HomePage,
    LoginPage,
    RegisterPage,
    PopoverPage,
    SupportPage,
    ChangePasswordPage,
    ForgotPasswordPage,
    CartPage,
    CategoriesPage,
    CategoryPage,
    ItemDetailPage,
    ItemPage,
    MapPage,
    ModalItemOptionPage,
    MyOrderPage,
    OrderConfirmPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    UserService,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventService,
    {provide: AbstractAccountRepository, useClass: MockAccountRepository},
    {provide: AbstractLocalizationRepository, useClass: MockLocalizationRepository},
    {provide: AbstractNewsSubscribeService, useClass: MockNewsSubscribeService},
    {provide: AbstractDataRepository, useClass: AppDataRepository},
    NewsSubscribeService,
    AppConstants,
    CurrencyStore
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
    RefInjector.push(this.injector);
  }
}
