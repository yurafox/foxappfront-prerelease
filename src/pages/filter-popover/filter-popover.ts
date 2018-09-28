import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavParams, ViewController} from 'ionic-angular';
import {CategoryType, FilterComponent} from '../../components/filter/filter';
import {ComponentBase} from "../../components/component-extension/component-base";
import {SortOrderEnum} from '../../app/service/search-service';


@IonicPage()
@Component({
  selector: 'page-filter-popover',
  templateUrl: 'filter-popover.html'
})
export class FilterPopoverPage extends ComponentBase {

  public filter: FilterComponent;
  brandsSectionOpened = false;
  
  constructor(public navParams: NavParams, public viewCtrl: ViewController,
              public loadingCtrl: LoadingController) {
    super();
    
    this.filter = navParams.get('filterControl');
    this.brandsSectionOpened = false;
  }
 
  ngOnDestroy() {
    super.ngOnDestroy();
  }

  toggleOpen(index: number) {
    let curState = this.filter.fCategories[index].isOpened;
    this.filter.fCategories.forEach( c => {
        c.isOpened = false;
      }
    );
    this.filter.fCategories[index].isOpened = !curState;
  }

  onFilterElementClick(item: any, catItems: any, category: any, evt: any) {
    let content = this.locale['LoadingContent'];
    let loading = this.loadingCtrl.create({
      content: content
    });

    try {
      loading.present().catch(console.error);

      if (item.type === CategoryType.Property) {
        item.item.isChecked = item.isChecked;
        this.filter.onPropsClick(item, category);
      }
      if (item.type === CategoryType.Manufacturer) {
        item.item.isChecked = item.isChecked;
        this.filter.onMnfClick(item, category);
      }
      if (item.type === CategoryType.ProductGroup) {
        item.item.isChecked = item.isChecked;
        this.filter.onGroupsClick(item, category);
      }


      if (item.type === CategoryType.Sort) {

        let _isChecked = item.isChecked;
        catItems.forEach(j => {
            j.isChecked = false;
          }
        );
        item.isChecked = !item.isChecked;

        if (item.isChecked) {
          if (item.id === -1)
            this.filter.sort(SortOrderEnum.Relevance);

          if (item.id === 0)
            this.filter.sort(SortOrderEnum.PriceLowToHigh);

          if (item.id === 1)
            this.filter.sort(SortOrderEnum.PriceHighToLow);

          if (item.id === 2)
            this.filter.sort(SortOrderEnum.Rating);

          if (item.id === 3)
            this.filter.sort(SortOrderEnum.Popularity);
        }

        ///// Prevent default checkbox behavior///
        if (_isChecked)
          return false;
        //////////////////////////////////////////
      }

    }
    finally {
      loading.dismiss().catch(console.error);
      this.close();
    }

  }

  close() {
    this.viewCtrl.dismiss().catch(console.error);
  }
}
