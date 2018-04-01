import {Component, Input, Renderer} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {NavController} from 'ionic-angular';
import {SearchService} from '../../app/service/search-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {PageMode} from '../../pages/home/home';


@Component({
  selector: 'search-btn',
  templateUrl: 'search-btn.html'
})
export class SearchBtnComponent extends ComponentBase {

  @Input()
  public hostPage: any = null;

  public tmpSearchArray = [];
  searchValue = null;
  inputMode = false;


  constructor(public searchService: SearchService,
              public navCtrl: NavController,
              private barcodeScanner: BarcodeScanner,
              private srchService: SearchService, private renderer: Renderer) {
    super();

    searchService.lastSearchStringUpdated.subscribe(
      (value: string) => {
        this.searchValue = value;
      }
    );

    this.initTmpSearchArray();

  }

  ngOnInit() {
    super.ngOnInit();
  }

  async searchByText(searchString: string) {
    if (searchString) {
      this.searchValue = searchString;
      this.srchService.products = [];
      this.srchService.searchProducts(searchString, this.hostPage);
      (<any>this.hostPage).pageMode = PageMode.SearchResultsMode;
      this.inputMode = false;
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
    this.searchValue = this.searchService.lastSearch;
  }

  incSearch() {
    this.hostPage.pageMode = PageMode.SearchMode;
    if (this.searchValue) {
      this.tmpSearchArray = this.searchService.searchItems.filter((value) => {
        return !(value.toLowerCase().indexOf(this.searchValue.toLowerCase()) == -1);
      }).slice()}
    else
      this.tmpSearchArray = this.searchService.searchItems;
  }


  onKeyUp(event) {
    if (!(event.keyCode === 13))
      this.incSearch()
    else
      this.renderer.invokeElementMethod(event.target, 'blur');
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

}
