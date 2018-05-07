import {Component, Input, ViewChild} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {SearchService} from '../../app/service/search-service';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'items-list',
  templateUrl: 'items-list.html'
})

export class ItemsListComponent extends ComponentBase {

  @ViewChild('searchResults') srchResDiv;
  @Input() parentControl;

  constructor(public srchService: SearchService, private navCtrl: NavController) {
    super();
  }

  onScroll(event) {
    this.srchService.loadNext(event);
  }

  getListHeight(): number {
    return this.parentControl.scrollHeight;
  }

  toHomePage() {
    this.navCtrl.setRoot('HomePage').catch(err => console.error(err));
  }
}
