import { Component } from '@angular/core';
import {ComponentBase} from "../component-extension/component-base";

@Component({
  selector: 'feedback',
  templateUrl: 'feedback.html'
})
export class FeedbackComponent extends ComponentBase{

  constructor() {
    super();
  }

}
