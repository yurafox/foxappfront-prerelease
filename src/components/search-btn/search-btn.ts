import { Component } from '@angular/core';

/**
 * Generated class for the SearchBtnComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'search-btn',
  templateUrl: 'search-btn.html'
})
export class SearchBtnComponent {

  text: string;

  constructor() {
    console.log('Hello SearchBtnComponent Component');
    this.text = 'Hello World';
  }

  searchByText(): void {
    console.log('Search by text');

  }

  searchByBarcode(): void {
    console.log('Search by barcode');
  }
}
