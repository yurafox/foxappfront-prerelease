import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule, Injector} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {GoogleMaps} from '@ionic-native/google-maps';
import {Ionic2RatingModule} from 'ionic2-rating';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';

import {FoxApp} from './app.component';

import {ReactiveFormsModule} from '@angular/forms';

import {
  HomePage,
  AboutPage,
  AccountPage,
  SupportPage,
  LoginPage,
  RegisterPage,
  ChangePasswordPage,
  ForgotPasswordPage,
  CartPage,
  CategoriesPage,
  CategoryPage,
  MapPage,
  ItemDetailPage,
  ItemDescriptionPage,
  ItemPropsPage,
  ItemReviewPage,
  ItemReviewsPage,
  ItemReviewWritePage,
  SearchPage,
  SearchResultsPage,
  ItemQuotesPage,
  FilterPopoverPage,
  CityPopoverPage,
  SelectShipAddressPage
} from '../pages/index';

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
import {VideoPlayer} from '@ionic-native/video-player';
import {Geolocation} from '@ionic-native/geolocation';
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {EditShipAddressPage} from '../pages/edit-ship-address/edit-ship-address';

@NgModule({
  declarations: [
    FoxApp,
    AboutPage,
    AccountPage,
    HomePage,
    LoginPage,
    RegisterPage,
    SupportPage,
    ChangePasswordPage,
    ForgotPasswordPage,
    CartPage,
    CategoriesPage,
    CategoryPage,
    MapPage,
    ItemDetailPage,
    ItemDescriptionPage,
    ItemPropsPage,
    ItemReviewPage,
    ItemReviewsPage,
    ItemReviewWritePage,
    SearchPage,
    SearchResultsPage,
    ItemQuotesPage,
    FilterPopoverPage,
    SelectShipAddressPage,
    CityPopoverPage,
    EditShipAddressPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(WebApiService, {delay: 1000, post204: false, put204: false}),
    IonicModule.forRoot(FoxApp, {}, {
      links: [
        {component: HomePage, name: 'HomePage', segment: 'home'},
        {component: CategoriesPage, name: 'CategoriesPage', segment: 'categories'},
        {component: CategoryPage, name: 'CategoryPage', segment: 'category/:categoryId'},
        {component: MapPage, name: 'Map', segment: 'map'},
        {component: SupportPage, name: 'SupportPage', segment: 'support'},
        {component: LoginPage, name: 'LoginPage', segment: 'login'},
        {component: AccountPage, name: 'AccountPage', segment: 'account'},
        {component: AboutPage, name: 'AboutPage', segment: 'about'}
      ]
    }),
    ComponentsModule,
    Ionic2RatingModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    FoxApp,
    AboutPage,
    AccountPage,
    HomePage,
    LoginPage,
    RegisterPage,
    SupportPage,
    ChangePasswordPage,
    ForgotPasswordPage,
    CartPage,
    CategoriesPage,
    CategoryPage,
    ItemDetailPage,
    ItemDescriptionPage,
    ItemPropsPage,
    ItemReviewPage,
    ItemReviewsPage,
    ItemReviewWritePage,
    SearchPage,
    SearchResultsPage,
    ItemQuotesPage,
    FilterPopoverPage,
    CityPopoverPage,
    SelectShipAddressPage,
    EditShipAddressPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    UserService,
    GoogleMaps,
    Geolocation,
    BarcodeScanner,
    VideoPlayer,
    ScreenOrientation,
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
