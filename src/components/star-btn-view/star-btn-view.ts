import {Component, Renderer2, AfterViewInit} from '@angular/core';
import {NavController, NavParams, ViewController} from "ionic-angular"
import {StarBtnComponent} from "../star-btn/star-btn";

@Component({
  selector: 'star-btn-view',
  templateUrl: 'star-btn-view.html'
})
export class StarBtnViewComponent implements AfterViewInit{
  public parent: StarBtnComponent;
  proxyObj:any;
  constructor(public nav: NavController,
              public navParam: NavParams,
              public viewCtrl: ViewController,
              public _renderer: Renderer2) {

    this.parent = navParam.get('parent');
    this.proxyObj = {};

    if(!this.parent.referenceBoot){
      const filtered = this.bindedStore.filter((value)=>{
        return value[this.valueName]===this.parent.param;
      })[0];

      this.proxyObj[this.valueName] = (filtered) ? filtered[this.valueName] : null;
      this.proxyObj[this.secondValueName] = (filtered) ? filtered[this.secondValueName] : null;
      this.proxyObj[this.displayName] = (filtered) ? filtered[this.displayName] : '';
    }
  }

  ngAfterViewInit(){
    if(this.parent.options.popupClass){
      const elements: NodeListOf<Element> = document.querySelectorAll('div.popover-content');
      if (elements.length!=0) {
        for (let i=0,max=elements.length;i<max;i++){
          this._renderer.addClass(elements[i],this.parent.options.popupClass);
        }
      }
    }

    this.scrollToIdentity();
  }

  public isActive(item: any): string {
    return (item[this.valueName] === this.bindedObject[this.valueName]) ? 'f-active':'f-item-default';
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
        this.parent.afterUpdate.call(this.parent.sourceContext,item,this.bindedObject);
        break;
      }

      case 3 : {
        const beforeResult = this.parent.beforeUpdate.call(this.parent.sourceContext,this.bindedObject,item);
        if(beforeResult){
          this.makeChange(item);
          this.parent.afterUpdate.call(this.parent.sourceContext,item,this.bindedObject);
        }
      }
    }
    // close popup
    this.close();
  }

  close() {
    this.viewCtrl.dismiss().catch(console.error);
  }

  public get valueName(): string {
    return this.parent.map.valueName;
  }

  public get secondValueName(): string {
    return this.parent.map.secondValueName;
  }

  public get displayName(): string {
    return this.parent.map.displayName;
  }

  public get displayHeader(): string {
    return this.parent.options.popupHeader;
  }

  // get target object reference
  public get bindedObject(): any {
    return (this.parent.referenceBoot) ? this.parent.reference : this.proxyObj;
  }

  public get currentIdentifier():string {
    return `drop-${this.bindedObject[this.valueName]}-${this.bindedObject[this.displayName]}`;
  }

  public get bindedStore():Array<any> {
    return this.parent.store;
  }

  public  uniqueIdentifier(item:any):string {
    return `drop-${item[this.valueName]}-${item[this.displayName]}`;
  }

  public makeChange(item:any){
    if(this.parent.referenceBoot) {
      this.parent.reference[this.parent.map.valueName] = item[this.parent.map.valueName];
      this.parent.reference[this.parent.map.secondValueName] = item[this.parent.map.secondValueName];
      this.parent.reference[this.parent.map.displayName] = item[this.parent.map.displayName];
    }
    else{
      this.proxyObj[this.parent.map.valueName] = item[this.parent.map.valueName];
      this.proxyObj[this.parent.map.secondValueName] = item[this.parent.map.secondValueName];
      this.proxyObj[this.parent.map.displayName] = item[this.parent.map.displayName];

      this.parent.param = item[this.parent.map.valueName];
      if(this.refBind && this.refBind['bindRef']){
        this.refBind.bindRef[this.refBind.bindName] = this.proxyObj[this.parent.map.valueName];
      }
    }
  }

  public scrollToIdentity():void {
    let node:HTMLElement=document.getElementById(this.currentIdentifier);
    if(node)
      node.scrollIntoView();
  }
  public getImportantStyle(){
    return (this.bindedStore.length < 10) ? {'height':'auto'}: null;
  }

  public get refBind(){
    return this.parent.ref;
  }

  public hasQtyExtension():boolean {
    return this.parent.IsCentering;
  }
}
