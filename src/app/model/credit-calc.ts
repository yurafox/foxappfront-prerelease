import {CreditProduct} from './credit-product';

export class CreditCalc {
  constructor(
    public isChecked: boolean,
    public creditProduct: CreditProduct,
    public clMonths: number = null, public clMonthCommPct: number = null,
    public clYearPct: number = null, public clFirstAidAmt: number = null,
    public clGraceMonths: number = null, public clMonthAmt: number = null
  ) {}
}
