import {ChangeDetectorRef, Component,DoCheck, ElementRef, ViewChild} from '@angular/core';
import {App, NavController, IonicPage, NavParams} from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {SearchService} from '../../app/service/search-service';
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {Subscription} from 'rxjs/Subscription';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

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
export class HomePage extends ComponentBase implements DoCheck {

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
  scrollHeight: number;
  scrOrientationSub: Subscription;
  pageOptions:any;
  searchNativeInput:HTMLInputElement;
  loadingDone: boolean;

  constructor(public app: App, public nav: NavController, public _repo:AbstractDataRepository,
              public srchService: SearchService, public changeDet: ChangeDetectorRef,
              public screenOrientation: ScreenOrientation, public navParams: NavParams) {
    super();
    this.initLocalization();
    this.loadingDone = false;
    this.srchService.lastSearch = null;
    if (navParams.data.pageMode)
      this._pageMode = navParams.data.pageMode;
    
    this.initData();
  }

  async initData() {
    try {
      this.loadingDone = false; // Revealing section loader
      if (this._pageMode != PageMode.HomeMode)
        return;

      await this.doRefresh(0);

      let ar = await this._repo.getProductsOfDay();
      this.productsOfDay = [];
      if (ar && ar.length > 0) {
        for (let i of ar) {
          this.productsOfDay.push(i);
        }
      }

      let shAr = await this._repo.getProductsSalesHits();
      this.productsSalesHits = [];
      if (shAr && shAr.length > 0) {
        for (let i of shAr) {
          this.productsSalesHits.push(i);
        }
      }
    } catch(err) {
      console.error(err);
    } finally {
      this.loadingDone = true;  // Hiding section loader
    }
  }

  ngDoCheck() {
    this.updateScrollHeight();
  }
  

  public updateScrollHeight() {
    const hdrH = (this.header) ?  this.header.nativeElement.scrollHeight : 0;
    this.scrollHeight = window.screen.height - hdrH;
  }

  public set pageMode(val: PageMode) {
    if (val === this._pageMode)
      return;
    this._pageMode = val;
    this.changeDet.detectChanges();
    if (val === PageMode.SearchMode) {
      this.searchButtonControl.inputMode = true;
      this.searchButtonControl.incSearch();
    }
    if (val === PageMode.SearchResultsMode)
      this.itemsList.srchResDiv.height = 0;
    this.cont.resize();
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
    this.searchButtonControl.searchByText(srchString);
  }

  async ngOnInit() {
    this.scrOrientationSub = this.screenOrientation.onChange().subscribe(() => {
      if (this._pageMode !== 1) this.changeDet.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.scrOrientationSub) this.scrOrientationSub.unsubscribe();
  }

  async doRefresh(refresher) {
    const homePageOptIndex:number = 1;
    this.pageOptions = await this._repo.getPageOptionsById(homePageOptIndex);
    this.content = !!(this.pageOptions);
  }
}
