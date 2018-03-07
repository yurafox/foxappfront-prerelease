import {Component, ElementRef, ViewChild} from '@angular/core';
import {Nav, Platform, MenuController, IonicPage} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import {AbstractDataRepository} from "../../app/service";
import * as JsBarcode from "jsbarcode";

@IonicPage({name: 'BarcodePage'})
@Component({
  selector: 'page-barcode',
  templateUrl: 'barcode.html'
})
export class BarcodePage extends ComponentBase {

  @ViewChild('image') image: ElementRef;

  clientBarcode = null;

  constructor(private platform: Platform, private nav: Nav,
              public menuCtrl: MenuController, private repo: AbstractDataRepository) {
    super();
    //this.rootPage = HomePage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    });
  }

  ionViewDidLoad() {
    this.createCode();
  }

  async ngOnInit() {
    super.ngOnInit();
  }

  createCode() {
    try {
      const id: string = localStorage.getItem('id');
      if (!id) {
        return false;
      }
      this.repo.getClientByUserId(+id).then(client => {
        this.clientBarcode = client.barcode;
        let image = this.image.nativeElement;
        JsBarcode(image, client.barcode, {
          width: 2,
          height: 60,
          fontSize: 0,
          textPosition: 'top',
          textMargin: 0,
          text: ' ',
        });
      }).catch(err => {
        console.log(`Something went wrong with BarcodeGenerator: ${err}`);
      });
    } catch (err) {
      console.log(`Error creating barcode: ${err}`);
      this.nav.pop().catch(err => {
        console.log(`Can\'t go back: ${err}`);
        return;
      });
    }
  }

}

