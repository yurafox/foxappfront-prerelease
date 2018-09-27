import {EnumPaymentMethod} from '../../../model/enum-payment-method';

export abstract class AbstractFinRepository {
  public async abstract loadPmtMethodsCache();
  public async abstract getPmtMethods(): Promise<EnumPaymentMethod[]>;
  public async abstract getPmtMethodById(id: number): Promise<EnumPaymentMethod>;
}
