import {AfterViewInit, Component, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';

@Component({
  selector: 'item-description',
  templateUrl: 'item-description.html',
  encapsulation: ViewEncapsulation.Native
})
export class ItemDescriptionComponent extends ComponentBase implements AfterViewInit {

  @Input() description: string;
  @Input() displayTextLength: number;

  constructor(private itemDescrElem: ElementRef) {
    super();
  }

  ngAfterViewInit() {
    if (this.itemDescrElem && this.itemDescrElem.nativeElement) {
      let images: any;
      if (this.itemDescrElem.nativeElement.shadowRoot) {
        images = this.itemDescrElem.nativeElement.shadowRoot.querySelectorAll("img");
      }
      else {
        images = this.itemDescrElem.nativeElement.querySelectorAll("img");
      }
      if (images && images.length > 0) {
        for (let img of images) {
          img.parentElement.style.maxWidth = window.innerWidth+"px";
          img.style.maxWidth = window.innerWidth+"px";
        }
      }
    }
  }

}
