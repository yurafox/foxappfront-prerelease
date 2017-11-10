import {IonicPage, NavController, NavParams, ActionSheetController, ModalController} from 'ionic-angular';
import {TabFilterPage, TabAttributePage} from "../index";
import {Component, OnInit} from '@angular/core';
import {ComponentBase} from '../../components/component-extension/component-base';
import {Product} from '../../app/model/product';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage extends ComponentBase implements OnInit {

  baseProducts: Product[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
                private repo: AbstractDataRepository) {
    super();
    console.log(navParams.data);
  }

  async ngOnInit() {
    super.ngOnInit();
    this.baseProducts = await this.repo.getProducts('mobilnye_telefony.html', true);

    /*    this.route.params.forEach((params: Params) => {
          let url = params['category'];
          (async () => {
            this.baseProducts = await this.repo.getProducts('/shop/mobilnye_telefony.html', true);
            this.initData();
          })();
        });*/
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

}
