import {Component, Input, OnInit} from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';

@IonicPage()
@Component({
  selector: 'page-item-description',
  templateUrl: 'item-description.html',
})
export class ItemDescriptionPage extends ComponentBase implements OnInit {

  @Input()
  description: string;

  constructor(public navParams: NavParams) {
    super();
    this.description = this.navParams.data;
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
