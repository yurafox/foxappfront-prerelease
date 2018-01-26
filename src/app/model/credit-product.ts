import {AppConstants} from '../app-constants';

export class CreditProduct {
  sId?: number;
  sName?: string;
  sDefProdId?: number;
  sPartPay?: number;
  sGracePeriod?: number;
  maxTerm?: number;
  firstPay?: number;
  monthCommissionPct?: number;
  yearPct?: number;
  kpcPct?: number;
  minAmt?: number = AppConstants.MIN_LOAN_AMT;
  maxAmt?: number = AppConstants.MAX_LOAN_AMT;
  minTerm?: number;

  constructor(){};
}
