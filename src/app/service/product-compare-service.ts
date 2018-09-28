import {Injectable} from '@angular/core';
import {SearchService, ProductSearchParams} from '../../app/service/search-service';
import {Prop} from '../../app/model/prop';

export class PropWithIndex {
  constructor(
    public property?: Prop,
    public idx?: number
  ) {}
}

@Injectable()
export class ProductCompareService {
  private cKey = 'compareItems';
  compareProductsId = new Array<number>();
  products : any;

  constructor(private srchService: SearchService) {
    this.compareProductsId = this.getLocalStorageItems();
  }

  public getCompareProducts(): Array<number> {
    return this.compareProductsId; 
  }

  public addCompareProducts(id: number) {
    if (!this.compareProductsId.find((x) => {return x === id}))
    {
      this.compareProductsId.push(id);
      this.saveToLocalStorage();
    }
  }

  public removeCompareProducts(id: number) {
    let index = this.compareProductsId.indexOf(id);
    if (index !== -1)
    {
      this.compareProductsId.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  public findCompareProducts(id: number): number {
    return this.compareProductsId.find((x) => {return x === id});
  }   

  saveToLocalStorage() {
    let saveArr = [];
    this.compareProductsId.forEach(i => {
      saveArr.push(i);
      }
    );
    localStorage.setItem(this.cKey, JSON.stringify(saveArr));
  }

  public getLocalStorageItems(): number[] {
    const stor = JSON.parse(localStorage.getItem(this.cKey));
    const ar = [];
    if (stor) {
      stor.forEach((val) => {
        ar.push(val);
        });
      }
    return ar;
  }

  async getCountProductsByCategory(categoryId: number): Promise<number> {
    if(this.compareProductsId.length === 0)
      return 0;
    
    this.srchService.prodSrchParams = new ProductSearchParams();
    this.srchService.prodSrchParams.ProductId = this.compareProductsId;
    this.srchService.prodSrchParams.categoryId = categoryId;
    this.srchService.hostPage = this;

    if(this.products)
      this.products = [];
      
    await this.srchService.search();

    if(this.products)
      return this.products.length;
    else
      return 0;
  }

  async clearProductsByCategory(categoryId: number){
    this.srchService.prodSrchParams = new ProductSearchParams();
    this.srchService.prodSrchParams.ProductId = this.compareProductsId;
    this.srchService.prodSrchParams.categoryId = categoryId;
    this.srchService.hostPage = this;

    await this.srchService.search();

    this.products.forEach((prod) => {
      this.removeCompareProducts(prod.id);
    });
  }

}
