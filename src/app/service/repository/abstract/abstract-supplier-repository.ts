import {Supplier} from '../../../model/supplier';

export abstract class AbstractSupplierRepository {
  public async abstract getSuppliers(cacheForce: boolean): Promise<Supplier[]>;
  public async abstract loadSuppliersCache();
  public async abstract getSupplierById(supplierId: number): Promise<Supplier>;
}
