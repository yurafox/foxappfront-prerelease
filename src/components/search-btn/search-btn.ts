import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {NavController, NavParams} from 'ionic-angular';
import {SearchService} from '../../app/service/search-service';

@Component({
  selector: 'search-btn',
  templateUrl: 'search-btn.html'
})
export class SearchBtnComponent extends ComponentBase implements OnInit {

  @ViewChild('input') input;
  disabled = true;
  searchValue = '';
  public tmpSearchArray = new Array<string>();

  constructor(public searchService: SearchService) {
    super();
  }

  setFocus(): void {
    this.input.setFocus();
  }

  searchByText(seachString: string): void {
    this.searchService.addSearchItem(seachString);
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
    this.tmpSearchArray = this.searchService.searchItems.filter((value) => {
      return !(value.toLowerCase().indexOf(this.searchValue.toLowerCase()) == -1);
    });

  }

  removeSearchItem(index) {
    const str = this.tmpSearchArray[index];
    const i = this.tmpSearchArray.indexOf(str);
    if (!(i == -1))
      this.tmpSearchArray.splice(index, 1);
    this.searchService.removeSearchItem(str);
  }

  clearInput() {
    this.searchValue = '';
    this.incSearch();
  }

  ngOnInit() {
    this.initTmpSearchArray();

  }
}
