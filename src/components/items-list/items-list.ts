import {Component, Input} from '@angular/core';
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

  ngOnInit() {
    super.ngOnInit();
  }

  onScroll() {
    this.srchService.loadNext();
  }

}
