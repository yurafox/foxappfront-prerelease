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

  constructor(public searchService: SearchService) {
    super();
  }

  setFocus(): void {
    this.input.setFocus();
  }

  searchByText(seachString: string): void {
    this.searchService.addSearchItem(seachString);
    console.log(seachString);

  }

  searchByBarcode(): void {
    console.log('Search by barcode');
  }

  ngOnInit() {

  }
}
