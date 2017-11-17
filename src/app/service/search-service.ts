import {EventEmitter, Injectable} from '@angular/core';
import {Product} from '../model/product';
import {AbstractDataRepository} from './repository/abstract/abstract-data-repository';


@Injectable()
export class SearchService {

  private cKey = 'searchItems';
  private cMaxSearchItemsCount = 15;
  public searchItems = new Array<string> ();
  public lastSearch = '';
  public searchResults: Promise<Product[]>;

  constructor(private repo: AbstractDataRepository) {
    const stor = JSON.parse(localStorage.getItem(this.cKey));
    if (stor) {
      stor.forEach((val) => {
        this.searchItems.push(val);
      });
    }
  }

  searchStringUpdated = new EventEmitter<string>();

  searchProducts(): Promise<Product[]> {
    console.log('repo.searchProducts '+this.lastSearch);
    this.searchResults = this.repo.searchProducts(this.lastSearch);
    return this.searchResults;
  }

  addSearchItem(value: string) {
    this.lastSearch = value;
    const i = this.searchItems.indexOf(value);
    if (i > -1)
      this.searchItems.splice(i,1);
    this.searchItems.splice(0,0, value);
    this.searchItems = this.searchItems.splice(0, this.cMaxSearchItemsCount);
    localStorage.setItem(this.cKey, JSON.stringify(this.searchItems));
    this.searchStringUpdated.emit(value);
  }

  removeSearchItem(str: string) {
    let i = this.searchItems.indexOf(str);
    if (!(i == -1)) {
      this.searchItems.splice(i, 1);
      localStorage.setItem(this.cKey, JSON.stringify(this.searchItems));
    }
  }

}
