import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {SearchService} from '../../app/service/search-service';
import {SearchResultsPage} from '../../pages/search-results/search-results';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'search-btn',
  templateUrl: 'search-btn.html'
})
export class SearchBtnComponent extends ComponentBase implements OnInit {

  @ViewChild('input') input;
  disabled = true;
  searchValue = '';
  public tmpSearchArray = new Array<string>();
  //barcodeResult: string;
  //showFlipCameraButton = true;

  constructor(public searchService: SearchService,
               public navCtrl: NavController,
               private barcodeScanner: BarcodeScanner,
                private alertCtrl: AlertController) {
    super();
    searchService.lastSearchStringUpdated.subscribe(
      (value: string) => {
        this.searchValue = value;
      }
    );
  }

  setFocus(): void {
    this.input.setFocus();
  }

  searchByText(searchString: string): void {
    if (searchString) {
      this.searchValue = searchString;
      if (!this.disabled)
        this.navCtrl.push(SearchResultsPage, this.searchService.searchProducts(searchString));
    }
  }

  searchByBarcode(): void {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.disabled = false;
      this.searchValue = barcodeData.text;
/*
      let alert = this.alertCtrl.create({
        title: 'Barcode result',
        subTitle: barcodeData.text,
        buttons: ['OK']
      });
      alert.present();

*/
      this.incSearch();
      this.searchByText(this.searchValue);
    }, (err) => {
      console.log('An error while scanning barcode occurred: ' + err);
    });
  }

  initTmpSearchArray (): void {
    let ar = this.searchService.searchItems;
    ar.forEach((item) => {
      this.tmpSearchArray.push(item);
    });
  }

  incSearch() {
    if (this.searchValue) {
      this.tmpSearchArray = this.searchService.searchItems.filter((value) => {
        return !(value.toLowerCase().indexOf(this.searchValue.toLowerCase()) == -1);
      })}
    else
      this.tmpSearchArray = this.searchService.searchItems;
  }

  removeSearchItem(item: string) {
    const i = this.tmpSearchArray.indexOf(item);
    if (!(i == -1))
      this.tmpSearchArray.splice(i, 1);
    this.searchService.removeSearchItem(item);
  }

  clearInput() {
    this.searchService.lastSearch = '';
    this.incSearch();
  }

  ngOnInit() {
    this.initTmpSearchArray();
    this.searchValue = this.searchService.lastSearch;
  }
}
