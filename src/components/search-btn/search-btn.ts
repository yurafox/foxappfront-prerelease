import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'search-btn',
  templateUrl: 'search-btn.html'
})
export class SearchBtnComponent {

  text: string;
  barcodeResult: string;

  showFlipCameraButton = true;

  constructor(private barcodeScanner: BarcodeScanner) {
    console.log('Hello SearchBtnComponent Component');
    this.text = 'Hello World';
  }

  searchByText(): void {
    console.log('Search by text');

  }

  searchByBarcode(): void {
    console.log('Search by barcode');
    this.barcodeScanner.scan().then((barcodeData) => {
      this.barcodeResult = barcodeData.text;
    }, (err) => {
      console.log('An error while scanning barcode occurred: ' + err);
    });
  }
}
