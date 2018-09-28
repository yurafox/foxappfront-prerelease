import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ErrorHandler, NgModule, Injector, LOCALE_ID} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, IonicPageModule} from 'ionic-angular';
import {ReactiveFormsModule} from '@angular/forms';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {GoogleMaps} from '@ionic-native/google-maps';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {Ionic2Rating, Ionic2RatingModule} from 'ionic2-rating';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {getLocString} from './service/repository/specific/localization-repository';

import {FoxApp} from './app.component';
import {HomePage} from '../pages/home/home';

import {AppConstants} from './app-constants';
import {RefInjector} from './core/app-core';
import {ComponentsModule} from '../components/components.module';
import {PipesModule} from "./pipe/pipes.module";
import {DirectivesModule} from './directives/directives.module';
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {Push} from '@ionic-native/push';

import {NgxQRCodeModule} from 'ngx-qrcode2';
import {AppAvailability} from '@ionic-native/app-availability';
import {Device} from "@ionic-native/device";
import {Keyboard} from "@ionic-native/keyboard";
import {CallNumber} from '@ionic-native/call-number';
import {BackgroundMode} from '@ionic-native/background-mode';
import {UserService} from './service/bll/user-service';
import {EventService} from './service/event-service';
import {AbstractAccountRepository} from './service/repository/abstract/abstract-account-repository';
import {AbstractLocalizationRepository} from './service/repository/abstract/abstract-localization-repository';
import {AbstractNewsSubscribeService} from './service/repository/abstract/abstract-news-subscribe-service';
import {AbstractDataRepository} from './service/repository/abstract/abstract-data-repository';
import {AppDataRepository} from './service/repository/specific/app-data-repository';
import {AccountRepository} from './service/repository/specific/account-repository';
import {MockNewsSubscribeService} from './service/repository/specific/mock-news-subscribe.service';
import {LocalizationRepository} from './service/repository/specific/localization-repository';
import {NewsSubscribeService} from './service/repository/specific/news-subscribe.service';
import {CurrencyStore} from './service/repository/specific/currency-store.service';
import {CartService} from './service/cart-service';
import {ConnectivityService} from './service/connectivity-service';
import {AccountPageModule} from '../pages/account/account.module';
import {AccountMenuPageModule} from '../pages/account-menu/account-menu.module';
import {ActionPageModule} from '../pages/action/action.module';
import {BarcodePageModule} from '../pages/barcode/barcode.module';
import {CartPageModule} from '../pages/cart/cart.module';
import {CategoriesPageModule} from '../pages/categories/categories.module';
import {CategoryPageModule} from '../pages/category/category.module';
import {ChangePasswordPageModule} from '../pages/change-password/change-password.module';
import {CityPopoverPageModule} from '../pages/city-popover/city-popover.module';
import {EditShipAddressPageModule} from '../pages/edit-ship-address/edit-ship-address.module';
import {FavoriteStoresPageModule} from '../pages/favorite-stores/favorite-stores.module';
import {FilterPopoverPageModule} from '../pages/filter-popover/filter-popover.module';
import {ForgotPasswordPageModule} from '../pages/forgot-password/forgot-password.module';
import {HomePageModule} from '../pages/home/home.module';
import {ItemDescriptionPageModule} from '../pages/item-description/item-description.module';
import {ItemDetailPageModule} from '../pages/item-detail/item-detail.module';
import {ItemPropsPageModule} from '../pages/item-props/item-props.module';
import {ItemQuotesPageModule} from '../pages/item-quotes/item-quotes.module';
import {ItemReviewPageModule} from '../pages/item-review/item-review.module';
import {ItemReviewWritePageModule} from '../pages/item-review-write/item-review-write.module';
import {ItemReviewsPageModule} from '../pages/item-reviews/item-reviews.module';
import {LoginPageModule} from '../pages/login/login.module';
import {ManagePlacesMenuPageModule} from '../pages/manage-places-menu/manage-places-menu.module';
import {MapPageModule} from '../pages/map/map.module';
import {NoConnectionPageModule} from '../pages/no-connection/no-connection.module';
import {OrdersPageModule} from '../pages/your-orders/your-orders.module';
import {RegisterPageModule} from '../pages/register/register.module';
import {SearchPageModule} from '../pages/search/search.module';
import {SearchResultsPageModule} from '../pages/search-results/search-results.module';
import {SelectShipAddressPageModule} from '../pages/select-ship-address/select-ship-address.module';
import {SupportPageModule} from '../pages/support/support.module';
import {ActionsPageModule} from '../pages/actions/actions.module';
import {ShippingOptionsPageModule} from '../pages/shipping-options/shipping-options.module';
import {SelectPmtMethodPageModule} from '../pages/select-pmt-method/select-pmt-method.module';
import {CheckoutPageModule} from '../pages/checkout/checkout.module';
import {CreditCalcPageModule} from '../pages/credit-calc/credit-calc.module';
import {BalancePageModule} from '../pages/balance/balance.module';
import {PollPageModule} from '../pages/poll/poll.module';
import {NoveltyPageModule} from '../pages/novelty/novelty.module';
import {OrderDetailsPageModule} from '../pages/order-details/order-details.module';
import {PaymentPageModule} from '../pages/payment/payment.module';
import {WarningViewPageModule} from '../pages/warning-view/warning-view.module';
import {OrdersFilterPageModule} from '../pages/your-orders-filter/your-orders-filter.module';
import {ContactsPageModule} from '../pages/contacts/contacts.module';
import {LegalPolicyPageModule} from '../pages/legal-policy/legal-policy.module';
import {NewsPageModule} from '../pages/news/news.module';
import {NewsDetailPageModule} from '../pages/news-detail/news-detail.module';
import {ManageNewsMenuPageModule} from '../pages/manage-news-menu/manage-news-menu.module';
import {ItemImgPageModule} from '../pages/item-img/item-img.module';
import {CallMePageModule} from '../pages/call-me/call-me.module';
import {ProductCompareService} from './service/product-compare-service';
import {ProductFavoriteService} from './service/product-favorite-service';

import {AbstractActionRepository} from "./service/repository/abstract/abstract-action-repository";
import {ActionRepository} from "./service/repository/specific/action-repository";
import {AbstractBannerSlideRepository} from "./service/repository/abstract/abstract-banner-slide-repository";
import {BannerSlideRepository} from "./service/repository/specific/banner-slide-repository";
import {AbstractCartRepository} from "./service/repository/abstract/abstract-cart-repository";
import {CartRepository} from "./service/repository/specific/cart-repository";
import {AbstractCatalogRepository} from "./service/repository/abstract/abstract-catalog-repository";
import {ClientMessageRepository} from "./service/repository/specific/client-message-repository";
import {CreditRepository} from "./service/repository/specific/credit-repository";
import {AbstractClientMessageRepository} from "./service/repository/abstract/abstract-client-message-repository";
import {AbstractClientRepository} from "./service/repository/abstract/abstract-client-repository";
import {ClientRepository} from "./service/repository/specific/client-repository";
import {AbstractCreditRepository} from "./service/repository/abstract/abstract-credit-repository";
import {AbstractCurrencyRepository} from "./service/repository/abstract/abstract-currency-repository";
import {CurrencyRepository} from "./service/repository/specific/currency-repository";
import {AbstractDeviceDataRepository} from "./service/repository/abstract/abstract-device-data-repository";
import {DeviceDataRepository} from "./service/repository/specific/device-data-repository";
import {AbstractFinRepository} from "./service/repository/abstract/abstract-fin-repository";
import {FinRepository} from "./service/repository/specific/fin-repository";
import {CatalogRepository} from "./service/repository/specific/catalog-repository";
import {AbstractManufacturerRepository} from "./service/repository/abstract/abstract-manufacturer-repository";
import {ProductCompareRepository} from "./service/repository/specific/product-compare-repository";
import {AbstractLoRepository} from "./service/repository/abstract/abstract-lo-repository";
import {SupplierRepository} from "./service/repository/specific/supplier-repository";
import {AbstractPageRepository} from "./service/repository/abstract/abstract-page-repository";
import {StoreRepository} from "./service/repository/specific/store-repository";
import {QuotationProductRepository} from "./service/repository/specific/quotation-product-repository";
import {AbstractNoveltyRepository} from "./service/repository/abstract/abstract-novelty-repository";
import {AbstractStoreRepository} from "./service/repository/abstract/abstract-store-repository";
import {QuotationRepository} from "./service/repository/specific/quotation-repository";
import {NoveltyRepository} from "./service/repository/specific/novelty-repository";
import {NewsCategoryRepository} from "./service/repository/specific/news-category-repository";
import {AbstractQuotationRepository} from "./service/repository/abstract/abstract-quotation-repository";
import {PageRepository} from "./service/repository/specific/page-repository";
import {AbstractNewsCategoryRepository} from "./service/repository/abstract/abstract-news-category-repository";
import {StorePlaceRepository} from "./service/repository/specific/store-place-repository";
import {AbstractNewsRepository} from "./service/repository/abstract/abstract-news-repository";
import {AbstractProductCompareRepository} from "./service/repository/abstract/abstract-product-compare-repository";
import {AbstractQuotationProductRepository} from "./service/repository/abstract/abstract-quotation-product-repository";
import {AbstractSupplierRepository} from "./service/repository/abstract/abstract-supplier-repository";
import {ReviewRepository} from "./service/repository/specific/review-repository";
import {ProductRepository} from "./service/repository/specific/product-repository";
import {AbstractReviewRepository} from "./service/repository/abstract/abstract-review-repository";
import {PollRepository} from "./service/repository/specific/poll-repository";
import {AbstractLegalPolicyRepository} from "./service/repository/abstract/abstract-legal-policy-repository";
import {MeasureUnitRepository} from "./service/repository/specific/measure-unit-repository";
import {NewsRepository} from "./service/repository/specific/news-repository";
import {LoRepository} from "./service/repository/specific/lo-repository";
import {GeoRepository} from "./service/repository/specific/geo-repository";
import {AbstractGeoRepository} from "./service/repository/abstract/abstract-geo-repository";
import {AbstractPollRepository} from "./service/repository/abstract/abstract-poll-repository";
import {AbstractStorePlaceRepository} from "./service/repository/abstract/abstract-store-place-repository";
import {LegalPolicyRepository} from "./service/repository/specific/legal-policy-repository";
import {ManufacturerRepository} from "./service/repository/specific/manufacturer-repository";
import {AbstractMeasureUnitRepository} from "./service/repository/abstract/abstract-measure-unit-repository";
import {AbstractProductRepository} from "./service/repository/abstract/abstract-product-repository";


@NgModule({
  declarations: [
    FoxApp
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    IonicModule.forRoot(FoxApp),
    IonicPageModule.forChild(HomePage),
    InfiniteScrollModule,
    LazyLoadImagesModule,
    ComponentsModule,
    Ionic2RatingModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgxQRCodeModule,
    AccountPageModule,
    AccountMenuPageModule,
    ActionPageModule,
    BarcodePageModule,
    CartPageModule,
    CategoriesPageModule,
    CategoryPageModule,
    ChangePasswordPageModule,
    CityPopoverPageModule,
    EditShipAddressPageModule,
    FavoriteStoresPageModule,
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
    ManagePlacesMenuPageModule,
    MapPageModule,
    NoConnectionPageModule,
    OrdersPageModule,
    RegisterPageModule,
    SearchPageModule,
    SearchResultsPageModule,
    SelectShipAddressPageModule,
    SupportPageModule,
    ActionsPageModule,
    ShippingOptionsPageModule,
    SelectPmtMethodPageModule,
    CheckoutPageModule,
    CreditCalcPageModule,
    BalancePageModule,
    PollPageModule,
    NoveltyPageModule,
    OrderDetailsPageModule,
    PaymentPageModule,
    WarningViewPageModule,
    OrdersFilterPageModule,
    ContactsPageModule,
    LegalPolicyPageModule,
    NewsPageModule,
    NewsDetailPageModule,
    ManageNewsMenuPageModule,
    ItemImgPageModule,
    CallMePageModule
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
    BarcodeScanner,
    ScreenOrientation,
    AppAvailability,
    Ionic2Rating,
    Device,
    Keyboard,
    CallNumber,
    BackgroundMode,
    Push,
    //{provide: Compiler, useExisting: RuntimeCompiler },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventService,
    {provide: AbstractAccountRepository, useClass: AccountRepository},
    {provide: AbstractLocalizationRepository, useClass: LocalizationRepository},
    {provide: AbstractNewsSubscribeService, useClass: MockNewsSubscribeService},
    {provide: AbstractDataRepository, useClass: AppDataRepository},
    {provide: AbstractActionRepository, useClass: ActionRepository},
    {provide: AbstractBannerSlideRepository, useClass: BannerSlideRepository},
    {provide: AbstractCartRepository, useClass: CartRepository},
    {provide: AbstractCatalogRepository, useClass: CatalogRepository},
    {provide: AbstractClientMessageRepository, useClass: ClientMessageRepository},
    {provide: AbstractClientRepository, useClass: ClientRepository},
    {provide: AbstractCreditRepository, useClass: CreditRepository},
    {provide: AbstractCurrencyRepository, useClass: CurrencyRepository},
    {provide: AbstractDeviceDataRepository, useClass: DeviceDataRepository},
    {provide: AbstractFinRepository, useClass: FinRepository},
    {provide: AbstractGeoRepository, useClass: GeoRepository},
    {provide: AbstractLegalPolicyRepository, useClass: LegalPolicyRepository},
    {provide: AbstractLoRepository, useClass: LoRepository},
    {provide: AbstractManufacturerRepository, useClass: ManufacturerRepository},
    {provide: AbstractMeasureUnitRepository, useClass: MeasureUnitRepository},
    {provide: AbstractNewsCategoryRepository, useClass: NewsCategoryRepository},
    {provide: AbstractNewsRepository, useClass: NewsRepository},
    {provide: AbstractNoveltyRepository, useClass: NoveltyRepository},
    {provide: AbstractPageRepository, useClass: PageRepository},
    {provide: AbstractPollRepository, useClass: PollRepository},
    {provide: AbstractProductCompareRepository, useClass: ProductCompareRepository},
    {provide: AbstractProductRepository, useClass: ProductRepository},
    {provide: AbstractQuotationProductRepository, useClass: QuotationProductRepository},
    {provide: AbstractQuotationRepository, useClass: QuotationRepository},
    {provide: AbstractReviewRepository, useClass: ReviewRepository},
    {provide: AbstractStorePlaceRepository, useClass: StorePlaceRepository},
    {provide: AbstractStoreRepository, useClass: StoreRepository},
    {provide: AbstractSupplierRepository, useClass: SupplierRepository},
    {
      provide: LOCALE_ID,
      deps: [AbstractLocalizationRepository],
      useFactory: getLocString
    },
    {
      provide: ErrorHandler,
      useClass: ConnectivityService
    },
    NewsSubscribeService,
    AppConstants,
    CurrencyStore,
    CartService,
    ConnectivityService,
    ProductCompareService,
    ProductFavoriteService
  ]
})
export class AppModule {
  constructor(public injector: Injector) {
    RefInjector.push(this.injector);
  }
}
