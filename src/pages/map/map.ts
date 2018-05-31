import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AbstractDataRepository } from '../../app/service/repository/abstract/abstract-data-repository';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  MarkerOptions,
  Marker,
  LatLng,
  HtmlInfoWindow
} from '@ionic-native/google-maps';
import { City, Store } from "../../app/model/index";
import { ComponentBase } from "../../components/component-extension/component-base";
import { Geolocation } from '@ionic-native/geolocation';
import { FavoriteStoresPage } from "../favorite-stores/favorite-stores";
import { StoreReview } from "../../app/model/store-review";
import { IDictionary } from "../../app/core/app-core";
import { Subscription } from "rxjs/Subscription";

interface SelectItem {
  label: string;
  value: {lat: number, lng: number};
}

@IonicPage({ name: 'MapPage', segment: 'map' })
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage extends ComponentBase implements OnInit, OnDestroy {
  @ViewChild('mapCanvas') mapCanvas;

  previousPage: string;

  map: GoogleMap;
  prevInfoWindow: HtmlInfoWindow;
  city: City;
  defaultCityId: string;  // Used to set position when map just opened and user's location is unknown.
  cities: Array<City>;
  selectedCity: City = new City(0, ' ', 0);
  selectedMarker: SelectItem;
  markersArr: IDictionary<Store[]>;
  shopList: Array<SelectItem>;
  storeReviews: IDictionary<StoreReview[]>;
  options: GoogleMapOptions;
  userPos: LatLng;
  userPosIsKnown: boolean;
  // Variables for infoWindow content
  open: string;
  close: string;
  openHoursStr: string;
  reviewsStr: string;
  writeReviewStr: string;
  // Variables for drop-down buttons
  dropDownCityOpts: any;
  dropDownAddressOpts: any;
  isAuthorized: boolean;
  clientId: number = 0;
  cantShowDict: IDictionary<boolean>;

  markerSubscriptions: Subscription[];

  constructor(private nav: NavController, private navParams: NavParams, private platform: Platform,
              private repo: AbstractDataRepository, private geolocation: Geolocation,
              private alertCtrl: AlertController, private toastCtrl: ToastController) {
    super();
    this.initLocalization();
    this.defaultCityId = "38044";
    this.shopList = [{label: '', value: null}];
    this.storeReviews = {};
    this.markersArr = {};
    this.cities = [];
    this.cities.push(new City(0, ''));
    this.selectedMarker = {label: '', value: null};
    this.userPos = new LatLng(0, 0);
    this.markerSubscriptions = [];
    this.userPosIsKnown = false;
    this.cantShowDict = {};

    try {
      if (this.nav.last()) {
        this.previousPage = this.nav.last().id;
      }
    } catch (err) {
      console.log(`Error getting last page: ${err}`);
    }
  }

  async ngOnInit() {
    super.ngOnInit();
    if (this.userService.isAuth) {
      this.isAuthorized = true;
    }
    try {
      this.platform.ready().then(() => {
        this.getLocation().then(res => {
          this.userPos.lat = res.lat;
          this.userPos.lng = res.lng;
          if (res && res.lat && res.lng) {
            this.userPosIsKnown = true;
          }
        }).catch(() => {
          this.userPosIsKnown = false;
        });
      });

      this.openHoursStr = this.locale['OpenHours'] ? this.locale['OpenHours'] : 'Время работы';
      this.open = this.locale['Open'] ? this.locale['Open'] : 'Открыто';
      this.close = this.locale['Closed'] ? this.locale['Closed'] : 'Закрыто';
      this.reviewsStr = this.locale['Reviews'] ? this.locale['Reviews'] : 'Отзывы';
      this.writeReviewStr = this.locale['WriteReview'] ? this.locale['WriteReview'] : 'Оставить отзыв';
      this.dropDownCityOpts = {
        popupClass: 'f-middle-dictionary',
        buttonClass: 'f-drop-button-full',
        popupHeader: this.locale['City'] ? this.locale['City'] : 'Город',
        buttonHeader: this.locale['City'] ? this.locale['City'] : 'Город'
      };
      this.dropDownAddressOpts = {
        popupClass: 'f-large-dictionary',
        buttonClass: 'f-drop-button-full',
        popupHeader: this.locale['Address'] ? this.locale['Address'] : 'Адрес',
        buttonHeader: this.locale['Address'] ? this.locale['Address'] : 'Адрес'
      };


      this.markersArr = await this.repo.getStores();
      this.cities = await this.repo.getCitiesWithStores();
      let reviews = await this.repo.getStoreReviews();
      this.storeReviews = reviews.reviews;
      this.clientId = reviews.idClient;

      await this.loadMap();
    } catch (err) {
      let alert = this.alertCtrl.create({
        title: this.locale['AlertFailTitle'] ? this.locale['AlertFailTitle'] : 'Что-то пошло не так',
        message: this.locale['AlertFailMessage'] ? this.locale['AlertFailMessage'] : 'Пожалуйста, проверьте соединение с сетью и попробуйте перезапустить приложение',
        buttons: [
          {
            text: 'OK',
          }
        ]
      });
      alert.present().then(() => {
        this.nav.pop().catch((err) => console.log(`Couldn't pop: ${err}`));
      }).catch((err) => console.log(`Alert error: ${err}`));
      console.log(err);
    }
  }
  ngOnDestroy() {
    for (let i = 0; i < this.markerSubscriptions.length; i++) {
      this.markerSubscriptions[i].unsubscribe();
    }
  }

  loadMap() {
    if (this.userPosIsKnown === true) {
      this.options = {
        controls: {
          compass: true,
          myLocationButton: false,
          mapToolbar: true,
          zoom: false,
        },
        gestures: {
          scroll: true,
          tilt: false,
          zoom: true,
          rotate: true,
        },
        camera: {
          target: this.userPos,
          zoom: 10
        },
      };
    } else {
      this.options = {
        controls: {
          compass: true,
          myLocationButton: false,
          mapToolbar: true,
          zoom: false,
        },
        gestures: {
          scroll: true,
          tilt: false,
          zoom: true,
          rotate: true,
        },
        camera: {
          target: {lat: 50.449878, lng: 30.523089}, // Center of Kiev
          zoom: 10
        },
      };
    }

    this.makeShopList();

    this.map = GoogleMaps.create(this.mapCanvas.nativeElement, this.options);

    let citiesArr: City[] = this.cities;
    this.cities = [];

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      for (let i = 0; i < citiesArr.length; i++) {
        if (citiesArr[i].id === this.selectedCity.id) {
          this.city = citiesArr[i];
        }
        if (this.markersArr[citiesArr[i].id.toString()]) {
          this.cities.push(citiesArr[i]);
        }
      }

      /**
       * Iterating through all stores positions. Setting up info windows and marker event listeners
       */
      for (let c = 0; c < this.cities.length; c++) {
        let cityID = this.cities[c].id.toString();
        if (this.markersArr[cityID]) {
          for (let i = 0; i < this.markersArr[cityID].length; i++) {
            let markerData = this.markersArr[cityID][i];

            let markerOptions: MarkerOptions = {
              position: markerData.position,
              draggable: false,
              flat: false,
              visible: true,
              disableAutoPan: false
            };

            // <editor-fold desc="Marker events"

            // Native
            this.map.addMarker(markerOptions).then((marker: Marker) => {
              let reviews: StoreReview[] = [];
              if (this.storeReviews[markerData.id.toString()]) {
                reviews = this.storeReviews[markerData.id.toString()];
                this.cantShowDict[markerData.id.toString()] = this.hasClientReview(reviews);
              }

              let shopOpensTime: string = markerData.openTime;
              let shopClosesTime: string = markerData.closeTime;
              let workingHours: string;
              if (shopOpensTime && shopClosesTime) {
                workingHours = this.openHoursStr + ': ' + shopOpensTime + ' - ' + shopClosesTime;
              } else workingHours = '';
              const shopRating: number = markerData.rating;
              let rating = '';
              for (let i = 0; i < shopRating; i++) {
                rating += '<span class="fa fa-star checked"></span>';
              }

              let markerPosition = markerData.position;

              let isWorking = this.shopIsWorking(shopOpensTime, shopClosesTime);

              let htmlInfoWnd = new HtmlInfoWindow();
              let html: HTMLElement = document.createElement('div');
              html.innerHTML = [`<div style="font-size: 17px;">`,
                `<p style="color: #ef4123; padding: 0; margin: 0; font-size: 18px; text-align: center"><b>Фокстрот</b></p>`,
                `<p style="padding: 0; margin: 0; text-align: center">${shopRating > 0 ? `${rating}` : ''}</p>`,
                `<p style="padding: 0; margin: 0;">${markerData.address}</p>`,
                `<p style="padding: 0; margin: 0;">${workingHours}</p>`,
                `<p style="color: ${(isWorking === this.open) ? 'green' : 'red'}; padding: 0; margin: 0;">${(isWorking) ? isWorking : '' }</p>`,
                `<span id="revs" #revs style="color: darkblue; padding: 0; margin: 0;">${(reviews && (reviews.length > 0)) ? (this.reviewsStr + '<span style=""> (' + reviews.length + ')</span>') : (this.cantShowDict[markerData.id.toString()] && this.cantShowDict[markerData.id.toString()] === true && this.isAuthorized) ? this.writeReviewStr : ''}</span>`,
                `</div>`].join('');
              let revs = html.getElementsByTagName('span')[0];
              if (revs && revs !== null) {
                revs.addEventListener('click', () => {
                  if (reviews && (reviews.length > 0)) {
                    this.onShowReviewsClick(reviews, markerData);
                  } else {
                    this.onWriteReviewClick(markerData);
                  }
                  if (htmlInfoWnd) htmlInfoWnd.close();
                });
              }
              htmlInfoWnd.setContent(html);

              /**
               * Center to the marker and show info on click
               */
              let subMarkerClick = marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                if (this.prevInfoWindow) {
                  this.prevInfoWindow.close();
                }

                this.selectedMarker = {label: markerData.address, value: markerPosition};
                if (+cityID !== this.selectedCity.id) {
                  this.selectedCity = this.cities[c];
                  {
                    this.city = this.cities[c];
                    this.makeShopList();
                  }
                }

                this.prevInfoWindow = htmlInfoWnd;

                htmlInfoWnd.open(marker);
              });
              this.markerSubscriptions.push(subMarkerClick);

            });

            // </editor-fold>
          }
        }
      }
      this.navFromFavoriteStoresPage();
    });
  }

  /**
   * Making list of shops
   */
  makeShopList() {
    for (let i = 0; i < this.cities.length; i++) {
      if (this.selectedCity.id === this.cities[i].id) {
        this.shopList = [];
        try {
          if (this.markersArr[this.cities[i].id.toString()]) {
            for (let j = 0; j < this.markersArr[this.cities[i].id.toString()].length; j++) {
              try {
                this.shopList.push({
                  label: this.markersArr[this.cities[i].id.toString()][j].address,
                  value: this.markersArr[this.cities[i].id.toString()][j].position
                });
              } catch (error) {
                console.log('In-view shops push error: ' + error);
              }
            }
          }
        } catch (error) {
          console.log('makeShopList error: ' + error);
        }
      }
    }
  }

  /**
   * Updating stores every time city changes
   */
  changeMarkers() {
    this.selectedMarker = {label: '', value: null};

    for (let city of this.cities) {
      if (city.id === this.selectedCity.id) {
        this.city = city;
      }
    }
    if (this.markersArr[this.selectedCity.id.toString()]) {
      this.makeShopList();
      try {
        this.map.moveCamera({
          target: this.markersArr[this.selectedCity.id.toString()][0].position,
          zoom: 10
        }).catch();
      } catch (error) {
        console.log('Markers change error: ' + error);
      }
    }
  }

  /**
   * Actions on list select
   */
  handleListSelect() {
    if (this.selectedMarker.value !== null) {
      this.map.moveCamera({
        target: this.selectedMarker.value,
        zoom: 17
      }).catch();
    } else {
      return;
    }
  }

  /**
   * Adding shop address to favorite
   */
  addToFavorite() {
    if (this.selectedMarker.value !== null) {
      for (let marker of this.markersArr[this.selectedCity.id.toString()]) {
        if (marker.position.lat === this.selectedMarker.value.lat && marker.position.lng === this.selectedMarker.value.lng) {
          if (this.isAuthorized === true) {
            try {
              this.addFavoriteStore(marker).catch();
            } catch (err) {
              console.log(`Error while adding to favorite: ${err}`);
              return;
            }
          }
        }
      }
    }
  }

  /**
   * Receive user's location
   * @returns {Promise<Geoposition>}
   */
  async getLocation() {
    let location = await this.map.getMyLocation({enableHighAccuracy:true}).catch();
    return location.latLng;
  }

  /**
   * Checking either shop is working now or not
   * @param opensTime   - time when shop opens
   * @param closesTime  - time when shop closes
   * @returns {string}
   */
  shopIsWorking(opensTime: string, closesTime: string): string {
    const date = new Date();
    if (opensTime && closesTime) {
      let substrings1 = opensTime.split(':');
      let substring11 = substrings1[0].slice(0, substrings1[0].length);
      let substring12 = substrings1[1].slice(0, substrings1[1].length - 1);
      let substrings2 = closesTime.split(':');
      let substring21 = substrings2[0].slice(0, substrings2[0].length);
      let substring22 = substrings2[1].slice(0, substrings2[1].length - 1);

      let myTime = date.getHours() * 100 + date.getMinutes();
      let openTime = +substring11 * 100 + +substring12;
      let closeTime = +substring21 * 100 + +substring22;

      if ((openTime >= 0 && closeTime >= 0) && (openTime <= 2400 && closeTime <= 2400)) {
        if ((myTime >= openTime) && (myTime <= closeTime)) {
          return this.open;
        } else {
          return this.close;
        }
      } else {
        console.log('wrong time input');
      }
    } else {
      return null;
    }
  }

  /**
   * Displays route when user navigates to MapPage from FavoriteStoresPage with favorite store and city in params
   */
  navFromFavoriteStoresPage() {
    if (this.previousPage === 'FavoriteStoresPage') {
      let store = this.navParams.data.store;
      let city: City = this.navParams.data.city;
      this.clientId = this.navParams.data.page.clientId;
      this.selectedCity = city;
      this.makeShopList();
      this.selectedMarker = {label: store.address, value: store.position};
      this.handleListSelect();
    }
  }

  onShowReviewsClick(reviews: StoreReview[], store: Store): void {
    this.nav.push('ItemReviewsPage', { reviews: reviews, store: store, page: this }).catch(err => {
      console.log(`Error navigating to ItemReviewPage: ${err}`);
    });
  }

  onWriteReviewClick(store: Store): void {
    if (store) {
      if (!this.userService.isAuth) {
        this.nav.push('LoginPage', {continuePage: 'ItemReviewWritePage', params: {store:store, page:this}}).catch((err) => {
          console.log(`Couldn't navigate to LoginPage: ${err}`);
        });
      } else {
        this.nav.push('ItemReviewWritePage', {store:store, page:this}).catch(err => {
          console.log(`Error navigating to ItemReviewWritePage: ${err}`);
        });
      }
    }
  }

  public async addFavoriteStore(store: Store) {
    let addedId = await this.repo.addFavoriteStore(store.id);

    if (!addedId || addedId === null || addedId === 0) {
      let title = this.locale['AlertTitle'] ? this.locale['AlertTitle'] : 'Ошибка';
      let alertMessage = this.locale['AlertMessage'] ? this.locale['AlertMessage'] : 'Этот магазин уже есть в Ваших избранных';
      let alert = this.alertCtrl.create({
        title: title,
        message: alertMessage,
        buttons: [
          {
            text: 'OK'
          }
        ]
      });
      alert.present().catch((err) => console.log(`Alert error: ${err}`));
    } else if (addedId && addedId > 0) {
      let toastMessage = this.locale['ToastMessage'] ? this.locale['ToastMessage'] : 'Магазин добавлен в избранные';
      let toast = this.toastCtrl.create({
        message: toastMessage,
        duration: 2000,
        position: 'bottom',
        cssClass: 'toast-message'
      });
      toast.present().catch((err) => console.log(`Toast error: ${err}`));
    }
  }

  hasClientReview(reviews): boolean {
    let present = false;
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i] && reviews[i].idClient === this.clientId) present = true;
    }
    return present;
  }
}
