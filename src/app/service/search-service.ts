import {EventEmitter, Injectable} from '@angular/core';
import {Product} from '../model/product';
import {AbstractDataRepository} from './repository/abstract/abstract-data-repository';


@Injectable()
export class SearchService {

  private cKey = 'searchItems';
  private cMaxSearchItemsCount = 15;
  public searchItems = new Array<string> ();
  public searchResults: Promise<Product[]>;
  private _ls: string = '';

  public get lastSearch(): string {
    return this._ls;
  }

  public set lastSearch(value: string) {
    this._ls = value;
    this.lastSearchStringUpdated.emit(value);
  }


  constructor(private repo: AbstractDataRepository) {
    const stor = JSON.parse(localStorage.getItem(this.cKey));
    if (stor) {
      stor.forEach((val) => {
        this.searchItems.push(val);
      });
    }
  }

  lastSearchStringUpdated = new EventEmitter<string>();

  searchProducts(srchString: string): Promise<Product[]> {
    this.lastSearch = srchString;

    // Если такая строка поиска уже есть в списке - переносим ее в верх списка и обрезаем список до макс длиньі
    const i = this.searchItems.indexOf(srchString);
    if (!(i == -1))
      this.searchItems.splice(i,1);
    this.searchItems.splice(0,0, srchString);
    this.searchItems = this.searchItems.splice(0, this.cMaxSearchItemsCount);

    //Сохраняем массив в сторадже
    localStorage.setItem(this.cKey, JSON.stringify(this.searchItems));

    // Обращаемся за данньіми в бекенд
    this.searchResults = this.repo.searchProducts(srchString);
    return this.searchResults;
  }

  removeSearchItem(str: string) {
    let i = this.searchItems.indexOf(str);
    if (!(i == -1)) {
      this.searchItems.splice(i, 1);
      localStorage.setItem(this.cKey, JSON.stringify(this.searchItems));
    }
  }

}
