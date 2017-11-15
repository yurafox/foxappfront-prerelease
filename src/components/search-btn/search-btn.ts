import {Component, Input, ViewChild} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'search-btn',
  templateUrl: 'search-btn.html'
})
export class SearchBtnComponent extends ComponentBase  {

  disabled = true;

  @ViewChild('input') input;

  constructor() {
    super();
  }

  setFocus(): void {
    this.input.setFocus();
  }

  searchByText(): void {
    console.log('Search by text');

  }

  searchByBarcode(): void {
    console.log('Search by barcode');
  }
}
