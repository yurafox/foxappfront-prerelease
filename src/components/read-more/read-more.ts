import { Component, Input, ElementRef, OnChanges} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';

@Component({
  selector: 'read-more',
  template: `
        <div [innerHTML]="currentText">
        </div>
        <a style="color: darkslateblue;" *ngIf="!this.hideToggle" (click)="toggleView()">Read {{isCollapsed? 'more':'less'}}<br></a>
    `
})

export class ReadMoreComponent extends ComponentBase implements OnChanges {
  @Input() text: string;
  @Input() maxLength: number = 100;
  currentText: string;
  hideToggle: boolean = true;

  public isCollapsed: boolean = true;

  constructor(private elementRef: ElementRef) {
    super();
}

  toggleView() {
    this.isCollapsed = !this.isCollapsed;
    this.determineView();
  }
  determineView() {
    if (this.text.length <= this.maxLength) {
      this.currentText = this.text;
      this.isCollapsed = false;
      this.hideToggle = true;
      return;
    } else {
      this.hideToggle = false;
    }
    if (this.isCollapsed == true) {
      this.currentText = this.text.substring(0, this.maxLength) + "...";
    } else if(this.isCollapsed == false)  {
      this.currentText = this.text;
    }

  }
  ngOnChanges() {
    this.determineView();
  }
}
