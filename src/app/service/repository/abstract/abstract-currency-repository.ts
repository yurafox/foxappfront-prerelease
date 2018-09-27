import {Currency} from '../../../model/currency';
import {CurrencyRate} from '../../../model/currency-rate';

export abstract class AbstractCurrencyRepository {
  public async abstract getCurrencies(cacheForce: boolean): Promise<Currency[]>;
  public async abstract getCurrencyById(currencyId: number): Promise<Currency>;
  public async abstract getCurrencyRate():Promise<CurrencyRate[]>;
}
