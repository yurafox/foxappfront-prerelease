import {Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef} from '@angular/core';
import {Platform, IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {/*GoogleMap,*/ LatLng} from '@ionic-native/google-maps';
import {City, Store} from "../../app/model/index";
import {ComponentBase} from "../../components/component-extension/component-base";
import {Geolocation} from '@ionic-native/geolocation';
import {LaunchNavigator} from "@ionic-native/launch-navigator";
import {FavoriteStoresPage} from "../favorite-stores/favorite-stores";
import {StoreReview} from "../../app/model/store-review";
import {IDictionary} from "../../app/core/app-core";

declare var google: any;

interface SelectItem {
  label: string;
  value: any;
}

@IonicPage({name: 'MapPage', segment: 'map'})
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage extends ComponentBase implements OnInit {

  @ViewChild('mapCanvas') mapElement: ElementRef;
  previousPage: string;

  map: /*GoogleMap;*/ any;
  prevInfoWindow: any;
  city: City;
  defaultCityId: string;  // Used to set position when map just opened and user's location is unknown.
  cities: Array<City>;
  selectedCity: City = {id: 0, name: ' '};
  selectedMarker: SelectItem;
  markersArr: IDictionary<Store[]>;
  shopList: Array<SelectItem>;
  options: any;
  userPos: LatLng;
  userPosIsKnown: boolean;
  // Setting up direction service
  directionsService: any;
  directionsDisplay: any;
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
  availableNavApps: void | string[];

  constructor(private nav: NavController, private navParams: NavParams, private platform: Platform,
              private repo: AbstractDataRepository, private geolocation: Geolocation,
              private launchNavigator: LaunchNavigator, private changeDetector: ChangeDetectorRef,
              private alertCtrl: AlertController) {
    super();
    this.initLocalization();
    this.defaultCityId = "38044";
    this.shopList = [{label: '', value: null}];
    this.markersArr = null;
    this.cities = [{id: 0, name: ''}];
    this.selectedMarker = {label: '', value: null};
    this.userPos = new LatLng(0, 0);
    this.availableNavApps = [];

    try {
      if (this.nav.last()) {
        this.previousPage = this.nav.last().id;
      }
    } catch (err) {
      console.log(`Error getting last page: ${err}`);
    }

    platform.ready().then(() => {
      this.getLocation().then(res => {
        this.userPos.lat = res.coords.latitude;
        this.userPos.lng = res.coords.longitude;
        this.userPosIsKnown = true;
      }).catch(err => {
        // console.log(`Error while getting user's location ${err}`);
        this.userPosIsKnown = false;
      });
    });
  }

  async ngOnInit() {
    //super.ngOnInit();
    if (this.userService.isAuth) {
      this.isAuthorized = true;
    }

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

    try {
      [this.markersArr, this.cities] = await Promise.all([this.repo.getStores(), this.repo.getCities()]);

      if ((this.cities && this.cities.length > 0) && this.markersArr) {
        if (this.userPosIsKnown === true) {
          this.options = {
            center: this.userPos,
            zoom: 10,
            disableDefaultUI: true
          };
        } else {
          this.options = {
            center: this.markersArr[this.defaultCityId][0].position,
            zoom: 10,
            disableDefaultUI: true
          };
        }

        this.makeShopList();

        let mapEle = this.mapElement.nativeElement;
        this.map = new google.maps.Map(mapEle, this.options);

        /**
         * Direction Service
         * @type {google.maps.DirectionsService}
         */
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;

        let citiesArr: City[] = this.cities;
        this.cities = [];
        for (let i = 0; i < citiesArr.length; i++) {
          if (citiesArr[i].id === this.selectedCity.id) {
            this.city = citiesArr[i];
          }
          if (this.markersArr[citiesArr[i].id.toString()]) {
            this.cities.push(citiesArr[i]);
          }
        }

        try {
          this.directionsDisplay.setMap(this.map);
        } catch (err) {
          console.log(err);
        }

        /**
         * Iterating through all stores positions. Setting up info windows and marker event listeners
         */
        for (let c = 0; c < this.cities.length; c++) {
          let cityID = this.cities[c].id.toString();
          if (this.markersArr[cityID]) {
            for (let i = 0; i < this.markersArr[cityID].length; i++) {
              let markerData = this.markersArr[cityID][i];
              let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoprstuvwxyz';

              let reviews: StoreReview[] = [];
              this.repo.getStoreReviewsByStoreId(markerData.id).then(reviewsArr => { //TODO: Change method in repo
                reviewsArr.forEach(review => {
                  if (review.idStore === markerData.id) {
                    reviews.push(review);
                  }
                });
              }).catch(err => {
                console.log(`Error retrieving store reviews: ${err}`);
                return null;
              });

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

              let infoWindow = new google.maps.InfoWindow();

              let marker = new google.maps.Marker({
                position: markerData.position,
                map: this.map,
                title: markerData.address,
                //animation: google.maps.Animation.DROP,
                label: labels[i % labels.length]
              });

              let markerPosition = markerData.position;

              // <editor-fold desc="Marker events"

              /**
               * Center to the marker and show info on click
               */
              marker.addListener('click', () => {
                let isWorking = this.shopIsWorking(shopOpensTime, shopClosesTime);
                if (this.prevInfoWindow) {
                  this.prevInfoWindow.close();
                }
                this.map.panTo(markerPosition);

                /*if (14 >= this.map.zoom) {
                  setTimeout(() => {
                    infoWindow.close();
                  }, 5000);
                }*/

                this.selectedMarker = {label: markerData.address, value: markerPosition};
                if (markerData.idCity !== this.selectedCity.id) {
                  this.selectedCity = {
                    id: this.cities[c].id,
                    name: this.cities[c].name
                  };
                  {
                    this.city = this.cities[c];
                    this.makeShopList();
                  }
                }
                this.changeDetector.detectChanges();
                this.prevInfoWindow = infoWindow;

                let content =
                  `<div style="font-size: 15px;">` +
                  `<p style="color: #ef4123; padding: 0; margin: 0; font-size: 16px; text-align: center"><b>Фокстрот</b></p>` +
                  `<p style="padding: 0; margin: 0; text-align: center">${shopRating > 0 ? `${rating}` : ''}</p>` +
                  `<p style="padding: 0; margin: 0;">${markerData.address}</p>` +
                  `<p style="padding: 0; margin: 0;">${workingHours}</p>` +
                  `<p style="color: ${(isWorking === this.open) ? 'green' : 'red'}; padding: 0; margin: 0;">${(isWorking) ? isWorking : '' }</p>` +
                  `<span id="revs" #revs style="color: darkblue; padding: 0; margin: 0;">${(reviews && (reviews.length > 0)) ? (this.reviewsStr + '<span style=""> (' + reviews.length + ')</span>') : this.writeReviewStr}</span>` +
                  `</div>`;

                if (infoWindow && (infoWindow !== null)) {
                  infoWindow.setContent(content);
                }

                /**
                 * Listen to infoWindow when it's ready and add listener to DOM element
                 */
                if (infoWindow && (infoWindow !== null)) {
                  google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
                    document.getElementById('revs').addEventListener('click', () => {
                      if (reviews && (reviews.length > 0)) {
                        this.onShowReviewsClick(reviews, markerData);
                      } else {
                        this.onWriteReviewClick(markerData);
                      }
                    });
                  });

                  infoWindow.open(this.map, marker);
                }
              });

              /**
               * Zoom to the marker on double click
               */
              marker.addListener('dblclick', () => {
                if (this.prevInfoWindow) {
                  this.prevInfoWindow.close();
                }
                this.prevInfoWindow = infoWindow;
                if (infoWindow && (infoWindow !== null)) {
                  infoWindow.open(this.map, marker);
                }
                this.map.panTo(markerPosition);
                this.map.setZoom(17);
                this.map.setCenter(markerPosition);
              });

              this.map.addListener('zoom_changed', () => {
                if (infoWindow && (infoWindow !== null)) {
                  infoWindow.close();
                }
              });

              // </editor-fold>
            }
          }
        }

        /**
         * Listener that shows map and loads localization
         */
        google.maps.event.addListenerOnce(this.map, 'idle', () => {
          mapEle.classList.add('show-map');
        });

        this.navFromFavoriteStoresPage();

        this.availableNavApps = await this.launchNavigator.availableApps().catch((err) => {
          console.log(`Couldn't get available navigation apps: ${err}`);
        });
      }
    } catch (err) {
      /*let alert = this.alertCtrl.create({
        title: this.locale['AlertTitle'] ? this.locale['AlertTitle'] : 'Что-то пошло не так',
        message: this.locale['AlertMessage'] ? this.locale['AlertMessage'] : 'Пожалуйста, проверьте соединение с сетью и попробуйте перезапустить приложение',
        buttons: [
          {
            text: 'OK',
            /!*handler: () => {
              this.nav.pop().catch((err) => console.log(`Couldn't pop: ${err}`))
            }*!/
          }
        ]
      });
      this.nav.pop().catch((err) => console.log(`Couldn't pop: ${err}`))
      alert.present().catch((err) => console.log(`Alert error: ${err}`));*/
      console.log(err);
    }
  }

  /**
   * Making list of shops
   */
  makeShopList() {
    for (let i = 0; i < this.cities.length; i++) {
      if (this.selectedCity.id === this.cities[i].id) {
        this.shopList = [];
        try {
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
        } catch (error) {
          console.log('View error: ' + error);
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
        this.map.panTo(this.markersArr[this.selectedCity.id.toString()][0].position);
        this.map.setZoom(10);
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
      this.map.setCenter(this.selectedMarker.value);
      this.map.setZoom(17);
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
        if (marker.position === this.selectedMarker.value) {
          if (this.isAuthorized === true) {
            try {
              this.userService.addFavoriteStoresId(marker.id);
            } catch (err) {
              console.log(`Error while adding to favorite: ${err}`);
              return;
            }
          }
        }
      }
    }
  }

  buildRoute() {
    if (this.userPosIsKnown === true && this.selectedMarker.value !== null) {
      this.calculateAndDisplayRoute(this.userPos, this.selectedMarker.value);
    } else {
      return;
    }
  }

  /**
   * Receive user's location
   * @returns {Promise<Geoposition>}
   */
  getLocation() {
    return this.geolocation.getCurrentPosition();
  }

  /**
   * Show route to the selected shop position
   * @param start
   * @param end
   */
  calculateAndDisplayRoute(start, end) {
    try {
      this.directionsService.route({
        origin: start,
        destination: end,
        provideRouteAlternatives: true,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
      }, (response, status) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
          // console.log('Duration: ' + (response.routes[0].legs[0].duration.value / 60).toFixed());
        } else {
          /**
           * When we can't determine user's location - use another navigator instead
           */
          this.useExternalNavigator(end);
          // window.alert('Directions request failed due to ' + status);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Open external navigator (by user's choice) with endpoint as parameter
   * @param endpoint
   */
  useExternalNavigator(endpoint) {
    this.platform.ready().then(() => {
      if (this.availableNavApps) {
        this.launchNavigator.navigate([endpoint.lat, endpoint.lng])
          .then(
            success => console.log('Launched navigator'),
            error => window.alert('Error launching navigator: ' + error)
          );
        this.launchNavigator.navigate([endpoint.lat, endpoint.lng],{
          app: this.launchNavigator.APP.USER_SELECT,
          transportMode: this.launchNavigator.TRANSPORT_MODE.WALKING,
          appSelection: {
            dialogHeaderText: 'some dialog header',
            cancelButtonText: 'cancel me',
            rememberChoice: {
              enabled: false,
              prompt: {
                headerText: 'some prompt header',
                bodyText: 'some prompt body',
                yesButtonText: 'go for it',
                noButtonText: 'please no'
              }
            }
          }
        })
          .then(success => console.log('Launched navigator'))
          .catch(error => console.error('Error launching navigator: ' + JSON.stringify(error, null, 2)));
      }
    });
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
      let store = this.navParams.get('store');
      let city = this.navParams.get('city');
      this.selectedCity = city;
      this.makeShopList();
      this.selectedMarker = {label: store.address, value: store.position};
      this.changeDetector.detectChanges();
      this.handleListSelect();
    }
  }

  onShowReviewsClick(reviews: StoreReview[], store: Store): void {
    this.nav.push('ItemReviewsPage', {reviews: reviews, store: store}).catch(err => {
      console.log(`Error navigating to ItemReviewPage: ${err}`);
    });
  }

  onWriteReviewClick(store: Store): void {
    if (store) {
      if (!this.userService.isAuth) {
        this.nav.push('LoginPage').catch((err) => {
          console.log(`Couldn't navigate to LoginPage: ${err}`);
        });
      } else {
        this.nav.push('ItemReviewWritePage', store).catch(err => {
          console.log(`Error navigating to ItemReviewWritePage: ${err}`);
        });
      }
    }
  }
}
