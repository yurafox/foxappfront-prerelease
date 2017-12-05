import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule, Injector} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, IonicPageModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {GoogleMaps} from '@ionic-native/google-maps';
import {Ionic2RatingModule} from 'ionic2-rating';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';

import {FoxApp} from './app.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {HomePage} from '../pages/index';

import {AppConstants} from './app-constants';
import {
  EventService,
  AbstractAccountRepository,
  AccountRepository,
  AbstractLocalizationRepository,
  MockLocalizationRepository,
  AbstractNewsSubscribeService,
  MockNewsSubscribeService,
  AbstractDataRepository,
  AppDataRepository,
  NewsSubscribeService,
  UserService,
  CurrencyStore,
  CartService,
  SearchService
} from '../app/service/index';

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {WebApiService} from './service/webapi/web-api-service';
import {RefInjector} from './core/app-core';
import {ComponentsModule} from '../components/components.module';
import {PipesModule} from "./pipe/pipes.module";
import {DirectivesModule} from './directive/directives.module';
import {Geolocation} from '@ionic-native/geolocation';
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {LaunchNavigator} from "@ionic-native/launch-navigator";

import {
  AboutPageModule,
  AccountPageModule,
  CartPageModule,
  CategoriesPageModule,
  CategoryPageModule,
  ChangePasswordPageModule,
  CityPopoverPageModule,
  FilterPopoverPageModule,
  ForgotPasswordPageModule,
  HomePageModule,
  ItemDescriptionPageModule,
  ItemDetailPageModule,
  ItemPropsPageModule,
  ItemQuotesPageModule,
  ItemReviewPageModule,
  ItemReviewWritePageModule,
  ItemReviewsPageModule,
  LoginPageModule,
  MapPageModule,
  RegisterPageModule,
  SearchPageModule,
  SearchResultsPageModule,
  SupportPageModule
} from "../pages/index-modules";

@NgModule({
  declarations: [
    FoxApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(WebApiService, {delay: 1000, post204: false, put204: false}),
    IonicModule.forRoot(FoxApp),
    IonicPageModule.forChild(HomePage),
    ComponentsModule,
    Ionic2RatingModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    AboutPageModule,
    AccountPageModule,
    CartPageModule,
    CategoriesPageModule,
    CategoryPageModule,
    ChangePasswordPageModule,
    CityPopoverPageModule,
    FilterPopoverPageModule,
    ForgotPasswordPageModule,
    HomePageModule,
    ItemDescriptionPageModule,
    ItemDetailPageModule,
    ItemPropsPageModule,
    ItemQuotesPageModule,
    ItemReviewPageModule,
    ItemReviewWritePageModule,
    ItemReviewsPageModule,
    LoginPageModule,
    MapPageModule,
    RegisterPageModule,
    SearchPageModule,
    SearchResultsPageModule,
    SupportPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    FoxApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    UserService,
    GoogleMaps,
    Geolocation,
    BarcodeScanner,
    ScreenOrientation,
    LaunchNavigator,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventService,
    {provide: AbstractAccountRepository, useClass: AccountRepository},
    {provide: AbstractLocalizationRepository, useClass: MockLocalizationRepository},
    {provide: AbstractNewsSubscribeService, useClass: MockNewsSubscribeService},
    {provide: AbstractDataRepository, useClass: AppDataRepository},
    NewsSubscribeService,
    AppConstants,
    CurrencyStore,
    SearchService,
    CartService
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
    RefInjector.push(this.injector);
  }
}
