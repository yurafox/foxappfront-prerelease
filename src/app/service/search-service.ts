import {EventEmitter, Injectable} from '@angular/core';
import {Product} from '../model/product';
import {AbstractDataRepository} from './repository/abstract/abstract-data-repository';
import { Client } from 'elasticsearch';


@Injectable()
export class SearchService {

  public products = [];
  private cKey = 'searchItems';
  private cMaxSearchItemsCount = 15;
  public searchItems = new Array<string> ();
  public searchResults: Promise<Product[]>;
  private _ls: string = '';
  //private progressBarIsActive = false;
  public inSearch = false;
  public hostPage: any;

  private client: Client;

  private readonly INDEX = 'product';
  private readonly TYPE = null;
  private readonly SIZE = 30;
  private readonly MAX_ITEMS_COUNT = 360;

  public haveNextPage = false;
  //public scrollID = '';
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

/*
  public get progressBarStatus(): boolean {
    return this.progressBarIsActive;
  }
*/

  private connect() {
    this.client = new Client({
      host: 'http://localhost:9200'
    });
  }

  searchByText() {
    this.lastItemIndex = 0;
    this.products = [];
    this.hitsTotal = 0;
    this.getData();
  }

  loadNext() {
    if (this.products.length > this.MAX_ITEMS_COUNT)
      return;
    this.getData();
  }

  getData() {
    this.inSearch = true;
    this.getDocuments(
    this.INDEX,
    this.TYPE,
    this.lastItemIndex,
    this.SIZE,
    this.lastSearch).then(
    response => {
      //this.progressBarIsActive = true;
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
//        this.progressBarIsActive = false;
        this.inSearch = false;
        this.hostPage.cont.resize();
      }
    }, error => {
      console.error(error);
    });
  }

  getDocuments(_index, _type, _from, _size, _qryText): any {
    return this.client.search({
      index: _index,
      type: _type,
      filterPath: ['hits.hits._source', 'hits.total'],
      body: {
        'from': _from,
        'size': _size,
        'query': {
          'simple_query_string': {
            'query': `${_qryText}`,
            'default_operator': 'and'
          }
        }
      }
    });
  }

  lastSearchStringUpdated = new EventEmitter<string>();

  searchProducts(srchString: string, hostPage: any) {

    this.lastSearch = srchString;

    // Если такая строка поиска уже есть в списке - переносим ее в верх списка и обрезаем список до макс длиньі
    const i = this.searchItems.indexOf(srchString);
    if (!(i == -1))
      this.searchItems.splice(i,1);
    this.searchItems.splice(0,0, srchString);
    this.searchItems = this.searchItems.splice(0, this.cMaxSearchItemsCount);

    //Сохраняем массив в сторадже
    localStorage.setItem(this.cKey, JSON.stringify(this.searchItems));
    this.hostPage = hostPage;
    this.searchByText();
  }

  removeSearchItem(str: string) {
    let i = this.searchItems.indexOf(str);
    if (!(i == -1)) {
      this.searchItems.splice(i, 1);
      localStorage.setItem(this.cKey, JSON.stringify(this.searchItems));
    }
  }

}
