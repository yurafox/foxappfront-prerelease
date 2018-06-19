import {Directive, ElementRef, Input, OnInit, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[loc]'
})
export class LocaleDirective implements OnInit {
  @Input('loc')
  public localeText: string;
  @Input('name')
  public localeAlias: string;

  public get parentComponent(): any {
    return (<any>this.componentRef)._view.component;
  }

  constructor(public element: ElementRef,
              public componentRef: ViewContainerRef) {
  }

  ngOnInit() {
     this.parentComponent
         .addTolocale(this.localeText, this.localeAlias);
  }
}
