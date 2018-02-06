import {Component, Input} from '@angular/core';

@Component({
  selector: 'error',
  template: '<span class="f-color-red"><i><b>!   </b></i>{{errorText}}</span>'
})
export class ErrorComponent {

  @Input()
  public errorText: string;

  constructor() {
  }

}
