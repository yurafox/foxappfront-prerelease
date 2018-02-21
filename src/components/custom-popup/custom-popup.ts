import {Component, Renderer, Renderer2} from '@angular/core';
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

  constructor(public renderer: Renderer, public viewCtrl: ViewController, public navCtrl: NavController,
              public navParams: NavParams, public popoverCtrl: PopoverController,
              private alertCtrl: AlertController) {
    super();
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'custom-popup', true);
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
    this.viewCtrl.dismiss();
  }

  showCitySelector(event) {
    let popover = this.popoverCtrl.create(CityPopoverPage, {caller: this});
    popover.present({
      ev: event
    });
  }

  async selectPickupStorePlace(sPlace: ProductStorePlace) {
    let sp = await (<any>sPlace).storeplace;
    let lang: number = this.userService.lang;
    let title: string;
    let message: string;
    let cancel: string;
    if (lang === 1) {
      title = 'Подтверждение';
      message = 'Вы действительно хотите выбрать '+sp.name +' чтобы забрать этот товар?';
      cancel = 'Отмена';
    } else if (lang === 2) {
      title = 'Підтвердження';
      message = 'Ви дійсно бажаєте вибрати '+sp.name +' щоб забрати цей товар?';
      cancel = 'Відміна';
    } else if (lang === 3) {
      title = 'Confirmation';
      message = 'Are you about to select '+sp.name +' for pickup this item?';
      cancel = 'Cancel';
    } else {
      title = 'Подтверждение';
      message = 'Вы действительно хотите выбрать '+sp.name +' чтобы забрать этот товар?';
      cancel = 'Отмена';
    }
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            (<any>this.itemPage).selectedStorePlace = sp;
            this.viewCtrl.dismiss();
          }
        },
        {
          text: cancel,
          handler: () => {
            this.viewCtrl.dismiss();
          }
        }
      ]
    });

    alert.present();



  }

}
