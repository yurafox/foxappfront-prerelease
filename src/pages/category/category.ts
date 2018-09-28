import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {ComponentBase} from '../../components/component-extension/component-base';
import {SearchService} from '../../app/service/search-service';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {Subscription} from 'rxjs/Subscription';
import {ProductCompareService} from '../../app/service/product-compare-service';

@IonicPage({name: 'CategoryPage', segment: 'category'})
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})

export class CategoryPage extends ComponentBase {

  @ViewChild('cont') cont;
  @ViewChild('header') header;
  scrollHeight: number;
  scrOrientationSub: Subscription;
  countCompareProducts: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public srch: SearchService,
              public screenOrientation: ScreenOrientation, public changeDet: ChangeDetectorRef,
              public prodCompService: ProductCompareService) {
    super();
  }

  public updateScrollHeight() {
    const hdrH = (this.header) ?  this.header.nativeElement.scrollHeight : 0;
    this.scrollHeight = (window.screen.height) - hdrH;
  }

  async ngOnInit() {
    super.ngOnInit();

    this.srch.hostPage = this;
    await this.srch.searchByCategory(this.navParams.data);
    this.scrOrientationSub = this.screenOrientation.onChange().subscribe(() => {
      this.changeDet.detectChanges();
    });
    this.updateScrollHeight();
  }

  ngOnDestroy() {
    if (this.scrOrientationSub) this.scrOrientationSub.unsubscribe();
  }

  async ionViewDidEnter() {
    if(this.prodCompService)
      this.getCountCompareProducts().catch(console.error);
   }

  async getCountCompareProducts() {
    this.countCompareProducts = await this.prodCompService.getCountProductsByCategory(this.navParams.data);
  }

  clearCompareProducts()
  {
    this.prodCompService.clearProductsByCategory(this.navParams.data).catch(console.error);
    this.countCompareProducts = 0;
 
    this.updateScrollHeight();
  }

  openCompareProducts()
  {
    this.navCtrl.push('ProductComparePage', {categorytId: this.navParams.data}).catch(console.error);
  }

}
