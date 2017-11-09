import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from "@angular/http";

import { FoxApp } from './app.component';
import { HomePage } from '../pages/home/home';
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
import {CategoriesPage} from '../pages/categories/categories';
import {CategoryPage} from '../pages/category/category';

@NgModule({
  declarations: [
    FoxApp,
    HomePage,
    CategoriesPage,
    CategoryPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(WebApiService, {delay: 1000}),
    IonicModule.forRoot(FoxApp, {}, {
      links: [
        { component: HomePage, name: 'HomePage', segment: 'home' },
        { component: CategoriesPage, name: 'CategoriesPage', segment: 'categories' },
        { component: CategoryPage, name: 'CategoryPage', segment: 'category' }
      ]
    }),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    FoxApp,
    HomePage,
    CategoriesPage,
    CategoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventService,
    {provide: AbstractAccountRepository, useClass: MockAccountRepository},
    {provide: AbstractLocalizationRepository, useClass: MockLocalizationRepository},
    {provide: AbstractNewsSubscribeService, useClass: MockNewsSubscribeService},
    {provide: AbstractDataRepository, useClass: AppDataRepository},
    NewsSubscribeService,
    AppConstants,
    UserService,
    CurrencyStore
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
    RefInjector.push(this.injector);
  }
}
