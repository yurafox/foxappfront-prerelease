import {Component, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AbstractDataRepository } from '../../app/service/repository/abstract/abstract-data-repository';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  //CameraPosition,
  MarkerOptions,
  //Marker,
  LatLng,
  //MarkerCluster,
  //MarkerClusterOptions,
  HtmlInfoWindow
} from '@ionic-native/google-maps';
import { City, Store } from "../../app/model/index";
import { ComponentBase } from "../../components/component-extension/component-base";
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from "@ionic-native/launch-navigator";
import { FavoriteStoresPage } from "../favorite-stores/favorite-stores";
import { StoreReview } from "../../app/model/store-review";

declare var google: any;

interface SelectItem {
  label: string;
  value: any;
}

@IonicPage({ name: 'MapPage', segment: 'map' })
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage extends ComponentBase implements OnInit, OnDestroy {

  previousPage: string;

  map: GoogleMap;
  //prevInfoWindow: HtmlInfoWindow;
  city: City;
  defaultCityId: number;  // Used to set position when map just opened and user's location is unknown.
  cities: Array<City>;
  selectedCity: City = { id: 0, name: ' ' };
  selectedMarker: SelectItem;
  markersArr: Array<{ id: number, stores: Store[] }>;
  shopList: Array<SelectItem>;
  options: GoogleMapOptions;
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
    private alertCtrl: AlertController, private googleMaps: GoogleMaps) {
    super();
    this.defaultCityId = 0;
    this.shopList = [{ label: '', value: null }];
    this.markersArr = [];
    this.cities = [{ id: 0, name: '' }];
    this.selectedMarker = { label: '', value: null };
    this.userPos = new LatLng(0, 0);
    this.open = ''/*'Open'*/;
    this.close = ''/*'Closed'*/;
    this.openHoursStr = ''/*'Open hours'*/;
    this.reviewsStr = ''/*'Reviews'*/;
    this.writeReviewStr = ''/*'Write review'*/;
    this.dropDownCityOpts = { popupClass: 'f-middle-dictionary', buttonClass: 'f-drop-button-full', popupHeader: '', buttonHeader: '' };
    this.dropDownAddressOpts = { popupClass: 'f-large-dictionary', buttonClass: 'f-drop-button-full', popupHeader: '', buttonHeader: '' };
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
      }).catch(() => {
        // console.log(`Error while getting user's location ${err}`);
        this.userPosIsKnown = false;
      });
    });
  }

  async ngOnInit() {
    super.ngOnInit();
    if (this.userService.isAuth) {
      this.isAuthorized = true;
    }

    [this.markersArr, this.cities] = await Promise.all([this.repo.getStores(), this.repo.getCities()]);

    this.open = this.locale['Open'];
    this.close = this.locale['Closed'];
    this.openHoursStr = this.locale['OpenHours'];
    this.reviewsStr = this.locale['Reviews'];
    this.writeReviewStr = this.locale['WriteReview'];
    this.dropDownCityOpts = { popupClass: 'f-middle-dictionary', buttonClass: 'f-drop-button-full', popupHeader: this.locale['City'], buttonHeader: this.locale['City'] };
    this.dropDownAddressOpts = { popupClass: 'f-large-dictionary', buttonClass: 'f-drop-button-full', popupHeader: this.locale['Address'], buttonHeader: this.locale['Address'] };

    await this.loadMap();

    /*try {
      this.changeDetector.detectChanges();
    } catch (err) {
      console.log(`Couldn't detect changes: ${err}`);
    }*/
  }
  ngOnDestroy() {

  }

  loadMap() {
    try {
      /**
       * Set defaultCityId to id of the city with name 'Киев'/'Київ'/'Kiev'/'Kyiv'
       */
      this.cities.forEach((city) => {
        if (city.name === 'Киев' || city.name === 'Київ' || city.name === 'Kiev' || city.name === 'Kyiv') {
          this.defaultCityId = city.id;
        }
      });

      if (this.userPosIsKnown === true) {
        this.options = {
          controls: {
            compass: false,
            myLocationButton: false,
            mapToolbar: false,
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
            compass: false,
            myLocationButton: false,
            mapToolbar: false,
            zoom: false,
          },
          gestures: {
            scroll: true,
            tilt: false,
            zoom: true,
            rotate: true,
          },
          camera: {
            target: this.markersArr[this.defaultCityId - 1].stores[0].position,
            zoom: 10
          },
        };
      }

      this.makeShopList();

      this.map = this.googleMaps.create('map_canvas', this.options);

      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        /**
         * Direction Service
         * @type {google.maps.DirectionsService}
         */
        //this.directionsService = new google.maps.DirectionsService;
        //this.directionsDisplay = new google.maps.DirectionsRenderer;

        for (const city of this.cities) {
          if (city.name === this.selectedCity.name) {
            this.city = city;
          }
        }

        try {
          //this.directionsDisplay.setMap(this.map);
        } catch (err) {
          console.log(err);
        }

        let htmlInfoWnd = new HtmlInfoWindow();
        /**
         * Iterating through all stores positions. Setting up info windows and marker event listeners
         */
        for (let i = 0; i < this.markersArr.length; i++) {
          let markerArr = this.markersArr[i];
          for (let j = 0; j < markerArr.stores.length; j++) {
            let markerData = markerArr.stores[j];

            let marker: MarkerOptions = {
              position: markerData.position,
              draggable: false,
              flat: false,
              visible: true,
              disableAutoPan: false
            };

            let markerPosition = marker.position;

            // <editor-fold desc="Marker events"

            // Native
            this.map.addMarker(marker).then((m: MarkerOptions) => {
              let reviews: StoreReview[] = [];
              let reviewsArr = this.repo.getStoreReviewsByStoreId(markerData.id);
              reviewsArr.then(reviews => {
                for (let i = 0; i < reviews.length; i++) {
                  if (reviews[i].idStore === markerData.id) {
                    reviews.push(reviews[i]);
                  }
                }
              });

              let shopOpensTime = markerData.openTime;
              let shopClosesTime = markerData.closeTime;
              let shopRating = markerData.rating;
              let rating = '';
              for (let i = 0; i < shopRating; i++) {
                rating += '<span class="fa fa-star checked"></span>';
              }

              let isWorking = this.shopIsWorking(shopOpensTime, shopClosesTime);

              let html =
                `<div style="font-size: 15px;">` +
                `<p style="color: #ef4123; padding: 0; margin: 0; font-size: 16px; text-align: center"><b>Фокстрот</b></p>` +
                `<p style="padding: 0; margin: 0; text-align: center">${shopRating > 0 ? `${rating}` : ''}</p>` +
                `<p style="padding: 0; margin: 0;">${marker.address}</p>` +
                `<p style="padding: 0; margin: 0;">${this.openHoursStr}:  ${shopOpensTime} - ${shopClosesTime}</p>` +
                `<p style="color: ${(isWorking === this.open) ? 'green' : 'red'}; padding: 0; margin: 0;">${(isWorking) ? isWorking : ''}</p>` +
                `<span id="revs" #revs style="color: darkblue; padding: 0; margin: 0;">${(reviews && (reviews.length > 0)) ? (this.reviewsStr + '<span style=""> (' + reviews.length + ')</span>') : this.writeReviewStr}</span>` +
                `</div>`;
              htmlInfoWnd.setContent(html);
              m.title = html;
              /* document.getElementById('revs').addEventListener('click', () => {
                if (reviews && (reviews.length > 0)) {
                  this.onShowReviewsClick(reviews, markerData);
                } else {
                  this.onWriteReviewClick(markerData);
                }
              }); */

              /**
               * Center to the marker and show info on click
               */
              /*m.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {

                if (this.prevInfoWindow) {
                  this.prevInfoWindow.close();
                }

                this.selectedMarker = { label: markerData.address, value: markerPosition };
                if (markerArr.id !== this.selectedCity.id) {
                  this.selectedCity = { id: this.cities[markerArr.id - 1].id, name: this.cities[markerArr.id - 1].name };
                  {
                    for (const city of this.cities) {
                      if (city.name === this.selectedCity.name) {
                        this.city = city;
                      }
                    }
                    this.makeShopList();
                  }
                }
                //this.changeDetector.detectChanges();
                this.prevInfoWindow = htmlInfoWnd;

                htmlInfoWnd.open(marker);
              });

              m.on(GoogleMapsEvent.CAMERA_MOVE).subscribe(() => {
                htmlInfoWnd.close();
              });

              m.on(GoogleMapsEvent.INFO_CLICK).subscribe(() => {
                this.map.setCameraTarget(markerPosition);
                this.map.setCameraZoom(17);
              });*/

            });

            // </editor-fold>
          }
        }
        this.navFromFavoriteStoresPage();
      });

      this.launchNavigator.availableApps().then((avApps) => { this.availableNavApps = avApps }).catch((err) => {
        console.log(`Couldn't get available navigation apps: ${err}`);
      });
    } catch (err) {
      let alert = this.alertCtrl.create({
        title: 'Something wrong with map',
        message: 'Please, check your internet connection and restart the app.',
        buttons: [
          {
            text: 'OK',
            handler: () => { this.nav.pop().catch((err) => console.log(`Couldn't pop: ${err}`)) }
          }
        ]
      });
      alert.present().catch((err) => console.log(`Alert error: ${err}`));
    }
  }

  /**
   * Making list of shops
   */
  makeShopList() {
    for (let i = 0; i < this.cities.length; i++) {
      if (this.selectedCity.name === this.cities[i].name) {
        this.shopList = [];
        try {
          for (let j = 0; j < this.markersArr[i].stores.length; j++) {
            try {
              this.shopList.push({
                label: this.markersArr[i].stores[j].address,
                value: this.markersArr[i].stores[j].position
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
    this.shopList = [];
    this.selectedMarker = { label: '', value: null };

    for (const city of this.cities) {
      if (city.name === this.selectedCity.name) {
        this.city = city;
      }
    }

    for (let i = 0; i < this.cities.length; i++) {
      if (this.selectedCity.name === this.cities[i].name) {
        try {
          this.map.setCameraTarget(this.markersArr[this.city.id - 1].stores[0].position);
          this.map.setCameraZoom(10);

          for (let j = 0; j < this.markersArr[i].stores.length; j++) {
            try {
              this.shopList.push({
                label: this.markersArr[i].stores[j].address,
                value: this.markersArr[i].stores[j].position
              });
            } catch (error) {
              console.log('In-changeMarkers shops push error: ' + error);
            }
          }
        } catch (error) {
          console.log('Markers change error: ' + error);
        }
      }
    }
  }

  /**
   * Actions on list select
   */
  handleListSelect() {
    if (this.selectedMarker.value !== null) {
      this.map.setCameraTarget(this.selectedMarker.value);
      this.map.setCameraZoom(17);
    } else {
      return;
    }
  }

  /**
   * Adding shop address to favorite
   */
  addToFavorite() {
    if (this.selectedMarker.value !== null) {
      for (let markerArr of this.markersArr) {
        for (let store of markerArr.stores) {
          if (store.address === this.selectedMarker.label) {
            if (this.isAuthorized === true) {
              try {
                this.userService.addFavoriteStoresId(store.id);
              } catch (err) {
                console.log(`Error while adding to favorite: ${err}`);
                return;
              }
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
        this.launchNavigator.navigate([endpoint.lat, endpoint.lng], {
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
      this.selectedMarker = { label: store.address, value: store.position };
      this.changeDetector.detectChanges();
      this.handleListSelect();
    }
  }

  onShowReviewsClick(reviews: StoreReview[], store: Store): void {
    this.nav.push('ItemReviewsPage', { reviews: reviews, store: store }).catch(err => {
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
