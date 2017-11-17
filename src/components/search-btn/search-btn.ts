import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {NavController, NavParams} from 'ionic-angular';
import {SearchService} from '../../app/service/search-service';
import {SearchResultsPage} from '../../pages/search-results/search-results';

@Component({
  selector: 'search-btn',
  templateUrl: 'search-btn.html'
})
export class SearchBtnComponent extends ComponentBase implements OnInit {

  @ViewChild('input') input;
  disabled = true;
  searchValue = '';
  public tmpSearchArray = new Array<string>();

  constructor(public searchService: SearchService, public navCtrl: NavController) {
    super();
    searchService.searchStringUpdated.subscribe(
      (value:string) => {
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
      this.searchService.addSearchItem(searchString);
      this.navCtrl.push(SearchResultsPage, this.searchService.searchProducts());
    }
  }

  searchByBarcode(): void {
    console.log('Search by barcode');
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

  removeSearchItem(item) {
    const i = this.tmpSearchArray.indexOf(item);
    if (!(i == -1))
      this.tmpSearchArray.splice(i, 1);
    this.searchService.removeSearchItem(item);
  }

  clearInput() {
    this.searchService.lastSearch = '';
    this.searchService.searchStringUpdated.emit('');
    this.incSearch();
  }

  ngOnInit() {
    this.initTmpSearchArray();
    this.searchValue = this.searchService.lastSearch;
  }
}
