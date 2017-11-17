import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Product} from '../../app/model/product';
import {SearchPage} from '../search/search';
import {SearchService} from '../../app/service/search-service';
import {ComponentBase} from '../../components/component-extension/component-base';


@IonicPage()
@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html',
})
export class SearchResultsPage extends ComponentBase implements OnInit {

  public sResults = new Array<Product>();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public srchService: SearchService) {
    super();
  }


  onSearchClick() {
    this.navCtrl.setRoot(SearchPage);
  }

  async ngOnInit() {
    super.ngOnInit();
    this.sResults = await this.srchService.searchProducts();

  }


}
