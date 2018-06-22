import { Input, Directive, TemplateRef, ElementRef, ViewContainerRef } from '@angular/core';
import { NgIf, NgIfContext } from '@angular/common';

@Directive({ selector: "[aotIf]" })
export class AotIf extends NgIf {
  constructor(public viewContainer: ViewContainerRef,
    public templateRef: TemplateRef<NgIfContext>,
    public elementRef: ElementRef) { super(viewContainer, templateRef); }

  // @override NgIf setter
  @Input()
  public set aotIf(condition: any) {
      this.changeDOM(condition);
  }

  @Input('aotReset')
  public aotReset = 'false';

  private changeDOM(condition: any): void {
    console.log(this.aotReset);

    // check for boolean correct condition
    let notCondition = this.isNotCondition(condition);
      // if(this.aotReset && !notCondition)
      //     this.removeNegative();   

      // call base setter
      this.ngIf = condition;
      if(notCondition)
          this.removeNegative();   
  }

  private removeNegative():void {
    let pNode = (<any>this.elementRef.nativeElement).parentNode;
    // node after "angular-commit" element
    let nextSibling = (<any>this.elementRef.nativeElement).nextSibling;

    if (pNode)
      pNode.removeChild(nextSibling);
  }

  private isNotCondition(condition:any) :boolean {
      return !condition || condition===[];
  }
}