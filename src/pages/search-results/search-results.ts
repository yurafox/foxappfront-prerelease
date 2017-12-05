import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Product} from '../../app/model/product';
import {SearchService} from '../../app/service/search-service';
import {ComponentBase} from '../../components/component-extension/component-base';


@IonicPage()
@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html',
})
export class SearchResultsPage extends ComponentBase implements OnInit {

  public baseProducts = new Array<Product>();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public srchService: SearchService) {
    super();
  }


  onSearchClick() {
    this.navCtrl.push('SearchPage').catch((err: any) => {
      console.log(`Didn't set nav root: ${err}`);
    });
  }

  async ngOnInit() {
    super.ngOnInit();
    this.baseProducts = await this.srchService.searchResults;
  }


}
