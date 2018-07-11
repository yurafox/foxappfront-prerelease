import {ChangeDetectorRef, Component,DoCheck, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
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
  autoFocus:boolean = false; 

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

  constructor(public app: App, public nav: NavController, public _repo:AbstractDataRepository,
              public srchService: SearchService, public changeDet: ChangeDetectorRef,
              public screenOrientation: ScreenOrientation, public navParams: NavParams) {
    super();
    this.initLocalization();
    this.srchService.lastSearch = null;
    if (navParams.data.pageMode)
      this._pageMode = navParams.data.pageMode;
    
    this.autoFocus = navParams.data['autoFocus'];
    this.initData();
  }

  async initData() {
    if (this._pageMode != PageMode.HomeMode)
      return;

    await this.doRefresh(0);

    let ar = await this._repo.getProductsOfDay();
    this.productsOfDay = [];
    for (let i of ar) {
      //let prod = await this._repo.getProductById(i);
      this.productsOfDay.push(i);
    }

    let shAr = await this._repo.getProductsSalesHits();
    this.productsSalesHits = [];
    for (let i of shAr) {
      //let prod = await this._repo.getProductById(i);
      this.productsSalesHits.push(i);
    }
  }

  ngDoCheck() {
    this.updateScrollHeight();
  }
  
  ngAfterViewChecked() {
     if(this.autoFocus) {
       let inField:HTMLElement=this.searchButtonControl.inputField.nativeElement;
       inField.focus();
     }
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
    //await this.initData();
  }

  ngOnDestroy() {
    if (this.scrOrientationSub) this.scrOrientationSub.unsubscribe();
  }

  async doRefresh(refresher) {
    this.pageOptions = await this._repo.getPageOptionsById(1);
    this.content = !!(this.pageOptions);
    /*if (refresher !== 0) {
      this.changeDet.detectChanges();
      refresher.complete();
    }*/
  }
}
