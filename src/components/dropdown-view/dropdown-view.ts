import {Component, Renderer2, AfterViewInit, AfterViewChecked,ElementRef} from '@angular/core';
import {NavController, NavParams, ViewController} from "ionic-angular"
import {DropdownListComponent} from "../dropdown-list/dropdown-list";

@Component({
  selector: 'dropdown-view',
  templateUrl: 'dropdown-view.html'
})
export class DropdownViewComponent implements AfterViewInit,AfterViewChecked{
  private parent:DropdownListComponent;

  constructor(private nav: NavController,
              private navParam: NavParams,
              private viewCtrl: ViewController,
              private _renderer: Renderer2) {

    this.parent = navParam.get('parent');
  }
  
  ngAfterViewInit(){
    if(this.parent.options.popupClass){
      const elements: NodeListOf<Element> = document.querySelectorAll('div.popover-content');
      if (elements.length!=0) {
         for (let i=0,max=elements.length;i<max;i++){
           console.log(this.parent.options.popupClass);
          this._renderer.addClass(elements[i],this.parent.options.popupClass);
         } 
      }
    }
  }
  
  ngAfterViewChecked() {
    let node:HTMLElement=document.getElementById(this.currentIdentifier);
    if(node)
      node.scrollIntoView();
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

  public get displayHeader(): string {
    return this.parent.options.popupHeader;
  }

  // get target object reference
  public get bindedObject(): any {
    return this.parent.reference;
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

  private makeChange(item:any){
    this.parent.reference[this.parent.map.valueName] = item[this.parent.map.valueName];
    this.parent.reference[this.parent.map.displayName] = item[this.parent.map.displayName];
  }

  public getImportantStyle(){
    return (this.bindedStore.length < 10) ? {'height':'auto'}: null;
  }
}
