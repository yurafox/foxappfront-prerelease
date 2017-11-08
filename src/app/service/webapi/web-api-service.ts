import {InMemoryDbService} from 'angular-in-memory-web-api';

export class WebApiService implements InMemoryDbService {
  // <editor-fold desc="quotationProducts"
  quotationProducts = [
    {id: 1, idQuotation: 1, idProduct: 6280637, price: 5199.00, maxDeliveryDays: 3, stockQuant: 12},
    {id: 3, idQuotation: 2, idProduct: 6280637, price: 5220.00, maxDeliveryDays: 5, stockQuant: 25},
    {id: 6, idQuotation: 3, idProduct: 6280637, price: 167.70, maxDeliveryDays: 3, stockQuant: 45},
    {id: 2, idQuotation: 1, idProduct: 6293680, price: 349.00, maxDeliveryDays: 2, stockQuant: 102.00},
    {id: 4, idQuotation: 2, idProduct: 6293680, price: 330.00, maxDeliveryDays: 2, stockQuant: 85.00},
    {id: 2, idQuotation: 1, idProduct: 6363302, price: 349.00, maxDeliveryDays: 2, stockQuant: 102.00},
    {id: 4, idQuotation: 2, idProduct: 6322210, price: 330.00, maxDeliveryDays: 2, stockQuant: 85.00}
  ];
  // </editor-fold>

  // <editor-fold desc="products">
  // <editor-fold desc='manufacturer'
  private mnf1 = {id: 220, name: 'SAMSUNG'};
  private mnf2 = {id: 109483, name: 'BRAVIS'};
  private mnf3 = {id: 114733, name: 'HUAWEI'};
  private mnf4 = {id: 5581, name: 'APPLE'};
  private mnf5 = {id: 118920, name: 'XIAOMI'};
  private mnf6 = {id: 107996, name: 'LENOVO'};
  private mnf7 = {id: 120815, name: 'WILEYFOX'};
  // </editor-fold>
  // <editor-fold desc='prop'>
  private prop1 = {id: 7, name: 'Количество SIM', prop_type: 2, is_Multi_Select: true, url: null, predestination: true};
  private prop2 = {
    id: 12,
    name: 'Встроенная память',
    prop_type: 4,
    is_Multi_Select: null,
    url: null,
    predestination: true
  };
  private prop3 = {
    id: 13,
    name: 'Диагональ дисплея',
    prop_type: 4,
    is_Multi_Select: null,
    url: null,
    predestination: true
  };
  private prop4 = {
    id: 10,
    name: 'Тип сетевой вилки',
    prop_type: 4,
    is_Multi_Select: null,
    url: null,
    predestination: false
  };
  // </editor-fold>
  // <editor-fold desc='propEnumList'
  private propEnumList1 = {id: 17, id_Prop: this.prop2, name: '16 Гб', list_Index: 100, bit_Index: null, url: null};
  private propEnumList2 = {id: 18, id_Prop: this.prop2, name: '32 Мб', list_Index: 50, bit_Index: null, url: null};
  private propEnumList3 = {id: 19, id_Prop: this.prop3, name: '1.8"', list_Index: 50, bit_Index: null, url: null};
  private propEnumList4 = {id: 20, id_Prop: this.prop3, name: '5.2"', list_Index: 90, bit_Index: null, url: null};
  private propEnumList5 = {id: 21, id_Prop: this.prop3, name: '5.5"', list_Index: 100, bit_Index: null, url: null};
  private propEnumList6 = {id: 4, id_Prop: this.prop4, name: 'EURO', list_Index: 1, bit_Index: null, url: null};
  private propEnumList7 = {id: 5, id_Prop: this.prop4, name: 'UK', list_Index: 0, bit_Index: null, url: null};
  private propEnumList8 = {id: 6, id_Prop: this.prop4, name: 'US', list_Index: 2, bit_Index: null, url: null};
  // </editor-fold>
  // <editor-fold desc='productPropValue'
  private productPropValue1 = {
    id: 1, id_Product: 6293680, id_Prop: this.prop2, prop_Value_Str: null,
    prop_Value_Number: null, prop_Value_Bool: null, prop_Value_Enum: this.propEnumList1, prop_Value_Long: null
  };
  private productPropValue2 = {
    id: 2, id_Product: 6280637, id_Prop: this.prop2, prop_Value_Str: null,
    prop_Value_Number: null, prop_Value_Bool: null, prop_Value_Enum: this.propEnumList1, prop_Value_Long: null
  };
  private productPropValue3 = {
    id: 3, id_Product: 6294898, id_Prop: this.prop2, prop_Value_Str: null,
    prop_Value_Number: null, prop_Value_Bool: null, prop_Value_Enum: this.propEnumList1, prop_Value_Long: null
  };
  private productPropValue4 = {
    id: 4, id_Product: 6293680, id_Prop: this.prop3, prop_Value_Str: null,
    prop_Value_Number: null, prop_Value_Bool: null, prop_Value_Enum: this.propEnumList3, prop_Value_Long: null
  };
  private productPropValue5 = {
    id: 5, id_Product: 6280637, id_Prop: this.prop3, prop_Value_Str: null,
    prop_Value_Number: null, prop_Value_Bool: null, prop_Value_Enum: this.propEnumList4, prop_Value_Long: null
  };
  private productPropValue6 = {
    id: 6, id_Product: 6294898, id_Prop: this.prop3, prop_Value_Str: null,
    prop_Value_Number: null, prop_Value_Bool: null, prop_Value_Enum: this.propEnumList5, prop_Value_Long: null
  };
  private productPropValue7 = {
    id: 7, id_Product: 6293680, id_Prop: this.prop1, prop_Value_Str: null,
    prop_Value_Number: 1, prop_Value_Bool: null, prop_Value_Enum: null, prop_Value_Long: null
  };
  private productPropValue8 = {
    id: 8, id_Product: 6280637, id_Prop: this.prop1, prop_Value_Str: null,
    prop_Value_Number: 2, prop_Value_Bool: null, prop_Value_Enum: null, prop_Value_Long: null
  };
  private productPropValue9 = {
    id: 9, id_Product: 6294898, id_Prop: this.prop1, prop_Value_Str: null,
    prop_Value_Number: 2, prop_Value_Bool: null, prop_Value_Enum: null, prop_Value_Long: null
  };
  private productPropValue10 = {
    id: 10, id_Product: 6293680, id_Prop: this.prop4, prop_Value_Str: null,
    prop_Value_Number: null, prop_Value_Bool: null, prop_Value_Enum: this.propEnumList6, prop_Value_Long: null
  };
  // </editor-fold>
  products = [
    {
      id: 6280637, name: 'smart/tel SAMSUNG SM-J510H Galaxy J5 Duos ZDD (gold)', price: 5031,
      manufacturer: this.mnf1, props: [this.productPropValue2, this.productPropValue5, this.productPropValue8],
      imageUrl: '/assets/images/p1.jpg', rating: 1, recall: 1, supplOffers: 3, url: 'mobilnye_telefony.html'
    },
    {
      id: 6293680,
      name: 'Mob/tel BRAVIS F181 BELL (black)',
      price: 330,
      manufacturer: this.mnf2,
      props: [this.productPropValue1, this.productPropValue4, this.productPropValue7, this.productPropValue10],
      imageUrl: '/assets/images/p2.jpg',
      rating: 2,
      recall: 2,
      supplOffers: 2,
      url: 'mobilnye_telefony.html'
    },
    {
      id: 6294898, name: 'smart/tel HUAWEI Y6II Dual Sim (black)', price: 3899,
      manufacturer: this.mnf3, props: [this.productPropValue3, this.productPropValue6, this.productPropValue9],
      imageUrl: '/assets/images/p3.jpg', rating: 4, recall: 3, supplOffers: 2, url: 'mobilnye_telefony.html'
    },
    {
      id: 6325585, name: 'smart/tel HUAWEI P8 Lite 2017 Dual Sim (white)', price: 4299,
      manufacturer: this.mnf3, props: [this.productPropValue3, this.productPropValue6, this.productPropValue9],
      imageUrl: '/assets/images/p4.jpg', rating: 3, recall: 3, supplOffers: 2, url: 'mobilnye_telefony.html'
    },
    {
      id: 6324182, name: 'smart/tel HUAWEI GR5 2017 (BLN-L21) Dual Sim (grey)', price: 4199,
      manufacturer: this.mnf3, props: [this.productPropValue3, this.productPropValue6, this.productPropValue9],
      imageUrl: '/assets/images/p5.jpg', rating: 2, recall: 2, supplOffers: 2, url: 'mobilnye_telefony.html'
    },
    {
      id: 6252121, name: 'APPLE iPhone 6s 16GB Space Gray Demo', price: 4999,
      manufacturer: this.mnf4, props: [this.productPropValue1, this.productPropValue7, this.productPropValue9],
      imageUrl: '/assets/images/p1.jpg', rating: 5, recall: 4, supplOffers: 2, url: 'mobilnye_telefony.html'
    },
    {
      id: 6202929, name: 'smart/tel SAMSUNG SM-N915F Galaxy Note Edge ZWE (white)', price: 4999,
      manufacturer: this.mnf1, props: [this.productPropValue8, this.productPropValue3, this.productPropValue2],
      imageUrl: '/assets/images/p2.jpg', rating: 5, recall: 5, supplOffers: 2, url: 'mobilnye_telefony.html'
    },
    {
      id: 6324216, name: 'smart/tel SAMSUNG SM-A520F Galaxy A5 2017 Duos ZKD (black)', price: 3899,
      manufacturer: this.mnf1, props: [this.productPropValue9, this.productPropValue1, this.productPropValue4],
      imageUrl: '/assets/images/p3.jpg', rating: 4, recall: 2, supplOffers: 2, url: 'mobilnye_telefony.html'
    },
    {
      id: 6324213, name: 'smart/tel SAMSUNG SM-A720F Galaxy A7 2017 Duos ZDD (gold)', price: 5031,
      manufacturer: this.mnf1, props: [this.productPropValue6, this.productPropValue2, this.productPropValue4],
      imageUrl: '/assets/images/p4.jpg', rating: 3, recall: 3, supplOffers: 2, url: 'mobilnye_telefony.html'
    },
    {
      id: 6161537, name: 'APPLE iPhone 5S 16Gb Space grey', price: 3899,
      manufacturer: this.mnf4, props: [this.productPropValue5, this.productPropValue5, this.productPropValue1],
      imageUrl: '/assets/images/p5.jpg', rating: 1, recall: 2, supplOffers: 2, url: 'mobilnye_telefony.html'
    },
    {
      id: 6307814, name: 'APPLE iPhone 7 32GB Rose Gold', price: 3899,
      manufacturer: this.mnf4, props: [this.productPropValue4, this.productPropValue9, this.productPropValue5],
      imageUrl: '/assets/images/p1.jpg', rating: 2, recall: 2, supplOffers: 2, url: 'mobilnye_telefony.html'
    },
    {
      id: 6343804, name: 'smart/tel XIAOMI Redmi 4X 2G/16G (black)', price: 3899,
      manufacturer: this.mnf5, props: [this.productPropValue10, this.productPropValue3, this.productPropValue2],
      imageUrl: '/assets/images/p2.jpg', rating: 3, recall: 2, supplOffers: 2, url: 'mobilnye_telefony.html'
    },
    {
      id: 6337167, name: 'smart/tel XIAOMI Mi Mix 256GB Black', price: 3899,
      manufacturer: this.mnf5, props: [this.productPropValue7, this.productPropValue7, this.productPropValue10],
      imageUrl: '/assets/images/p3.jpg', rating: 3, recall: 1, supplOffers: 2, url: 'mobilnye_telefony.html'
    },
    {
      id: 6291460, name: 'smart/tel Lenovo C2 Power Dual Sim (black)', price: 3899,
      manufacturer: this.mnf6, props: [this.productPropValue5, this.productPropValue10, this.productPropValue3],
      imageUrl: '/assets/images/p4.jpg', rating: 4, recall: 2, supplOffers: 2, url: 'mobilnye_telefony.html'
    },
    {
      id: 6316576, name: 'smart/tel LENOVO K6 Power (K33a42) Dual Sim (grey)', price: 3899,
      manufacturer: this.mnf6, props: [this.productPropValue5, this.productPropValue2, this.productPropValue6],
      imageUrl: '/assets/images/p5.jpg', rating: 5, recall: 4, supplOffers: 2, url: 'mobilnye_telefony.html'
    },
    {
      id: 6310491, name: 'smart/tel WILEYFOX Swift 2 Plus Dual Sim (Champagne Gold)', price: 3899,
      manufacturer: this.mnf7, props: [this.productPropValue9, this.productPropValue10, this.productPropValue6],
      imageUrl: '/assets/images/p1.jpg', rating: 3, recall: 3, supplOffers: 2, url: 'mobilnye_telefony.html'
    },
    {
      id: 6312913, name: 'smart/tel WILEYFOX Swift 2X Dual Sim (Mid Night blue)', price: 3899,
      manufacturer: this.mnf7, props: [this.productPropValue5, this.productPropValue10, this.productPropValue8],
      imageUrl: '/assets/images/p2.jpg', rating: 1, recall: 1, supplOffers: 2, url: 'mobilnye_telefony.html'
    },
    {
      id: 6363302, name: 'Телевизор LIBERTON 32HL1HD', price: 4599,
      manufacturer: this.mnf7, props: [this.productPropValue5, this.productPropValue10, this.productPropValue8],
      imageUrl: '/assets/images/p6.jpg', rating: 1, recall: 1, supplOffers: 2, url: 'led_televizory.html'
    },
    {
      id: 6322210, name: 'Телевизор BRAVIS LED-22F1000 Smart+T2 black', price: 4699,
      manufacturer: this.mnf7, props: [this.productPropValue5, this.productPropValue10, this.productPropValue8],
      imageUrl: '/assets/images/p6.jpg', rating: 1, recall: 1, supplOffers: 2, url: 'led_televizory.html'
    }
  ];
  // </editor-fold>

  // <editor-fold desc="Quotation"
  quotations = [
    {id: 1, idSupplier: 2, dateStart: new Date(2017, 10, 12), dateEnd: new Date(2017, 11, 12), currencyId: 0},
    {id: 2, idSupplier: 1, dateStart: new Date(2017, 10, 10), dateEnd: new Date(2017, 11, 30), currencyId: 0},
    {id: 3, idSupplier: 1, dateStart: new Date(2017, 10, 10), dateEnd: new Date(2017, 11, 30), currencyId: 1},
    {id: 4, idSupplier: 3, dateStart: new Date(2017, 10, 15), dateEnd: new Date(2017, 12, 1), currencyId: 2},
  ];
  // </editor-fold>

  // <editor-fold desc="currencies"
  currencies = [
    {id: 0, shortName: 'UAH'},
    {id: 1, shortName: 'EUR'},
    {id: 2, shortName: 'USD'}
  ];

  // </editor-fold>

  // <editor-fold desc="Suppliers">
  suppliers = [
    {id: 1, name: 'Фокстрот', paymentMethodId: 1, rating: 5},
    {id: 2, name: 'ЮК', paymentMethodId: 1, rating: 4},
    {id: 3, name: 'Samsung', paymentMethodId: 1, rating: 5},
    {id: 4, name: 'LG', paymentMethodId: 3, rating: 5},
    {id: 5, name: 'Алло', paymentMethodId: 1, rating: 3},
    {id: 6, name: 'Lenovo', paymentMethodId: 3, rating: 2}
  ];

  // </editor-fold>

  createDb() {
    const mquotationProducts = this.quotationProducts;
    const mproducts = this.products;
    const mquotation = this.quotations;
    const mcurrencies = this.currencies;
    const msuppliers = this.suppliers;

    return {mquotationProducts, mproducts, mquotation, mcurrencies, msuppliers};
  }
}
