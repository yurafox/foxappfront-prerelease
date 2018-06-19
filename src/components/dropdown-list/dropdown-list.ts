  /**
     * Использование компонента dropdown-list
     * Свойства компонента
     * Необязательный параметр options?
     * @param
     * options?: { popupClass?: string,
                   buttonClass?: string,
                   popupHeader?: string,
                   buttonHeader?: string
                 };

      options.popupClass? - предопределенные классы для pop up окна, доступны
     - f-small-dictionary
     - f-middle-dictionary
     - f-large-dictionary
     Значение по умолчанию если не задан класс - f-small-dictionary

     options.buttonClass? - предопределенные классы для кнопки запуска pop up, доступны
     - f-drop-button-small
     - f-drop-button-middle
     - f-drop-button-large
     - f-drop-button-block
     Значение по умолчанию если не задан класс - f-drop-button-small

    options.popupHeader? - имя заголовка pop up окна
    Значение по умолчанию Список

    options.buttonHeader? - заголовок кнопки
    Значение по умолчанию только для qty - QTY

    @param
    Необязательный параметр reference:any - ссылочный тип для байдинга обьекта
    @param
    Необязательный параметр param:any - id для байдинга обьекта
    @param
    Необязательный параметр ref?:{bindRef: any, bindName:string} - глубокое связывание обьекта для байдинга.
    bindRef - ссылочный обьект содержащий поле для байдинга.
    bindName - имя поля для байдинга.
    Example:
    <dropdown-list [param]="shippingAddress.idCountry"
                   [ref]="{bindRef:shippingAddress,bindName:'idCountry'}"
                   [placeholder]="'Please select country'"
                   [store]="countries"
                   [options]="{popupClass: 'f-large-dictionary', popupHeader: 'Select country'}"
                   [map]="{valueName:'id', displayName:'name'}" >
    </dropdown-list>
    @param
    Параметр store?:Array<any> - список ключ-значение, необязателбный для QTY. Для остальных словарей
    параметр обязательный.
    @param
    map?:{ valueName: string, displayName: string } - параметр для мапинга свойст обьекта
    reference. Имена свойств reference должны передаваться в valueName и displayName соответсвенно.
    Необязателбный для QTY. Для остальных словарей параметр обязательный.
    @param
    Необязательный параметр
    isQty?: boolean - определяет тип компонента.
    true - qty компонент,
    false - обычный словарь
    Значение по умолчанию false
    @param
    Необязательный параметр (клиентский обработчик)
    beforeUpdate: (oldItem: any, newItem: any) => boolean - метод для клиентского кода, который срабатывает до
    момента обновления целевого обьекта, метод получает старое и новое значение выбранное пользователем.
    Возврвщаемое значение данного метода определяет изменять целевой обьект reference или нет.
    @param(клиентский обработчик)
    Необязательный параметр
    afterUpdate: (item: any, objRef:any) => void -  метод для клиентского кода, который срабатывает после обновления целевого обьекта.
    Метод принимает новое (выбранное пользователем значение) и целевой обьект.

    Условные примеры: Для компонента Account
     Код - async ngOnInit(){
            this.qtyTest = new System.FoxNumber();
            this.currentCurrency = new Currency(1,''EUR'');
            this.currentLang = new Lang(2,''UKR'');

            получение словарей
            [this.currencies,this.langs] = await Promise.all([this.repo.getCurrencies(true),
                                                             this.repo.getLocale(true)]);
         }

     @Вариант изменения валюты
     Разметка - <dropdown-list [reference]="currentCurrency"
                               [store]="currencies"
                               [map]="{valueName:'id',displayName:'shortName'}"
                               [afterUpdate]="currencyUpdate">
                </dropdown-list>

    @Вариант изменения языка
     Разметка -  <dropdown-list [reference]="currentLang"
                             [options]="{popupClass:'f-middle-dictionary'}"
                             [store]="langs"
                             [map]="{valueName:'id',displayName:'name'}"
                             [afterUpdate]="langUpdate">
                </dropdown-list>
      Изменили popupClass

    @Вариант работы с QTY
    Разметка -  <dropdown-list [options]="{popupHeader:'Qty',popupClass:'f-large-dictionary'}"
                               [reference]="currentTest"
                               [isQty]="true">
              </dropdown-list>
     Обязательные только три параметра.

     @Вариант работы с Edit Ship Address Page
     <dropdown-list [param]="shippingAddress.idCountry"
                    [ref]="{bindRef:shippingAddress,bindName:'idCountry'}"
                    [placeholder]="'Please select country'"
                    [store]="countries"
                    [options]="{popupClass: 'f-large-dictionary', popupHeader: 'Select country'}"
                    [map]="{valueName:'id', displayName:'name'}" >
    </dropdown-list>
     **/
import { System} from './../../app/core/app-core';
import { Component, Input, OnChanges } from '@angular/core';
import { PopoverController } from "ionic-angular";
import { DropdownViewComponent } from "../dropdown-view/dropdown-view";
import { ViewContainerRef } from '@angular/core';
  import {ComponentBase} from "../component-extension/component-base";

const popupDefaultClass = 'f-small-dictionary';
const buttonDefaultClass = 'f-drop-button-small';
const popupDefaultHeader = 'Список';
const buttonDefaultHeader = '';

@Component({
  selector: 'dropdown-list',
  templateUrl: 'dropdown-list.html'
})
export class DropdownListComponent extends ComponentBase implements OnChanges {

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
  map?: { valueName: string, displayName: string };

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

    return (!this.isQty) ? dataValue || this.placeholder : `${this.locale['Qty']}: ${dataValue}`;
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
    const popUp = this.popoverCtrl.create(DropdownViewComponent, { parent: this }, { cssClass: 'f-backdrop-opacity-popover' });
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
  // public verifyReference(): boolean {
  //   return (!this.isNullOrUndefined(this.reference) || !this.referencePriority);
  // }
  public verifyStore(): boolean {
    const me = this;
    if(this.isQty){
      const range:System.IRange = {min:1,max:31}; //this.reference['range'];
      this.store = function(){
        const array:Array<any>=[];
        for(let i = range.min, max= range.max; i< max;i++) {
          let obj={};
          obj[me.map.valueName]=i;
           array.push(obj);
        }
        return array;
      }.call(this);
    }

    return (this.store && this.store.length !== 0);
  }
  public verifyMap(): boolean {
    if(this.isQty)
        this.map = this.map || {valueName:'value',displayName:'value'};
    else {
      if (!this.map) {return false;}
    }

    return (!this.referenceBoot) || (this.reference.hasOwnProperty(this.map.valueName)
                                        && this.reference.hasOwnProperty(this.map.displayName));
  }
  public verifyOptions(): void {
    if (!this.options)
      this.options={};

    this.options.popupClass = this.options.popupClass || popupDefaultClass;
    this.options.buttonClass = this.options.buttonClass || buttonDefaultClass;
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
