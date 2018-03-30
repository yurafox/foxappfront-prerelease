import {EventEmitter, Injectable} from '@angular/core';
import {Product} from '../model/product';
import {AbstractDataRepository} from './repository/abstract/abstract-data-repository';
import { Client } from 'elasticsearch';


export enum SortOrderEnum {
  Relevance = 1,
  PriceLowToHigh = 2,
  PriceHighToLow = 3,
  Popularity = 4,
  Rating = 5
}

export class PropsFilterExpr {
  public propId: number;
  public propVal: string;
}

export class ProductSearchParams {
  constructor (
  public srchText?: string,
  public categoryId?: number,
  public supplier?: number[],
  public productProps?: PropsFilterExpr[],
  public sortOrder: SortOrderEnum = SortOrderEnum.Relevance)
  {}
}

@Injectable()
export class SearchService {

  public products = [];
  private cKey = 'searchItems';
  private cMaxSearchItemsCount = 15;
  public searchItems = new Array<string> ();
  public searchResults: Promise<Product[]>;
  private _ls: string = '';
  public inSearch = false;
  public hostPage: any;

  private client: Client;

  private readonly INDEX = 'product';
  private readonly TYPE = null;
  private readonly SIZE = 30;
  private readonly MAX_ITEMS_COUNT = 360;

  public prodSrchParams: ProductSearchParams = null;

  public haveNextPage = false;
  public notice = '';
  public hitsTotal = 0;
  public lastItemIndex = 0;

  constructor(private repo: AbstractDataRepository) {

    if (!this.client) {
      this.connect();
    }

    const stor = JSON.parse(localStorage.getItem(this.cKey));
    if (stor) {
      stor.forEach((val) => {
        this.searchItems.push(val);
      });
    }
  }

  public get lastSearch(): string {
    return this._ls;
  }

  public set lastSearch(value: string) {
    this._ls = value;
    this.lastSearchStringUpdated.emit(value);
  }

  private connect() {
    this.client = new Client({
      host: 'http://localhost:9200'
    });
  }

  resetSearch() {
    this.lastItemIndex = 0;
    this.products = [];
    this.hitsTotal = 0;
  }

  searchByCategory (catId: number) {
    this.resetSearch();
    this.prodSrchParams = new ProductSearchParams(undefined, catId);
    this.getData();
  }

  searchByText(srchText: string) {
    this.resetSearch();
    this.prodSrchParams = new ProductSearchParams(srchText);
    this.getData();
  }

  loadNext() {
    if (
          (this.products.length > this.MAX_ITEMS_COUNT)
            ||
          (this.products.length === this.hitsTotal)
       ) return;
    this.getData();
  }

  getData() {
    this.inSearch = true;
    this.getDocuments(this.lastItemIndex).then(
    response => {
      try
      {
        if (response.hits.hits) {
            let _chunk = response.hits.hits.map(
            x => x._source
            //x => Object.assign(new Product(), x._source)
          );

          if (response.hits.hits.length < response.hits.total) {
            this.haveNextPage = true;
          }
          this.hitsTotal = response.hits.total;

          if (_chunk) {
            this.products = this.products.concat(_chunk);
            this.lastItemIndex = this.lastItemIndex + _chunk.length;
          }
          else
          {
            this.haveNextPage = false;
            this.notice = 'There are no more products!';
          }
        }
      }
      finally {
        this.inSearch = false;
        this.hostPage.cont.resize();
      }
    }, error => {
      console.error(error);
    });
  }

  getDocuments(_from: number): any {
    let sort = null;
    let mustArr = [];

    if (this.prodSrchParams.sortOrder === SortOrderEnum.Relevance) {
      sort = [{'_score': {'order' : 'desc'}}];
    }
    if (this.prodSrchParams.sortOrder === SortOrderEnum.Rating) {
      sort = [{'rating': {'order' : 'desc'}}];
    }
    if (this.prodSrchParams.sortOrder === SortOrderEnum.Popularity) {
      sort = [{'popularity': {'order' : 'desc'}}];
    }
    if (this.prodSrchParams.sortOrder === SortOrderEnum.PriceLowToHigh) {
      sort = [{'price': {'order' : 'asc'}}];
    }
    if (this.prodSrchParams.sortOrder === SortOrderEnum.PriceHighToLow) {
      sort = [{'price': {'order' : 'desc'}}];
    }

    if ((this.prodSrchParams.supplier) && (this.prodSrchParams.supplier.length >=1)) {
      let terms = [];
      this.prodSrchParams.supplier.forEach(
        x => terms.push({'term': {"manufacturerId" : `${x}`}})
      );
      let mnf = {'bool': {'should': terms}};
      mustArr.push(mnf);
    };

    if (this.prodSrchParams.srchText) {
      mustArr.push({'simple_query_string': {
                                      'query': `${this.prodSrchParams.srchText}`,
                                      'default_operator': 'and'
                                    }
            });
    }

    if (this.prodSrchParams.categoryId) {
      mustArr.push({
                      'nested' : {
                      'path' : 'groups',
                        'query' : {
                        'term': {
                          'groups.id': {
                            'value': `${this.prodSrchParams.categoryId}`
                          }
                        }
                      }
                    }
      });
    }

    return this.client.search({
      index: this.INDEX,
      type: this.TYPE,
      filterPath: ['hits.hits._source', 'hits.total'],
      body:
        {
        'from': _from,
        'size': this.SIZE,
        'sort': sort,
        'query': {
          'bool': {
            'must':
              mustArr
          }
        }
      }
    });
  }

  lastSearchStringUpdated = new EventEmitter<string>();

  searchProducts(srchString: string, hostPage: any) {
    // Если такая строка поиска уже есть в списке - переносим ее в верх списка и обрезаем список до макс длиньі
    const i = this.searchItems.indexOf(srchString);
    if (!(i == -1))
      this.searchItems.splice(i,1);
    this.searchItems.splice(0,0, srchString);
    this.searchItems = this.searchItems.splice(0, this.cMaxSearchItemsCount);

    //Сохраняем массив в сторадже
    localStorage.setItem(this.cKey, JSON.stringify(this.searchItems));
    this.hostPage = hostPage;
    this.searchByText(srchString);
    this.lastSearch = srchString;
  }

  removeSearchItem(str: string) {
    let i = this.searchItems.indexOf(str);
    if (!(i == -1)) {
      this.searchItems.splice(i, 1);
      localStorage.setItem(this.cKey, JSON.stringify(this.searchItems));
    }
  }

}
