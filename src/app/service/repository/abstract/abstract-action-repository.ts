import {Action} from '../../../model/action';
import {ActionByProduct} from '../../../model/action-by-product';
import {Product} from "../../../model";

export abstract class AbstractActionRepository {
  public async abstract getAction(id:number):Promise<Action>;
  public async abstract getActions():Promise<Action[]>;
  public async abstract getActionsByProduct(idProduct: number): Promise<ActionByProduct[]>;
  public async abstract getProductsOfDay(): Promise<Product[]>;
  public async abstract getProductsSalesHits(): Promise<Product[]>;
}
