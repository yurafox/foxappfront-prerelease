import {Component, ViewChild, ElementRef} from '@angular/core';

// Native GMap imports
/*import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';*/

import {Platform} from 'ionic-angular';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {MapMarker} from "../../app/model/index";
import {ComponentBase} from "../../components/component-extension/component-base";

declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage extends ComponentBase {

  @ViewChild('mapCanvas') mapElement: ElementRef;

  // map: GoogleMap;

  markersArr: Array<{ id: number, markers: MapMarker[] }>;

  options: any;

  constructor(public platform: Platform, /*private googleMaps: GoogleMaps,*/ private repo: AbstractDataRepository) {
    super();
  }

  async ionViewDidLoad() {
    // this.loadMap(); // for Ionic Native GMap

    this.markersArr = await this.repo.getFoxMapMarkers();

    this.options = {
      center: this.markersArr[22].markers[0].position,
      zoom: 10
    };

    let mapEle = this.mapElement.nativeElement;

    let map = new google.maps.Map(mapEle, this.options);

    this.markersArr.forEach((markerArr) => {
      markerArr.markers.forEach((markerData) => {
        let infoWindow = new google.maps.InfoWindow({
          content: `<h5>${markerData.title}</h5>`
        });

        let marker = new google.maps.Marker({
          position: markerData.position,
          map: map,
          title: markerData.title
        });

        // center to the marker and show info on click
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
          map.panTo(marker.getPosition());
          setTimeout(() => { infoWindow.close(); }, 5000);
        });

        // zoom to the marker on double click
        marker.addListener('dblclick', () => {
          infoWindow.open(map, marker);
          map.panTo(marker.getPosition());
          map.setZoom(17);
          map.setCenter(marker.getPosition());
        });
      })
    });

    google.maps.event.addListenerOnce(map, 'idle', () => {
      mapEle.classList.add('show-map');
    });
  }

  // Ionic Native GMap
  /*loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: 43.0741904,
            lng: -89.3809802
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }*/
}
