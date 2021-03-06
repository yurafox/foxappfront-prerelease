import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {NavController} from 'ionic-angular';
import {SearchService} from '../../app/service/search-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {PageMode} from '../../pages/home/home';
import {Subject} from 'rxjs/Subject';


class SearchSuggestItem {
  constructor (
    public isClosable: boolean,
    public itemText: string,
    public itemDisplayText: string
  ){}
}

@Component({
  selector: 'search-btn',
  templateUrl: 'search-btn.html'
})
export class SearchBtnComponent extends ComponentBase implements OnInit {
  
  @ViewChild('input') inputField;

  @Input()
  hostPage: any = null;

  srchTextInputStream$ = new Subject<string>();

  srchItemsArr = new Array<SearchSuggestItem>();
  searchValue = null;
  inputMode = false;
  searching = false;

  constructor(public searchService: SearchService,
              public navCtrl: NavController,
              public barcodeScanner: BarcodeScanner,
              public srchService: SearchService) {
    super();
  }

  ngOnInit() {
    this.searchService.lastSearchStringUpdated.subscribe(
      (value: string) => {
        this.searchValue = value;
      }
    );

    this.initTmpSearchArray();

    this.srchTextInputStream$.debounceTime(200)
      .distinctUntilChanged()
      .subscribe(inputValue =>
        {
          this.incSearch().catch(console.error);
        }
      );
  }

  async searchByText(searchString: string) {
    if (searchString && !this.searching) {
      this.searching = true;
      this.searchValue = searchString;
      this.srchService.products = [];
      await this.srchService.searchProducts(searchString, this.hostPage);
      (<any>this.hostPage).pageMode = PageMode.SearchResultsMode;
      this.searching = false;
      this.inputMode = false;
    }
  }

  async searchByBarcode() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        if (barcodeData && !barcodeData.cancelled && barcodeData.text) {
          this.searchValue = barcodeData.text;
          this.incSearch().then(
            () => { this.searchByText(this.searchValue).catch(console.error); }
          );
        }
        else  {
          this.clearInput();
          return;
        }
      }, err => {
        console.log('An error while scanning barcode occurred: ' + err);
        this.clearInput();
        return;
      });
  }

  initTmpSearchArray() {
    const ar = this.searchService.searchItems;
    ar.forEach((item) => {
      this.srchItemsArr.push(new SearchSuggestItem(true, item, item));
    });
    this.searchValue = this.searchService.lastSearch;
  }

  public getIncSearchDisplayText(txt: string): string {
    if ((!txt) || (!this.searchValue))
      return txt;
    const idx = txt.toLowerCase().indexOf(this.searchValue.toLowerCase(),0);
    const emTxt = txt.substr(idx + this.searchValue.length, txt.length);
    return  ((idx === -1) ? txt : txt.substr(0, this.searchValue.length))
            + ((emTxt) ? '<b>' + emTxt + '</b>' : '');
  }

  async incSearch() {
    this.srchItemsArr = [];

    let ar = [];
    if (this.searchValue)
      ar = this.searchService.searchItems.filter((value) => {
        return value.toLowerCase().startsWith(this.searchValue.toLowerCase(),0);
        //return !(value.toLowerCase().indexOf(this.searchValue.toLowerCase()) === -1);
      }).slice();
    else
      ar = this.searchService.searchItems;

    ar.forEach(x => {

      this.srchItemsArr.push(new SearchSuggestItem(true, x, this.getIncSearchDisplayText(x)))
    });

    if (this.searchValue) {
      let res = await this.srchService.getSuggestData(this.searchValue);
      let varArr = [];
      res.inpSuggest.forEach(
        x => {
          const txt = x.text;
          const opts = x.options;
          if (opts.length>0)
            opts.forEach(y => varArr.push(y.text));
          else
            varArr.push(txt);
        }
      );
      if (varArr.length > 0) {
        varArr.forEach(z => {
          if (this.srchItemsArr.findIndex(x => {return (x.itemText === z);}) === -1)
            this.srchItemsArr.push(new SearchSuggestItem(false, z, this.getIncSearchDisplayText(z)));
          }
        );
      }
    }
  }

  onKeyUp(event) {
    if (!(event.keyCode === 13))
      this.srchTextInputStream$.next(event.target.value);
    else
      event.target.blur().catch(console.error);
  }

  removeSearchItem(item: number) {
    this.searchService.removeSearchItem(this.srchItemsArr[item].itemText);
    this.srchItemsArr.splice(item, 1);
  }

  clearInput(event?) {
    if (event)
      event.stopPropagation();
    this.searchService.lastSearch = '';
    this.incSearch().catch(console.error);
    if (!((this.navCtrl.length()-1) > 0)) {
      this.hostPage.pageMode = PageMode.HomeMode;
    }
    this.inputMode = false;
  }

}
