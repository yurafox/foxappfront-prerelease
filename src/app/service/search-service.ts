import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class SearchService {

  private cKey = 'searchItems';
  public searchItems = new Array<string> ();

  constructor() {
    let stor = JSON.parse(localStorage.getItem(this.cKey));
    console.log(stor);
    if (stor) {
      stor.forEach((val) => {
        this.searchItems.push(val);
      });
    }
  }

  addSearchItem(value: string) {
    const i = this.searchItems.indexOf(value);
    if (i > -1)
      this.searchItems.splice(i,1);
    this.searchItems.splice(0,0, value);
    localStorage.setItem(this.cKey, JSON.stringify(this.searchItems));
  }

  removeSearchItem(str: string) {
    let i = this.searchItems.indexOf(str);
    if (!(i == -1)) {
      this.searchItems.splice(i, 1);
      localStorage.setItem(this.cKey, JSON.stringify(this.searchItems));
    }
  }

}
