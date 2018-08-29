import {Component, Input} from '@angular/core';

@Component({
  selector: 'toggle-menu',
  templateUrl: 'toggle-menu.html'
})
export class ToggleMenuComponent {
  @Input()
  showToggleButton: boolean = true;

  constructor() {
  }

}
