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
    //this.searchItems = JSON.parse(localStorage.getItem(this.cKey));
  }

  addSearchItem(value: string) {
    this.searchItems.splice(0,0,value);
    localStorage.setItem(this.cKey, JSON.stringify(this.searchItems));
  }

  removeSearchItem(itemIndex: number) {
    this.searchItems.splice(itemIndex, 1);
    localStorage.setItem(this.cKey, JSON.stringify(this.searchItems));
  }

}
