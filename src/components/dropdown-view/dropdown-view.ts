import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from "ionic-angular"
import {DropdownListComponent} from "../dropdown-list/dropdown-list";

@Component({
  selector: 'dropdown-view',
  templateUrl: 'dropdown-view.html'
})
export class DropdownViewComponent {
  private parent:DropdownListComponent;

  constructor(private nav: NavController,
              private navParam: NavParams,
              private viewCtrl: ViewController) {
    this.parent = navParam.get('parent');
  }

  public isActive(item: any): boolean {
    return item[this.valueName] === this.bindedObject[this.valueName];
  }

  public onSelect(item:any): void {
    let strategyCount = 0;
    strategyCount += (this.parent.beforeUpdate) ? 1 : 0;
    strategyCount += (this.parent.afterUpdate) ? 2 : 0;

    switch (strategyCount) {
      case 0 : { this.makeChange(item); break; }
      case 1 : {
        const beforeResult = this.parent.beforeUpdate.call(this.parent.sourceContext,this.bindedObject,item);
        if(beforeResult) this.makeChange(item);
        break;
      }
      case 2 : {
        this.makeChange(item);
        this.parent.afterUpdate.call(this.parent.sourceContext,item);
        break;
      }

      case 3 : {
        const beforeResult = this.parent.beforeUpdate.call(this.parent.sourceContext,this.bindedObject,item);
        if(beforeResult){
          this.makeChange(item);
          this.parent.afterUpdate.call(this.parent.sourceContext,item);
        }
      }
    }
    // close popup
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
  }

  public get valueName(): string {
    return this.parent.map.valueName;
  }

  public get displayName(): string {
    return this.parent.map.displayName;
  }

  // get target object reference
  public get bindedObject(): any {
    return this.parent.param.reference;
  }

  private makeChange(item:any){
    this.parent.param.reference[this.parent.map.valueName] = item[this.parent.map.valueName];
    this.parent.param.reference[this.parent.map.displayName] = item[this.parent.map.displayName];
  }
}
