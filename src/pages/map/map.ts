import {Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef} from '@angular/core';
import {Platform, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {LatLng} from '@ionic-native/google-maps';
import {City, Store} from "../../app/model/index";
import {ComponentBase} from "../../components/component-extension/component-base";
import {Geolocation} from '@ionic-native/geolocation';
import {StatusBar} from "@ionic-native/status-bar";
import {LaunchNavigator/*, LaunchNavigatorOptions*/} from "@ionic-native/launch-navigator";
import {FavoriteStoresPage} from "../favorite-stores/favorite-stores";

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
  city: City;
  defaultCityId: number;  // Used to set position when map just opened and user's location is unknown.
  cities: Array<City>;
  selectedCity: City  = {id: 0, name: ' '};
  selectedMarker: SelectItem;
  markersArr: Array<{ id: number, stores: Store[] }>;
  shopList: Array<SelectItem>;
  options: any;
  userPos: LatLng;
  userPosIsKnown: boolean;
  // Setting up direction service
  directionsService: any;
  directionsDisplay: any;

  constructor(private nav: NavController, private navParams: NavParams, private platform: Platform,
              private repo: AbstractDataRepository, private geolocation: Geolocation, private statusBar: StatusBar,
              private launchNavigator: LaunchNavigator, private changeDetector: ChangeDetectorRef) {
    super();
    this.defaultCityId = 0;
    this.shopList = [{label: '', value: null}];
    this.markersArr = [];
    this.cities = [{id: 0, name: ''}];
    this.selectedMarker = {label: '', value: null};
    this.userPos = new LatLng(0, 0);

    try {
      this.previousPage = this.nav.last().id;
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
    super.ngOnInit();
    try {
      [this.markersArr, this.cities] = await Promise.all([this.repo.getFoxStores(), this.repo.getCities()]);

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
          center: this.userPos,
          zoom: 10,
          disableDefaultUI: true
        };
      } else {
        this.options = {
          center: this.markersArr[this.defaultCityId - 1].stores[0].position,
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

      for (const city of this.cities) {
        if (city.name === this.selectedCity.name) {
          this.city = city;
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
      await this.markersArr.forEach((markerArr) => {
        markerArr.stores.forEach((markerData, i) => {
          let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

          let shopOpensTime = markerData.openTime;
          let shopClosesTime = markerData.closeTime;
          const shopRating = markerData.rating;
          let hidden = '';
          if (!markerData.rating || 0 >= markerData.rating) {
            hidden = 'hidden';
          }

          let infoWindow = new google.maps.InfoWindow({
            content: `<h6 style="color: #ef4123;">Фокстрот</h6>`+
            `<p>${shopRating > 0 ? ('Рейтинг:  ' + shopRating) : ''}</p>`+
            `<p>${markerData.address}</p>`+
            `<p>Години роботи: ${shopOpensTime} - ${shopClosesTime}</p>`+
            `<p style="color: ${(this.shopIsWorking(shopOpensTime, shopClosesTime) === 'Open') ? 'green' : 'red'}">${this.shopIsWorking(shopOpensTime, shopClosesTime)}</p>`
          });

          let marker = new google.maps.Marker({
            position: markerData.position,
            map: this.map,
            title: markerData.address,
            animation: google.maps.Animation.DROP,
            label: labels[i % labels.length]
          });

          let markerPosition = marker.getPosition();

          // <editor-fold desc="Marker events"

          /**
           * Center to the marker and show info on click
           */
          marker.addListener('click', () => {

            this.map.panTo(markerPosition);
            if (14 >= this.map.zoom) {
              setTimeout(() => {
                infoWindow.close();
              }, 5000);
            }
            this.selectedMarker = {label: markerData.address, value: markerPosition};
            if (markerArr.id !== this.selectedCity.id) {
              this.selectedCity = {id: this.cities[markerArr.id - 1].id, name: this.cities[markerArr.id - 1].name};
              {
                for (const city of this.cities) {
                  if (city.name === this.selectedCity.name) {
                    this.city = city;
                  }
                }
                this.makeShopList();
              }
            }
            // this.changeDetector.markForCheck();
            this.changeDetector.detectChanges();
            infoWindow.open(this.map, marker);
          });

          /**
           * Zoom to the marker on double click
           */
          marker.addListener('dblclick', () => {
            infoWindow.open(this.map, marker);
            this.map.panTo(markerPosition);
            this.map.setZoom(17);
            this.map.setCenter(markerPosition);
          });

          this.map.addListener('zoom_changed', () => {
            infoWindow.close();
          });

          // </editor-fold>
        });
      });

      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        mapEle.classList.add('show-map');
      });

      this.navFromFavoriteStoresPage();
    } catch(err) {
      window.alert('Error occurred: ' + err);
    }
  }

  async ionViewDidLoad() {
    // await this.loadMap(); // For Ionic Native GMap
  }

  /**
   * Ionic Native GMap
   */
  /*loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: this.markersArr[22].stores[0].position,
        zoom: 10,
        tilt: 90
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        // Set true if you want to show the MyLocation button
        this.map.setMyLocationEnabled(true);

        this.markersArr.forEach((markerArr) => {
          markerArr.stores.forEach((markerData) => {
            // Now you can use all methods safely.
            this.map.addMarker({
              title: markerData.title,
              icon: 'blue',
              animation: 'DROP',
              position: markerData.position
            })
              .then(marker => {
                marker.on(GoogleMapsEvent.MARKER_CLICK)
                  .subscribe(() => {
                    alert('clicked');
                    // Set camera center
                    this.map.setCameraTarget(markerData.position);
                    // Set camera zoom
                    this.map.setCameraZoom(17);
                    // Animate camera to move to selected position
                    this.map.animateCamera(markerData.position).catch((err) => console.log(err));
                  });
              });
          });
        });

      });
  }*/

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
    this.selectedMarker = {label: '', value: null};

    for (const city of this.cities) {
      if (city.name === this.selectedCity.name) {
        this.city = city;
      }
    }

    for (let i = 0; i < this.cities.length; i++) {
      if (this.selectedCity.name === this.cities[i].name) {
        try {
          this.map.panTo(this.markersArr[this.city.id - 1].stores[0].position);
          this.map.setZoom(10);

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
      for (let markerArr of this.markersArr) {
        for (let store of markerArr.stores) {
          if (store.address === this.selectedMarker.label) {
            try {
              this.userService.addFavoriteStoresId(store.id);
            } catch(err) {
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
      this.launchNavigator.navigate([endpoint.lat, endpoint.lng], {app: this.launchNavigator.APP.USER_SELECT})
        .then(
          success => console.log('Launched navigator'),
          error => window.alert('Error launching navigator: ' + error)
        );
    });
  }

  /**
   * Checking either shop is working now or not
   * @param opensTime   - time when shop opens
   * @param closesTime  - time when shop closes
   * @returns {string}
   */
  shopIsWorking(opensTime, closesTime) {
    const date = new Date();

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
        return 'Open';
      } else {
        return 'Closed';
      }
    } else {
      console.log('wrong time input');
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
      this.calculateAndDisplayRoute(this.userPos, store.position);
    }
  }
}
