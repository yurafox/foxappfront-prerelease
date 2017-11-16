import {Component, ViewChild, ElementRef} from '@angular/core';

// Native GMap imports
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

import {Platform} from 'ionic-angular';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {City, MapMarker} from "../../app/model/index";
import {ComponentBase} from "../../components/component-extension/component-base";

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

  map: /*GoogleMap;*/ any;

  city: City;
  cities: Array<City>;
  selectedCity = 'Киев';
  selectedMarker: SelectItem;

  markersArr: Array<{ id: number, markers: MapMarker[] }>;
  shopList: SelectItem[];

  options: any;

  constructor(public platform: Platform, private googleMaps: GoogleMaps, private repo: AbstractDataRepository) {
    super();
    this.selectedMarker = null;
    this.shopList = [];
    this.markersArr = [];
  }

  async ionViewDidLoad() {
    this.markersArr = await this.repo.getFoxMapMarkers();
    this.cities = await this.repo.getCities();

    // await this.loadMap(); // for Ionic Native GMap

    this.options = {
      center: this.markersArr[22].markers[0].position,
      zoom: 10
    };

    let mapEle = this.mapElement.nativeElement;

    this.map = new google.maps.Map(mapEle, this.options);

    for (const city of this.cities) {
      if (city.name === this.selectedCity) {
        this.city = city;
      }
    }

    this.markersArr.forEach((markerArr) => {
      markerArr.markers.forEach((markerData) => {
        let infoWindow = new google.maps.InfoWindow({
          content: `<h5>${markerData.title}</h5>`
        });

        let marker = new google.maps.Marker({
          position: markerData.position,
          map: this.map,
          title: markerData.title
        });

        // center to the marker and show info on click
        marker.addListener('click', () => {
          infoWindow.open(this.map, marker);
          this.map.panTo(marker.getPosition());
          // this.selectedMarker.value = marker.getPosition();
          setTimeout(() => { infoWindow.close(); }, 5000);
        });

        // zoom to the marker on double click
        marker.addListener('dblclick', () => {
          infoWindow.open(this.map, marker);
          this.map.panTo(marker.getPosition());
          this.map.setZoom(17);
          this.map.setCenter(marker.getPosition());
        });
      })
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
    });

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
    console.log('changeMarkers');

    this.shopList = [];
    this.selectedMarker = null;

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
    if (this.selectedMarker !== null) {
      console.log('Route built to/from');
    }
  }
}
