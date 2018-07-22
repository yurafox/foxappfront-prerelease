import {Component, Input, Output, OnInit, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {Product} from '../../app/model/product';
import {SearchService, ProductSearchParams} from '../../app/service/search-service';
import {ProductCompareService, PropWithIndex} from '../../app/service/product-compare-service';

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
  productObjects: Array<Product>;
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

  @ViewChild('grid') grid: ElementRef;

  categories = new Array<CategoryItem>();
  propsArr = new Array<ItemPropsTable>();
  products = new Array<Product>();
  selectedCategory: CategoryItem;
  isLoading : boolean = true;
  scrollHeight: number = 0;
  truncateSymbCount: number = 512;

  constructor(prodCompServic: ProductCompareService) {
    super();
  }

  async ngOnInit () {
    super.ngOnInit();

    if(!this.productObjects) {
      await this.loadCategorys();
      this.loadProducts();
    }
    else {
      this.loadProductObjects();
    }
  }
  
  closeProductClick(data: Product): void {
    this.closeProductEvent.emit({ productId: data.id, defaultCategoryId: this.selectedCategory.id });
  }

  categoryUpdate(item: any): void {
    this.defaultCategoryId = this.selectedCategory.id;
    this.productId=null;
    this.loadProducts();
  }

  async loadCategorys() {
    this.srchService.lastSearch=null;
    this.srchService.hostPage = this;
    this.srchService.prodSrchParams = new ProductSearchParams();
    this.srchService.prodSrchParams.ProductId = this.productsId;
    await this.srchService.search();

    this.categoryBuildList();
  }

  async loadProducts() {
    if(this.productId)
      await this.applyFilterByProductId();

    this.setSelectedCategory();

    if(this.selectedCategory)
      await this.applyFilterByCategory();

    this.getUniqueProps();
    this.isLoading = false;   
  }

  loadProductObjects() {
    this.truncateSymbCount = 25;
    this.products = this.productObjects;

    this.getUniqueProps();
    this.isLoading = false;   
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
  }

  async applyFilterByCategory() {
    let filterProducts = new Array<number>();
    this.productsId.forEach(element => {
      filterProducts.push(element);
    });

    this.srchService.lastSearch=null;
    this.srchService.hostPage = this; 
    this.srchService.prodSrchParams = new ProductSearchParams();
    this.srchService.prodSrchParams.ProductId = filterProducts;
    this.srchService.prodSrchParams.categoryId = this.selectedCategory.id;
    await this.srchService.search();

    this.parseProduct();
  }

  categoryBuildList() {
    this.categories = [];
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
  }

  setSelectedCategory() {
    if(this.defaultCategoryId) {
      let findedItem = this.categories.find(x => x.id === this.defaultCategoryId);
      if(findedItem)
        this.selectedCategory = new CategoryItem(findedItem.id, findedItem.name);
    }
    
    if((this.selectedCategory === undefined || this.selectedCategory === null) && this.categories.length > 0) {
      this.selectedCategory = new CategoryItem(this.categories[0].id, this.categories[0].name); 
      this.defaultCategoryId = this.selectedCategory.id;
    }
  }

  parseProduct() {
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
  }

  getUniqueProps() {
    this.propsArr = [];
    let uniqueProps = new Array<PropWithIndex>();
    let uniqueSortedProps = new Array<PropWithIndex>();

    this.products.forEach(product => {
      product.props.forEach(i => {
          if (!uniqueProps.find((x) => {return x.property.id === i.id_Prop.id}))
            uniqueProps.push(new PropWithIndex(i.id_Prop, i.idx));
        }
      );
      }
    );

    uniqueSortedProps = uniqueProps.sort( (x,y) => {return x.idx - y.idx || x.property.id - y.property.id});

    uniqueSortedProps.forEach(prop => {
      let propStr = new  Array<string>();

      this.products.forEach(product => {
        let vals = product.props.filter(x => (x.id_Prop.id === prop.property.id));
        propStr.push(vals.map(x => {return x.pVal;}).join('; '))
        }
      );

      this.propsArr.push(new ItemPropsTable(prop.property.name, propStr));
      }
    );
  }

  ngForCallback() {
    this.calcScrollHeight();
  }

  calcScrollHeight() {
    this.scrollHeight = this.grid.nativeElement.offsetHeight;
  }
  
  getHeightStyle() {
    if(!this.productObjects)
      return {'height': '100%'};
    else
      return {'height': (this.scrollHeight+32).toString()+'px'};
  }
  
}
