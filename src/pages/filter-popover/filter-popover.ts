import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FilterComponent} from '../../components/filter/filter';

@IonicPage()
@Component({
  selector: 'page-filter-popover',
  templateUrl: 'filter-popover.html',
})
export class FilterPopoverPage {

  public filter: FilterComponent;
  brandsSectionOpened = false;

  toggleOpen(index: number) {
    let curState = this.filter.fCategories[index].isOpened;
    this.filter.fCategories.forEach( c => {
        c.isOpened = false;
      }
    );
    this.filter.fCategories[index].isOpened = !curState;
  }

  onFilterElementClick(_id: number, _type: string, obj: any, _isChecked: boolean) {
    obj.isChecked = _isChecked;
    if (_type === 'prop') {
      this.filter.onPropsClick(obj);
    };
    if (_type === 'mnf') {
      this.filter.onMnfClick(obj);
    }
  }


/*  toggleOpen(section: string, _index: number) {
    if (section == 'brands') {
      this.brandsSectionOpened = !this.brandsSectionOpened;

      this.filter.filteredProps.forEach(i => {
          i.isOpened = false;
        }
      );
    }

    if (section == 'props') {
      this.brandsSectionOpened = false;
      let i = 0;
      let propName = this.filter.filteredProps[_index].prop.name;
      for (let p of this.filter.filteredProps) {
        if ((i == _index) || (p.prop.name == propName)) {
          p.isOpened = !p.isOpened;
        } else
          p.isOpened = false;
        i++;
      }

    }

  }*/

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.filter = navParams.get('filterControl');

    this.brandsSectionOpened = false;
    this.filter.filteredProps.forEach(i => {
        i.isOpened = false;
      }
    );

  }

  close(): void {
    this.viewCtrl.dismiss();
  }



}
