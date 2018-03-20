import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import * as JsBarcode from "jsbarcode";
import {AbstractDataRepository} from "../../app/service/repository/abstract/abstract-data-repository";

@IonicPage({name: 'BarcodePage'})
@Component({
  selector: 'page-barcode',
  templateUrl: 'barcode.html'
})
export class BarcodePage extends ComponentBase implements OnInit {

  @ViewChild('image') image: ElementRef;

  clientBarcode: string;

  constructor(private repo: AbstractDataRepository) {
    super();
    this.initLocalization();
  }

  async ngOnInit() {
    let client = await this.repo.getClientByPhone(this.userService.profile.phone);
    if (client) {
      if (!client.barcode) {
        return false;
      }
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
    }
  }

}

