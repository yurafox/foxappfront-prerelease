import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from "@angular/http";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {GoogleMaps} from "@ionic-native/google-maps";

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
  ModalFilterPage,
  ModalItemOptionPage,
  MyOrderPage,
  OrderConfirmPage,
  SearchPage,
  TabAttributePage,
  TabFilterPage
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
    ModalFilterPage,
    ModalItemOptionPage,
    MyOrderPage,
    OrderConfirmPage,
    SearchPage,
    TabAttributePage,
    TabFilterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(WebApiService, {delay: 1000}),
    IonicModule.forRoot(FoxApp, {}),
    ComponentsModule
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
    ItemPage,
    MapPage,
    ModalFilterPage,
    ModalItemOptionPage,
    MyOrderPage,
    OrderConfirmPage,
    SearchPage,
    TabAttributePage,
    TabFilterPage
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
