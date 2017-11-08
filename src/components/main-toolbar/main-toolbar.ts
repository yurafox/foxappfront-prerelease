import { Component } from '@angular/core';

/**
 * Generated class for the MainToolbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'main-toolbar',
  templateUrl: 'main-toolbar.html'
})
export class MainToolbarComponent {

  text: string;

  constructor() {
  }

  goToCart(): void {
    console.log('Go to cart');
  }

  goToHome(): void {
    console.log('Go to home click');
  }
}
