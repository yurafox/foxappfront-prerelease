import {Component, Input, ElementRef, OnChanges} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';

@Component({
  selector: 'read-more',
  template: `
    <div [innerHTML]="currentText">
    </div>
    <a class="f-color-info" *ngIf="!this.hideToggle" (click)="toggleView()"><span loc="Читать"
                                                                                  name="Read">{{locale['Read']}}</span>
      {{isCollapsed ? (locale['More'] ? locale['More'] : 'больше') : (locale['Less'] ? locale['Less'] : 'меньше')}}<br></a>
  `
})

export class ReadMoreComponent extends ComponentBase implements OnChanges {
  @Input() text: string;
  @Input() maxLength: number = 100;
  currentText: string;
  hideToggle: boolean = true;

  isCollapsed: boolean = true;

  constructor(public elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
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
    } else if (this.isCollapsed == false) {
      this.currentText = this.text;
    }

  }

  ngOnChanges() {
    this.determineView();
  }
}
