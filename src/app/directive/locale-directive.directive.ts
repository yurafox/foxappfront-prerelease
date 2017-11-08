import {Directive, ElementRef, Input, OnInit, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[loc]'
})
export class LocaleDirective implements OnInit {
  @Input('loc')
  public localeText: string;
  @Input('name')
  public localeAlias: string;

  private get parentComponent(): any {
    return (<any>this.componentRef)._view.component;
  }

  constructor(private element: ElementRef,
              private componentRef: ViewContainerRef) {
  }

  ngOnInit() {
     this.parentComponent
         .addTolocale(this.localeText, this.localeAlias);
  }
}
