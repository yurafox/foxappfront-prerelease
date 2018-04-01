import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FilterComponent} from '../../components/filter/filter';
import {ComponentBase} from "../../components/component-extension/component-base";
import {SortOrderEnum} from '../../app/service/search-service';

@IonicPage()
@Component({
  selector: 'page-filter-popover',
  templateUrl: 'filter-popover.html',
})
export class FilterPopoverPage extends ComponentBase {

  public filter: FilterComponent;
  brandsSectionOpened = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    super();
    this.filter = navParams.get('filterControl');

    this.brandsSectionOpened = false;
    this.filter.filteredProps.forEach(i => {
        i.isOpened = false;
      }
    );
  }


  toggleOpen(index: number) {
    let curState = this.filter.fCategories[index].isOpened;
    this.filter.fCategories.forEach( c => {
        c.isOpened = false;
      }
    );
    this.filter.fCategories[index].isOpened = !curState;
  }

  onFilterElementClick(item: any, catItems: any, evt: any) {
    if (item.type === 'prop') {
      item.item.isChecked = item.isChecked;
      this.filter.onPropsClick(item.item);
    }
    if (item.type === 'mnf') {
      item.item.isChecked = item.isChecked;
      this.filter.onMnfClick(item.item);
    }

    if (item.type === 'sort') {

      let _isChecked = item.isChecked;
      catItems.forEach(j => {
          j.isChecked = false;
        }
      );
      item.isChecked = !item.isChecked;

      if (item.isChecked) {
        if (item.id == -1)
          this.filter.sortByRelevance();

        if (item.id == 0)
          this.filter.sortByPriceAsc();

        if (item.id == 1)
          this.filter.sortByPriceDesc();

        if (item.id == 2)
          this.filter.sortByRating();
      }

      ///// Prevent default checkbox behavior///
      if (_isChecked)
        return false;
      //////////////////////////////////////////

    }
  }

/*
  ngOnInit() {
    super.ngOnInit();
  }
*/

  close(): void {
    this.viewCtrl.dismiss();
  }



}
