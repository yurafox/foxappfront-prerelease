import { Input, Directive, TemplateRef, ElementRef, ViewContainerRef, SimpleChange } from '@angular/core';
import { NgIf, NgIfContext } from '@angular/common';

@Directive({ selector: "[aotIf]" })
export class AotIf extends NgIf {
  private _reset:boolean;

  constructor(public viewContainer: ViewContainerRef,
    public templateRef: TemplateRef<NgIfContext>,
    public elementRef: ElementRef) { super(viewContainer, templateRef);}

  @Input() aotIf:boolean;

  @Input("aotIfReset")
  public set aotIfReset(state:boolean) {
     this._reset = state;
  }

  ngOnChanges(changes:{[property:string]:SimpleChange}) {
    let change = changes["aotIf"];
    this.changeDOM(change.currentValue);
  }

  private changeDOM(condition: any): void {
    let notCondition = this.isNotCondition(condition);
    // check for reset
    this.tryReset();
    // call base setter
    this.ngIf = condition;
    if(notCondition)
      this.removeNegative();   
  }

  private removeNegative():void {
    let pNode = (<any>this.elementRef.nativeElement).parentNode;
    // node after "angular-commit" element
    let nextSibling = (<any>this.elementRef.nativeElement).nextSibling;

    if (pNode && this.isCorrectNode(nextSibling))
      pNode.removeChild(nextSibling);
  }

  private isNotCondition(condition:any) :boolean {
      return !condition || condition===[];
  }

  private tryReset():void {
    if(this._reset) {
      this.ngIf = false;
      this.removeNegative();
    }
  }

  private isCorrectNode(el:HTMLElement):boolean {
    if(!el) return false;
    return el.nodeType === Node.ELEMENT_NODE;
  }
}