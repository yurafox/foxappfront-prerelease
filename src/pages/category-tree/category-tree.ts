import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ComponentBase} from "../../components/component-extension/component-base";
import { Category } from './../../app/model/index';

@IonicPage()
@Component({
  selector: 'page-category-tree',
  templateUrl: 'category-tree.html',
})
export class CategoryTreePage extends ComponentBase {
  private categories:Category[]=[];
  public count:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super();
  }
  
  async ngOnInit(){
    super.ngOnInit();
    this.count++;
    console.log('ngOnInit');
  }

  public test(){
    this.navCtrl.push("CategoryTreePage");
  }
 
}