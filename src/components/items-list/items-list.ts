import {Component, Input, ViewChild} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {SearchService} from '../../app/service/search-service';

@Component({
  selector: 'items-list',
  templateUrl: 'items-list.html'
})

export class ItemsListComponent extends ComponentBase {

  @ViewChild('searchResults') srchResDiv;
  @Input() parentControl;


  slides = [
    {
      src: 'assets/imgs/category/mobtel/2120.jpg'
    },
    {
      src: 'assets/imgs/category/mobtel/2130.jpg'
    },
    {
      src: 'assets/imgs/category/mobtel/2177.jpg'
    },
    {
      src: 'assets/imgs/category/mobtel/2178.jpg'
    },
    {
      src: 'assets/imgs/category/mobtel/2223.jpg'
    },
    {
      src: 'assets/imgs/category/mobtel/2230.jpg'
    }

  ];

  constructor(public srchService: SearchService) {
    super();
  }

  onScroll() {
    this.srchService.loadNext();
  }

  getListHeight(): number {
    return this.parentControl.scrollHeight;
  }

}
