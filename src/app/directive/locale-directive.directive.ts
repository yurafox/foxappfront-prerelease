import {Directive, ElementRef, Input, OnInit, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[loc]'
})
export class LocaleDirective implements OnInit {
  @Input('loc')
  localeText: string;
  @Input('name')
  localeAlias: string;

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
