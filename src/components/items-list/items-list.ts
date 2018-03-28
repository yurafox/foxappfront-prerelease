import {Component, Input} from '@angular/core';
import {Product} from '../../app/model/product';
import {ComponentBase} from '../component-extension/component-base';
import {SearchService} from '../../app/service/search-service';

@Component({
  selector: 'items-list',
  templateUrl: 'items-list.html'
})

export class ItemsListComponent extends ComponentBase {

  @Input() products: Product[];

  private readonly INDEX = 'product';
  private readonly TYPE = null;
  private readonly SIZE = 30;

  haveNextPage = false;
  scrollID = '';
  notice = '';
  hitsTotal = 0;

  constructor(public searchService: SearchService) {
    super();
    this.scrollID = '';
    this.notice = '';
    this.haveNextPage = false;
  }

  ngOnInit() {
    super.ngOnInit();
  }

  searchByText(srchString: string) {
    this.searchService.getAllDocumentsWithScroll(
    this.INDEX,
    this.TYPE,
    this.SIZE,
      srchString).then(
      response => {

      if (response.hits.hits) {
      this.products = response.hits.hits.map(
        x => {
          return x._source;
        }
      );
      if (response.hits.hits.length < response.hits.total) {
      this.haveNextPage = true;
      this.scrollID = response._scroll_id;
    }
    this.hitsTotal = response.hits.total;
    }
    else
    this.products = [];
    }, error => {
      console.error(error);
    });
  }

}
