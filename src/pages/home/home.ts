import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {App, NavController, IonicPage, NavParams} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {SearchService} from '../../app/service/search-service';
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {Subscription} from 'rxjs/Subscription';
import {AbstractActionRepository} from "../../app/service/repository/abstract/abstract-action-repository";
import {AbstractPageRepository} from "../../app/service/repository/abstract/abstract-page-repository";

export enum PageMode {
  HomeMode = 1,
  SearchMode = 2,
  SearchResultsMode = 3
}

@IonicPage({name: 'HomePage', segment: 'home'})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage extends ComponentBase {

  _pageMode: PageMode = PageMode.HomeMode;

  @ViewChild('srch') searchButtonControl;
  @ViewChild('cont') cont;
  @ViewChild('itemsList') itemsList;
  @ViewChild('header') header;
  filterRef: ElementRef;

  @ViewChild('filter') set filter(elRef: ElementRef) {
    this.filterRef = elRef;
  };


  productsOfDay = [];
  productsSalesHits = [];
  content: boolean;
  scrOrientationSub: Subscription;
  pageSections = [];
  loadingDone: boolean;

  constructor(public app: App, public nav: NavController, public _actionRepo: AbstractActionRepository,
              public _pageRepo: AbstractPageRepository, public srchService: SearchService,
              public changeDet: ChangeDetectorRef, public screenOrientation: ScreenOrientation,
              public navParams: NavParams) {
    super();
    this.initLocalization();
  }

  async ngOnInit() {
    if (!this.loadingDone)
      await this.initData();

    this.scrOrientationSub = this.screenOrientation.onChange().subscribe(() => {
      if (this._pageMode !== 1) this.changeDet.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.scrOrientationSub) this.scrOrientationSub.unsubscribe();
  }

  async initData() {
    this.srchService.lastSearch = null;
    if (this.navParams.data.pageMode)
      this._pageMode = this.navParams.data.pageMode;

    try {
      this.loadingDone = false; // Revealing section loader
      if (this._pageMode != PageMode.HomeMode)
        return;

      await this.prepareContent();

      let ar = await this._actionRepo.getProductsOfDay();
      this.productsOfDay = [];
      if (ar && ar.length > 0) {
        for (let i of ar) {
          this.productsOfDay.push(i);
        }
      }

      let shAr = await this._actionRepo.getProductsSalesHits();
      this.productsSalesHits = [];
      if (shAr && shAr.length > 0) {
        for (let i of shAr) {
          this.productsSalesHits.push(i);
        }
      }
    } catch(err) {
      console.error(err);
    } finally {
      if (this.productsOfDay && this.productsSalesHits
        && this.productsOfDay.length > 0 && this.productsSalesHits.length > 0)
        this.loadingDone = true;  // Hiding section loader
    }
  }

  public set pageMode(val: PageMode) {
    if (val === this._pageMode)
      return;
    this._pageMode = val;
    this.changeDet.detectChanges();
    if (val === PageMode.SearchMode) {
      this.searchButtonControl.inputMode = true;
      this.searchButtonControl.incSearch().catch(console.error);
    }
    if (val === PageMode.SearchResultsMode)
    if (this.itemsList && this.itemsList.srchResDiv)
      this.itemsList.srchResDiv.height = 0;
  }

  public get pageMode(): PageMode {
    return this._pageMode;
  }

  onSearchClick() {
    this.pageMode = PageMode.SearchMode;
  }

  deleteSearchItem(event: any, item: string) {
    event.stopPropagation();
    this.searchButtonControl.removeSearchItem(item);
  }

  search(srchString: string) {
    this.searchButtonControl.searchByText(srchString).catch(console.error);
  }

  async prepareContent() {
    const homePageOptIndex:number = 1;
    let pageOptions = await this._pageRepo.getPageOptionsById(homePageOptIndex);
    this.pageSections = (():any[] => {
      let arrTemp=[];
      for (const prop in pageOptions) {
        if (pageOptions.hasOwnProperty(prop)) {
          arrTemp.push(pageOptions[prop]);
        }
      }
      return arrTemp;
    })();

    this.content = !!(pageOptions);
  }
}
