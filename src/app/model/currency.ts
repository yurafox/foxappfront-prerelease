export class CurrencyConvert {
  constructor(public cur1?: number,
              public cur2?: number,
              public rate?: number) {
  }
}

export class Currency {
  constructor(public id?: number,
              public shortName?: string) {
  }
}
