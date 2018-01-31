import {Component, ViewChild} from '@angular/core';
import {App, NavController, IonicPage} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {AbstractDataRepository} from "../../app/service/index";
import {Product} from '../../app/model/product';
import {SearchService} from '../../app/service/search-service';

export enum PageMode {
  HomeMode = 1,
  SearchMode = 2,
  SearchResultsMode =3
}

@IonicPage({name: 'HomePage', segment: 'home'})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage extends ComponentBase {

//  searchMode = false;

  private _pageMode: PageMode = PageMode.HomeMode;
  public baseProducts = new Array<Product>();

  // list slides for slider
  public slides = [
    {
      src: 'assets/imgs/actions/action3.jpg'
    },
    {
      src: 'assets/imgs/actions/action2.jpg'
    },
    {
      src: 'assets/imgs/actions/action1.jpg'
    }
  ];

  @ViewChild('srch') searchButtonControl;
  public content:string='';

  constructor(public app: App, public nav: NavController,
              private _repo:AbstractDataRepository, public srchService: SearchService) {
    super();
    this.srchService.lastSearch = null;
 }

  public set pageMode(val: PageMode) {
    this._pageMode = val;
  }

  public get pageMode(): PageMode {
    return this._pageMode;
  }

  // view categories
  viewCategories() {
    this.nav.push('CategoriesPage');
  }

  // view a category
  viewCategory(catId) {
    this.nav.push('CategoryPage', {id: catId});
  }

  // view a item
  viewItem(itemId) {
    this.nav.push('CategoryPage', {id: itemId})
  }

  onSearchClick() {
    if (!(this.pageMode == PageMode.SearchMode)) {
      this.pageMode = PageMode.SearchMode;
      this.searchButtonControl.inputMode = true;
    }
  }

  deleteSearchItem(event: any, item: string) {
    event.stopPropagation();
    this.searchButtonControl.removeSearchItem(item);
  }

  search(srchString: string): void {
    this.searchButtonControl.searchByText(srchString);
  }

  async ngOnInit() {
    super.ngOnInit();
    this.content = await this._repo.getPageContent(1);
    this.baseProducts = await this.srchService.searchResults;

  }


}
