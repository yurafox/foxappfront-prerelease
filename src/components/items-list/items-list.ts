import {Component} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {SearchService} from '../../app/service/search-service';

@Component({
  selector: 'items-list',
  templateUrl: 'items-list.html'
})

export class ItemsListComponent extends ComponentBase {

  constructor(public srchService: SearchService) {
    super();
  }

  onScroll() {
    this.srchService.loadNext();
  }

}
