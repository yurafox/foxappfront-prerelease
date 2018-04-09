import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {ComponentBase} from '../../components/component-extension/component-base';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {SearchService} from '../../app/service/search-service';

@IonicPage({name: 'CategoryPage', segment: 'category'})
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})

export class CategoryPage extends ComponentBase implements DoCheck {

  @ViewChild('cont') cont;
  @ViewChild('header') header;
  scrollHeight: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
                private repo: AbstractDataRepository, private srch: SearchService) {
    super();
  }

  ngDoCheck() {
    this.updateScrollHeight();
  }

  public updateScrollHeight() {
    const hdrH = (this.header) ?  this.header.nativeElement.scrollHeight : 0;
    this.scrollHeight = (window.screen.height) - hdrH;
  }

  async ngOnInit() {
    super.ngOnInit();
    this.srch.hostPage = this;
    await this.srch.searchByCategory(this.navParams.data);
  }

}
