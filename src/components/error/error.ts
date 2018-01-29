import {Component, Input} from '@angular/core';

@Component({
  selector: 'error',
  templateUrl: 'error.html'
})
export class ErrorComponent {

  @Input()
  public errorText: string;

  constructor() {
  }

}
