import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {NavController} from 'ionic-angular';
import {SearchService} from '../../app/service/search-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {PageMode} from '../../pages/home/home';

@Component({
  selector: 'search-btn',
  templateUrl: 'search-btn.html'
})
export class SearchBtnComponent extends ComponentBase implements OnInit {

  @ViewChild('input') input;

  @Input()
  public hostPage: any = null;

  searchValue = '';
  inputMode = false;

  public tmpSearchArray = [];
  constructor(public searchService: SearchService,
              public navCtrl: NavController,
              private barcodeScanner: BarcodeScanner,
              private srchService: SearchService) {
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

  async searchByText(searchString: string) {
    console.log('searchByText');
    if (searchString) {
      this.searchValue = searchString;
      //if (!this.disabled) {
        (<any>this.hostPage).pageMode = PageMode.SearchResultsMode;
        this.hostPage.baseProducts = null;
        this.inputMode = false;
        this.hostPage.baseProducts = await this.srchService.searchProducts(searchString);
      //};
    }
  }

  searchByBarcode(): void {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.searchValue = barcodeData.text;
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
    this.inputMode = true;
    this.hostPage.mode = PageMode.SearchMode;
    if (this.searchValue) {
      this.tmpSearchArray = this.searchService.searchItems.filter((value) => {
        return !(value.toLowerCase().indexOf(this.searchValue.toLowerCase()) == -1);
      })}
    else
      this.tmpSearchArray = this.searchService.searchItems;
  }

  onKeyUp(event) {
    if (!(event.keyCode === 13))
      this.incSearch();
  }

  removeSearchItem(item: string) {
    const i = this.tmpSearchArray.indexOf(item);
    if (!(i == -1))
      this.tmpSearchArray.splice(i, 1);
    this.searchService.removeSearchItem(item);
  }

  clearInput(event) {
    if (event)
      event.stopPropagation();
    this.searchService.lastSearch = '';
    this.incSearch();
    this.hostPage.pageMode = PageMode.HomeMode;
    this.inputMode = false;
  }

  ngOnInit() {
    this.initTmpSearchArray();
    this.searchValue = this.searchService.lastSearch;
  }
}
