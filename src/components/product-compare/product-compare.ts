import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {Product} from '../../app/model/product';
import {Prop} from '../../app/model/prop';
import {SearchService, ProductSearchParams} from '../../app/service/search-service';
import {ProductCompareService} from '../../app/service/product-compare-service';

export class ItemPropsTable {
  constructor(
    public propName: string,
    public propStr?: Array<string>
  ){}
}

export class CategoryItem {
  constructor(
    public id: number,
    public name: string,
  ){}
}

@Component({
  selector: 'product-compare',
  templateUrl: 'product-compare.html'
})
export class ProductCompareComponent extends ComponentBase implements OnInit {
  @Input()
  productsId: Array<number>;
  @Input()
  productId: number;
  @Input()
  defaultCategoryId: number;
  // Сколько свойств отображать в гриде. Если значение -1 - то все
  @Input()
  displayPropCount: number;
  @Input()
  showFilter: boolean = true;
  @Input()
  srchService: SearchService;
  @Output("closeProductClick")
  closeProductEvent = new EventEmitter<any>();

  categories = new Array<CategoryItem>();
  propsArr = new Array<ItemPropsTable>();
  products = new Array<Product>();
  selectedCategory: CategoryItem;
  isLoading : boolean = true;

  constructor(prodCompServic: ProductCompareService) {
    super();
  }

  ngOnInit () {
    super.ngOnInit();

    if(this.productId)
     this.applyFilterByProductId();
    else
      this.applyFilter();
  }

  getUniqueProps() {
    this.propsArr = [];
    let uniqueProps = new Array<Prop>();

    this.products.forEach(product => {
      let sortedProps = product.props.sort( (x,y) => {return x.idx - y.idx});

      sortedProps.forEach(i => {
          if (!uniqueProps.find((x) => {return x.id === i.id_Prop.id}))
            uniqueProps.push(i.id_Prop);
        }
      );
      }
    );

    uniqueProps.forEach(prop => {
      let propStr = new  Array<string>();

      this.products.forEach(product => {
        let vals = product.props.filter(x => (x.id_Prop.id === prop.id));
        propStr.push(vals.map(x => {return x.pVal;}).join('; '))
        }
      );

      this.propsArr.push(new ItemPropsTable(prop.name, propStr));
      }
    );
  }
  
  closeProductClick(data: Product): void {
    this.closeProductEvent.emit({ productId: data.id, defaultCategoryId: this.selectedCategory.id });
  }

  categoryUpdate(item: any): void {
    this.applyFilter();
  }

  async applyFilter() {
    let filterProducts = new Array<number>();

    this.srchService.lastSearch=null;
    this.srchService.hostPage = this;
 
    this.productsId.forEach(element => {
      filterProducts.push(element);
    });

    this.srchService.prodSrchParams = new ProductSearchParams();
    this.srchService.prodSrchParams.ProductId = filterProducts;
    if(this.selectedCategory)
      this.srchService.prodSrchParams.categoryId = this.selectedCategory.id;

    await this.srchService.search();

    if(this.selectedCategory)
    {
      this.products = [];

      this.srchService.products.forEach(element => {
        if (!this.products.find((x) => {return x.id == element.id}))
          this.products.push(element);
      });

      this.products.sort((a,b) => {
        if(a.name >  b.name) return 1;
        if(a.name < b.name) return -1;
        return 0;
      });

      this.getUniqueProps();
      this.isLoading = false;
    }
    else
      this.categoryBuildList();
  }

  async applyFilterByProductId() {
    this.srchService.lastSearch = null;
    this.srchService.hostPage = this;

    this.srchService.prodSrchParams = new ProductSearchParams();
    this.srchService.prodSrchParams.ProductId = [this.productId];
    await this.srchService.search();

    this.srchService.aggs.catsAgg.buckets.forEach(
      x => {
       const catId = +(x.key.substring(0, x.key.indexOf('|')));  
       this.defaultCategoryId = catId;
      }
    );

    this.applyFilter();
  }

  categoryBuildList() {
    this.srchService.aggs.catsAgg.buckets.forEach(
       x => {
        const catId:number = +(x.key.substring(0, x.key.indexOf('|')));
        const catName = x.key.substring(x.key.indexOf('|')+1, x.key.length);     
        this.categories.push( new CategoryItem(catId, catName));
       }
    );

    this.categories.sort((a,b) => {
      if(a.name > b.name) return 1;
      if(a.name < b.name) return -1;
      return 0;
    });

    if(!this.selectedCategory)
      this.setSelectedCategory();
  }

  setSelectedCategory()
  {
    if(this.defaultCategoryId)
    {
      let findedItem = this.categories.find(x => x.id === this.defaultCategoryId);
      if(findedItem)
        this.selectedCategory = new CategoryItem(findedItem.id, findedItem.name);

      this.applyFilter();
    }
    
    if((this.selectedCategory === undefined || this.selectedCategory === null) && this.categories.length > 0)
    {
      this.selectedCategory = new CategoryItem(this.categories[0].id, this.categories[0].name); 
      this.applyFilter();
    }
  }

}
