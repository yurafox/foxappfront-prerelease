import { Component, Input, OnChanges } from '@angular/core';
import { PopoverController } from "ionic-angular";
import { StarBtnViewComponent } from "../star-btn-view/star-btn-view";
import { ViewContainerRef } from '@angular/core';
import { ComponentBase } from "../component-extension/component-base";

const popupDefaultClass = 'f-small-dictionary';
const popupDefaultHeader = 'Список';
const buttonDefaultHeader = '';

@Component({
  selector: 'star-btn',
  templateUrl: 'star-btn.html'
})
export class StarBtnComponent extends ComponentBase implements OnChanges {

  @Input()
  options?: {
    popupClass?: string,
    buttonClass?: string,
    popupHeader?: string,
    buttonHeader?: string
  };

  @Input()
  reference?: any;

  @Input()
  param?: number;

  @Input()
  store?: Array<any>;

  @Input()
  map?: { valueName: string, displayName: string, secondValueName: string };

  @Input()
  isQty?: boolean = false;

  @Input()
  placeholder:string = '';

  @Input()
  ref?:{bindRef: any,bindName:string};

  @Input()
  beforeUpdate: (oldItem: any, newItem: any) => boolean;

  @Input()
  afterUpdate: (item: any) => void;

  @Input()
  IsCentering:boolean = true;

  public sourceContext: any;

  // проверка приоритета работы со сылкой
  public referencePriority:boolean;

  public verifyBehaviorList: Array<{ fn: () => boolean, errText: string }> = [];

  constructor(public popoverCtrl: PopoverController,
              public _viewCtnr: ViewContainerRef) {
    super();
    // <editor-fold desc="check input behavior init list">
    //this.verifyBehaviorList.push({ fn: this.verifyReference, errText: 'отсутствуют значения для binding поле' });
    this.verifyBehaviorList.push({ fn: this.verifyMap, errText: 'несоответствие имен полей привязки с целевым обьектом' });
    this.verifyBehaviorList.push({ fn: this.verifyStore, errText: 'входящая коллекция [store] пустая' });
    // </editor-fold>
    this.sourceContext = (<any>this._viewCtnr.parentInjector).view.component;
  }

  ngOnInit() {
    super.ngOnInit();
  }

  // hook on input fields binding
  ngOnChanges() {
    this.referencePriority=!this.isNullOrUndefined(this.reference);
    this.checkInputValues();
    this.verifyOptions();
  }


  public get displayValue(): any {
    if (!this.options)
      return '';

    const dataValue:any=(this.referencePriority) ? (this.reference[this.map.displayName])
      :(this.displayParam);

    if(this.options.buttonHeader)
      return `${this.options.buttonHeader}: ${dataValue}`;

    return (!this.isQty) ? dataValue || this.placeholder : ``;
  }

  public get displayParam():string {
    let dValues = this.store.filter((value)=>{
      return (value[this.map.valueName]==this.param)
    });

    return (dValues.length === 0) ? '': dValues[0][this.map.displayName];
  }
  public get referenceBoot():boolean {
    return this.referencePriority;
  }
  public openView(event: any) {
    const popUp = this.popoverCtrl.create(StarBtnViewComponent, { parent: this }, { cssClass: 'f-backdrop-opacity-popover' });
    if (popUp) popUp.present();
  }

  // <editor-fold desc="methods for check input fields">
  public checkInputValues() {
    for (let i = 0, max = this.verifyBehaviorList.length; i < max; i++) {
      if (!this.verifyBehaviorList[i].fn.apply(this)) {
        this.errorThrow(this.verifyBehaviorList[i].errText);
      }
    }
  }

  public verifyStore(): boolean {
    return (this.store && this.store.length !== 0);
  }
  public verifyMap(): boolean {
    if (!this.map) {return false;}

    return (!this.referenceBoot) || (this.reference.hasOwnProperty(this.map.valueName)
      && this.reference.hasOwnProperty(this.map.displayName) && this.reference.hasOwnProperty(this.map.secondValueName));
  }
  public verifyOptions(): void {
    if (!this.options)
      this.options={};

    this.options.popupClass = this.options.popupClass || popupDefaultClass;
    this.options.buttonClass = this.options.buttonClass || '';
    this.options.popupHeader = this.options.popupHeader || popupDefaultHeader;
    this.options.buttonHeader = this.options.buttonHeader || buttonDefaultHeader;
  }

  public isNullOrUndefined(value: any): boolean {
    return (value === null || value === undefined);
  }
  public errorThrow(errText: string) {
    throw new Error(errText);
  }
  // </editor-fold>
}
