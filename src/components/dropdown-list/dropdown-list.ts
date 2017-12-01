import { System} from './../../app/core/app-core';
import { Component, Input, OnChanges } from '@angular/core';
import { PopoverController } from "ionic-angular";
import { DropdownViewComponent } from "../dropdown-view/dropdown-view";
import { ViewContainerRef } from '@angular/core';

const popupDefaultClass = 'f-small-dictionary';
const buttonDefaultClass = 'drop-button-default';
const popupDefaultHeader = 'Список';
const buttonDefaultHeader = '';

@Component({
  selector: 'dropdown-list',
  templateUrl: 'dropdown-list.html'
})
export class DropdownListComponent implements OnChanges {

  @Input()
  options?: {
    popupClass?: string,
    buttonClass?: string,
    popupHeader?: string,
    buttonHeader?: string
  };

  @Input()
   reference: any;

  @Input()
  store?: Array<any>;

  @Input()
  map?: { valueName: string, displayName: string };

  @Input()
  isQty?: boolean = false;

  @Input()
  beforeUpdate: (oldItem: any, newItem: any) => boolean;

  @Input()
  afterUpdate: (item: any) => void;

  public sourceContext: any;

  private verifyBehaviorList: Array<{ fn: () => boolean, errText: string }> = [];

  constructor(public popoverCtrl: PopoverController,
    private _viewCtnr: ViewContainerRef) {

    // <editor-fold desc="check input behavior init list">
    this.verifyBehaviorList.push({ fn: this.verifyParam, errText: 'отсутствуют значения в input поле [param]' });
    this.verifyBehaviorList.push({ fn: this.verifyMap, errText: 'несоответствие имен полей привязки с целевым обьектом' });
    this.verifyBehaviorList.push({ fn: this.verifyStore, errText: 'входящая коллекция [store] пустая' });
    // </editor-fold>
    this.sourceContext = (<any>this._viewCtnr.parentInjector).view.component;
  }

  // hook on input fields binding
  ngOnChanges() {
    this.checkInputValues();
    this.verifyOptions();
  }


  public get displayValue(): any {
    if(this.options.buttonHeader)
       return `${this.options.buttonHeader}:${this.reference[this.map.displayName]}`;

    return (!this.isQty) ? this.reference[this.map.displayName] : `Qty:${this.reference[this.map.displayName]}`;
  }

  public openView(event: any) {
    const popUp = this.popoverCtrl.create(DropdownViewComponent, { parent: this }, { cssClass: 'f-backdrop-opacity-popover' });
    if (popUp) popUp.present();
  }

  // <editor-fold desc="methods for check input fields">
  private checkInputValues() {
    for (let i = 0, max = this.verifyBehaviorList.length; i < max; i++) {
      if (!this.verifyBehaviorList[i].fn.apply(this)) {
        this.errorThrow(this.verifyBehaviorList[i].errText);
      }
    }
  }
  private verifyParam(): boolean {
    return (!this.isNullOrUndefined(this.reference));
  }
  private verifyStore(): boolean {
    if(this.isQty){
      const range:System.IRange = this.reference['range'];                           
      this.store = function(){
        const array:Array<any>=[];
        for(let i = range.min, max= range.max; i< max;i++) {
           array.push(new System.FoxNumber(i));
        }

        return array;
      }.call(this);
    }

    return (this.store && this.store.length !== 0);
  }
  private verifyMap(): boolean {
    if(this.isQty)
        this.map = this.map || {valueName:'value',displayName:'value'};
    else {
      if (!this.map) {return false;}
    }

    return (this.reference.hasOwnProperty(this.map.valueName) &&
    this.reference.hasOwnProperty(this.map.displayName));
  }
  private verifyOptions(): void {
    if (!this.options)
      this.options={};

    this.options.popupClass = (this.options.popupClass) ? `${popupDefaultClass} ${this.options.popupClass}` 
                                                        : popupDefaultClass;

    this.options.buttonClass = (this.options.buttonClass) ? `${buttonDefaultClass} ${this.options.buttonClass}` 
                                                          : buttonDefaultClass;
                                                          
    this.options.popupHeader = this.options.popupHeader || popupDefaultHeader;
    this.options.buttonHeader = this.options.buttonHeader || buttonDefaultHeader;                                                       
  } 

  private isNullOrUndefined(value: any): boolean {
    return (value === null || value === undefined);
  }
  private errorThrow(errText: string) {
    throw new Error(errText);
  }
  // </editor-fold>
}