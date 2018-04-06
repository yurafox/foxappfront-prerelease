import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ComponentBase} from '../../components/component-extension/component-base';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {SearchService} from '../../app/service/search-service';

@IonicPage({name: 'CategoryPage', segment: 'category'})
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})

export class CategoryPage extends ComponentBase implements OnInit {

  @ViewChild('cont') public cont;

  public slides = [
    {
      src: 'assets/imgs/category/mobtel/2120.jpg'
    },
    {
      src: 'assets/imgs/category/mobtel/2130.jpg'
    },
    {
      src: 'assets/imgs/category/mobtel/2177.jpg'
    },
    {
      src: 'assets/imgs/category/mobtel/2178.jpg'
    },
    {
      src: 'assets/imgs/category/mobtel/2223.jpg'
    },
    {
      src: 'assets/imgs/category/mobtel/2230.jpg'
    }

  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
                private repo: AbstractDataRepository, private srch: SearchService) {
    super();
  }

  async ngOnInit() {
    super.ngOnInit();
    this.srch.hostPage = this;
    await this.srch.searchByCategory(this.navParams.data);
  }

}
