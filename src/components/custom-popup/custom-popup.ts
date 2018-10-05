import {Component, Renderer2} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {AlertController, NavController, NavParams, PopoverController, ViewController} from 'ionic-angular';
import {ProductStorePlace} from '../../app/model/product-store-place';
import {ItemBase} from '../component-extension/item-base';
import {CityPopoverPage} from '../../pages/city-popover/city-popover';

@Component({
  selector: 'custom-popup',
  templateUrl: 'custom-popup.html'
})
export class CustomPopupComponent extends ComponentBase {
  public itemPage: ItemBase;
  public displayLocations: ProductStorePlace[] = new Array<ProductStorePlace>();
  public originalLocations: ProductStorePlace[] = new Array<ProductStorePlace>();

  constructor(public renderer: Renderer2, public viewCtrl: ViewController, public navCtrl: NavController,
              public navParams: NavParams, public popoverCtrl: PopoverController,
              public alertCtrl: AlertController) {
    super();
    this.renderer.addClass(viewCtrl.pageRef().nativeElement, 'custom-popup');
    this.itemPage = navParams.get('itemPage');

    this.itemPage.productStorePlaces.forEach(i => {
        this.originalLocations.push(i);
        this.displayLocations.push(i);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }

  close() {
    this.viewCtrl.dismiss().catch(console.error);
  }

  showCitySelector(event) {
    let popover = this.popoverCtrl.create(CityPopoverPage, {caller: this});
    popover.present({
      ev: event
    }).catch(console.error);
  }

  async selectPickupStorePlace(sPlace: ProductStorePlace) {
    let sp = await (<any>sPlace).storeplace;
    let title = this.locale['AlertTitle'];
    let message = eval('`'+ this.locale['AlertMessage'] +'`');
    let cancel = this.locale['Cancel'];
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            const ipage = <any>this.itemPage;
            ipage.selectedStorePlace = sp;
            ipage.onAddToCart().catch(console.error);
            this.viewCtrl.dismiss().catch(console.error);
          }
        },
        {
          text: cancel,
          handler: () => {
            this.viewCtrl.dismiss().catch(console.error);
          }
        }
      ]
    });

    alert.present().catch(console.error);
  }

}
