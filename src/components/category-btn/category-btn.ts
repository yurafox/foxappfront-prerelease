import { Component } from '@angular/core';
import {ComponentBase} from "../../components/component-extension/component-base";
import {NavController} from "ionic-angular";

@Component({
  selector: 'category-btn',
  templateUrl: 'category-btn.html'
})
export class CategoryBtnComponent extends ComponentBase {
  constructor(public navCtrl: NavController) {
        super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  toCategories():void{
    this.navCtrl.push('CategoriesPage');
  }
}
