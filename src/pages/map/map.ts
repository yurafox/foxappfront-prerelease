import {Component, ViewChild, ElementRef} from '@angular/core';
import {Platform} from 'ionic-angular';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {LatLng} from '@ionic-native/google-maps';
import {City, MapMarker} from "../../app/model/index";
import {ComponentBase} from "../../components/component-extension/component-base";
import {Geolocation} from '@ionic-native/geolocation';
// import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {StatusBar} from "@ionic-native/status-bar";
import {LaunchNavigator, LaunchNavigatorOptions} from "@ionic-native/launch-navigator";

declare var google: any;

interface SelectItem {
  label: string;
  value: any;
}

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage extends ComponentBase {

  @ViewChild('mapCanvas') mapElement: ElementRef;

  // Page sizes
  /*headerHeight: number; // Height of header on map page
  footerHeight: number; // Height of footer on map page
  windowHeight: number;
  windowWidth: number;
  height: number;       // Dynamical height of the map
  // width: number;        // Dynamical width of the map*/

  map: /*GoogleMap;*/ any;
  city: City;
  cities: Array<City>;
  selectedCity = 'Киев';
  selectedMarker: LatLng;
  markersArr: Array<{ id: number, markers: MapMarker[] }>;
  shopList: SelectItem[];
  options: any;
  userPos: LatLng;
  userPosIsKnown: boolean;
  // Setting up direction service
  directionsService: any;
  directionsDisplay: any;

  // Screen orientation constants
  /*portrait = this.screenOrientation.ORIENTATIONS.PORTRAIT;
  portraitPrimary = this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY;
  portraitSecondary = this.screenOrientation.ORIENTATIONS.PORTRAIT_SECONDARY;
  landscape = this.screenOrientation.ORIENTATIONS.LANDSCAPE;
  landscapePrimary = this.screenOrientation.ORIENTATIONS.LANDSCAPE_PRIMARY;
  landscapeSecondary = this.screenOrientation.ORIENTATIONS.LANDSCAPE_SECONDARY;*/

  // launchNavigatorOptions: LaunchNavigatorOptions;

  constructor(public platform: Platform, private repo: AbstractDataRepository, private geolocation: Geolocation,
              /*private screenOrientation: ScreenOrientation,*/ private statusBar: StatusBar,
              private launchNavigator: LaunchNavigator) {
    super();
    this.selectedMarker = null;
    this.shopList = [];
    this.markersArr = [];

    // Set up window sizes for map
    /*this.headerHeight = 120;
    this.footerHeight = 45;
    if (this.screenOrientation.type === this.portrait ||
      this.screenOrientation.type === this.portraitPrimary ||
      this.screenOrientation.type === this.portraitSecondary) {

      this.windowHeight = this.platform.height() - this.headerHeight;
      this.windowWidth = this.platform.width();
      this.height = this.windowHeight;

    } else if (this.screenOrientation.type === this.landscape ||
      this.screenOrientation.type === this.landscapePrimary ||
      this.screenOrientation.type === this.landscapeSecondary) {

      this.windowHeight = this.platform.width() - this.headerHeight;
      this.windowWidth = this.platform.height();
      this.height = this.windowWidth - this.headerHeight;

    }*/

    this.userPos = new LatLng(0, 0);

    platform.ready().then(() => {
      this.getLocation().then(res => {
        this.userPos.lat = res.coords.latitude;
        this.userPos.lng = res.coords.longitude;
        this.userPosIsKnown = true;
      }).catch(err => {
        // console.log('Error while getting user\'s location ' + err);
        this.userPosIsKnown = false;
      });
    });

    // Subscribing on screen orientation change
    /*this.screenOrientation.onChange().subscribe(
      () => {
        // this.windowHeight = this.platform.width() - this.headerHeight;
        // this.windowWidth = this.platform.height();
        if (this.screenOrientation.type === this.portrait ||
          this.screenOrientation.type === this.portraitPrimary ||
          this.screenOrientation.type === this.portraitSecondary) {
          if (this.selectedMarker !== null) {
            this.height = this.windowHeight - this.footerHeight;
          } else {
            this.height = this.windowHeight;
          }
        } else if (this.screenOrientation.type === this.landscape ||
          this.screenOrientation.type === this.landscapePrimary ||
          this.screenOrientation.type === this.landscapeSecondary) {
          if (this.selectedMarker !== null) {
            this.height = this.windowWidth - this.headerHeight - this.footerHeight;
          } else {
            this.height = this.windowWidth - this.headerHeight;
          }
        }
      }
    );*/
  }

  async ionViewDidLoad() {
    // await this.loadMap(); // For Ionic Native GMap

    this.markersArr = await this.repo.getFoxMapMarkers();
    this.cities = await this.repo.getCities();

    // 22 is array index of 'Киев' in cities. Index, not id
    if (this.userPos !== null && this.userPos.lat !== 0 && this.userPos.lng !== 0) {
      this.options = {
        center: this.userPos,
        zoom: 10
      };
    } else {
      this.options = {
        center: this.markersArr[22].markers[0].position,
        zoom: 10
      };
    }
    let mapEle = this.mapElement.nativeElement;
    this.map = new google.maps.Map(mapEle, this.options);

    // Direction Service
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      polylineOptions: {
        strokeColor: 'orangered'
      }
    });

    for (const city of this.cities) {
      if (city.name === this.selectedCity) {
        this.city = city;
      }
    }

    try {
      this.directionsDisplay.setMap(this.map);
    } catch (err) {
      console.log(err);
    }

    // Iterating through all shops positions
    await this.markersArr.forEach((markerArr) => {
      markerArr.markers.forEach((markerData, i) => {
        let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        let shopOpensTime = markerData.openTime;
        let shopClosesTime = markerData.closeTime;
        // let isWorking = this.shopIsWorking(shopOpensTime, shopClosesTime);

        let infoWindow = new google.maps.InfoWindow({
          content: `<h5>Фокстрот</h5>` +
          `<h6>${markerData.title}</h6>` +
          `<p>Время работы: ${shopOpensTime} - ${shopClosesTime}</p>` +
          `<p>${this.shopIsWorking(shopOpensTime, shopClosesTime)}</p>`
        });

        let marker = new google.maps.Marker({
          position: markerData.position,
          map: this.map,
          title: markerData.title,
          animation: google.maps.Animation.DROP,
          label: labels[i % labels.length]
        });

        let markerPosition = marker.getPosition();

        // <editor-fold desc="Marker events"

        // center to the marker and show info on click
        marker.addListener('click', () => {
          infoWindow.open(this.map, marker);
          this.map.panTo(markerPosition);
          if (14 >= this.map.zoom) {
            setTimeout(() => {
              infoWindow.close();
            }, 5000);
          }
        });

        // zoom to the marker on double click
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

    // Making list of shops addresses
    for (let i = 0; i < this.cities.length; i++) {
      if (this.selectedCity === this.cities[i].name) {
        try {
          for (let j = 0; j < this.markersArr[i].markers.length; j++) {
            try {
              this.shopList.push({
                label: this.markersArr[i].markers[j].title,
                value: this.markersArr[i].markers[j].position
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

  // Ionic Native GMap
  /*loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: this.markersArr[22].markers[0].position,
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
          markerArr.markers.forEach((markerData) => {
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

  // Updating markers every time city changes
  changeMarkers() {
    this.shopList = [];
    this.selectedMarker = null;
    //this.height = this.windowHeight;
    // Screen orientation
    /*if (this.screenOrientation.type === this.portrait ||
      this.screenOrientation.type === this.portraitPrimary ||
      this.screenOrientation.type === this.portraitSecondary) {
      this.height = this.windowHeight;
    } else if (this.screenOrientation.type === this.landscape ||
      this.screenOrientation.type === this.landscapePrimary ||
      this.screenOrientation.type === this.landscapeSecondary) {
      this.height = this.windowWidth - this.headerHeight;
    }*/

    for (const city of this.cities) {
      if (city.name === this.selectedCity) {
        this.city = city;
      }
    }

    for (let i = 0; i < this.cities.length; i++) {
      if (this.selectedCity === this.cities[i].name) {
        try {
          this.map.panTo(this.markersArr[this.city.id - 1].markers[0].position);
          this.map.setZoom(10);

          for (let j = 0; j < this.markersArr[i].markers.length; j++) {
            try {
              this.shopList.push({
                label: this.markersArr[i].markers[j].title,
                value: this.markersArr[i].markers[j].position
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

  // On list select
  handleListSelect() {
    if (this.selectedMarker !== null) {
      // this.height = this.windowHeight - this.footerHeight;
      // Screen orientation
      /*if (this.screenOrientation.type === this.portrait ||
        this.screenOrientation.type === this.portraitPrimary ||
        this.screenOrientation.type === this.portraitSecondary) {
        this.height = this.windowHeight - this.footerHeight;
      } else if (this.screenOrientation.type === this.landscape ||
        this.screenOrientation.type === this.landscapePrimary ||
        this.screenOrientation.type === this.landscapeSecondary) {
        this.height = this.windowWidth - this.headerHeight - this.footerHeight;
      }*/
      this.map.setCenter(this.selectedMarker);
      this.map.setZoom(17);
    } else {
      return;
    }
  }

  addToFavorite() {
    if (this.selectedMarker !== null) {
      console.log('Added to favorite');
    }
  }

  buildRoute() {
    if (this.userPosIsKnown === true && this.selectedMarker !== null) {
      this.calculateAndDisplayRoute(this.userPos, this.selectedMarker);
    } else {
      return;
    }
  }

  getLocation() {
    return this.geolocation.getCurrentPosition();
  }

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
          // When we can't determine user's location - use another navigator instead
          this.useExternalNavigator(end);
          // window.alert('Directions request failed due to ' + status);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  useExternalNavigator(endpoint) {
    this.platform.ready().then(() => {
      this.launchNavigator.navigate([endpoint.lat, endpoint.lng], {app: this.launchNavigator.APP.USER_SELECT})
        .then(
          success => console.log('Launched navigator'),
          error => window.alert('Error launching navigator: ' + error)
        );
    });
  }

// Checking either shop is working now or not
  // opensTime - time when shop opens
  // closesTime - time when shop closes
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
        return 'Работает';
      } else {
        return 'Не работает';
      }
    } else {
      console.log('wrong time input');
    }
  }
}
