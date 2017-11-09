import { Component } from '@angular/core';

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
