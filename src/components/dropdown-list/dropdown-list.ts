import {Component, Input, OnChanges} from '@angular/core';
import {PopoverController} from "ionic-angular";
import {DropdownViewComponent} from "../dropdown-view/dropdown-view";
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'dropdown-list',
  templateUrl: 'dropdown-list.html'
})
export class DropdownListComponent implements OnChanges{
  @Input()
  param:{value:number,reference:any}

  @Input()
  store: Array<any>;

  @Input()
  map:{valueName:string, displayName:string};

  @Input()
  beforeUpdate:(oldItem:any, newItem:any) => boolean;

  @Input()
  afterUpdate:(item:any) => void;

  public sourceContext: any;

  private verifyBehaviorList: Array<{fn:()=>boolean,errText:string}>=[];

  constructor(public popoverCtrl: PopoverController, private _viewCtnr:ViewContainerRef) {
    // <editor-fold desc="check input behavior init list">
    this.verifyBehaviorList.push({fn:this.verifyParam, errText:'отсутствуют значения в input поле [param]'});
    this.verifyBehaviorList.push({fn:this.verifyStore, errText:'входящая коллекция [store] пустая'});
    this.verifyBehaviorList.push({fn:this.verifyMap, errText:'несоответствие имен полей привязки с целевым обьектом'});
    // </editor-fold>
    this.sourceContext = (<any>this._viewCtnr.parentInjector).view.component;
  }

  // hook on input fields binding
  ngOnChanges(){
    this.checkInputValues();
  }


  public get displayValue():any{
    return this.param.reference[this.map.displayName];
  }

  public openView(event:any) {
    const popUp = this.popoverCtrl.create(DropdownViewComponent,{parent: this},{cssClass:'backdropOpacityPopover'});
    if(popUp) popUp.present();
  }

  // <editor-fold desc="methods for check input fields">
  private checkInputValues(){
    for(let i=0, max=this.verifyBehaviorList.length; i < max; i++){
      if(!this.verifyBehaviorList[i].fn.apply(this)) {
        this.errorThrow(this.verifyBehaviorList[i].errText);
      }
    }
  }
  private verifyParam(): boolean {
    if (!this.param)
      return false;

    return (!this.isNullOrUndefined(this.param.value) &&
            !this.isNullOrUndefined(this.param.reference))
  }
  private verifyStore(): boolean {
    return (this.store && this.store.length !== 0);
  }
  private verifyMap(): boolean {
    if(!this.map)
      return false;

    return (this.param.reference.hasOwnProperty(this.map.valueName) &&
            this.param.reference.hasOwnProperty(this.map.displayName));
  }
  private isNullOrUndefined(value: any): boolean {
    return (value===null || value===undefined);
  }
  private errorThrow(errText: string){
    throw new Error(errText);
  }
  // </editor-fold>
}
