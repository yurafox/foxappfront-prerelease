import {InMemoryDbService, RequestInfo} from "angular-in-memory-web-api";
import {ResponseOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {User} from "../../model/index";
import {IDictionary} from "../../core/app-core";
import {WebApiMockContent} from './web-api-mock-content';

export class WebApiService extends WebApiMockContent implements InMemoryDbService {

  post(info: RequestInfo) {
    let response: Observable<any> | null;
    if ((response = this.apiController(info)) !== null) return response;
  }

  put(info: RequestInfo) {
    let response: Observable<any> | null;
    if ((response = this.apiController(info)) !== null) return response;
  }

  get(info: RequestInfo) {
    let response: Observable<any> | null;
    if ((response = this.apiController(info)) !== null) return response;
  }

  productReviews = [
    {
      id: 1,
      idProduct: 6280637,
      user: "Анастасия",
      reviewDate: new Date(2017, 11, 7),
      reviewText:
      "Пользуюсь телефоном месяц, нареканий на работу нет - красивый, функциональный, быстрый. Но!!! Понадобилась функция NFC, а её не оказалось, хотя в описании на сайте производителя она есть. Как такое может быть?",
      rating: 3,
      advantages: '',
      disadvantages: 'Отсутствие NFC, заявленной производителем.',
      upvotes: 2,
      downvotes: null,
      reviewAnswers: [{
        id: 1,
        idReview: 1,
        user: 'Foxtrot support',
        answerDate: new Date(2017, 11, 8),
        answerText: 'Спасибо за Ваш отзыв!',
        upvotes: null,
        downvotes: null
      }]
    },
    {
      id: 2,
      idProduct: 6280637,
      user: "богдан зернов",
      reviewDate: new Date(2017, 4, 8),
      reviewText:
      "Классный аппарат, учитывая его стоимость. Самсунг новинки штампует много и быстро, так что этот джей5 не такой и старый, а по характеристикам очень даже и отличный. Сборка отличная, симпатичный внешне и удобно лежит в руке. Из минусов – мало памяти и слабенькие камеры.",
      rating: 4,
      advantages: '',
      disadvantages: 'мало памяти, камеры так себе',
      upvotes: 1,
      downvotes: null,
      reviewAnswers: [{
        id: 1,
        idReview: 2,
        user: 'Foxtrot support',
        answerDate: new Date(2017, 4, 8),
        answerText: 'Спасибо за Ваш отзыв!',
        upvotes: null,
        downvotes: null
      }, {
        id: 2,
        idReview: 2,
        user: 'Андрей',
        answerDate: new Date(2017, 4, 9),
        answerText: 'памяти действительно на многое не хватает, но камеры ещё сносные',
        upvotes: 1,
        downvotes: null
      }]
    },
    {
      id: 3,
      idProduct: 6280637,
      user: "максим",
      reviewDate: new Date(2017, 7, 23),
      reviewText:
      "Покупал в начале весны такой аппарат для мамы. Поскольку смартфон для нее первый, то выбирал не сильно навороченный и дорогой. Она быстро со всем разобралась, научил ее как пользоваться. В принципе памяти хоть и ало, но можно карточку всегда поставить. У мамы не игр, не еще какого то хлама не установлено, так что у нее все работает стабильно и не глючит. Для звонков, смс и мессенджеров отличный вариант и батарея при такой нагрузке 2 дня выдерживает точно. А то и больше.",
      rating: 5,
      advantages: 'цена, характеристики',
      disadvantages: '',
      upvotes: null,
      downvotes: null,
      reviewAnswers: [{
        id: 1,
        idReview: 3,
        user: 'Foxtrot support',
        answerDate: new Date(2017, 7, 23),
        answerText: 'Спасибо за Ваш отзыв!',
        upvotes: null,
        downvotes: null
      }]
    },
    {
      id: 4,
      idProduct: 6294898,
      user: "Светлана",
      reviewDate: new Date(2017, 7, 8),
      reviewText:
      "Пришло время поменять телефон,был у меня Смартфон HUAWEI Y625 ,отличный телефон,сейчас юзает старший сын, себе же взяла Смартфон HUAWEI Y6 II Dual Sim, неделю он у меня, перед покупкой прочитала кучу отзывов, понравился, о самом телефоне, экран отзывчивый,удобный в руке.Звук как для меня достаточный, слышно даже в шумном автобусе и я и меня слышат хорошо, связь тоже не пропадает,wi-fi ловит быстро, камера делает хорошие снимки, у меня перед HUAWEI была Ленова так фото леновы ужасные, батареи мне хватает на два дня, это при том что говорю много и часто пользуюсь и wi-fi и передачей данных. Телефоном довольна,надеюсь проблем не будет.",
      rating: 4,
      advantages: 'Отличный смартфон',
      disadvantages: 'Не нашла.',
      upvotes: 1,
      downvotes: 1,
      reviewAnswers: [{
        id: 1,
        idReview: 4,
        user: 'Foxtrot support',
        answerDate: new Date(2017, 7, 8),
        answerText: 'Спасибо за Ваш отзыв!',
        upvotes: null,
        downvotes: null
      }, {
        id: 2,
        idReview: 4,
        user: 'Виктория',
        answerDate: new Date(2017, 7, 11),
        answerText: 'да, смартфон действительно отличный!',
        upvotes: null,
        downvotes: 1
      }]
    }
  ];

  storeReviews = [
    {
      id: 1,
      idStore: 101462,
      user: "Анастасия",
      reviewDate: new Date(2017, 11, 7),
      reviewText: 'Хороший магазин. Чисто и всегда понятно где что находится',
      rating: 5,
      advantages: 'Товары отлично отсортированы',
      disadvantages: '',
      upvotes: 2,
      downvotes: null,
      reviewAnswers: [{
        id: 1,
        idReview: 1,
        user: 'Foxtrot support',
        answerDate: new Date(2017, 11, 8),
        answerText: 'Спасибо за Ваш отзыв! Приятно, что Вы довольны',
        upvotes: null,
        downvotes: null
      }]
    },
    {
      id: 2,
      idStore: 101462,
      user: "богдан зернов",
      reviewDate: new Date(2017, 4, 8),
      reviewText: 'в целом всё хорошо и легко нашел, что искал. Но обслуживание мне не понравилось',
      rating: 3,
      advantages: 'местоположение',
      disadvantages: 'обслуживание',
      upvotes: 1,
      downvotes: null,
      reviewAnswers: [{
        id: 1,
        idReview: 2,
        user: 'Foxtrot support',
        answerDate: new Date(2017, 4, 8),
        answerText: 'Спасибо за Ваш отзыв! Хотелось бы чтобы Вы уточнили свои замечания',
        upvotes: null,
        downvotes: null
      }, {
        id: 2,
        idReview: 2,
        user: 'богдан зернов',
        answerDate: new Date(2017, 4, 9),
        answerText: 'мне не хватило индивидуального подхода и внимания персонала магазина',
        upvotes: null,
        downvotes: null
      }, {
        id: 3,
        idReview: 2,
        user: 'Foxtrot support',
        answerDate: new Date(2017, 4, 9),
        answerText: 'Спасибо за Ваш отзыв! Мы учтём Ваши замечания',
        upvotes: 1,
        downvotes: null
      }]
    }
  ];

  // <editor-fold desc="quotationProducts"
    quotationProducts = [
    {
      id: 1,
      idQuotation: 1,
      idProduct: 6280637,
      price: 5199.0,
      maxDeliveryDays: 3,
      stockQuant: 12,
      freeShipping: true,
      actionPrice: 5000.0
    },
    {
      id: 2,
      idQuotation: 4,
      idProduct: 6293680,
      price: 349.0,
      maxDeliveryDays: 2,
      stockQuant: 0, //102
      actionPrice: null
    },
    {
      id: 3,
      idQuotation: 2,
      idProduct: 6280637,
      price: 5220.0,
      maxDeliveryDays: 5,
      stockQuant: 2,
      actionPrice: 5100.0
    },
    {
      id: 4,
      idQuotation: 3,
      idProduct: 6293680,
      price: 330.0,
      maxDeliveryDays: 2,
      stockQuant: 0, //50
      actionPrice: null
    },
    {
      id: 5,
      idQuotation: 1,
      idProduct: 6294898,
      price: 3899.0,
      maxDeliveryDays: 2,
      stockQuant: 5.0,
      actionPrice: null
    },
    {
      id: 6,
      idQuotation: 3,
      idProduct: 6280637,
      price: 167.7,
      maxDeliveryDays: 3,
      stockQuant: 28,
      actionPrice: null
    },
    {
      id: 7,
      idQuotation: 4,
      idProduct: 6337781,
      price: 13999,
      maxDeliveryDays: 2,
      stockQuant: 50,
      stockLow: true,
      freeShipping: true,
      actionPrice: null
    },
    {
      id: 8,
      idQuotation: 2,
      idProduct: 6325585,
      price: 3600,
      maxDeliveryDays: 2,
      stockQuant: 61,
      actionPrice: 3000
    },
    {
      id: 9,
      idQuotation: 1,
      idProduct: 6325585,
      price: 3500,
      maxDeliveryDays: 2,
      stockQuant: 54,
      actionPrice: 3400
    },
    {
      id: 10,
      idQuotation: 1,
      idProduct: 6324182,
      price: 4600,
      maxDeliveryDays: 2,
      stockQuant: 68,
      actionPrice: null
    },
    {
      id: 11,
      idQuotation: 4,
      idProduct: 6324182,
      price: 185,
      maxDeliveryDays: 3,
      stockQuant: 30,
      actionPrice: null
    },
    {
      id: 12,
      idQuotation: 2,
      idProduct: 6252121,
      price: 6000,
      maxDeliveryDays: 2,
      stockQuant: 70,
      actionPrice: null
    },
    {
      id: 13,
      idQuotation: 4,
      idProduct: 6252121,
      price: 499,
      maxDeliveryDays: 3,
      stockQuant: 43,
      actionPrice: null
    },
    {
      id: 14,
      idQuotation: 1,
      idProduct: 6202929,
      price: 4600,
      maxDeliveryDays: 2,
      stockQuant: 30,
      actionPrice: null
    },
    {
      id: 15,
      idQuotation: 3,
      idProduct: 6202929,
      price: 150,
      maxDeliveryDays: 2,
      stockQuant: 10,
      actionPrice: null
    },
    {
      id: 16,
      idQuotation: 2,
      idProduct: 6324216,
      price: 4599,
      maxDeliveryDays: 2,
      stockQuant: 40,
      actionPrice: null
    },
    {
      id: 17,
      idQuotation: 1,
      idProduct: 6324216,
      price: 4630,
      maxDeliveryDays: 3,
      stockQuant: 24,
      actionPrice: null
    },
    {
      id: 18,
      idQuotation: 3,
      idProduct: 6324213,
      price: 120,
      maxDeliveryDays: 2,
      stockQuant: 29,
      actionPrice: null
    },
    {
      id: 19,
      idQuotation: 1,
      idProduct: 6324213,
      price: 3270,
      maxDeliveryDays: 2,
      stockQuant: 15,
      actionPrice: null
    }
  ];
  // </editor-fold>

  // <editor-fold desc="manufacturers"
  manufacturers = [
    {id: 220, name: "SAMSUNG"},
    {id: 109483, name: "BRAVIS"},
    {id: 114733, name: "HUAWEI"},
    {id: 5581, name: "APPLE"},
    {id: 118920, name: "XIAOMI"},
    {id: 107996, name: "LENOVO"},
    {id: 120815, name: "WILEYFOX"}
  ];
  // </editor-fold>

  measureUnits = [
    { id:8796093088356, name:'В'},
    { id:8796093055588, name:'дБА'},
    { id:8796093383268, name:'м2'},
    { id:8796093416036, name:'Дж'},
    { id:8796093579876, name:'сек'},
    { id:8796093612644, name:'м3'},
    { id:8796093776484, name:'грн.'},
    { id:8796093809252, name:'Лм'},
    { id:8796093940324, name:'кг/м2'},
    { id:8796094005860, name:'листов'},
    { id:8796094169700, name:'мл'},
    { id:8796094202468, name:'мВ/Па'},
    { id:8796094333540, name:'pix'},
    { id:8796094399076, name:'л/ч'},
    { id:8796094464612, name:'мс'},
    { id:8796094595684, name:'кратный'},
    { id:8796094693988, name:'песен'},
    { id:8796094759524, name:'мин'},
    { id:8796094988900, name:'Вт/канал'},
    { id:8796094956132, name:'x'},
    { id:8796095021668, name:'кВт/24 ч'},
    { id:8796095152740, name:'MT/s (MHz)'},
    { id:8796095185508, name:'куб.м./ч'},
    { id:8796095316580, name:'л/цикл'},
    { id:8796095382116, name:'люкс'},
    { id:8796095513188, name:'л'},
    { id:8796095578724, name:'БТЕ/ч'},
    { id:8796095775332, name:'МБ/с'},
    { id:8796095939172, name:'у.е.'},
    { id:8796095906404, name:'номеров'},
    { id:8796096103012, name:'стр.'},
    { id:8796096168548, name:'GHz'},
    { id:8796096299620, name:'кВт.ч/Год'},
    { id:8796096365156, name:'г/ч'},
    { id:8796096528996, name:'г/мин'},
    { id:8796096561764, name:'строк/мин'},
    { id:8796096692836, name:'мА'},
    { id:8796096758372, name:'ВА'},
    { id:8796096954980, name:'°C'},
    { id:8796097151588, name:'градус'},
    { id:8796097118820, name:'А'},
    { id:8796097348196, name:'мес.'},
    { id:8796097380964, name:'комплектов посуды'},
    { id:8796097479268, name:'х'},
    { id:8796158689892, name:'мс/строка'},
    { id:8796093186660, name:'тыс.слов'},
    { id:8796093317732, name:'Мбит/сек'},
    { id:8796093514340, name:'К'},
    { id:8796093710948, name:'бит'},
    { id:8796093907556, name:'кГц'},
    { id:8796094136932, name:'ч'},
    { id:8796094300772, name:'кг'},
    { id:8796094530148, name:'нот'},
    { id:8796094726756, name:'режима'},
    { id:8796094857828, name:'мл/час'},
    { id:8796095054436, name:'Мб'},
    { id:8796095283812, name:'NULL'},
    { id:8796095480420, name:'г'},
    { id:8796095677028, name:'°'},
    { id:8796095709796, name:'мБар'},
    { id:8796095873636, name:'ShA'},
    { id:8796096070244, name:'dpi'},
    { id:8796096266852, name:'lb'},
    { id:8796096463460, name:'м3/г'},
    { id:8796096660068, name:'мАч'},
    { id:8796096856676, name:'кд/м2'},
    { id:8796096987748, name:'л.с/Вт'},
    { id:8796097053284, name:'гГц'},
    { id:8796097249892, name:'мм рт ст'},
    { id:8796097446500, name:'мм Н20'},
    { id:8796158820964, name:'кВт/ч'},
    { id:8796158886500, name:'м3/ч'},
    { id:8796158722660, name:'мВт'},
    { id:8796158657124, name:'M'},
    { id:8796158853732, name:'зн/сек'},
    { id:8796093153892, name:'дюйм'},
    { id:8796093252196, name:'Нм'},
    { id:8796093448804, name:'K'},
    { id:8796093645412, name:'А/4Ом'},
    { id:8796093874788, name:'Вт'},
    { id:8796094071396, name:'ANSI Lm'},
    { id:8796094268004, name:'Мб/сек'},
    { id:8796094562916, name:'мм/H2O'},
    { id:8796094792292, name:'кг/ч'},
    { id:8796094923364, name:'cм'},
    { id:8796095119972, name:'адресатов'},
    { id:8796095349348, name:'кВт'},
    { id:8796095545956, name:'пл'},
    { id:8796095742564, name:'градусов'},
    { id:8796095971940, name:'bar/psi'},
    { id:8796096135780, name:'колебаний/мин'},
    { id:8796096332388, name:'см'},
    { id:8796096496228, name:'Гб'},
    { id:8796096725604, name:'кг/мин'},
    { id:8796096889444, name:'км'},
    { id:8796097184356, name:'л/сутки'},
    { id:8796097315428, name:'см3'},
    { id:8796093121124, name:'г/м?'},
    { id:8796093219428, name:'км/ч'},
    { id:8796093284964, name:'записей'},
    { id:8796093350500, name:'кг/сп.м'},
    { id:8796093481572, name:'м/с'},
    { id:8796093547108, name:'Вт/кг'},
    { id:8796093678180, name:'об./мин'},
    { id:8796093743716, name:'стр./мин'},
    { id:8796093842020, name:'С'},
    { id:8796093973092, name:'см2'},
    { id:8796094038628, name:'уд/мин'},
    { id:8796094104164, name:'л.с.'},
    { id:8796094235236, name:'от/до'},
    { id:8796094366308, name:'А/ч'},
    { id:8796094431844, name:'пикс.'},
    { id:8796094497380, name:'мм/Вт'},
    { id:8796094628452, name:'MHz'},
    { id:8796094661220, name:'комплектов'},
    { id:8796094825060, name:'Ач'},
    { id:8796094890596, name:'° Л'},
    { id:8796095087204, name:'Гц'},
    { id:8796095218276, name:'разрядов'},
    { id:8796095251044, name:'м2/ч'},
    { id:8796095414884, name:'бар'},
    { id:8796095447652, name:'Мп'},
    { id:8796095611492, name:'дней'},
    { id:8796095644260, name:'шт'},
    { id:8796095808100, name:'вызовов'},
    { id:8796095840868, name:'%'},
    { id:8796096004708, name:'м/мин'},
    { id:8796096037476, name:'"'},
    { id:8796096201316, name:'МГц'},
    { id:8796096234084, name:'измерений'},
    { id:8796096397924, name:'кОм'},
    { id:8796096430692, name:'±°'},
    { id:8796096594532, name:'кВт/сутки'},
    { id:8796096627300, name:'м'},
    { id:8796096791140, name:'мм'},
    { id:8796096823908, name:'кбит/сек'},
    { id:8796096922212, name:'(стр. A4 при 5%-ном заполнении)'},
    { id:8796097020516, name:'кВт/год'},
    { id:8796097086052, name:'Сим/сек'},
    { id:8796097217124, name:'Мбит/с'},
    { id:8796097282660, name:'бар/мПа'},
    { id:8796097413732, name:'В (Гц)'},
    { id:8796097512036, name:'Ом'},
    { id:8796125823588, name:'.'},
    { id:8796158591588, name:'кадр/сек'},
    { id:8796158755428, name:'л/мин'},
    { id:8796158624356, name:'дБ'},
    { id:8796158788196, name:'DIN'}
  ];
  // <editor-fold desc="products">
  // <editor-fold desc='prop'>
  private prop1 = {
    id: 7,
    name: "Количество SIM",
    prop_type: 2,
    is_Multi_Select: true,
    url: null,
    predestination: true
  };
  private prop2 = {
    id: 12,
    name: "Встроенная память",
    prop_type: 4,
    is_Multi_Select: null,
    url: null,
    predestination: true
  };
  private prop3 = {
    id: 13,
    name: "Диагональ дисплея",
    prop_type: 4,
    is_Multi_Select: null,
    url: null,
    predestination: true
  };
  private prop4 = {
    id: 10,
    name: "Тип сетевой вилки",
    prop_type: 4,
    is_Multi_Select: null,
    url: null,
    predestination: false
  };
  // </editor-fold>
  // <editor-fold desc='propEnumList'
  private propEnumList1 = {
    id: 17,
    id_Prop: this.prop2,
    name: "16 Гб",
    list_Index: 100,
    bit_Index: null,
    url: null
  };
  private propEnumList2 = {
    id: 18,
    id_Prop: this.prop2,
    name: "32 Мб",
    list_Index: 50,
    bit_Index: null,
    url: null
  };
  private propEnumList3 = {
    id: 19,
    id_Prop: this.prop3,
    name: '1.8"',
    list_Index: 50,
    bit_Index: null,
    url: null
  };
  private propEnumList4 = {
    id: 20,
    id_Prop: this.prop3,
    name: '5.2"',
    list_Index: 90,
    bit_Index: null,
    url: null
  };
  private propEnumList5 = {
    id: 21,
    id_Prop: this.prop3,
    name: '5.5"',
    list_Index: 100,
    bit_Index: null,
    url: null
  };
  private propEnumList6 = {
    id: 4,
    id_Prop: this.prop4,
    name: "EURO",
    list_Index: 1,
    bit_Index: null,
    url: null
  };
  private propEnumList7 = {
    id: 5,
    id_Prop: this.prop4,
    name: "UK",
    list_Index: 0,
    bit_Index: null,
    url: null
  };
  private propEnumList8 = {
    id: 6,
    id_Prop: this.prop4,
    name: "US",
    list_Index: 2,
    bit_Index: null,
    url: null
  };
  // </editor-fold>
  // <editor-fold desc='productPropValue'
  private productPropValue1 = {
    id: 1,
    id_Product: 6293680,
    id_Prop: this.prop2,
    prop_Value_Str: null,
    prop_Value_Number: null,
    prop_Value_Bool: null,
    prop_Value_Enum: this.propEnumList1,
    prop_Value_Long: null,
    id_Measure_Unit: 8796097184356
  };
  private productPropValue2 = {
    id: 2,
    id_Product: 6280637,
    id_Prop: this.prop2,
    prop_Value_Str: null,
    prop_Value_Number: null,
    prop_Value_Bool: null,
    prop_Value_Enum: this.propEnumList1,
    prop_Value_Long: null,
    id_Measure_Unit: 8796093743716

  };
  private productPropValue3 = {
    id: 3,
    id_Product: 6294898,
    id_Prop: this.prop2,
    prop_Value_Str: null,
    prop_Value_Number: null,
    prop_Value_Bool: null,
    prop_Value_Enum: this.propEnumList1,
    prop_Value_Long: null,
    id_Measure_Unit: 8796095644260
  };
  private productPropValue4 = {
    id: 4,
    id_Product: 6293680,
    id_Prop: this.prop3,
    prop_Value_Str: null,
    prop_Value_Number: null,
    prop_Value_Bool: null,
    prop_Value_Enum: this.propEnumList3,
    prop_Value_Long: null,
    id_Measure_Unit: 8796095644260
  };
  private productPropValue5 = {
    id: 5,
    id_Product: 6280637,
    id_Prop: this.prop3,
    prop_Value_Str: null,
    prop_Value_Number: null,
    prop_Value_Bool: null,
    prop_Value_Enum: this.propEnumList4,
    prop_Value_Long: null,
    id_Measure_Unit: 8796095447652
  };
  private productPropValue6 = {
    id: 6,
    id_Product: 6294898,
    id_Prop: this.prop3,
    prop_Value_Str: null,
    prop_Value_Number: null,
    prop_Value_Bool: null,
    prop_Value_Enum: this.propEnumList5,
    prop_Value_Long: null,
    id_Measure_Unit: 8796095644260
  };
  private productPropValue7 = {
    id: 7,
    id_Product: 6293680,
    id_Prop: this.prop1,
    prop_Value_Str: null,
    prop_Value_Number: 1,
    prop_Value_Bool: null,
    prop_Value_Enum: null,
    prop_Value_Long: null,
    id_Measure_Unit: 8796095644260
  };
  private productPropValue8 = {
    id: 8,
    id_Product: 6280637,
    id_Prop: this.prop1,
    prop_Value_Str: null,
    prop_Value_Number: 2,
    prop_Value_Bool: null,
    prop_Value_Enum: null,
    prop_Value_Long: null,
    id_Measure_Unit: 8796096823908
  };
  private productPropValue9 = {
    id: 9,
    id_Product: 6294898,
    id_Prop: this.prop1,
    prop_Value_Str: null,
    prop_Value_Number: 2,
    prop_Value_Bool: null,
    prop_Value_Enum: null,
    prop_Value_Long: null,
    id_Measure_Unit: 8796095644260
  };
  private productPropValue10 = {
    id: 10,
    id_Product: 6293680,
    id_Prop: this.prop4,
    prop_Value_Str: null,
    prop_Value_Number: null,
    prop_Value_Bool: null,
    prop_Value_Enum: this.propEnumList6,
    prop_Value_Long: null,
    id_Measure_Unit: 8796158755428
  };
  // </editor-fold>

  productDescriptions = [
    {id: 6280637, description: 'Description1'},
    {id: 6294898, description: 'Description2'},
    {id: 6293680, description: 'Description2'},
    {id: 6325585, description: 'Description2'},
    {id: 6324182, description: 'Description2'},
    {id: 6252121, description: 'Description2'},
    {id: 6202929, description: 'Description2'},
    {id: 6324216, description: 'Description2'},
    {id: 6324213, description: 'Description2'},
    {id: 6161537, description: 'Description2'},
    {id: 6307814, description: 'Description2'},
    {id: 6343804, description: 'Description2'},
    {id: 6337167, description: 'Description2'},
    {id: 6291460, description: 'Description2'},
    {id: 6316576, description: 'Description2'},
    {id: 6310491, description: 'Description2'},
    {id: 6312913, description: 'Description2'},
    {id: 6363302, description: 'Description2'},
    {id: 6337781, description: 'Description2'}

  ];

  productImages = [
    {id: 6280637, images: ['assets/imgs/p1.jpg', 'assets/imgs/p3.jpg']},
    {id: 6294898, images: ['assets/imgs/p1.jpg', 'assets/imgs/p3.jpg']},
    {id: 6293680, images: ['assets/imgs/p1.jpg', 'assets/imgs/p3.jpg']},
    {id: 6325585, images: ['assets/imgs/p1.jpg', 'assets/imgs/p3.jpg']},
    {id: 6324182, images: ['assets/imgs/p1.jpg', 'assets/imgs/p3.jpg']},
    {id: 6252121, images: ['assets/imgs/p1.jpg', 'assets/imgs/p3.jpg']},
    {id: 6202929, images: ['assets/imgs/p1.jpg', 'assets/imgs/p3.jpg']},
    {id: 6324216, images: ['assets/imgs/p1.jpg', 'assets/imgs/p3.jpg']},
    {id: 6324213, images: ['assets/imgs/p1.jpg', 'assets/imgs/p3.jpg']},
    {id: 6161537, images: ['assets/imgs/p1.jpg', 'assets/imgs/p3.jpg']},
    {id: 6307814, images: ['assets/imgs/p1.jpg', 'assets/imgs/p3.jpg']},
    {id: 6343804, images: ['assets/imgs/p1.jpg', 'assets/imgs/p3.jpg']},
    {id: 6337167, images: ['assets/imgs/p1.jpg', 'assets/imgs/p3.jpg']},
    {id: 6291460, images: ['assets/imgs/p1.jpg', 'assets/imgs/p3.jpg']},
    {id: 6316576, images: ['assets/imgs/p1.jpg', 'assets/imgs/p3.jpg']},
    {id: 6310491, images: ['assets/imgs/p1.jpg', 'assets/imgs/p3.jpg']},
    {id: 6312913, images: ['assets/imgs/p1.jpg', 'assets/imgs/p3.jpg']},
    {id: 6363302, images: ['assets/imgs/p1.jpg', 'assets/imgs/p3.jpg']},
    {id: 6337781, images: ['assets/imgs/p1.jpg', 'assets/imgs/p3.jpg']}
  ];

  products = [
    {
      id: 6280637,
      name: "smart/tel SAMSUNG SM-J510H Galaxy J5 Duos ZDD (gold)",
      price: 5031,
      oldPrice: 6000,
      bonuses: 700,
      manufacturerId: 220,
      props: [
        this.productPropValue2,
        this.productPropValue5,
        this.productPropValue8
      ],
      imageUrl: "assets/imgs/p1.jpg",
      rating: 1,
      recall: 3,
      supplOffers: 3,
      url: "mobilnye_telefony.html",
      slideImageUrls: [
        "assets/imgs/product-images/medium/6280637-0.jpg",
        "assets/imgs/product-images/medium/6280637-1.jpg",
        "assets/imgs/product-images/medium/6280637-2.jpg",
        "assets/imgs/product-images/medium/6280637-3.jpg"
      ],
      barcode: "706NTXR9Z586"
    },
    {
      id: 6293680,
      name: "Mob/tel BRAVIS F181 BELL (black)",
      price: 330,
      manufacturerId: 109483,
      props: [
        this.productPropValue1,
        this.productPropValue4,
        this.productPropValue7,
        this.productPropValue10
      ],
      imageUrl: "assets/imgs/p2.jpg",
      rating: 2,
      recall: 0,
      supplOffers: 2,
      url: "mobilnye_telefony.html",
      barcode: "209894D226AA"
    },
    {
      id: 6294898,
      name: "smart/tel HUAWEI Y6II Dual Sim (black)",
      price: 3899,
      oldPrice: 4599,
      manufacturerId: 114733,
      props: [
        this.productPropValue3,
        this.productPropValue6,
        this.productPropValue9
      ],
      imageUrl: "assets/imgs/p3.jpg",
      rating: 4,
      recall: 1,
      supplOffers: 2,
      url: "mobilnye_telefony.html",
      slideImageUrls: [
        "assets/imgs/product-images/medium/6294898-0.jpg",
        "assets/imgs/product-images/medium/6294898-1.jpg",
        "assets/imgs/product-images/medium/6294898-2.jpg",
        "assets/imgs/product-images/medium/6294898-4.jpg"
      ]
    },
    {
      id: 6325585,
      name: "smart/tel HUAWEI P8 Lite 2017 Dual Sim (white)",
      price: 4299,
      manufacturerId: 114733,
      props: [
        this.productPropValue3,
        this.productPropValue6,
        this.productPropValue9
      ],
      imageUrl: "assets/imgs/p4.jpg",
      rating: 3,
      recall: 0,
      supplOffers: 2,
      url: "mobilnye_telefony.html"
    },
    {
      id: 6324182,
      name: "smart/tel HUAWEI GR5 2017 (BLN-L21) Dual Sim (grey)",
      price: 4199,
      manufacturerId: 114733,
      props: [
        this.productPropValue3,
        this.productPropValue6,
        this.productPropValue9
      ],
      imageUrl: "assets/imgs/p5.jpg",
      rating: 2,
      recall: 0,
      supplOffers: 2,
      url: "mobilnye_telefony.html"
    },
    {
      id: 6252121,
      name: "APPLE iPhone 6s 16GB Space Gray Demo",
      price: 4999,
      manufacturerId: 5581,
      props: [
        this.productPropValue1,
        this.productPropValue7,
        this.productPropValue9
      ],
      imageUrl: "assets/imgs/p1.jpg",
      rating: 5,
      recall: 0,
      supplOffers: 2,
      url: "mobilnye_telefony.html"
    },
    {
      id: 6202929,
      name: "smart/tel SAMSUNG SM-N915F Galaxy Note Edge ZWE (white)",
      price: 4999,
      manufacturerId: 5581,
      props: [
        this.productPropValue8,
        this.productPropValue3,
        this.productPropValue2
      ],
      imageUrl: "assets/imgs/p2.jpg",
      rating: 5,
      recall: 0,
      supplOffers: 2,
      url: "mobilnye_telefony.html"
    },
    {
      id: 6324216,
      name: "smart/tel SAMSUNG SM-A520F Galaxy A5 2017 Duos ZKD (black)",
      price: 3899,
      manufacturerId: 220,
      props: [
        this.productPropValue9,
        this.productPropValue1,
        this.productPropValue4
      ],
      imageUrl: "assets/imgs/p3.jpg",
      rating: 4,
      recall: 0,
      supplOffers: 2,
      url: "mobilnye_telefony.html"
    },
    {
      id: 6324213,
      name: "smart/tel SAMSUNG SM-A720F Galaxy A7 2017 Duos ZDD (gold)",
      price: 5031,
      manufacturerId: 220,
      props: [
        this.productPropValue6,
        this.productPropValue2,
        this.productPropValue4
      ],
      imageUrl: "assets/imgs/p4.jpg",
      rating: 3,
      recall: 0,
      supplOffers: 2,
      url: "mobilnye_telefony.html"
    },
    {
      id: 6161537,
      name: "APPLE iPhone 5S 16Gb Space grey",
      price: 3899,
      manufacturerId: 5581,
      props: [
        this.productPropValue5,
        this.productPropValue5,
        this.productPropValue1
      ],
      imageUrl: "assets/imgs/p5.jpg",
      rating: 1,
      recall: 0,
      supplOffers: 2,
      url: "mobilnye_telefony.html"
    },
    {
      id: 6307814,
      name: "APPLE iPhone 7 32GB Rose Gold",
      price: 3899,
      manufacturerId: 5581,
      props: [
        this.productPropValue4,
        this.productPropValue9,
        this.productPropValue5
      ],
      imageUrl: "assets/imgs/p1.jpg",
      rating: 2,
      recall: 0,
      supplOffers: 2,
      url: "mobilnye_telefony.html"
    },
    {
      id: 6343804,
      name: "smart/tel XIAOMI Redmi 4X 2G/16G (black)",
      price: 3899,
      manufacturerId: 118920,
      props: [
        this.productPropValue10,
        this.productPropValue3,
        this.productPropValue2
      ],
      imageUrl: "assets/imgs/p2.jpg",
      rating: 3,
      recall: 0,
      supplOffers: 2,
      url: "mobilnye_telefony.html"
    },
    {
      id: 6337167,
      name: "smart/tel XIAOMI Mi Mix 256GB Black",
      price: 3899,
      manufacturerId: 118920,
      props: [
        this.productPropValue7,
        this.productPropValue7,
        this.productPropValue10
      ],
      imageUrl: "assets/imgs/p3.jpg",
      rating: 3,
      recall: 0,
      supplOffers: 2,
      url: "mobilnye_telefony.html"
    },
    {
      id: 6291460,
      name: "smart/tel Lenovo C2 Power Dual Sim (black)",
      price: 3899,
      manufacturerId: 107996,
      props: [
        this.productPropValue5,
        this.productPropValue10,
        this.productPropValue3
      ],
      imageUrl: "assets/imgs/p4.jpg",
      rating: 4,
      recall: 0,
      supplOffers: 2,
      url: "mobilnye_telefony.html"
    },
    {
      id: 6316576,
      name: "smart/tel LENOVO K6 Power (K33a42) Dual Sim (grey)",
      price: 3899,
      manufacturerId: 107996,
      props: [
        this.productPropValue5,
        this.productPropValue2,
        this.productPropValue6
      ],
      imageUrl: "assets/imgs/p5.jpg",
      rating: 5,
      recall: 0,
      supplOffers: 2,
      url: "mobilnye_telefony.html"
    },
    {
      id: 6310491,
      name: "smart/tel WILEYFOX Swift 2 Plus Dual Sim (Champagne Gold)",
      price: 3899,
      manufacturerId: 120815,
      props: [
        this.productPropValue9,
        this.productPropValue10,
        this.productPropValue6
      ],
      imageUrl: "assets/imgs/p1.jpg",
      rating: 3,
      recall: 0,
      supplOffers: 2,
      url: "mobilnye_telefony.html"
    },
    {
      id: 6312913,
      name: "smart/tel WILEYFOX Swift 2X Dual Sim (Mid Night blue)",
      price: 3899,
      manufacturerId: 120815,
      props: [
        this.productPropValue5,
        this.productPropValue10,
        this.productPropValue8
      ],
      imageUrl: "assets/imgs/p2.jpg",
      rating: 1,
      recall: 0,
      supplOffers: 2,
      url: "mobilnye_telefony.html"
    },
    {
      id: 6363302,
      name: "Телевизор LIBERTON 32HL1HD",
      price: 4599,
      manufacturerId: 120815,
      props: [
        this.productPropValue5,
        this.productPropValue10,
        this.productPropValue8
      ],
      imageUrl: "assets/imgs/p6.jpg",
      rating: 1,
      recall: 0,
      supplOffers: 2,
      url: "led_televizory.html"
    },
    {
      id: 6337781,
      name: "Телевизор SAMSUNG UE32M5500AUXUA",
      price: 13999,
      oldPrice: 14299,
      bonuses: 1399,
      manufacturerId: 220,
      props: [
        this.productPropValue5,
        this.productPropValue10,
        this.productPropValue8
      ],
      imageUrl: "assets/imgs/6337781.jpg",
      rating: 1,
      recall: 0,
      supplOffers: 2,
      url: "led_televizory.html",
      barcode: "294157438438"
    }
  ];
  // </editor-fold>

  // <editor-fold desc="Quotation"
  quotations = [
    {
      id: 1,
      idSupplier: 2,
      dateStart: new Date(2017, 10, 12),
      dateEnd: new Date(2017, 11, 12),
      currencyId: 0
    },
    {
      id: 2,
      idSupplier: 1,
      dateStart: new Date(2017, 10, 10),
      dateEnd: new Date(2017, 11, 30),
      currencyId: 0
    },
    {
      id: 3,
      idSupplier: 1,
      dateStart: new Date(2017, 10, 10),
      dateEnd: new Date(2017, 11, 30),
      currencyId: 1
    },
    {
      id: 4,
      idSupplier: 3,
      dateStart: new Date(2017, 10, 15),
      dateEnd: new Date(2017, 12, 1),
      currencyId: 2
    }
  ];
  // </editor-fold>

  // <editor-fold desc="currencies"
  currencies = [
    {id: 0, shortName: "UAH"},
    {id: 1, shortName: "EUR"},
    {id: 2, shortName: "USD"}
  ];

  // </editor-fold>

  // <editor-fold desc="Suppliers">
  suppliers = [
    {
      id: 1,
      name: 'ТОВ "САВ-Дістрібюшн"',
      paymentMethodId: 1,
      rating: 5,
      positiveFeedbackPct: "98.3",
      refsCount: "14580"
    },
    {
      id: 2,
      name: 'ТОВ "Інвестком"',
      paymentMethodId: 1,
      rating: 4,
      positiveFeedbackPct: "83.2",
      refsCount: "245"
    },
    {
      id: 3,
      name: "Samsung",
      paymentMethodId: 1,
      rating: 5,
      positiveFeedbackPct: "21",
      refsCount: "5548"
    },
    {
      id: 4,
      name: "LG",
      paymentMethodId: 3,
      rating: 5,
      positiveFeedbackPct: "14",
      refsCount: "5824"
    },
    {
      id: 5,
      name: "Алло",
      paymentMethodId: 1,
      rating: 3,
      positiveFeedbackPct: "35",
      refsCount: "254"
    },
    {
      id: 6,
      name: "Lenovo",
      paymentMethodId: 3,
      rating: 2,
      positiveFeedbackPct: "36.6",
      refsCount: "77"
    }
  ];
  // </editor-fold>

  // <editor-fold desc="cities"
  cities = [
    {id: 1, name: "Александрия"},
    {id: 2, name: "Бахмут"},
    {id: 3, name: "Белая Церковь"},
    {id: 4, name: "Белгород-Днестровский"},
    {id: 5, name: "Бердичев"},
    {id: 6, name: "Бердянск"},
    {id: 7, name: "Борисполь"},
    {id: 8, name: "Бровары"},
    {id: 9, name: "Васильков"},
    {id: 10, name: "Винница"},
    {id: 11, name: "Вознесенск"},
    {id: 12, name: "Днепр"},
    {id: 13, name: "Дрогобыч"},
    {id: 14, name: "Дубно"},
    {id: 15, name: "Житомир"},
    {id: 16, name: "Запорожье"},
    {id: 17, name: "Ивано-Франковск"},
    {id: 18, name: "Измаил"},
    {id: 19, name: "Ирпень"},
    {id: 20, name: "Калуш"},
    {id: 21, name: "Каменец-Подольский"},
    {id: 22, name: "Каменское"},
    {id: 23, name: "Киев"},
    {id: 24, name: "Ковель"},
    {id: 25, name: "Коломыя"},
    {id: 26, name: "Конотоп"},
    {id: 27, name: "Коростень"},
    {id: 28, name: "Краматорск"},
    {id: 29, name: "Кременчуг"},
    {id: 30, name: "Кривой Рог"},
    {id: 31, name: "Кропивницкий"},
    {id: 32, name: "Ладыжин"},
    {id: 33, name: "Лиман"},
    {id: 34, name: "Лисичанск"},
    {id: 35, name: "Лубны"},
    {id: 36, name: "Луцк"},
    {id: 37, name: "Львов"},
    {id: 38, name: "Мариуполь"},
    {id: 39, name: "Мелитополь"},
    {id: 40, name: "Миргород"},
    {id: 41, name: "Мукачево"},
    {id: 42, name: "Николаев"},
    {id: 43, name: "Надвирна"},
    {id: 44, name: "Нежин"},
    {id: 45, name: "Нетешин"},
    {id: 46, name: "Никополь"},
    {id: 47, name: "Новая Каховка"},
    {id: 48, name: "Новомосковск"},
    {id: 49, name: "Обухов"},
    {id: 50, name: "Одесса"},
    {id: 51, name: "Павлоград"},
    {id: 52, name: "Первомайск"},
    {id: 53, name: "Подольск"},
    {id: 54, name: "Покров"},
    {id: 55, name: "Покровск"},
    {id: 56, name: "Полтава"},
    {id: 57, name: "Прилуки"},
    {id: 58, name: "Ровно"},
    {id: 59, name: "Ромны"},
    {id: 60, name: "Рубежное"},
    {id: 61, name: "Самбор"},
    {id: 62, name: "Северодонецк"},
    {id: 63, name: "Славута"},
    {id: 64, name: "Славянск"},
    {id: 65, name: "Смела"},
    {id: 66, name: "Сокольники"},
    {id: 67, name: "Старобельск"},
    {id: 68, name: "Стрый"},
    {id: 69, name: "Сумы"},
    {id: 70, name: "Тернополь"},
    {id: 71, name: "Токмак"},
    {id: 72, name: "Ужгород"},
    {id: 73, name: "Умань"},
    {id: 74, name: "Фастов"},
    {id: 75, name: "Харьков"},
    {id: 76, name: "Херсон"},
    {id: 77, name: "Хмельницкий"},
    {id: 78, name: "Хуст"},
    {id: 79, name: "Червоноград"},
    {id: 80, name: "Черкассы"},
    {id: 81, name: "Чернигов"},
    {id: 82, name: "Черновцы"},
    {id: 83, name: "Черноморск"},
    {id: 84, name: "Шепетовка"},
    {id: 85, name: "Шостка"},
    {id: 86, name: "Энергодар"},
    {id: 87, name: "Южноукраинск"},
    {id: 88, name: "Южный"}
  ];
  // </editor-fold>

  // <editor-fold desc="stores"
  stores = [{
    "id": 111687,
    "idCity": 38044,
    "address": "просп. Победы, 87",
    "lat": 50.456652,
    "lng": 30.383364,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 111690,
    "idCity": 38044,
    "address": "ул. Маршала Тимошенко, 29",
    "lat": 50.512887,
    "lng": 30.501184,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 113213,
    "idCity": 38044,
    "address": "ул. Инженерная, 1",
    "lat": 50.401083,
    "lng": 30.564406,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 116291,
    "idCity": 38044,
    "address": "ул. Шелковичная, 12",
    "lat": 50.44442,
    "lng": 30.532475,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1125038,
    "idCity": 38044,
    "address": "ул. Ревуцкого, 33",
    "lat": 50.40654,
    "lng": 30.650285,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1125039,
    "idCity": 38044,
    "address": "просп. Свободы, 26",
    "lat": 50.513824,
    "lng": 30.424669,
    "openTime": "09:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1125040,
    "idCity": 38044,
    "address": "ул. Чернобыльская, 16/80",
    "lat": 50.460521,
    "lng": 30.346947,
    "openTime": "09:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1125726,
    "idCity": 3804463,
    "address": "ул. Ярослава Мудрого, 40",
    "lat": 49.798074,
    "lng": 30.121703,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1135618,
    "idCity": 38044,
    "address": "ул. Вербицкого, 18",
    "lat": 50.408347,
    "lng": 30.655134,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1136013,
    "idCity": 38053619,
    "address": "ул. Ленина, 19",
    "lat": 46.303266,
    "lng": 30.655916,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1136014,
    "idCity": 3804841,
    "address": "просп. Суворова, 23",
    "lat": 45.338127,
    "lng": 28.833221,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1136015,
    "idCity": 38048,
    "address": "ул. Преображенская, 62",
    "lat": 46.477658,
    "lng": 30.731983,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1136017,
    "idCity": 38048,
    "address": "ул. Новощепной ряд (Эстонская ), 2",
    "lat": 46.46902,
    "lng": 30.73735,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1136018,
    "idCity": 38048,
    "address": "ул. Краснова, 12",
    "lat": 46.432074,
    "lng": 30.728775,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1136019,
    "idCity": 38048,
    "address": "ул. Семёна Палия, 125б",
    "lat": 46.582641,
    "lng": 30.801813,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1136020,
    "idCity": 38048,
    "address": "ул. Черноморского Казачества, 161",
    "lat": 46.526337,
    "lng": 30.728832,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1136021,
    "idCity": 38048,
    "address": "просп. Маршала Жукова , 4",
    "lat": 46.412266,
    "lng": 30.707576,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1138567,
    "idCity": 3804841,
    "address": "просп. Ленина, 12",
    "lat": 45.35724,
    "lng": 28.819278,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1139627,
    "idCity": 38046,
    "address": "просп. Мира, 35",
    "lat": 51.495111,
    "lng": 31.294175,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1139629,
    "idCity": 38046,
    "address": "просп. Мира, 49",
    "lat": 51.499163,
    "lng": 31.289415,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1140548,
    "idCity": 38048,
    "address": "ул. Пантелеймоновская, 25",
    "lat": 46.469765,
    "lng": 30.732542,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1140597,
    "idCity": 38044,
    "address": "просп. Освободителей, 17",
    "lat": 50.463367,
    "lng": 30.599076,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1141327,
    "idCity": 38046,
    "address": "ул. Рокоссовского, 18а",
    "lat": 51.513535,
    "lng": 31.323956,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1141562,
    "idCity": 38051,
    "address": "ул. Ленина, 177а",
    "lat": 46.964551,
    "lng": 32.017773,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1141563,
    "idCity": 38051,
    "address": "просп. Центральный, 259/1",
    "lat": 46.963794,
    "lng": 32.025583,
    "openTime": "09:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1141565,
    "idCity": 38051,
    "address": "просп. Корабелов, 14",
    "lat": 46.85527,
    "lng": 32.013827,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1141567,
    "idCity": 38051,
    "address": "просп. Мира, 40а",
    "lat": 46.946382,
    "lng": 32.05073,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1143361,
    "idCity": 380564,
    "address": "просп. Мира, 37",
    "lat": 47.91112,
    "lng": 33.390833,
    "openTime": "09:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1143362,
    "idCity": 380564,
    "address": "ул. Блюхера, 15",
    "lat": 47.900849,
    "lng": 33.419436,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1143363,
    "idCity": 380564,
    "address": "просп. Металлургов, 36/3",
    "lat": 47.902192,
    "lng": 33.394072,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1143366,
    "idCity": 380564,
    "address": "ул. Лермонтова, 26а",
    "lat": 47.902452,
    "lng": 33.358195,
    "openTime": "08:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1143367,
    "idCity": 380564,
    "address": "ул. Днепропетровское шоссе, 20Г",
    "lat": 47.910513,
    "lng": 33.426097,
    "openTime": "09:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1143403,
    "idCity": 38055,
    "address": "просп. Ушакова, 26",
    "lat": 46.639122,
    "lng": 32.616234,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1143404,
    "idCity": 38055,
    "address": "ул. Советская, 31",
    "lat": 46.635919,
    "lng": 32.60844,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1143767,
    "idCity": 3804463,
    "address": "бульв. Александрийский, 115",
    "lat": 49.809387,
    "lng": 30.094776,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1144538,
    "idCity": 38051,
    "address": "просп. Героев Сталинграда, 20а",
    "lat": 47.003198,
    "lng": 31.995781,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1144844,
    "idCity": 38047,
    "address": "бульв. Шевченко, 207",
    "lat": 49.441214,
    "lng": 32.065883,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1144859,
    "idCity": 38047,
    "address": "ул. Сумгаитская, 10",
    "lat": 49.436712,
    "lng": 32.016694,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1144860,
    "idCity": 3804744,
    "address": "ул. Большая Фонтанная, 31",
    "lat": 48.755273,
    "lng": 30.221134,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1145000,
    "idCity": 38041,
    "address": "ул. Киевская, 28",
    "lat": 50.257086,
    "lng": 28.666826,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1145001,
    "idCity": 38041,
    "address": "спуск Победы, 10",
    "lat": 50.258756,
    "lng": 28.656841,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1145003,
    "idCity": 38041,
    "address": "ул. Киевская, 87",
    "lat": 50.268085,
    "lng": 28.690268,
    "openTime": "08:30",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1145004,
    "idCity": 3804142,
    "address": "ул. Красина, 5",
    "lat": 50.949205,
    "lng": 28.639567,
    "openTime": "08:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1145005,
    "idCity": 3804143,
    "address": "ул. Винницкая, 18",
    "lat": 49.891374,
    "lng": 28.583048,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1145299,
    "idCity": 38053625,
    "address": "ул. Киевская, 16",
    "lat": 47.563936,
    "lng": 31.340407,
    "openTime": "08:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1145335,
    "idCity": 38062,
    "address": "ул. Артема, 143",
    "lat": 48.016739,
    "lng": 37.805051,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1145336,
    "idCity": 38062,
    "address": "просп. Ленинский, 11б",
    "lat": 47.986432,
    "lng": 37.785785,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1145339,
    "idCity": 38062,
    "address": "просп. Киевский, 5",
    "lat": 48.040783,
    "lng": 37.78023,
    "openTime": "00:01",
    "closeTime": "23:59",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1145340,
    "idCity": 38062,
    "address": "просп. Ильича , 44",
    "lat": 48.00268,
    "lng": 37.840165,
    "openTime": "09:00",
    "closeTime": "23:59",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1145341,
    "idCity": 38062,
    "address": "ул. Текстильщиков , 8а",
    "lat": 47.950073,
    "lng": 37.688899,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1145342,
    "idCity": 3806242,
    "address": "ул. Победы, 36",
    "lat": 48.301933,
    "lng": 38.015872,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1145343,
    "idCity": 3806232,
    "address": "ул. Московская, 2",
    "lat": 48.04225,
    "lng": 37.95876,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1145346,
    "idCity": 38053688,
    "address": "ул. Независимости, 81",
    "lat": 48.586597,
    "lng": 38.004991,
    "openTime": "08:00",
    "closeTime": "17:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1145347,
    "idCity": 3806239,
    "address": "ул. Европейская, 90",
    "lat": 48.27335,
    "lng": 37.1765,
    "openTime": "08:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1145349,
    "idCity": 3806252,
    "address": "просп. Ленина, 87б",
    "lat": 48.217436,
    "lng": 38.208668,
    "openTime": "08:00",
    "closeTime": "18:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1145350,
    "idCity": 38053630,
    "address": "ул. Крупской, 1",
    "lat": 48.042395,
    "lng": 38.483571,
    "openTime": "08:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1145351,
    "idCity": 3806242,
    "address": "ул. Победы, 71",
    "lat": 48.308912,
    "lng": 37.989548,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1145540,
    "idCity": 38061,
    "address": "просп. Соборный, 53",
    "lat": 47.818026,
    "lng": 35.174461,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1145678,
    "idCity": 38048,
    "address": "просп. Академика Глушко(Димитрова ), 19",
    "lat": 46.39796,
    "lng": 30.71835,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1147019,
    "idCity": 38034,
    "address": "ул. Днестровская, 26",
    "lat": 48.925595,
    "lng": 24.71328,
    "openTime": "09:00",
    "closeTime": "23:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1147091,
    "idCity": 380564,
    "address": "ул. Ватутина, 39",
    "lat": 48.022731,
    "lng": 33.474908,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1147102,
    "idCity": 38056,
    "address": "бульв. Театральный, 3",
    "lat": 48.467278,
    "lng": 35.044587,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1147105,
    "idCity": 38056,
    "address": "пл. Вокзальная, 5",
    "lat": 48.476806,
    "lng": 35.014193,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1147199,
    "idCity": 3806153,
    "address": "ул. Университетская, 43/ просп. Праці, 37",
    "lat": 46.755415,
    "lng": 36.787335,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1147471,
    "idCity": 3806232,
    "address": "просп. Генерала Данилова, 71а",
    "lat": 48.045506,
    "lng": 38.024342,
    "openTime": "08:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1147541,
    "idCity": 3805662,
    "address": "ул. Електрометаллургов, 28",
    "lat": 47.561647,
    "lng": 34.394452,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1147554,
    "idCity": 3806570,
    "address": "ул. Шевченко, 118",
    "lat": 48.529913,
    "lng": 35.870346,
    "openTime": "00:09",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1149618,
    "idCity": 380626,
    "address": "ул. Дворцовая, 31",
    "lat": 48.734942,
    "lng": 37.596437,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1149639,
    "idCity": 38036,
    "address": "просп. Мира, 10",
    "lat": 50.624562,
    "lng": 26.249744,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1149641,
    "idCity": 38053626,
    "address": "ул. Победы, 19",
    "lat": 51.353122,
    "lng": 25.856859,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1149710,
    "idCity": 38038,
    "address": "ул. Свободы, 73",
    "lat": 49.419962,
    "lng": 26.98754,
    "openTime": "09:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1149711,
    "idCity": 38038,
    "address": "ул. Каменецкая, 122",
    "lat": 49.402919,
    "lng": 26.961674,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1149713,
    "idCity": 38038,
    "address": "ул. Проскуровская, 1",
    "lat": 49.426104,
    "lng": 26.981881,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1149714,
    "idCity": 38038,
    "address": "просп. Мира, 69",
    "lat": 49.439619,
    "lng": 27.002451,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1149718,
    "idCity": 380626,
    "address": "ул. Василия Стуса, 49",
    "lat": 48.736741,
    "lng": 37.587908,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1149720,
    "idCity": 38053627,
    "address": "ул. Космонавтов, 50",
    "lat": 48.60288,
    "lng": 37.52889,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1151738,
    "idCity": 380629,
    "address": "просп. Металлургов, 100",
    "lat": 47.107625,
    "lng": 37.55209,
    "openTime": "08:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1151739,
    "idCity": 380629,
    "address": "ул. 130-й Таганрогской Дивизии, 7",
    "lat": 47.108576,
    "lng": 37.669094,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1151741,
    "idCity": 380629,
    "address": "ул. Ленина, 69",
    "lat": 47.097258,
    "lng": 37.545086,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1151742,
    "idCity": 380629,
    "address": "просп. Металлургов, 200",
    "lat": 47.135741,
    "lng": 37.566903,
    "openTime": "08:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1151743,
    "idCity": 380629,
    "address": "просп. Мира, 149",
    "lat": 47.101295,
    "lng": 37.504669,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1151745,
    "idCity": 380629,
    "address": "просп. Победы, 21",
    "lat": 47.106772,
    "lng": 37.628745,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1151862,
    "idCity": 38032,
    "address": "ул. Княгини Ольги, 106",
    "lat": 49.809215,
    "lng": 23.998168,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1152048,
    "idCity": 38032,
    "address": "ул. Выговского, 100",
    "lat": 49.812423,
    "lng": 23.977359,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1152049,
    "idCity": 38032,
    "address": "ул. Городоцкая, 16",
    "lat": 49.84347,
    "lng": 24.02305,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1152051,
    "idCity": 38053702,
    "address": "просп. Шевченко, 25",
    "lat": 50.392019,
    "lng": 24.246431,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1152052,
    "idCity": 38032,
    "address": "просп. Черновола, 57",
    "lat": 49.856015,
    "lng": 24.021364,
    "openTime": "10:00",
    "closeTime": "23:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1152210,
    "idCity": 38032,
    "address": "ул. Зеленая, 147",
    "lat": 49.81415,
    "lng": 24.06333,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1152398,
    "idCity": 38044,
    "address": "ул. Миропольская, 19",
    "lat": 50.467276,
    "lng": 30.624139,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153448,
    "idCity": 3806561,
    "address": "ул. Сенная площадь, 1",
    "lat": 45.361274,
    "lng": 36.470956,
    "openTime": "09:00",
    "closeTime": "18:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153449,
    "idCity": 3806561,
    "address": "ул. Кирова, 2",
    "lat": 45.353203,
    "lng": 36.475289,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153454,
    "idCity": 3805447,
    "address": "просп. Мира, 1",
    "lat": 51.241566,
    "lng": 33.214232,
    "openTime": "09:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153456,
    "idCity": 3805366,
    "address": "ул. Первомайская, 44",
    "lat": 49.065849,
    "lng": 33.423654,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153457,
    "idCity": 3805366,
    "address": "ул. 50-лет Октября, 39",
    "lat": 49.13422,
    "lng": 33.441773,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153459,
    "idCity": 38053,
    "address": "ул. Шевченко, 29",
    "lat": 49.583869,
    "lng": 34.546504,
    "openTime": "08:00",
    "closeTime": "18:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153460,
    "idCity": 3805449,
    "address": "ул. Свободы, 30",
    "lat": 51.866425,
    "lng": 33.481182,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153461,
    "idCity": 38055423,
    "address": "ул. Гоголя, 56",
    "lat": 49.957728,
    "lng": 33.615701,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153463,
    "idCity": 38053711,
    "address": "просп. Соборный, 11",
    "lat": 48.680315,
    "lng": 33.115308,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153464,
    "idCity": 38064,
    "address": "ул. Советская, 77",
    "lat": 48.569325,
    "lng": 39.31839,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153465,
    "idCity": 38064,
    "address": "ул. Титова, 9",
    "lat": 48.574318,
    "lng": 39.30616,
    "openTime": "07:40",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153466,
    "idCity": 38064,
    "address": "ул. Оборонная, 9",
    "lat": 48.558432,
    "lng": 39.31876,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153467,
    "idCity": 38061505,
    "address": "ул. Менделеева, 31",
    "lat": 49.028042,
    "lng": 38.371941,
    "openTime": "08:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153468,
    "idCity": 38053635,
    "address": "просп. Гвардейский, 40",
    "lat": 48.941145,
    "lng": 38.519278,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153470,
    "idCity": 38053757,
    "address": "ул. Гарибальди, 50",
    "lat": 48.911736,
    "lng": 38.427292,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153471,
    "idCity": 3803352,
    "address": "ул. Независимости, 83",
    "lat": 51.21395,
    "lng": 24.70737,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153472,
    "idCity": 38033,
    "address": "спуск Воли, 29",
    "lat": 50.74561,
    "lng": 25.340158,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153473,
    "idCity": 38033,
    "address": "ул. Ровенская, 48",
    "lat": 50.743298,
    "lng": 25.371786,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153474,
    "idCity": 3803344,
    "address": "ул. Победы, 2а",
    "lat": 50.723562,
    "lng": 24.164479,
    "openTime": "09:30",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153475,
    "idCity": 3806569,
    "address": "ул. 9 Мая, 49",
    "lat": 45.203889,
    "lng": 33.346711,
    "openTime": "10:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153477,
    "idCity": 380692,
    "address": "ул. Пожарова, 21",
    "lat": 44.601773,
    "lng": 33.499613,
    "openTime": "10:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153478,
    "idCity": 380692,
    "address": "ул. Ковпака, 3",
    "lat": 44.587397,
    "lng": 33.51209,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153481,
    "idCity": 38065,
    "address": "ул. Маяковского , 12",
    "lat": 44.948466,
    "lng": 34.088516,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153482,
    "idCity": 3806562,
    "address": "ул. Крымская, 84",
    "lat": 45.052528,
    "lng": 35.376539,
    "openTime": "09:00",
    "closeTime": "18:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153483,
    "idCity": 3806562,
    "address": "ул. Базарная, 4",
    "lat": 45.028408,
    "lng": 35.378756,
    "openTime": "09:00",
    "closeTime": "18:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153484,
    "idCity": 380654,
    "address": "ул. Московская, 6",
    "lat": 44.511863,
    "lng": 34.170887,
    "openTime": "10:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153485,
    "idCity": 380654,
    "address": "ул. Киевская, 4б",
    "lat": 44.499399,
    "lng": 34.168554,
    "openTime": "10:00",
    "closeTime": "23:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153487,
    "idCity": 38053690,
    "address": "ул. Крымская, 36а",
    "lat": 45.710661,
    "lng": 34.388758,
    "openTime": "09:00",
    "closeTime": "18:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153510,
    "idCity": 3806560,
    "address": "ул. Пионерская, 1",
    "lat": 44.67685,
    "lng": 34.40924,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153511,
    "idCity": 3805447,
    "address": "просп. Мира, 61",
    "lat": 51.227529,
    "lng": 33.197078,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153515,
    "idCity": 38054,
    "address": "ул. Металлургов, 17а",
    "lat": 50.92596,
    "lng": 34.789416,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153516,
    "idCity": 38054,
    "address": "ул. Харьковская, 1",
    "lat": 50.905517,
    "lng": 34.807716,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153517,
    "idCity": 38035,
    "address": "бульв. Шевченко, 12",
    "lat": 49.553198,
    "lng": 25.59417,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153518,
    "idCity": 38035,
    "address": "ул. Живова, 15а",
    "lat": 49.54553,
    "lng": 25.58953,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153519,
    "idCity": 38057,
    "address": "ул. Вернадского, 2, літ А-3",
    "lat": 49.982259,
    "lng": 36.23949,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153520,
    "idCity": 38057,
    "address": "просп. Победы, 62-З",
    "lat": 50.058937,
    "lng": 36.204142,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153521,
    "idCity": 38057,
    "address": "просп. Тракторостроителей        , 59/56",
    "lat": 49.995488,
    "lng": 36.339155,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153522,
    "idCity": 38057,
    "address": "пл. Конституции       , 1",
    "lat": 49.988825,
    "lng": 36.232391,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153524,
    "idCity": 3803849,
    "address": "ул. Соборная, 25",
    "lat": 48.67949,
    "lng": 26.587634,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153525,
    "idCity": 38053670,
    "address": "просп. Грушевского, 12",
    "lat": 48.525627,
    "lng": 25.035916,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153526,
    "idCity": 38037,
    "address": "ул. Университетская, 2",
    "lat": 48.292882,
    "lng": 25.934532,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153527,
    "idCity": 38037,
    "address": "просп. Независимости, 80",
    "lat": 48.267694,
    "lng": 25.939029,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153528,
    "idCity": 38037,
    "address": "ул. Калиновская, 13а",
    "lat": 48.313325,
    "lng": 25.959579,
    "openTime": "08:00",
    "closeTime": "16:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153531,
    "idCity": 3804637,
    "address": "ул. Независимости, 63",
    "lat": 50.596246,
    "lng": 32.384742,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153533,
    "idCity": 3806442,
    "address": "ул. Гмыри, 55",
    "lat": 48.462401,
    "lng": 38.832558,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1153534,
    "idCity": 38053689,
    "address": "ул. 8-го Марта, 7",
    "lat": 48.084282,
    "lng": 39.37411,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1156119,
    "idCity": 38048,
    "address": "ул. Глушко, 25",
    "lat": 46.397723,
    "lng": 30.715772,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1156378,
    "idCity": 38053675,
    "address": "пл. Ленина, 4",
    "lat": 48.291094,
    "lng": 39.74,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1158419,
    "idCity": 38037,
    "address": "ул. Калиновская, 13а",
    "lat": 48.313325,
    "lng": 25.959579,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1159778,
    "idCity": 3804497,
    "address": "ул. Шевченко, 4г",
    "lat": 50.519873,
    "lng": 30.243827,
    "openTime": "09:00",
    "closeTime": "20:30",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1160548,
    "idCity": 38032,
    "address": "ул. Зелена, 147",
    "lat": 49.815389,
    "lng": 24.062044,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1160923,
    "idCity": 38057,
    "address": "пл. Защитников Украины, 7/8",
    "lat": 49.986204,
    "lng": 36.259612,
    "openTime": "09:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1161093,
    "idCity": 38044,
    "address": "ул. Академика Курчатова, 5",
    "lat": 50.476479,
    "lng": 30.624492,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1161129,
    "idCity": 3806442,
    "address": "ул. Гмыри, 37",
    "lat": 48.467319,
    "lng": 38.833685,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1161130,
    "idCity": 3806442,
    "address": "ул. Менжинского, 29а",
    "lat": 48.477221,
    "lng": 38.791969,
    "openTime": "08:00",
    "closeTime": "17:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1161888,
    "idCity": 38053716,
    "address": "ул. Магистральная, 39",
    "lat": 48.135088,
    "lng": 38.928116,
    "openTime": "08:00",
    "closeTime": "18:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1162862,
    "idCity": 38034,
    "address": "ул. Днестровская, 26",
    "lat": 48.925595,
    "lng": 24.71328,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1163232,
    "idCity": 38032,
    "address": "ул. Липинского, 50а",
    "lat": 49.862861,
    "lng": 24.036652,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1163265,
    "idCity": 38053,
    "address": "ул. Октябрьская, 72",
    "lat": 49.598065,
    "lng": 34.534516,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1163823,
    "idCity": 3804463,
    "address": "ул. Леваневского, 57",
    "lat": 49.785564,
    "lng": 30.158429,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1165281,
    "idCity": 380692,
    "address": "ул. Вакуленчука, 2",
    "lat": 44.597571,
    "lng": 33.488392,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1165282,
    "idCity": 380692,
    "address": "ул. Борисова, 5",
    "lat": 44.58557,
    "lng": 33.444557,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1166831,
    "idCity": 38053715,
    "address": "ул. Шевченко, 1",
    "lat": 48.042011,
    "lng": 30.850645,
    "openTime": "09:00",
    "closeTime": "18:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1166931,
    "idCity": 38053,
    "address": "ул. Шевченко, 29",
    "lat": 49.583869,
    "lng": 34.546504,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1167831,
    "idCity": 3803849,
    "address": "ул. Соборная, 25",
    "lat": 48.67949,
    "lng": 26.587634,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1167882,
    "idCity": 3805366,
    "address": "ул. Первомайская, 43",
    "lat": 49.064364,
    "lng": 33.417414,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1168812,
    "idCity": 38065,
    "address": "ул. Маяковского , 12",
    "lat": 44.948466,
    "lng": 34.088516,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1168921,
    "idCity": 3806142,
    "address": "спуск Кирова, 48",
    "lat": 46.842806,
    "lng": 35.362844,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1169181,
    "idCity": 380629,
    "address": "просп. Строителей, 125",
    "lat": 47.099712,
    "lng": 37.524942,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1170111,
    "idCity": 38053623,
    "address": "ул. Шевченко, 179",
    "lat": 49.262758,
    "lng": 23.85938,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1170701,
    "idCity": 38044,
    "address": "ул. Александра Мишуги, 4",
    "lat": 50.397748,
    "lng": 30.638302,
    "openTime": "10:00",
    "closeTime": "22:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1171041,
    "idCity": 38065,
    "address": "просп. Победы , 209",
    "lat": 44.975607,
    "lng": 34.13877,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1171771,
    "idCity": 38061501,
    "address": "ул. Луцкая, 13",
    "lat": 50.8443,
    "lng": 24.3207,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1172591,
    "idCity": 3804631,
    "address": "ул. Московская, 12",
    "lat": 51.05109,
    "lng": 31.889104,
    "openTime": "09:00",
    "closeTime": "23:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1172712,
    "idCity": 38043,
    "address": "ул. Кармелюка, 2",
    "lat": 49.234676,
    "lng": 28.484792,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1172713,
    "idCity": 3806570,
    "address": "ул. Гагарина, 12",
    "lat": 48.491416,
    "lng": 35.93105,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1172838,
    "idCity": 38061506,
    "address": "ул. Центральная, 37",
    "lat": 47.655326,
    "lng": 34.115165,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1172840,
    "idCity": 38065,
    "address": "ул. Ясная , 37",
    "lat": 44.980723,
    "lng": 34.13386,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1172848,
    "idCity": 38062,
    "address": "бульв. Шевченко, 58а",
    "lat": 48.009861,
    "lng": 37.847517,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1172849,
    "idCity": 38064,
    "address": "ул. Оборонная, 26",
    "lat": 48.549007,
    "lng": 39.329642,
    "openTime": "08:00",
    "closeTime": "22:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1172958,
    "idCity": 3806232,
    "address": "ул. Ленина, 140а",
    "lat": 48.074297,
    "lng": 37.960991,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1173608,
    "idCity": 38044,
    "address": "ул. Бальзака, 2а",
    "lat": 50.497761,
    "lng": 30.576832,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1173949,
    "idCity": 38224673,
    "address": "ул. Октябрьская, 34б",
    "lat": 48.036322,
    "lng": 38.154051,
    "openTime": "08:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1175350,
    "idCity": 38036,
    "address": "ул. Грушевского, 2а",
    "lat": 50.626854,
    "lng": 26.270441,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1176171,
    "idCity": 38056,
    "address": "ул. Коммунаровская, 20",
    "lat": 48.482522,
    "lng": 34.924345,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1176370,
    "idCity": 380692,
    "address": "ул. Ленина, 39",
    "lat": 44.603703,
    "lng": 33.527062,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1176680,
    "idCity": 38057,
    "address": "ул. Полтавский Шлях      , 56",
    "lat": 49.987334,
    "lng": 36.207239,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1178596,
    "idCity": 38044,
    "address": "ул. Столичное шоссе, 101",
    "lat": 50.343315,
    "lng": 30.552182,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1178717,
    "idCity": 38054,
    "address": "ул. Харьковская, 9",
    "lat": 50.903326,
    "lng": 34.813006,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1178750,
    "idCity": 3804862,
    "address": "ул. Соборная, 121",
    "lat": 47.748456,
    "lng": 29.533973,
    "openTime": "08:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1179050,
    "idCity": 38032,
    "address": "ул. Патона, 37",
    "lat": 49.822523,
    "lng": 23.95858,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1179051,
    "idCity": 38061499,
    "address": "ул. Фрунзе, 17",
    "lat": 44.751577,
    "lng": 33.850241,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1179497,
    "idCity": 38043,
    "address": "ул. Хмельницкое Шоссе, 145",
    "lat": 49.234783,
    "lng": 28.401817,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1180626,
    "idCity": 3805662,
    "address": "ул. Электрометаллургов, 42г",
    "lat": 47.566271,
    "lng": 34.39335,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1181034,
    "idCity": 38057,
    "address": "просп. Московский        , 199, літ \"С2\"",
    "lat": 49.972633,
    "lng": 36.302171,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1181288,
    "idCity": 38055,
    "address": "ул. Залаэгерсег, 25",
    "lat": 46.666573,
    "lng": 32.646754,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1181434,
    "idCity": 38043,
    "address": "ул. Келецкая, 80",
    "lat": 49.226105,
    "lng": 28.41329,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1185074,
    "idCity": 38035,
    "address": "ул. Текстильная, 28",
    "lat": 49.575962,
    "lng": 25.627753,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1186262,
    "idCity": 3804465,
    "address": "ул. Зигмунда Козара, 5",
    "lat": 50.078064,
    "lng": 29.908076,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1195204,
    "idCity": 38057,
    "address": "пл. Конституции       , 1",
    "lat": 49.988825,
    "lng": 36.232391,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1195645,
    "idCity": 38048,
    "address": "ул. Новощепной ряд, 2",
    "lat": 46.469023,
    "lng": 30.737348,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1196175,
    "idCity": 38031,
    "address": "ул. Капушанская, 2-4",
    "lat": 48.619742,
    "lng": 22.294698,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1196188,
    "idCity": 3803131,
    "address": "ул. Валенберга, 36",
    "lat": 48.441913,
    "lng": 22.713084,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1197235,
    "idCity": 38044,
    "address": "ул. Харьковское шоссе, 144а",
    "lat": 50.421784,
    "lng": 30.649728,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1198274,
    "idCity": 38062,
    "address": "просп. Ленинский, 11б",
    "lat": 47.986432,
    "lng": 37.785785,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1198278,
    "idCity": 38062,
    "address": "бульв. Шевченко, 58а",
    "lat": 48.009861,
    "lng": 37.847517,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1198281,
    "idCity": 38032,
    "address": "ул. Княгини Ольги, 106",
    "lat": 49.809215,
    "lng": 23.998168,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1198282,
    "idCity": 380692,
    "address": "ул. Пожарова, 21",
    "lat": 44.601773,
    "lng": 33.499613,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1198284,
    "idCity": 38061,
    "address": "спуск Ленина, 53",
    "lat": 47.818026,
    "lng": 35.174461,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1198290,
    "idCity": 38043,
    "address": "ул. Кармелюка, 2",
    "lat": 49.234676,
    "lng": 28.484792,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1198291,
    "idCity": 38051,
    "address": "ул. Ленина, 259",
    "lat": 46.963794,
    "lng": 32.025583,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 425,
    "idCity": 38044,
    "address": "просп. Победы, 73/1",
    "lat": 50.457739,
    "lng": 30.399875,
    "openTime": "10:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 101462,
    "idCity": 38044,
    "address": "просп. Степана Бандеры, 21",
    "lat": 50.489506,
    "lng": 30.493326,
    "openTime": "09:00",
    "closeTime": "22:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 105122,
    "idCity": 38044,
    "address": "бульв. Чоколовский, 19",
    "lat": 50.430616,
    "lng": 30.455105,
    "openTime": "09:00",
    "closeTime": "22:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 105426,
    "idCity": 38044,
    "address": "ул. Б. Васильковская, 45",
    "lat": 50.43569,
    "lng": 30.51641,
    "openTime": "09:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1500255,
    "idCity": 3804494,
    "address": "ул. Киевская, 316",
    "lat": 50.52736,
    "lng": 30.79511,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1500665,
    "idCity": 3806442,
    "address": "ул. Менжинского, 29А",
    "lat": 48.47722,
    "lng": 38.79197,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1500669,
    "idCity": 3806442,
    "address": "ул. Гмыри, 55",
    "lat": 48.4624,
    "lng": 38.83256,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1500687,
    "idCity": 38064,
    "address": "ул. Оборонная, 26",
    "lat": 48.54901,
    "lng": 39.32964,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1500688,
    "idCity": 38064,
    "address": "ул. Оборонная, 9",
    "lat": 48.55843,
    "lng": 39.31876,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1500689,
    "idCity": 38053756,
    "address": "ул. Петровско, 19",
    "lat": 48.1118,
    "lng": 39.08798,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1500690,
    "idCity": 38053716,
    "address": "ул. Магистральная, 39",
    "lat": 48.13509,
    "lng": 38.92812,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1500693,
    "idCity": 3806444,
    "address": "ул. Хмельницкого Богдана, 39",
    "lat": 48.56056,
    "lng": 38.64059,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1505949,
    "idCity": 38054,
    "address": "ул. Харьковская, 2/2",
    "lat": 50.90416,
    "lng": 34.80727,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1506872,
    "idCity": 38062,
    "address": "просп. Мира , 9",
    "lat": 48.016739,
    "lng": 37.805051,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1506873,
    "idCity": 38062,
    "address": "просп. Киевский, 5",
    "lat": 48.040783,
    "lng": 37.78023,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1506874,
    "idCity": 38062,
    "address": "просп. Ильича , 44",
    "lat": 48.00268,
    "lng": 37.840165,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1506875,
    "idCity": 3806242,
    "address": "ул. Победы, 36",
    "lat": 48.301933,
    "lng": 38.015872,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1506877,
    "idCity": 3806252,
    "address": "просп. Ленина, 87б",
    "lat": 48.217436,
    "lng": 38.208668,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1506878,
    "idCity": 38053630,
    "address": "ул. Крупской, 1",
    "lat": 48.042395,
    "lng": 38.483571,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1506879,
    "idCity": 38062,
    "address": "пл. Коммунаров , 1",
    "lat": 48.308912,
    "lng": 37.989548,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1506882,
    "idCity": 3806232,
    "address": "просп. Генерала Данилова, 71а",
    "lat": 48.045506,
    "lng": 38.024342,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1506883,
    "idCity": 38224673,
    "address": "ул. Октябрьская, 34б",
    "lat": 48.036322,
    "lng": 38.154051,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1506898,
    "idCity": 38062,
    "address": "ул. Петровского, 138",
    "lat": 48.308912,
    "lng": 37.989548,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1507409,
    "idCity": 38057,
    "address": "просп. Московский, 256Б",
    "lat": 49.95638,
    "lng": 36.35988,
    "openTime": "10:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1509451,
    "idCity": 38048,
    "address": "просп. Академика Глушко(Димитрова ), 19",
    "lat": 46.39796,
    "lng": 30.71835,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1509710,
    "idCity": 3803848,
    "address": "просп. Независимости, 11",
    "lat": 50.33353,
    "lng": 26.64899,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1510272,
    "idCity": 38032,
    "address": "ул. Кульпарковская, 226-А",
    "lat": 23.979861,
    "lng": 49.802694,
    "openTime": "10:00",
    "closeTime": "22:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1512609,
    "idCity": 3805692,
    "address": "просп. Шевченко Тараса, 9",
    "lat": 48.51606,
    "lng": 34.60701,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1201486,
    "idCity": 38053763,
    "address": "спуск Шевченка, 15",
    "lat": 50.58969,
    "lng": 27.614903,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1201488,
    "idCity": 38048,
    "address": "ул. Ришельевская, 45",
    "lat": 46.473523,
    "lng": 30.739625,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1201490,
    "idCity": 38048,
    "address": "ул. Жуковского, 36",
    "lat": 46.480113,
    "lng": 30.735805,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1201525,
    "idCity": 3806561,
    "address": "ул. Ленина, 11",
    "lat": 45.355489,
    "lng": 36.469686,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1201621,
    "idCity": 38062,
    "address": "ул. Петровского, 113В",
    "lat": 47.947779,
    "lng": 37.687746,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1201636,
    "idCity": 38061508,
    "address": "ул. Первомайская, 6",
    "lat": 48.04106,
    "lng": 38.148306,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1201637,
    "idCity": 3806570,
    "address": "ул. Горького, 166",
    "lat": 48.528373,
    "lng": 35.867909,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1201638,
    "idCity": 3805692,
    "address": "ул. Сыровца, 2/28",
    "lat": 48.516797,
    "lng": 34.612226,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1201639,
    "idCity": 380564,
    "address": "ул. Тухачевского, 79",
    "lat": 47.972645,
    "lng": 33.436669,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1201644,
    "idCity": 38035,
    "address": "просп. Степана Бандеры, 72",
    "lat": 49.54963,
    "lng": 25.622486,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1202418,
    "idCity": 38065422,
    "address": "пл. Шевченко, 4",
    "lat": 50.296919,
    "lng": 26.857015,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1204285,
    "idCity": 38053615,
    "address": "просп. Владимирский, 98",
    "lat": 50.02124,
    "lng": 32.982087,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1204505,
    "idCity": 38044,
    "address": "ул. Победы, 47",
    "lat": 50.45313,
    "lng": 30.447415,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1204508,
    "idCity": 38053691,
    "address": "ул. Толбухина, 20",
    "lat": 45.960836,
    "lng": 33.792749,
    "openTime": "09:00",
    "closeTime": "18:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1204512,
    "idCity": 3805692,
    "address": "просп. Свободы, 37",
    "lat": 48.519965,
    "lng": 34.615886,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1204514,
    "idCity": 38038,
    "address": "ул. Проскуровская, 1",
    "lat": 49.426104,
    "lng": 26.981881,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1204518,
    "idCity": 38357131,
    "address": "пл. Независимости, 3",
    "lat": 50.417899,
    "lng": 25.745724,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1208501,
    "idCity": 380692,
    "address": "ул. Ковпака, 3",
    "lat": 44.587397,
    "lng": 33.51209,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1211889,
    "idCity": 38056,
    "address": "ул. Серова (Кировский), 2",
    "lat": 48.468461,
    "lng": 35.037358,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1213565,
    "idCity": 38055,
    "address": "ул. Патона, 12",
    "lat": 46.661713,
    "lng": 32.60302,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1215792,
    "idCity": 38036,
    "address": "ул. Грушевского, 2к",
    "lat": 50.628918,
    "lng": 26.270142,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1221484,
    "idCity": 38047,
    "address": "ул. 30-летия Победы, 29",
    "lat": 49.425945,
    "lng": 32.006989,
    "openTime": "09:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1225244,
    "idCity": 3804471,
    "address": "ул. Соборная, 60",
    "lat": 50.177092,
    "lng": 30.317092,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1225745,
    "idCity": 38053619,
    "address": "ул. 1 Мая, 5/181-н",
    "lat": 46.301114,
    "lng": 30.653522,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1226495,
    "idCity": 38048,
    "address": "ул. Маршала Жукова, 4",
    "lat": 46.412266,
    "lng": 30.707576,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1226705,
    "idCity": 3803475,
    "address": "ул. Княгини Ольги, 4",
    "lat": 48.63541,
    "lng": 24.56882,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1227225,
    "idCity": 38061,
    "address": "спуск Ленина, 146",
    "lat": 47.828377,
    "lng": 35.163557,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1227568,
    "idCity": 38057,
    "address": "ул. Клочковская      , 134б",
    "lat": 50.009507,
    "lng": 36.219254,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1229045,
    "idCity": 380629,
    "address": "ул. Ленина, 149",
    "lat": 47.101295,
    "lng": 37.504669,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1231645,
    "idCity": 38044,
    "address": "просп. Победы, 23",
    "lat": 50.449351,
    "lng": 30.471019,
    "openTime": "09:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1233106,
    "idCity": 38047,
    "address": "ул. 30-летия Победы, 29",
    "lat": 49.425945,
    "lng": 32.006989,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1234427,
    "idCity": 38052,
    "address": "ул. Маршала Конева, 6а",
    "lat": 48.501464,
    "lng": 32.209178,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1234443,
    "idCity": 38065472,
    "address": "ул. Небесной Сотни, 48",
    "lat": 50.17898,
    "lng": 27.06747,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1237855,
    "idCity": 38056,
    "address": "пер. Кирова, 11",
    "lat": 48.44541,
    "lng": 34.787107,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1241255,
    "idCity": 38065432,
    "address": "ул. Генерала Васильева, 2а",
    "lat": 46.110543,
    "lng": 33.686126,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1241348,
    "idCity": 3804637,
    "address": "ул. Киевская, 140",
    "lat": 50.595987,
    "lng": 32.375624,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1241545,
    "idCity": 38051,
    "address": "просп. Центральный, 27Б/1",
    "lat": 46.967508,
    "lng": 31.973147,
    "openTime": "08:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1242275,
    "idCity": 38064,
    "address": "ул. Челюскинцев, 1-а",
    "lat": 48.562345,
    "lng": 39.310732,
    "openTime": "07:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1244475,
    "idCity": 380692,
    "address": "ул. Вакуленчука, 29",
    "lat": 44.588715,
    "lng": 33.488388,
    "openTime": "10:00",
    "closeTime": "22:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1255415,
    "idCity": 38064,
    "address": "ул. Советская, 77",
    "lat": 48.569325,
    "lng": 39.31839,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1255416,
    "idCity": 38064,
    "address": "ул. 16 Линия, 48",
    "lat": 48.567048,
    "lng": 39.316406,
    "openTime": "08:30",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1267455,
    "idCity": 38056,
    "address": "ул. Кондратюка, 8",
    "lat": 48.483833,
    "lng": 34.923243,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1269166,
    "idCity": 3805366,
    "address": "ул. Первомайская, 44",
    "lat": 49.065849,
    "lng": 33.423654,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1269345,
    "idCity": 38052,
    "address": "ул. Юрия Коваленко, 6а",
    "lat": 48.501464,
    "lng": 32.209178,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1269346,
    "idCity": 38052,
    "address": "ул. Большая Перспективная, 32/11",
    "lat": 48.512167,
    "lng": 32.268585,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1269347,
    "idCity": 38052,
    "address": "ул. Маршала Конева, 6а",
    "lat": 48.501464,
    "lng": 32.209178,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1270995,
    "idCity": 38064,
    "address": "ул. 2-я Краснознамённая, 28",
    "lat": 48.527076,
    "lng": 39.273937,
    "openTime": "07:00",
    "closeTime": "22:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1271440,
    "idCity": 38044,
    "address": "ул. Гната Юры, 20",
    "lat": 50.431378,
    "lng": 30.383693,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1275785,
    "idCity": 38036,
    "address": "ул. Киевская, 67а",
    "lat": 50.616766,
    "lng": 26.280573,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1275815,
    "idCity": 38053627,
    "address": "ул. Радченко, 37",
    "lat": 48.619058,
    "lng": 37.527485,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1276545,
    "idCity": 38044,
    "address": "просп. Победы, 73/1",
    "lat": 50.457739,
    "lng": 30.399875,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1276765,
    "idCity": 38037,
    "address": "ул. Головна, 265а",
    "lat": 48.25911,
    "lng": 25.95749,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1279591,
    "idCity": 38052,
    "address": "ул. Октябрьской Революции, 24",
    "lat": 48.516552,
    "lng": 32.251553,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1279601,
    "idCity": 38056,
    "address": "бульв. Театральный, 3",
    "lat": 48.467278,
    "lng": 35.044587,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1279611,
    "idCity": 3806153,
    "address": "ул. Коммунаров, 75-з",
    "lat": 46.759985,
    "lng": 36.79896,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1279631,
    "idCity": 38057,
    "address": "просп. Героев Сталинграда        , 136/8",
    "lat": 49.942917,
    "lng": 36.301893,
    "openTime": "09:00",
    "closeTime": "22:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1285952,
    "idCity": 38044,
    "address": "ул. Столичное шоссе, 101",
    "lat": 50.343315,
    "lng": 30.552182,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1287824,
    "idCity": 38048,
    "address": "пл. Бориса Деревянко, 2",
    "lat": 46.398158,
    "lng": 30.724558,
    "openTime": "10:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1294422,
    "idCity": 38043,
    "address": "ул. Евгения Пикуса, 1а",
    "lat": 49.240258,
    "lng": 28.506028,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1294432,
    "idCity": 38057,
    "address": "ул. Академика Павлова, 144-Б",
    "lat": 50.023007,
    "lng": 36.336035,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1294511,
    "idCity": 38032,
    "address": "просп. Красной Калины, 62",
    "lat": 49.79193,
    "lng": 24.05751,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1295811,
    "idCity": 38061,
    "address": "просп. Соборный, 175",
    "lat": 47.856381,
    "lng": 35.106456,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1305313,
    "idCity": 38061509,
    "address": "пл. Соборная, 3",
    "lat": 48.851626,
    "lng": 37.604142,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1310523,
    "idCity": 38048,
    "address": "ул. Пантелеймоновская, 88/1",
    "lat": 46.470544,
    "lng": 30.730987,
    "openTime": "09:00",
    "closeTime": "23:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1316043,
    "idCity": 38035,
    "address": "ул. Текстильная, 28ч",
    "lat": 49.575822,
    "lng": 25.639642,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1319605,
    "idCity": 38061,
    "address": "просп. Юбилейный, 16а",
    "lat": 47.820788,
    "lng": 35.051418,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1319633,
    "idCity": 38056,
    "address": "ул. Набережная Победы, 86-А",
    "lat": 48.42918,
    "lng": 35.06522,
    "openTime": "10:00",
    "closeTime": "22:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1333626,
    "idCity": 38041,
    "address": "ул. Киевская, 77",
    "lat": 50.266131,
    "lng": 28.684967,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1340370,
    "idCity": 38044,
    "address": "ул. Андрея Малышко, 3",
    "lat": 50.45785,
    "lng": 30.611919,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1343796,
    "idCity": 38044,
    "address": "ул. Драйзера, 21а",
    "lat": 50.509857,
    "lng": 30.595585,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1343936,
    "idCity": 38034,
    "address": "ул. Миколайчука, 2",
    "lat": 48.932965,
    "lng": 24.74599,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1345915,
    "idCity": 38053623,
    "address": "ул. Шевченко, 72",
    "lat": 49.26057,
    "lng": 23.856249,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1345916,
    "idCity": 380629,
    "address": "просп. Ленина, 69",
    "lat": 47.097258,
    "lng": 37.545086,
    "openTime": "09:00",
    "closeTime": "22:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1348033,
    "idCity": 380564,
    "address": "бульв. Вечерний, 31а",
    "lat": 47.937338,
    "lng": 33.434461,
    "openTime": "09:00",
    "closeTime": "23:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1352373,
    "idCity": 3806142,
    "address": "просп. 50-летия Победы, 26/1",
    "lat": 46.8596,
    "lng": 35.380814,
    "openTime": "09:00",
    "closeTime": "23:59",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1356226,
    "idCity": 38056,
    "address": "бульв. Звездный, 1А",
    "lat": 48.425633,
    "lng": 35.021914,
    "openTime": "10:00",
    "closeTime": "22:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1356241,
    "idCity": 3805366,
    "address": "ул. Киевская, 5а",
    "lat": 49.090575,
    "lng": 33.425866,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1364610,
    "idCity": 38056,
    "address": "ул. Марии Кюри, 5",
    "lat": 48.438898,
    "lng": 35.051753,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1368349,
    "idCity": 38056,
    "address": "ул. Марии Кюри, 5",
    "lat": 48.438898,
    "lng": 35.051753,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1370669,
    "idCity": 38044,
    "address": "просп. Оболонский, 21Б",
    "lat": 50.515817,
    "lng": 30.498688,
    "openTime": "10:00",
    "closeTime": "22:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1372999,
    "idCity": 38041,
    "address": "пл. Житний Рынок, 1",
    "lat": 50.256028,
    "lng": 28.672991,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1373000,
    "idCity": 38044,
    "address": "просп. Победы, 94/1",
    "lat": 50.458912,
    "lng": 30.398757,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1380788,
    "idCity": 38044,
    "address": "ул. Горького , 50",
    "lat": 50.431733,
    "lng": 30.511247,
    "openTime": "10:00",
    "closeTime": "22:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1398161,
    "idCity": 38034,
    "address": "ул. Мазепы, 168-Б",
    "lat": 48.907569,
    "lng": 24.682623,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1403429,
    "idCity": 38044,
    "address": "ул. Гетьмана, 6 (літери \"Б,Б\")",
    "lat": 50.450473,
    "lng": 30.443376,
    "openTime": "10:00",
    "closeTime": "22:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1404531,
    "idCity": 38033,
    "address": "ул. Ровенская, 48",
    "lat": 50.743298,
    "lng": 25.371786,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1411640,
    "idCity": 38048,
    "address": "просп. Небесной Сотни, 2",
    "lat": 46.416326,
    "lng": 30.712519,
    "openTime": "10:00",
    "closeTime": "22:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1417679,
    "idCity": 38044,
    "address": "ул. Щусева, 44",
    "lat": 50.477522,
    "lng": 30.43228,
    "openTime": "10:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1417722,
    "idCity": 38044,
    "address": "ул. Щусева, 44",
    "lat": 50.477522,
    "lng": 30.43228,
    "openTime": "10:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1423426,
    "idCity": 38057,
    "address": "ул. 23-го Августа, 33-А",
    "lat": 50.035665,
    "lng": 36.218581,
    "openTime": "09:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1429125,
    "idCity": 3804472,
    "address": "ул. Каштановая, 6/1",
    "lat": 50.125593,
    "lng": 30.652741,
    "openTime": "09:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1431318,
    "idCity": 3806239,
    "address": "микр. Южный, 41а",
    "lat": 48.265553,
    "lng": 37.182411,
    "openTime": "08:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1434555,
    "idCity": 38053687,
    "address": "ул. Орлика Пилипа, 18б",
    "lat": 49.35854,
    "lng": 23.51355,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1444116,
    "idCity": 38033,
    "address": "просп. Воли, 27",
    "lat": 50.745955,
    "lng": 25.338897,
    "openTime": "10:00",
    "closeTime": "20:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1455486,
    "idCity": 38068262,
    "address": "ул. Строителей, 15",
    "lat": 48.685918,
    "lng": 29.236938,
    "openTime": "10:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1456696,
    "idCity": 3806142,
    "address": "ул. Гетьманская, 18/2",
    "lat": 46.842373,
    "lng": 35.380362,
    "openTime": "08:00",
    "closeTime": "23:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1456867,
    "idCity": 38061500,
    "address": "ул. Духновича, 17А/2",
    "lat": 48.177096,
    "lng": 23.29361,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1457717,
    "idCity": 38044,
    "address": "ул. Калнышевского, 2",
    "lat": 50.519522,
    "lng": 30.465654,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1460635,
    "idCity": 38065,
    "address": "ул. Объездная , 20",
    "lat": 44.984696,
    "lng": 34.133104,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1460642,
    "idCity": 38044,
    "address": "просп. Тычины, 1В",
    "lat": 50.428412,
    "lng": 30.593635,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1460649,
    "idCity": 38053635,
    "address": "просп. Гвардейский, 38/1",
    "lat": 48.941725,
    "lng": 38.518045,
    "openTime": "09:00",
    "closeTime": "19:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1460654,
    "idCity": 38052,
    "address": "ул. Большая Перспективная, 48",
    "lat": 48.507744,
    "lng": 32.264339,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1460762,
    "idCity": 38065,
    "address": "ул. Киевская, 189",
    "lat": 44.984707,
    "lng": 34.086663,
    "openTime": "10:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1462127,
    "idCity": 38044,
    "address": "ул. Антоновича (Горького), 176",
    "lat": 50.41219,
    "lng": 30.522468,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1463048,
    "idCity": 38036,
    "address": "ул. Макарова, 23",
    "lat": 50.625228,
    "lng": 26.200362,
    "openTime": "10:00",
    "closeTime": "22:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1463451,
    "idCity": 38044,
    "address": "ул. Заболотного, 37",
    "lat": 50.34324,
    "lng": 30.54531,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1463452,
    "idCity": 38044,
    "address": "просп. Ватутина, 2Т",
    "lat": 50.493817,
    "lng": 30.561351,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1463471,
    "idCity": 38048,
    "address": "просп. Маршала Жукова, 3А, корп.4",
    "lat": 46.416272,
    "lng": 30.71582,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1463473,
    "idCity": 38055,
    "address": "ул. Залаэгерсег, 18",
    "lat": 46.672127,
    "lng": 32.643897,
    "openTime": "09:00",
    "closeTime": "21:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1465373,
    "idCity": 3805449,
    "address": "ул. Карла Маркса, 30",
    "lat": 51.866425,
    "lng": 33.481182,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1472326,
    "idCity": 38054,
    "address": "ул. Харьковская, 9",
    "lat": 50.903326,
    "lng": 34.813006,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1473335,
    "idCity": 38054,
    "address": "ул. Металлургов, 17",
    "lat": 50.92526,
    "lng": 34.789848,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1473643,
    "idCity": 3805447,
    "address": "просп. Мира, 61",
    "lat": 51.227529,
    "lng": 33.197078,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1478073,
    "idCity": 38033,
    "address": "ул. Сухомлинского, 1",
    "lat": 50.755154,
    "lng": 25.355503,
    "openTime": "10:00",
    "closeTime": "22:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1484789,
    "idCity": 38044,
    "address": "ул. Красногвардейская, 1-В",
    "lat": 50.45478,
    "lng": 30.63621,
    "openTime": "10:00",
    "closeTime": "22:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1484810,
    "idCity": 3806560,
    "address": "ул. Пионерская, 1",
    "lat": 44.67685,
    "lng": 34.40924,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1484815,
    "idCity": 3806569,
    "address": "ул. 9 Мая, 49",
    "lat": 45.203889,
    "lng": 33.346711,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1484819,
    "idCity": 38065,
    "address": "ул. Киевская, 189",
    "lat": 44.984707,
    "lng": 34.086663,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1484820,
    "idCity": 38053691,
    "address": "ул. Толбухина, 20",
    "lat": 45.960836,
    "lng": 33.792749,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1484821,
    "idCity": 38065,
    "address": "ул. Маяковского , 12",
    "lat": 44.948466,
    "lng": 34.088516,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1484823,
    "idCity": 380692,
    "address": "ул. Ковпака, 3",
    "lat": 44.587397,
    "lng": 33.51209,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1484824,
    "idCity": 380692,
    "address": "ул. Пожарова, 21",
    "lat": 44.601773,
    "lng": 33.499613,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1484825,
    "idCity": 3806562,
    "address": "ул. Базарная, 4",
    "lat": 45.028408,
    "lng": 35.378756,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1484826,
    "idCity": 3806562,
    "address": "ул. Крымская, 84",
    "lat": 45.052528,
    "lng": 35.376539,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1484828,
    "idCity": 380654,
    "address": "ул. Московская, 6",
    "lat": 44.511863,
    "lng": 34.170887,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1484829,
    "idCity": 3806561,
    "address": "ул. Кирова, 2",
    "lat": 45.353203,
    "lng": 36.475289,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1484831,
    "idCity": 3806561,
    "address": "пл. Сенная, 1",
    "lat": 45.361274,
    "lng": 36.470956,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1484838,
    "idCity": 380692,
    "address": "ул. Пожарова, 21",
    "lat": 44.601773,
    "lng": 33.499613,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1487909,
    "idCity": 38065,
    "address": "ул. Маяковского , 12",
    "lat": 44.948466,
    "lng": 34.088516,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1488630,
    "idCity": 3806562,
    "address": "ул. Базарная, 4",
    "lat": 45.028408,
    "lng": 35.378756,
    "openTime": "09:00",
    "closeTime": "18:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1488631,
    "idCity": 3806562,
    "address": "ул. Крымская, 84",
    "lat": 45.052528,
    "lng": 35.376539,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1491804,
    "idCity": 38053734,
    "address": "ул. Грушевского, 29",
    "lat": 50.877376,
    "lng": 26.456747,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1495482,
    "idCity": 38065,
    "address": "шоссе Евпаторийское , 8",
    "lat": 44.96919,
    "lng": 34.07888,
    "openTime": null,
    "closeTime": null,
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1499609,
    "idCity": 38065442,
    "address": "ул. Валовая, 24/1",
    "lat": 49.51509,
    "lng": 23.1961,
    "openTime": "08:00",
    "closeTime": "18:00",
    "rating": null,
    "idFeedbacks": null
  }, {
    "id": 1499726,
    "idCity": 38057,
    "address": "ул. Академика Павлова, 44-Б",
    "lat": 49.99041,
    "lng": 36.29001,
    "openTime": "10:00",
    "closeTime": "22:00",
    "rating": null,
    "idFeedbacks": null
  }];
  // </editor-fold>

  storePlaces = [
    {
      id: 1,
      idSupplier: 1,
      name: 'Магазин "Фокстрот-Петрівка"',
      idCity: 23,
      zip: "00000",
      address_line: "просп. Степана Бандери, 21",
      lat: 50.4898,
      lng: 30.4927,
      type: 1
    },
    {
      id: 2,
      idSupplier: 1,
      name: 'Магазин "Фокстрот-Бровари"',
      idCity: 8,
      zip: "07400",
      address_line: "вул. Київська, 316",
      lat: 50.52629,
      lng: 30.79642,
      type: 1
    },
    {
      id: 3,
      idSupplier: 2,
      name: 'Магазин "F5"',
      idCity: 23,
      zip: "00000",
      address_line: "вул. Бальзака ул., 94",
      lat: null,
      lng: null,
      type: 1
    },
    {
      id: 4,
      idSupplier: 1,
      name: "Основний склад",
      idCity: 23,
      zip: "00000",
      address_line: "",
      lat: null,
      lng: null,
      type: 2
    },
    {
      id: 5,
      idSupplier: 2,
      name: "Склад",
      idCity: 23,
      zip: "00000",
      address_line: "",
      lat: null,
      lng: null,
      type: 2
    },
    {
      id: 6,
      idSupplier: 2,
      name: "Пункт видачі товару",
      idCity: 23,
      zip: "00000",
      address_line: "",
      lat: null,
      lng: null,
      type: 3
    }
  ];

  productStorePlaces = [
    {id: 1, idQuotationProduct: 6, idStorePlace: 1, qty: 3},
    {id: 2, idQuotationProduct: 6, idStorePlace: 2, qty: 10},
    {id: 3, idQuotationProduct: 6, idStorePlace: 4, qty: 12},
    {id: 4, idQuotationProduct: 5, idStorePlace: 5, qty: 4},
    {id: 5, idQuotationProduct: 9, idStorePlace: 3, qty: 54},
    {id: 6, idQuotationProduct: 5, idStorePlace: 3, qty: 1}
  ];

  countries = [
    {id: 1, name: "Ukraine"},
    {id: 2, name: "U.S.A."},
    {id: 3, name: "Moldova"}
  ];

  clients = [
    {
      id: 100,
      userId: 3,
      name: 'yurafox',
      phone: '+0800300353',
      login: 'yurafox@fox.com',
      email: 'yurafox@fox.com',
      fname: 'Yurii',
      lname: 'Ishchenko',
      barcode: '+11000002680',
      bonusBalance: 1500,
      actionBonusBalance: 2000
    },
    {
      id: 101,
      userId: 1,
      name: 'sergce',
      phone: '+222',
      login: 'sergce@fox.com',
      email: 'sergce@fox.com',
      fname: 'Serhiy',
      lname: 'Moskalenko',
      barcode: '+11000002681'
    },
    {
      id: 102,
      userId: 2,
      name: 'dealio07',
      phone: '+3333',
      login: 'dealio07@fox.com',
      email: 'dealio07@fox.com',
      fname: 'Volodymyr',
      lname: 'Varha',
      barcode: '+11000002682'
    }
  ];

  clientBonuses = [
    {id: 1, clientId: 100, bonus: 20.1, dueDate: new Date(new Date().getTime() + 15*24 * 3600 * 1000)},
    {id: 2, clientId: 100, bonus: 4.25, dueDate: new Date(new Date().getTime() + 16*24 * 3600 * 1000)},
    {id: 3, clientId: 100, bonus: 51.6, dueDate: new Date(new Date().getTime() + 32*24 * 3600 * 1000)},
    {id: 4, clientId: 101, bonus: 4.17, dueDate: new Date(new Date().getTime() + 3*24 * 3600 * 1000)},
    {id: 5, clientId: 101, bonus: 12.15, dueDate: new Date(new Date().getTime() + 14*24 * 3600 * 1000)},
    {id: 6, clientId: 102, bonus: 14.11, dueDate: new Date(new Date().getTime() + 155*24 * 3600 * 1000)}
  ];

  clientAddresses = [
    {
      id: 1,
      idClient: 100,
      idCity: 8,
      zip: "07400",
      street: "Незалежності",
      isPrimary: false,
      idCountry: 1,
      city: "Brovary",
      bldApp: "25 app.17",
      recName: "Yurii Ishchenko",
      phone: "+380505245745"
    },
    {
      id: 2,
      idClient: 100,
      idCity: 23,
      zip: "",
      street: "Дорогожицька",
      isPrimary: true,
      idCountry: 1,
      city: "Kyiv",
      bldApp: "1",
      recName: "Ivan Romaniv",
      phone: "+380996548754"
    },
    {
      id: 3,
      idClient: 101,
      idCity: 8,
      zip: "07400",
      street: "Героїв Небесної Сотні",
      isPrimary: true,
      idCountry: 1,
      city: "Brovary",
      bldApp: "20 app.7",
      recName: "Serhiy Moskalenko",
      phone: "+380978885745"
    },
    {
      id: 4,
      idClient: 102,
      idCity: 23,
      zip: null,
      street: "Дорогожицька",
      isPrimary: null,
      idCountry: 1,
      city: "Kyiv",
      bldApp: "1",
      recName: "Volodymyr Varha",
      phone: "+380934587788"
    }
  ];

  loEntities = [
    {id: 150, name: "Nova Poshta"},
    {id: 100, name: "Foxtrot"},
    {id: 101, name: "In Time"},
    {id: 102, name: "Mist Express"}
  ];

  loSupplEntities = [
    {id: 1, idSupplier: 1, idLoEntity: 150},
    {id: 2, idSupplier: 1, idLoEntity: 100},
    {id: 3, idSupplier: 2, idLoEntity: 102},
    {id: 4, idSupplier: 2, idLoEntity: 150},
    {id: 5, idSupplier: 3, idLoEntity: 150}
  ];

  clientDraftOrder =
    {
      id: 1000,
      orderDate: new Date(),
      idCur: 1,
      idClient: 100,
      total: 1200.35,
      idPaymentMethod: 1,
      idPaymentStatus: 1,
      idStatus: 0,
      loIdEntity: null,
      loIdClientAddress: 2,
      itemsTotal: null,
      shippingTotal: null,
      bonusTotal: null,
      promoBonusTotal: null,
      bonusEarned: null,
      promoCodeDiscTotal: null

    }
  ;


  clientOrders = [
    {
      id: 1,
      orderDate: new Date(new Date().getTime() - 15*24 * 3600 * 1000),
      idCur: 1,
      idClient: 100,
      total: 11117,
      idPaymentMethod: 1,
      idPaymentStatus: 1,
      idStatus: 0,
      loIdEntity: null,
      loIdClientAddress: null,
      itemsTotal: null,
      shippingTotal: null,
      bonusTotal: null,
      promoBonusTotal: null,
      bonusEarned: null,
      promoCodeDiscTotal: null,
      idPerson: null
    },
    {
      id: 2,
      orderDate: new Date(new Date().getTime() - 32 *24 * 3600 * 1000),
      idCur: 0,
      idClient: 101,
      total: 497.7,
      idPaymentMethod: 2,
      idPaymentStatus: 1,
      idStatus: 2,
      loIdEntity: null,
      loIdClientAddress: null,
      itemsTotal: null,
      shippingTotal: null,
      bonusTotal: null,
      promoBonusTotal: null,
      bonusEarned: null,
      promoCodeDiscTotal: null,
      idPerson: null
    },
    {
      id: 3,
      orderDate: new Date(new Date().getTime() - 150*24 * 3600 * 1000),
      idCur: 0,
      idClient: 100,
      total: 120,
      idPaymentMethod: 2,
      idPaymentStatus: 1,
      idStatus: 1,
      loIdEntity: null,
      loIdClientAddress: null,
      itemsTotal: null,
      shippingTotal: null,
      bonusTotal: null,
      promoBonusTotal: null,
      bonusEarned: null,
      promoCodeDiscTotal: null,
      idPerson: null
    },
    {
      id: 4,
      orderDate: new Date(new Date().getTime() - 121*24 * 3600 * 1000),
      idCur: 0,
      idClient: 100,
      total: 5103.88,
      idPaymentMethod: 3,
      idPaymentStatus: 1,
      idStatus: 1,
      loIdEntity: null,
      loIdClientAddress: 2,
      itemsTotal: 5319,
      shippingTotal: 25,
      bonusTotal: 70.12,
      promoBonusTotal: 150,
      bonusEarned: 53.19,
      promoCodeDiscTotal: 20,
      idPerson: 1
    }
  ];

  persons = [
    { id: 1, firstName: "Сергей",  lastName: "Романов",  middleName: "Игоревич", passportSeries: "AC",  passportNum: "451125",
      issuedAuthority: "Святошинским РОВД г.Киева, 15/01/1999", taxNumber: "3251487524", birthDate: new Date(new Date().getTime() - 13140*24 * 3600 * 1000)
    }
  ]

  clientOrderSpecProducts = [
    {
      id: 1,
      idOrder: 2,
      idQuotationProduct: 1,
      price: 5199.0,
      qty: 1,
      idStorePlace: null,
      idLoEntity: null,
      loTrackTicket: null,
      loDeliveryCost: null,
      loDeliveryCompleted: null,
      loEstimatedDeliveryDate: null,
      loDeliveryCompletedDate: null,
      errorMessage: null,
      payPromoCode: null,
      payPromoCodeDiscount: null,
      payBonusCnt: null,
      payPromoBonusCnt: null,
      earnedBonusCnt: null
    },
    {
      id: 2,
      idOrder: 2,
      idQuotationProduct: 3,
      price: 5220.0,
      qty: 1,
      idStorePlace: null,
      idLoEntity: null,
      loTrackTicket: null,
      loDeliveryCost: null,
      loDeliveryCompleted: null,
      loEstimatedDeliveryDate: null,
      loDeliveryCompletedDate: null,
      errorMessage: null,
      payPromoCode: null,
      payPromoCodeDiscount: null,
      payBonusCnt: null,
      payPromoBonusCnt: null,
      earnedBonusCnt: null
    },
    {
      id: 3,
      idOrder: 2,
      idQuotationProduct: 2,
      price: 349.0,
      qty: 2,
      idStorePlace: null,
      idLoEntity: null,
      loTrackTicket: null,
      loDeliveryCost: null,
      loDeliveryCompleted: null,
      loEstimatedDeliveryDate: null,
      loDeliveryCompletedDate: null,
      errorMessage: null,
      payPromoCode: null,
      payPromoCodeDiscount: null,
      payBonusCnt: null,
      payPromoBonusCnt: null,
      earnedBonusCnt: null
    },
    {
      id: 4,
      idOrder: 1,
      idQuotationProduct: 4,
      price: 330.0,
      qty: 1,
      idStorePlace: null,
      idLoEntity: null,
      loTrackTicket: null,
      loDeliveryCost: null,
      loDeliveryCompleted: null,
      loEstimatedDeliveryDate: null,
      loDeliveryCompletedDate: null,
      errorMessage: "This item is currently out of stock",
      payPromoCode: null,
      payPromoCodeDiscount: null,
      payBonusCnt: null,
      payPromoBonusCnt: null,
      earnedBonusCnt: null
    },
    {
      id: 5,
      idOrder: 1,
      idQuotationProduct: 6,
      price: 167.7,
      qty: 1,
      idStorePlace: null,
      idLoEntity: null,
      loTrackTicket: null,
      loDeliveryCost: null,
      loDeliveryCompleted: null,
      loEstimatedDeliveryDate: null,
      loDeliveryCompletedDate: null,
      errorMessage: null,
      payPromoCode: null,
      payPromoCodeDiscount: null,
      payBonusCnt: null,
      payPromoBonusCnt: null,
      earnedBonusCnt: null
    },
    {
      id: 6,
      idOrder: 3,
      idQuotationProduct: 4,
      price: 120.0,
      qty: 1,
      idStorePlace: null,
      idLoEntity: null,
      loTrackTicket: null,
      loDeliveryCost: null,
      loDeliveryCompleted: null,
      loEstimatedDeliveryDate: null,
      loDeliveryCompletedDate: null,
      errorMessage: null,
      payPromoCode: null,
      payPromoCodeDiscount: null,
      payBonusCnt: null,
      payPromoBonusCnt: null,
      earnedBonusCnt: null
    },
    {
      id: 7,
      idOrder: 4,
      idQuotationProduct: 1,
      price: 5199.0,
      qty: 1,
      idStorePlace: null,
      idLoEntity: 150,
      loTrackTicket: "asdf-1234-xxx",
      loDeliveryCost: 10,
      loDeliveryCompleted: true,
      loEstimatedDeliveryDate: new Date(new Date().getTime() - 119*24 * 3600 * 1000),
      loDeliveryCompletedDate: new Date(new Date().getTime() - 120*24 * 3600 * 1000),
      errorMessage: null,
      payPromoCode: "QA-1254",
      payPromoCodeDiscount: 20,
      payBonusCnt: 50.11,
      payPromoBonusCnt: 150,
      earnedBonusCnt: 51.99
    },
    {
      id: 8,
      idOrder: 4,
      idQuotationProduct: 7,
      price: 120.0,
      qty: 1,
      idStorePlace: 1,
      idLoEntity: 100,
      loTrackTicket: null,
      loDeliveryCost: 15,
      loDeliveryCompleted: true,
      loEstimatedDeliveryDate: new Date(new Date().getTime() - 117*24 * 3600 * 1000),
      loDeliveryCompletedDate: new Date(new Date().getTime() - 117*24 * 3600 * 1000),
      errorMessage: null,
      payPromoCode: null,
      payPromoCodeDiscount: null,
      payBonusCnt: 20.01,
      payPromoBonusCnt: 0,
      earnedBonusCnt: 1.2
    },

  ];

  clientOrderSpecProductsOfClient = [
    {
      idClient: 100,
      id: 6,
      idOrder: 3,
      idQuotationProduct: 7,
      price: 120.0,
      qty: 1,
      idStorePlace: null,
      idLoEntity: null,
      loTrackTicket: null,
      loDeliveryCost: null,
      loDeliveryCompleted: null,
      loEstimatedDeliveryDate: null,
      loDeliveryCompletedDate: null,
      errorMessage: null
    },
    {
      idClient: 101,
      id: 1,
      idOrder: 2,
      idQuotationProduct: 1,
      price: 5199.0,
      qty: 1,
      idStorePlace: null,
      idLoEntity: null,
      loTrackTicket: null,
      loDeliveryCost: null,
      loDeliveryCompleted: null,
      loEstimatedDeliveryDate: null,
      loDeliveryCompletedDate: null,
      errorMessage: null
    },
    {
      idClient: 101,
      id: 2,
      idOrder: 2,
      idQuotationProduct: 3,
      price: 5220.0,
      qty: 1,
      idStorePlace: null,
      idLoEntity: null,
      loTrackTicket: null,
      loDeliveryCost: null,
      loDeliveryCompleted: null,
      loEstimatedDeliveryDate: null,
      loDeliveryCompletedDate: null,
      errorMessage: null
    },
    {
      idClient: 101,
      id: 3,
      idOrder: 2,
      idQuotationProduct: 2,
      price: 349.0,
      qty: 2,
      idStorePlace: null,
      idLoEntity: null,
      loTrackTicket: null,
      loDeliveryCost: null,
      loDeliveryCompleted: null,
      loEstimatedDeliveryDate: null,
      loDeliveryCompletedDate: null,
      errorMessage: null
    },
    {
      idClient: 100,
      id: 4,
      idOrder: 4,
      idQuotationProduct: 2,
      price: 349.0,
      qty: 2,
      idStorePlace: null,
      idLoEntity: null,
      loTrackTicket: null,
      loDeliveryCost: null,
      loDeliveryCompleted: null,
      loEstimatedDeliveryDate: null,
      loDeliveryCompletedDate: null,
      errorMessage: null
    }

  ];

  cartProducts = [
    {
      id: 25,
      idOrder: 1,
      idQuotationProduct: 4,
      price: 330.0,
      qty: 1,
      idStorePlace: null,
      idLoEntity: null,
      loTrackTicket: null,
      loDeliveryCost: null,
      loDeliveryCompleted: null,
      loEstimatedDeliveryDate: null,
      loDeliveryCompletedDate: null,
      errorMessage: "This item is currently out of stock",
      warningMessage: "We have changed price for this item from <b><span class='f-color-red'>$332</span></b> to <b><span class='f-color-red'>$330</span></b>",
      warningRead: false
    },
    {
      id: 26,
      idOrder: 1,
      idQuotationProduct: 6,
      price: 167.7,
      qty: 1,
      idStorePlace: null,
      idLoEntity: null,
      loTrackTicket: "ZXC-1234567-VN",
      loDeliveryCost: null,
      loDeliveryCompleted: null,
      loEstimatedDeliveryDate: null,
      loDeliveryCompletedDate: null,
      errorMessage: null,
      warningMessage: "Warranty terms for this item has been updated by manufacturer",
      warningRead: false
    }
  ];

  specLOTrackingLog = [
    {id: 1, idOrderSpecProd: 7, trackDate: new Date(new Date().getTime() - 117*24 * 3600 * 1000), trackString: "На складе отправителя" },
    {id: 2, idOrderSpecProd: 7, trackDate: new Date(new Date().getTime() - 116*24 * 3600 * 1000), trackString: "На складе Новая Почта" },
    {id: 3, idOrderSpecProd: 7, trackDate: new Date(new Date().getTime() - 115*24 * 3600 * 1000), trackString: "Отправлено на отделение 123" },
    {id: 4, idOrderSpecProd: 7, trackDate: new Date(new Date().getTime() - 113*24 * 3600 * 1000), trackString: "Доставлено на отделение 123" },
    {id: 5, idOrderSpecProd: 7, trackDate: new Date(new Date().getTime() - 112*24 * 3600 * 1000), trackString: "Доставлено получателю" }
  ];
  //<editor-fold desc="Tokens">
  tokens = [
    {token: "fdtefdetfdwytdfetfdtewyfdeyt"},
    {token: "cscstefdetfxscdcwytdfetfdtewyfdeysc"},
    {token: "nhnhnstefdetfxscdcwytdfetfdtewyfdehnhnh"}
  ];
  //</editor-fold>

  //<editor-fold desc="Users">
  // TODO: Добавить в базу юзеру набор FCM айди (набор строк) его девайсов и обрабатывать их на сервере для PUSH-уведомлений
  users = [
    {
      name: "sergey",
      email: "sergce@fox.com",
      password: "sergce",
      id: 1,
      appKey: '',
      userSetting: {'currency': '0', 'lang': '1'},
      favoriteStoresId: [101462, 1463452],
      phone: "380671153816"
    },
    {
      name: "vladimir",
      email: "dealio07@fox.com",
      password: "dealio07",
      id: 2,
      appKey: '',
      userSetting: {'currency': '1', 'lang': '2'},
      favoriteStoresId: [101462, 1463452],
      phone: "380637652849"
    },
    {
      name: "Yuri",
      email: "yurafox@fox.com",
      password: "yurafox",
      id: 3,
      appKey: '',
      userSetting: {'currency': '0', 'lang': '3'},
      favoriteStoresId: [101462, 1463452],
      phone: "380504410081"
    },
  ];

  //</editor-fold>

  // <editor-fold desc="localization">
  localization = [
    {id: 1, name: "RUS"},
    {id: 2, name: "UKR"},
    {id: 3, name: "ENG"}
  ];
  // </editor-fold>

  // <editor-fold desc="pages">
  pages = [
    {
      id: 1,
      name: "home",
      content: this.dynamicContent['HOME']
    }
  ];
  // </editor-fold>

  // <editor-fold desc="actions">
  actions = [
    {
      id: 1,
      name: 'Оплата частями',
      dateStart: new Date(2018, 0, 1),
      dateEnd: new Date(2018, 2, 30),
      priority: 10,
      img_url: 'assets/imgs/actions/partspay',
      sketch_content: this.dynamicContent['ACTION'],
      action_content: this.dynamicContent['PARTSPAY']
    },
    {
      id: 2,
      name: 'Роутер в подарок',
      dateStart: new Date(2018, 0, 1),
      dateEnd: new Date(2018, 2, 15),
      priority: 20,
      img_url: 'assets/imgs/actions/gift',
      sketch_content: this.dynamicContent['ACTION'],
      action_content: this.dynamicContent['ROUTERGIFT']
    }
  ];

  actionOffers = [
    {
      id:1,
      idAction:1,
      idQuotation: 1,
      idCur: 0,
    },
    {
      id:2,
      idAction:2,
      idQuotation: 2,
      idCur: 0,
    },
  ];
  // </editor-fold>

  paymentMethods = [
    {id: 1, name: 'Cash'},
    {id: 2, name: 'Credit card Visa / MasterCard'},
/*
    {id: 3, name: 'Privat - parts payment'},
    {id: 4, name: 'Privat - immediate instalments'},
*/
    {id: 3, name: 'Loan'}
  ];

  productSupplCreditGrades = [
    { id:1, idProduct: 6280637, idSupplier: 2, partsPmtCnt: 8, creditSize: 6},
    { id:2, idProduct: 6293680, idSupplier: 3, partsPmtCnt: 4, creditSize: 4},
    { id:4, idProduct: 6293680, idSupplier: 1, partsPmtCnt: 4, creditSize: 8},
    { id:5, idProduct: 6294898, idSupplier: 2, partsPmtCnt: 6, creditSize: 10},
    { id:6, idProduct: 6280637, idSupplier: 1, partsPmtCnt: 4, creditSize: 12},
    { id:7, idProduct: 6294898, idSupplier: 3, partsPmtCnt: 12, creditSize: 4},
    { id:8, idProduct: 6325585, idSupplier: 1, partsPmtCnt: 4, creditSize: 6},
    { id:9, idProduct: 6325585, idSupplier: 2, partsPmtCnt: 6, creditSize: 12},
    { id:10, idProduct: 6324182, idSupplier: 2, partsPmtCnt: 4, creditSize: 8},
    { id:11, idProduct: 6324182, idSupplier: 3, partsPmtCnt: 6, creditSize: 4},
    { id:12, idProduct: 6252121, idSupplier: 1, partsPmtCnt: 8, creditSize: 6},
    { id:13, idProduct: 6252121, idSupplier: 3, partsPmtCnt: 4, creditSize: 4},
    { id:14, idProduct: 6202929, idSupplier: 2, partsPmtCnt: 6, creditSize: 6},
    { id:15, idProduct: 6202929, idSupplier: 1, partsPmtCnt: 4, creditSize: 8},
    { id:16, idProduct: 6324216, idSupplier: 1, partsPmtCnt: 12, creditSize: 12},
    { id:17, idProduct: 6324216, idSupplier: 2, partsPmtCnt: 8, creditSize: 4},
    { id:18, idProduct: 6324213, idSupplier: 1, partsPmtCnt: 4, creditSize: 6},
    { id:19, idProduct: 6324213, idSupplier: 2, partsPmtCnt: 6, creditSize: 8},
    { id:21, idProduct: 6161537, idSupplier: 1, partsPmtCnt: 4, creditSize: 10},
    { id:22, idProduct: 6307814, idSupplier: 3, partsPmtCnt: 5, creditSize: 12},
    { id:23, idProduct: 6307814, idSupplier: 1, partsPmtCnt: 6, creditSize: 6},
    { id:24, idProduct: 6307814, idSupplier: 2, partsPmtCnt: 12, creditSize: 6},
    { id:25, idProduct: 6343804, idSupplier: 1, partsPmtCnt: 10, creditSize: 8},
    { id:26, idProduct: 6337167, idSupplier: 1, partsPmtCnt: 10, creditSize: 4},
    { id:27, idProduct: 6337167, idSupplier: 3, partsPmtCnt: 5, creditSize: 4},
    { id:28, idProduct: 6291460, idSupplier: 2, partsPmtCnt: 4, creditSize: 6},
    { id:29, idProduct: 6291460, idSupplier: 1, partsPmtCnt: 6, creditSize: 8},
    { id:30, idProduct: 6316576, idSupplier: 1, partsPmtCnt: 4, creditSize: 12},
    { id:31, idProduct: 6310491, idSupplier: 2, partsPmtCnt: 12, creditSize: 10},
    { id:32, idProduct: 6310491, idSupplier: 1, partsPmtCnt: 6, creditSize: 4},
    { id:34, idProduct: 6312913, idSupplier: 1, partsPmtCnt: 4, creditSize: 12},
    { id:35, idProduct: 6293680, idSupplier: 2, partsPmtCnt: 6, creditSize: 12},
    { id:36, idProduct: 6337781, idSupplier: 3, partsPmtCnt: 3, creditSize: 37}
  ];

  creditProducts = [
    { sId:26, sName: "L+", sDefProdId: 11004, sPartPay: 0, sGracePeriod: null, maxTerm: 37, firstPay: null, monthCommissionPct: 3, yearPct: 0.01, kpcPct: 7.2, minTerm: 7},
    { sId:8, sName: "XXL", sDefProdId: 11482, sPartPay: 0, sGracePeriod: null, maxTerm: 12, firstPay: 0, monthCommissionPct: 4, yearPct: 0.01, kpcPct: 0, minTerm: 2},
    { sId:9, sName: "XS-24", sDefProdId: 11470, sPartPay: 0, sGracePeriod: 24, maxTerm: 37, firstPay: null, monthCommissionPct: 3, yearPct: 0.01, kpcPct: 25, minTerm: 26},
    { sId:12, sName: "XS-20", sDefProdId: 11675, sPartPay: 0, sGracePeriod: 20, maxTerm: 37, firstPay: 0, monthCommissionPct: 3, yearPct: 0.01, kpcPct: 19.23, minTerm: 20},
    { sId:59, sName: "ОЧ 16", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: null, minTerm: 2},
    { sId:60, sName: "ОЧ 17", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: null, minTerm: 2},
    { sId:61, sName: "ОЧ 18", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: null, minTerm: 2},
    { sId:62, sName: "ОЧ 19", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: null, minTerm: 2},
    { sId:63, sName: "ОЧ 20", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: null, minTerm: 2},
    { sId:64, sName: "ОЧ 21", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: null, minTerm: 2},
    { sId:65, sName: "ОЧ 22", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: null, minTerm: 2},
    { sId:66, sName: "ОЧ 23", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: null, minTerm: 2},
    { sId:67, sName: "ОЧ 24", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: null, minTerm: 2},
    { sId:13, sName: "ОЧ 1", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: 3.3, minTerm: 4},
    { sId:14, sName: "ОЧ 2", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: 4.3, minTerm: 5},
    { sId:15, sName: "ОЧ 3", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: 6.3, minTerm: 7},
    { sId:16, sName: "ОЧ 4", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: 8.8, minTerm: 9},
    { sId:17, sName: "ОЧ 5", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: 10.8, minTerm: 11},
    { sId:18, sName: "ОЧ 6", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: 13.3, minTerm: 14},
    { sId:19, sName: "ОЧ 7", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: 15.3, minTerm: 2},
    { sId:20, sName: "ОЧ 8", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: 17.3, minTerm: 2},
    { sId:21, sName: "ОЧ 9", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: 18.3, minTerm: 2},
    { sId:22, sName: "ОЧ 10", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: 18.8, minTerm: 2},
    { sId:23, sName: "ОЧ 11", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: 17, minTerm: 2},
    { sId:24, sName: "ОЧ 12", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: 21.2, minTerm: 2},
    { sId:54, sName: "ОЧ 13", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: null, minTerm: 2},
    { sId:55, sName: "ОЧ 14", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: null, minTerm: 2},
    { sId:56, sName: "ОЧ 15", sDefProdId: null, sPartPay: 1, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: null, minTerm: 2},
    { sId:10, sName: "XS-14", sDefProdId: 11635, sPartPay: 0, sGracePeriod: 14, maxTerm: 14, firstPay: 0, monthCommissionPct: 3, yearPct: .01, kpcPct: 21.31, minTerm: 22},
    { sId:1, sName: "S", sDefProdId: 11008, sPartPay: 0, sGracePeriod: null, maxTerm: 37, firstPay: null, monthCommissionPct: 3, yearPct: .01, kpcPct: 15.6, minTerm: 16},
    { sId:2, sName: "M", sDefProdId: 11474, sPartPay: 0, sGracePeriod: null, maxTerm: 37, firstPay: null, monthCommissionPct: 3, yearPct: .01, kpcPct: 10, minTerm: 11},
    { sId:3, sName: "L", sDefProdId: 11036, sPartPay: 0, sGracePeriod: null, maxTerm: 37, firstPay: null, monthCommissionPct: 3, yearPct: .01, kpcPct: 5.1, minTerm: 6},
    { sId:4, sName: "XL", sDefProdId: 11024, sPartPay: 0, sGracePeriod: null, maxTerm: 24, firstPay: null, monthCommissionPct: 3, yearPct: .01, kpcPct: 0, minTerm: 5},
    { sId:5, sName: "10*10*10", sDefProdId: 11020, sPartPay: 0, sGracePeriod: null, maxTerm: 10, firstPay: 10, monthCommissionPct: 1, yearPct: .01, kpcPct: 10, minTerm: 2},
    { sId:6, sName: "XS-10", sDefProdId: 11585, sPartPay: 0, sGracePeriod: 10, maxTerm: 37, firstPay: null, monthCommissionPct: 3, yearPct: .01, kpcPct: 15.6, minTerm: 16},
    { sId:7, sName: "XS-12", sDefProdId: 11642, sPartPay: 0, sGracePeriod: 12, maxTerm: 37, firstPay: 0, monthCommissionPct: 3, yearPct: .01, kpcPct: 18, minTerm: 18},
    { sId:25, sName: "XS-25", sDefProdId: 11575, sPartPay: 0, sGracePeriod: 25, maxTerm: 37, firstPay: null, monthCommissionPct: 3, yearPct: .01, kpcPct: 50, minTerm: 30},
    { sId:29, sName: "МР акц. 1", sDefProdId: null, sPartPay: 2, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: null, minTerm: 2},
    { sId:30, sName: "МР акц. 2", sDefProdId: 11693, sPartPay: 2, sGracePeriod: null, maxTerm: 14, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: null, minTerm: 2},
    { sId:31, sName: "МР акц. 3", sDefProdId: 11691, sPartPay: 2, sGracePeriod: null, maxTerm: 15, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: null, minTerm: 2},
    { sId:32, sName: "МР акц. 4", sDefProdId: 11697, sPartPay: 2, sGracePeriod: null, maxTerm: 16, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: null, minTerm: 2},
    { sId:33, sName: "МР акц. 5", sDefProdId: 10478, sPartPay: 2, sGracePeriod: null, maxTerm: 17, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: null, minTerm: 2},
    { sId:34, sName: "МР акц. 6", sDefProdId: 11686, sPartPay: 2, sGracePeriod: null, maxTerm: 18, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: null, minTerm: 2},
    { sId:35, sName: "МР акц. 7", sDefProdId: 11702, sPartPay: 2, sGracePeriod: null, maxTerm: 19, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: null, minTerm: 2},
    { sId:36, sName: "МР акц. 8", sDefProdId: 11704, sPartPay: 2, sGracePeriod: null, maxTerm: 20, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: null, minTerm: 2},
    { sId:37, sName: "МР акц. 9", sDefProdId: 11709, sPartPay: 2, sGracePeriod: null, maxTerm: 23, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: null, minTerm: 2},
    { sId:38, sName: "МР акц. 10", sDefProdId: 11712, sPartPay: 2, sGracePeriod: null, maxTerm: 21, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: null, minTerm: 2},
    { sId:39, sName: "МР акц. 11", sDefProdId: 11715, sPartPay: 2, sGracePeriod: null, maxTerm: 22, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: null, minTerm: 2},
    { sId:40, sName: "МР акц. 12", sDefProdId: 11718, sPartPay: 2, sGracePeriod: null, maxTerm: 12, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: 6.2, minTerm: 2},
    { sId:41, sName: "МР акц. 13", sDefProdId: 11721, sPartPay: 2, sGracePeriod: null, maxTerm: 13, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: 6.8, minTerm: 2},
    { sId:42, sName: "МР акц. 14", sDefProdId: 11693, sPartPay: 2, sGracePeriod: null, maxTerm: 14, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: 7.4, minTerm: 2},
    { sId:43, sName: "МР акц. 15", sDefProdId: 11691, sPartPay: 2, sGracePeriod: null, maxTerm: 15, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: 8, minTerm: 2},
    { sId:44, sName: "МР акц. 16", sDefProdId: 11697, sPartPay: 2, sGracePeriod: null, maxTerm: 16, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: 8.6, minTerm: 2},
    { sId:45, sName: "МР акц. 17", sDefProdId: 10478, sPartPay: 2, sGracePeriod: null, maxTerm: 17, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: 9.2, minTerm: 2},
    { sId:46, sName: "МР акц. 18", sDefProdId: 11686, sPartPay: 2, sGracePeriod: null, maxTerm: 18, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: 9.8, minTerm: 2},
    { sId:47, sName: "МР акц. 19", sDefProdId: 11702, sPartPay: 2, sGracePeriod: null, maxTerm: 19, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: 10.4, minTerm: 2},
    { sId:48, sName: "МР акц. 20", sDefProdId: 11704, sPartPay: 2, sGracePeriod: null, maxTerm: 20, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: 11, minTerm: 2},
    { sId:49, sName: "МР акц. 21", sDefProdId: 11712, sPartPay: 2, sGracePeriod: null, maxTerm: 21, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: 11.5, minTerm: 2},
    { sId:50, sName: "МР акц. 22", sDefProdId: 11715, sPartPay: 2, sGracePeriod: null, maxTerm: 22, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: 12, minTerm: 2},
    { sId:51, sName: "МР акц. 23", sDefProdId: 11709, sPartPay: 2, sGracePeriod: null, maxTerm: 23, firstPay: null, monthCommissionPct: null, yearPct: .99, kpcPct: 12.6, minTerm: 2},
    { sId:52, sName: "МР акц. 24", sDefProdId: null, sPartPay: 2, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: null},
    { sId:53, sName: "МР акц. 25", sDefProdId: null, sPartPay: 2, sGracePeriod: null, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: null},
    { sId:11, sName: "M+", sDefProdId: 11428, sPartPay: 0, sGracePeriod: null, maxTerm: 37, firstPay: null, monthCommissionPct: 3, yearPct: .01, kpcPct: 11, minTerm: 2},
    { sId:27, sName: "XS-17", sDefProdId: null, sPartPay: 0, sGracePeriod: 17, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: null},
    { sId:28, sName: "XS-19", sDefProdId: null, sPartPay: 0, sGracePeriod: 19, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: null},
    { sId:58, sName: "XS-18", sDefProdId: null, sPartPay: 0, sGracePeriod: 18, maxTerm: null, firstPay: null, monthCommissionPct: null, yearPct: null, kpcPct: null},
    { sId:57, sName: "XS-15", sDefProdId: 12110, sPartPay: 0, sGracePeriod: 15, maxTerm: 37, firstPay: null, monthCommissionPct: 3, yearPct: 0.01, kpcPct: 15, minTerm: 30}
  ];

  // <editor-fold desc="novelties">
  novelties = [
    {
      id: 1,
      productId: 6310491,
      name: 'Смартфон WILEYFOX Spark',
      img_url: 'assets/imgs/novelties/spark',
      priority: 10,
      sketch_content: this.dynamicContent['NOVELTY'],
      novelty_content: this.dynamicContent['WILEYFOXSPARK']
    },
    {
      id: 2,
      productId: 6280637,
      name: 'Смартфон SAMSUNG Galaxy S8 Plus',
      img_url: 'assets/imgs/novelties/galaxys8',
      priority: 10,
      sketch_content: this.dynamicContent['NOVELTY'],
      novelty_content: this.dynamicContent['SAMSUNGGS8']
    }
  ];
  noveltyDetails = [
    {
      id: 1,
      noveltyId: 1,
      productId: 6310491
    },
    {
      id: 2,
      noveltyId: 1,
      productId: 6312913
    }
  ];
  // </editor-fold>

  polls = [
    {
      id:1,
      dateStart: new Date(),
      dateEnd: new Date(2018,1,22),
      urlBanner : 'assets/imgs/polls/poll1.png',
      bannerText: 'Примите участие в опросе'
    }, {
      id:2,
      dateStart: new Date(),
      dateEnd: new Date(2018,1,23),
      urlBanner : 'assets/imgs/polls/poll2.png',
      bannerText: 'Клиентский опрос'
    }
  ];

  pollQuestion = [
    {
      id:1,
      idPoll:1,
      order:10,
      question:'Как Вы оцениваете качество приложения?',
      answerType:0
    },{
      id:7,
      idPoll:1,
      order:70,
      question:'Как часто Вы используете наше приложение?',
      answerType:2
    }, {
      id:2,
      idPoll:1,
      order:20,
      question:'Как Вы оцениваете уровень обслуживания?',
      answerType:2
    },{
      id:3,
      idPoll:1,
      order:30,
      question:'Охарактеризуйте пожалуйста работу персонала',
      answerType:1
    },{
      id:4,
      idPoll:2,
      order:40,
      question:'На сколько устраивает Вас наш ассортимент?',
      answerType:0
    }, {
      id:5,
      idPoll:2,
      order:50,
      question:'Из каких источников Вы бы хотели получать от нас информацию о расширении ассортимента?',
      answerType:2
    },{
      id:6,
      idPoll:2,
      order:60,
      question:'Чтобы Вы хотели улучшить в работе приложения?',
      answerType:1
    }
  ];

  pollQuestionAnswer =[
    {
      id:1,
      idPollQuestions: 1,
      answer:'Отлично'
    }, {
      id:2,
      idPollQuestions: 1,
      answer:'Хорошо'
    },{
      id:3,
      idPollQuestions: 1,
      answer:'Удовлетворительно'
    },{
      id:4,
      idPollQuestions: 1,
      answer:'Неудовлетворительно'
    },{
      id:5,
      idPollQuestions: 2,
      answer:'Высокий'
    },{
      id:6,
      idPollQuestions: 2,
      answer:'Допустимый'
    },{
      id:7,
      idPollQuestions: 2,
      answer:'Недопустимый'
    },{
      id:8,
      idPollQuestions: 4,
      answer:'Очень устраивает'
    },{
      id:9,
      idPollQuestions: 4,
      answer:'Устраивает'
    },{
      id:10,
      idPollQuestions: 4,
      answer:'Относительно устраивает'
    },{
      id:11,
      idPollQuestions: 4,
      answer:'Не устраивает'
    },{
      id:12,
      idPollQuestions: 5,
      answer:'Электронная почта'
    },{
      id:13,
      idPollQuestions: 5,
      answer:'Фейсбук'
    },{
      id:14,
      idPollQuestions: 5,
      answer:'Вконтакте'
    },{
      id:15,
      idPollQuestions: 7,
      answer:'Каждый день'
    },{
      id:16,
      idPollQuestions: 7,
      answer:'Довольно часто'
    },{
      id:17,
      idPollQuestions: 7,
      answer:'Редко'
    }
  ];

  clientPollAnswers =[{ // init test object
    id: 0,
    userId:0,
    idPoll:0,
    idPollQuestions: 0,
    clientAnswer: ''
  }];

  categories =[
    {
      "id": 218500,
      "name": "Техника для дома",
      "parent_id": null,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218501,
      "name": "Крупная бытовая техника",
      "parent_id": 218511,
      "priority_index": 80,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218503,
      "name": "Встраиваемая техника",
      "parent_id": 218511,
      "priority_index": 70,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218504,
      "name": "Смартфоны и мобильные телефоны",
      "parent_id": 218508,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": true,
      "prefix": "mobilnye_telefony.html",
      "priority_show": 80,
      "icon": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4wLjIsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0icmFkY29yIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDE3IDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNyAyNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6I0ZGM0MxMTt9DQo8L3N0eWxlPg0KPHBhdGggY2xhc3M9InN0MCIgZD0iTTE2LDBIMUMwLjQ1MDAxMjIsMCwwLDAuNDUwMDEyMiwwLDF2MjJjMCwwLjU0OTk4NzgsMC40NTAwMTIyLDEsMSwxaDE1YzAuNTQ5OTg3OCwwLDEtMC40NTAwMTIyLDEtMVYxDQoJQzE3LDAuNDUwMDEyMiwxNi41NDk5ODc4LDAsMTYsMHogTTEwLDIzSDd2LTJoM1YyM3ogTTE1LDE5YzAsMC41NDk5ODc4LTAuNDUwMDEyMiwxLTEsMUgzYy0wLjU0OTk4NzgsMC0xLTAuNDUwMDEyMi0xLTFWMw0KCWMwLTAuNTQ5OTg3OCwwLjQ1MDAxMjItMSwxLTFoMTFjMC41NDk5ODc4LDAsMSwwLjQ1MDAxMjIsMSwxVjE5eiIvPg0KPC9zdmc+DQo="
    },
    {
      "id": 218505,
      "name": "Смартфоны",
      "parent_id": 218504,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218506,
      "name": "Мобильные телефоны",
      "parent_id": 218504,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218508,
      "name": "Смартфоны и телефоны",
      "parent_id": null,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218509,
      "name": "Телевизоры, аудиотехника",
      "parent_id": null,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218510,
      "name": "Ноутбуки, планшеты, ПК",
      "parent_id": null,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218511,
      "name": "Техника для кухни",
      "parent_id": null,
      "priority_index": 50,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218512,
      "name": "Телефония",
      "parent_id": 218508,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218513,
      "name": "Радиотелефоны",
      "parent_id": 218512,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218514,
      "name": "Факсимильные аппараты",
      "parent_id": 218512,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218515,
      "name": "Радиостанции",
      "parent_id": 218512,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218516,
      "name": "Аксессуары для раций",
      "parent_id": 218512,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218517,
      "name": "Аксессуары для смартфонов",
      "parent_id": 218508,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218518,
      "name": "Карты памяти",
      "parent_id": 218517,
      "priority_index": 50,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218519,
      "name": "Чехлы для смартфонов",
      "parent_id": 218517,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218520,
      "name": "Защитные пленки и стекла для смартфонов",
      "parent_id": 218517,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218521,
      "name": "Наушники",
      "parent_id": 218517,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218522,
      "name": "Гарнитуры для телефона",
      "parent_id": 218517,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218523,
      "name": "Телевизоры",
      "parent_id": 218509,
      "priority_index": 50,
      "id_product_cat": 2,
      "is_show": true,
      "prefix": "led_televizory.html",
      "priority_show": 70,
      "icon": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4wLjIsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0icmFkY29yIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDMxIDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMSAyNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6I0ZGM0MxMTt9DQo8L3N0eWxlPg0KPGc+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTI5LDJ2MTZIMTdoLTJoLTFIMlYySDI5IE0yOSwwSDJDMC44OTU0NTA2LDAsMCwwLjg5NTM4OTYsMCwydjE2YzAsMS4xMDQ1NDk0LDAuODk1NDUwNiwyLDIsMmgxMnYySDl2Mmg1aDNoNQ0KCQl2LTJoLTV2LTJoMTJjMS4xMDQ2MTA0LDAsMi0wLjg5NTQ1MDYsMi0yVjJDMzEsMC44OTUzODk2LDMwLjEwNDYxMDQsMCwyOSwwTDI5LDB6Ii8+DQo8L2c+DQo8L3N2Zz4NCg=="
    },
    {
      "id": 218524,
      "name": "Аксессуары к телевизорам",
      "parent_id": 218509,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218525,
      "name": "Телевизионные антенны и кабели",
      "parent_id": 218524,
      "priority_index": 90,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218526,
      "name": "Настенные крепежи",
      "parent_id": 218524,
      "priority_index": 80,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218527,
      "name": "Аксессуары для TV и аудио",
      "parent_id": 218524,
      "priority_index": 70,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218528,
      "name": "Зарядные устройства и элементы питания",
      "parent_id": 218524,
      "priority_index": 60,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218529,
      "name": "3D очки",
      "parent_id": 218524,
      "priority_index": 50,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218530,
      "name": "Кабели и переходники для аудио и видео",
      "parent_id": 218524,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218531,
      "name": "Устройства управления",
      "parent_id": 218524,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218532,
      "name": "Телевизионные подставки",
      "parent_id": 218524,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218533,
      "name": "ТВ-тюнеры",
      "parent_id": 218524,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218534,
      "name": "Аудиотехника",
      "parent_id": 218509,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218535,
      "name": "Наушники",
      "parent_id": 218534,
      "priority_index": 110,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218536,
      "name": "Гарнитуры для ПК",
      "parent_id": 218534,
      "priority_index": 100,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218537,
      "name": "Гарнитуры для телефона",
      "parent_id": 218534,
      "priority_index": 90,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218538,
      "name": "MP3 плееры",
      "parent_id": 218534,
      "priority_index": 80,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218539,
      "name": "Домашние кинотеатры",
      "parent_id": 218534,
      "priority_index": 70,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218540,
      "name": "Медиаплееры",
      "parent_id": 218534,
      "priority_index": 60,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218541,
      "name": "Магнитолы",
      "parent_id": 218534,
      "priority_index": 50,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218542,
      "name": "Музыкальные центры",
      "parent_id": 218534,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218543,
      "name": "Диктофоны цифровые",
      "parent_id": 218534,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218544,
      "name": "Микрофоны",
      "parent_id": 218534,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218545,
      "name": "Синтезаторы",
      "parent_id": 218534,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218546,
      "name": "Проекторы",
      "parent_id": 218509,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218547,
      "name": "Проекционные экраны",
      "parent_id": 218546,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218548,
      "name": "Аксессуары для проекторов",
      "parent_id": 218546,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218549,
      "name": "Игры",
      "parent_id": 218509,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218550,
      "name": "Игровые приставки",
      "parent_id": 218549,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218551,
      "name": "Манипуляторы игровые",
      "parent_id": 218549,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218552,
      "name": "Аксессуары к игровым приставкам",
      "parent_id": 218549,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218553,
      "name": "Планшеты и книги",
      "parent_id": 218510,
      "priority_index": 70,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218554,
      "name": "Компьютерная техника",
      "parent_id": 218510,
      "priority_index": 60,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218555,
      "name": "Компьютерная периферия",
      "parent_id": 218510,
      "priority_index": 50,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218556,
      "name": "Оргтехника",
      "parent_id": 218510,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218557,
      "name": "Компьютерные комплектующие",
      "parent_id": 218510,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218558,
      "name": "Аксессуары для компьютерной техники",
      "parent_id": 218510,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218559,
      "name": "Аксессуары для оргтехники",
      "parent_id": 218510,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218560,
      "name": "Планшеты",
      "parent_id": 218553,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218561,
      "name": "Электронные книги",
      "parent_id": 218553,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218562,
      "name": "Аксессуары для планшетов",
      "parent_id": 218553,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218563,
      "name": "Чехлы и защитные пленки для планшетов",
      "parent_id": 218553,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218564,
      "name": "Ноутбуки",
      "parent_id": 218554,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": true,
      "prefix": null,
      "priority_show": 60,
      "icon": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4wLjIsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0icmFkY29yIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDI4LjQxNjY1ODQgMjEuOTk5OTk2MiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjguNDE2NjU4NCAyMS45OTk5OTYyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZmlsbDojRkYzQzExO30NCjwvc3R5bGU+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTI0LjU4MzMzMjEsMS45MzgxNzljMC4wMzQwODgxLDAsMC4wNjE4MjEsMC4wMjc3MjksMC4wNjE4MjEsMC4wNjE4MjF2MTMuNDE2NjYwMw0KCQkJYzAsMC4wMzQwODgxLTAuMDI3NzMyOCwwLjA2MTgyMS0wLjA2MTgyMSwwLjA2MTgyMWgtMjAuNzVjLTAuMDM0MDg4MSwwLTAuMDYxODIxLTAuMDI3NzMyOC0wLjA2MTgyMS0wLjA2MTgyMVYyDQoJCQljMC0wLjAzNDA5MTksMC4wMjc3MzI4LTAuMDYxODIxLDAuMDYxODIxLTAuMDYxODIxSDI0LjU4MzMzMjEgTTI0LjU4MzMzMjEsMGgtMjAuNzVjLTEuMTA0NTY4NSwwLTIsMC44OTU0Mjc3LTIsMnYxMy40MTY2NjAzDQoJCQljMCwxLjEwNDU2ODUsMC44OTU0MzE1LDIsMiwyaDIwLjc1YzEuMTA0NTY4NSwwLDItMC44OTU0MzE1LDItMlYyQzI2LjU4MzMzMjEsMC44OTU0Mjc3LDI1LjY4NzkwMDUsMCwyNC41ODMzMzIxLDBMMjQuNTgzMzMyMSwweg0KCQkJIi8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNC45MTk3NzMxLDE3LjY4NTk0NzRjMC40MjA1MDE3LDAsMC45OTIxOTEzLDAuMzM4OTU4NywxLjE1NDE4MjQsMC42ODQzMTg1bDEuMDk3NDA4MywyLjMzOTc2NzUNCgkJCWMwLjAxODQ0NDEsMC4wMzkzMjk1LDAuMDMxNDEwMiwwLjA3MzczODEsMC4wNDA0MTI5LDAuMTAyNzI5OGMtMC4wMTM1ODQxLDAuMDAwODA4Ny0wLjAyODYyOTMsMC4wMDEyODE3LTAuMDQ1MjExOCwwLjAwMTI4MTcNCgkJCUgxLjI1MDA4OGMtMC4wMTY1Nzg3LDAtMC4wMzE2MjM4LTAuMDAwNDczLTAuMDQ1MjA0Mi0wLjAwMTI4MTdjMC4wMDkwMDI3LTAuMDI4OTkxNywwLjAyMTk2NS0wLjA2MzQwMDMsMC4wNDA0MTI5LTAuMTAyNzI5OA0KCQkJbDEuMDk3NDA0NS0yLjMzOTc2NzVjMC4xNjE5OTQ5LTAuMzQ1MzU5OCwwLjczMzY4MDctMC42ODQzMTg1LDEuMTU0MTgyNC0wLjY4NDMxODVIMjQuOTE5NzczMSBNMjQuOTE5NzczMSwxNi40OTk5OTYySDMuNDk2ODgzNg0KCQkJYy0wLjg3NjQxMTQsMC0xLjg2NTgzNzEsMC41OTQ3NTcxLTIuMjI3ODksMS4zNjY2Njg3TDAuMTcxNTgxNSwyMC4yMDY0NA0KCQkJYy0wLjQ1MjQ1MzYsMC45NjQ2NjgzLDAuMDE4MjY0OCwxLjc5MzU1NjIsMS4wNzg1MDY1LDEuNzkzNTU2MmgyNS45MTY0NzcyYzEuMDYwMjQ5MywwLDEuNTMwOTY3Ny0wLjgyODg4NzksMS4wNzg1MTAzLTEuNzkzNTU2Mg0KCQkJbC0xLjA5NzQxMjEtMi4zMzk3NzUxQzI2Ljc4NTYxNCwxNy4wOTQ3NTMzLDI1Ljc5NjE4NDUsMTYuNDk5OTk2MiwyNC45MTk3NzMxLDE2LjQ5OTk5NjJMMjQuOTE5NzczMSwxNi40OTk5OTYyeiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMTYuNTYzNjMzLDE5LjI1IDEyLjc2OTY5MTUsMTkuMjUgMTEuOTE2NjYyMiwyMS4wODMzMzIxIDE3LjQxNjY2MjIsMjEuMDgzMzMyMSAxNi41NjM2MzMsMTkuMjUgCSIvPg0KPC9nPg0KPC9zdmc+DQo="
    },
    {
      "id": 218565,
      "name": "Системные блоки",
      "parent_id": 218554,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218566,
      "name": "Неттопы",
      "parent_id": 218554,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218567,
      "name": "Моноблоки (All-in-One)",
      "parent_id": 218554,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218568,
      "name": "Мониторы",
      "parent_id": 218555,
      "priority_index": 50,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218569,
      "name": "Компьютерные мыши",
      "parent_id": 218555,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218570,
      "name": "Клавиатуры",
      "parent_id": 218555,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218571,
      "name": "Колонки для ПК",
      "parent_id": 218555,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218572,
      "name": "Наушники",
      "parent_id": 218555,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218573,
      "name": "МФУ",
      "parent_id": 218556,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218574,
      "name": "Принтеры лазерные и струйные",
      "parent_id": 218556,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218575,
      "name": "Матричные принтеры",
      "parent_id": 218556,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218576,
      "name": "Сканеры",
      "parent_id": 218556,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218577,
      "name": "Процессоры",
      "parent_id": 218557,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218578,
      "name": "Материнские платы",
      "parent_id": 218557,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218579,
      "name": "Видеокарты",
      "parent_id": 218557,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218580,
      "name": "Модули памяти",
      "parent_id": 218557,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218581,
      "name": "Сумки, рюкзаки и чехлы для ноутбуков",
      "parent_id": 218558,
      "priority_index": 50,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218582,
      "name": "Чистящие средства",
      "parent_id": 218558,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218583,
      "name": "USB флеш",
      "parent_id": 218558,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218584,
      "name": "Подставки для ноутбуков",
      "parent_id": 218558,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218585,
      "name": "Блоки питания для ноутбуков",
      "parent_id": 218558,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218586,
      "name": "Картриджи для лазерных принтеров",
      "parent_id": 218559,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218587,
      "name": "Картриджи для струйных принтеров",
      "parent_id": 218559,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218588,
      "name": "Холодильники",
      "parent_id": 218501,
      "priority_index": 50,
      "id_product_cat": 2,
      "is_show": true,
      "prefix": null,
      "priority_show": 50,
      "icon": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4wLjIsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0icmFkY29yIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDIzIDI2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyMyAyNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6bm9uZTtzdHJva2U6I0ZGM0MxMTtzdHJva2Utd2lkdGg6MS45O3N0cm9rZS1taXRlcmxpbWl0OjEwO30NCgkuc3Qxe2ZpbGw6I0ZGM0MxMTt9DQo8L3N0eWxlPg0KPHBhdGggY2xhc3M9InN0MCIgZD0iTTIwLjA1LDI0Ljg3NUgyLjk1Yy0xLjA0OSwwLTEuOS0wLjg1MS0xLjktMS45VjMuMDI1YzAtMS4wNDksMC44NTEtMS45LDEuOS0xLjloMTcuMQ0KCWMxLjA0OSwwLDEuOSwwLjg1MSwxLjksMS45djE5Ljk1QzIxLjk1LDI0LjAyNCwyMS4wOTksMjQuODc1LDIwLjA1LDI0Ljg3NXoiLz4NCjxyZWN0IHg9IjguNjI1IiB5PSIxIiBjbGFzcz0ic3QxIiB3aWR0aD0iMS43NSIgaGVpZ2h0PSIyNC4xNjciLz4NCjxyZWN0IHg9IjExIiB5PSIxMCIgY2xhc3M9InN0MSIgd2lkdGg9IjEiIGhlaWdodD0iOSIvPg0KPHJlY3QgeD0iNyIgeT0iMTAiIGNsYXNzPSJzdDEiIHdpZHRoPSIxIiBoZWlnaHQ9IjkiLz4NCjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNS43OTcsMTBoMy40MDZDMTkuNjQzLDEwLDIwLDEwLjM1NywyMCwxMC43OTd2MS40MDZDMjAsMTIuNjQzLDE5LjY0MywxMywxOS4yMDMsMTNoLTMuNDA2DQoJQzE1LjM1NywxMywxNSwxMi42NDMsMTUsMTIuMjAzdi0xLjQwNkMxNSwxMC4zNTcsMTUuMzU3LDEwLDE1Ljc5NywxMHoiLz4NCjwvc3ZnPg0K"
    },
    {
      "id": 218589,
      "name": "Морозильные камеры",
      "parent_id": 218501,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218590,
      "name": "Посудомоечные машины",
      "parent_id": 218501,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218591,
      "name": "Плиты",
      "parent_id": 218501,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218592,
      "name": "Вытяжки",
      "parent_id": 218501,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218593,
      "name": "Вытяжки",
      "parent_id": 218503,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218594,
      "name": "Встраиваемые холодильники",
      "parent_id": 218503,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218595,
      "name": "Встраиваемые микроволновые печи",
      "parent_id": 218503,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218596,
      "name": "Прочая встраиваемая техника",
      "parent_id": 218503,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218597,
      "name": "Аксессуары для встраиваемой техники",
      "parent_id": 218511,
      "priority_index": 60,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218598,
      "name": "Аксессуары для вытяжек",
      "parent_id": 218597,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218599,
      "name": "Подготовка продуктов",
      "parent_id": 218511,
      "priority_index": 50,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218600,
      "name": "Блендеры",
      "parent_id": 218599,
      "priority_index": 70,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218601,
      "name": "Мясорубки",
      "parent_id": 218599,
      "priority_index": 60,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218602,
      "name": "Кухонные комбайны",
      "parent_id": 218599,
      "priority_index": 50,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218603,
      "name": "Ломтерезки",
      "parent_id": 218599,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218604,
      "name": "Миксеры",
      "parent_id": 218599,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218605,
      "name": "Кухонные весы",
      "parent_id": 218599,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218606,
      "name": "Измельчители",
      "parent_id": 218599,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218607,
      "name": "Приготовление еды",
      "parent_id": 218511,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218608,
      "name": "Мультиварки",
      "parent_id": 218607,
      "priority_index": 70,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218609,
      "name": "Микроволновые печи",
      "parent_id": 218607,
      "priority_index": 60,
      "id_product_cat": 2,
      "is_show": true,
      "prefix": null,
      "priority_show": 10,
      "icon": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4wLjIsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0icmFkY29yIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDMyIDIyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMiAyMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6bm9uZTtzdHJva2U6I0ZGM0MxMTtzdHJva2Utd2lkdGg6MjtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9DQoJLnN0MXtmaWxsOiNGRjNDMTE7fQ0KCS5zdDJ7ZmlsbDpub25lO3N0cm9rZTojRkYzQzExO3N0cm9rZS13aWR0aDowLjkwNTE2NzI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQ0KPC9zdHlsZT4NCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yOSwyMUgzYy0xLjEwNDU2OTYsMC0yLTAuODk1NDI5Ni0yLTJWM2MwLTEuMTA0NTY5NiwwLjg5NTQzMDQtMiwyLTJoMjZjMS4xMDQ1NzA0LDAsMiwwLjg5NTQzMDQsMiwydjE2DQoJQzMxLDIwLjEwNDU3MDQsMzAuMTA0NTcwNCwyMSwyOSwyMXoiLz4NCjxyZWN0IHg9IjIyIiB5PSIyIiBjbGFzcz0ic3QxIiB3aWR0aD0iMiIgaGVpZ2h0PSIxOCIvPg0KPHJlY3QgeD0iMjYiIHk9IjciIGNsYXNzPSJzdDEiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiLz4NCjxyZWN0IHg9IjI2IiB5PSIxNCIgY2xhc3M9InN0MSIgd2lkdGg9IjIiIGhlaWdodD0iMiIvPg0KPHJlY3QgeD0iNC41IiB5PSI0LjUiIGNsYXNzPSJzdDIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxMyIvPg0KPC9zdmc+DQo="
    },
    {
      "id": 218610,
      "name": "Фритюрницы",
      "parent_id": 218607,
      "priority_index": 50,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218611,
      "name": "Измельчители",
      "parent_id": 218607,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218612,
      "name": "Электропечи",
      "parent_id": 218607,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218613,
      "name": "Хлебопечки",
      "parent_id": 218607,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218614,
      "name": "Бутербродницы и вафельницы",
      "parent_id": 218607,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218615,
      "name": "Приготовление напитков",
      "parent_id": 218511,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218616,
      "name": "Чайники",
      "parent_id": 218615,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218617,
      "name": "Соковыжималки",
      "parent_id": 218615,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218618,
      "name": "Кофемашины и кофеварки",
      "parent_id": 218615,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218619,
      "name": "Кофемолки",
      "parent_id": 218615,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218620,
      "name": "Аксессуары для крупной бытовой техники",
      "parent_id": 218511,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218621,
      "name": "Аксессуары для холодильников",
      "parent_id": 218620,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218622,
      "name": "Аксессуары для посудомоечных и стиральных машин",
      "parent_id": 218620,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218623,
      "name": "Аксессуары для кухонной техники",
      "parent_id": 218511,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218624,
      "name": "Аксессуары для кухонных приборов",
      "parent_id": 218623,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218625,
      "name": "Аксессуары для кофеварок",
      "parent_id": 218623,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218626,
      "name": "Аксессуары для очистителей воды",
      "parent_id": 218623,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218627,
      "name": "Стирка, глажка и уборка",
      "parent_id": 218500,
      "priority_index": 50,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218628,
      "name": "Аксессуары для уборки",
      "parent_id": 218500,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218629,
      "name": "Климатическая техника",
      "parent_id": 218500,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218630,
      "name": "Аксессуары для климатической техники",
      "parent_id": 218500,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218631,
      "name": "Аксессуары для приборов личного пользования",
      "parent_id": 218500,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218632,
      "name": "Стиральные машины",
      "parent_id": 218627,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": true,
      "prefix": null,
      "priority_show": 40,
      "icon": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4wLjIsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0icmFkY29yIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDIzIDI1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyMyAyNTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6I0ZGM0MxMTt9DQo8L3N0eWxlPg0KPGc+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTIxLDJ2MjFIMlYySDIxIE0yMSwwSDJDMC44OTU0MzE1LDAsMCwwLjg5NTQyOTYsMCwydjIxYzAsMS4xMDQ1Njg1LDAuODk1NDMxNSwyLDIsMmgxOQ0KCQljMS4xMDQ1NzA0LDAsMi0wLjg5NTQzMTUsMi0yVjJDMjMsMC44OTU0Mjk2LDIyLjEwNDU3MDQsMCwyMSwwTDIxLDB6Ii8+DQo8L2c+DQo8Zz4NCgk8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjIxLDYgMiw2IDIsOCAyMSw4IDIxLDYgCSIvPg0KPC9nPg0KPGc+DQoJPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI4LDMgNiwzIDYsNSA4LDUgOCwzIAkiLz4NCjwvZz4NCjxnPg0KCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMTcsMyAxMCwzIDEwLDQgMTcsNCAxNywzIAkiLz4NCjwvZz4NCjxnPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMS41LDExYzIuNDgxMzA5OSwwLDQuNSwyLjAxODY4ODIsNC41LDQuNVMxMy45ODEzMDk5LDIwLDExLjUsMjBTNywxNy45ODEzMTE4LDcsMTUuNVM5LjAxODY5MDEsMTEsMTEuNSwxMQ0KCQkgTTExLjUsOUM3LjkxMDE1MDUsOSw1LDExLjkxMDE0ODYsNSwxNS41UzcuOTEwMTUwNSwyMiwxMS41LDIyczYuNS0yLjkxMDE0ODYsNi41LTYuNVMxNS4wODk4NDk1LDksMTEuNSw5TDExLjUsOXoiLz4NCjwvZz4NCjwvc3ZnPg0K"
    },
    {
      "id": 218633,
      "name": "Сушильные машины",
      "parent_id": 218627,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218634,
      "name": "Утюги",
      "parent_id": 218627,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218635,
      "name": "Гладильные доски",
      "parent_id": 218627,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218636,
      "name": "Пылесосы",
      "parent_id": 218627,
      "priority_index": 50,
      "id_product_cat": 2,
      "is_show": true,
      "prefix": null,
      "priority_show": 20,
      "icon": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4wLjIsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0icmFkY29yIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDM3LjgxODE4MDEgMjcuOTA0OTI0NCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzcuODE4MTgwMSAyNy45MDQ5MjQ0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZmlsbDpub25lO3N0cm9rZTojRkYzQzExO3N0cm9rZS13aWR0aDoxLjYzNjM2MzY7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQ0KCS5zdDF7ZmlsbDpub25lO3N0cm9rZTojRkYzQzExO3N0cm9rZS13aWR0aDoxLjg1NDM4NTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQ0KCS5zdDJ7ZmlsbDojRkYzQzExO30NCjwvc3R5bGU+DQo8Y2lyY2xlIGNsYXNzPSJzdDAiIGN4PSI1LjMxODE4MiIgY3k9IjIyLjA2NzY1MTciIHI9IjQuNSIvPg0KPHBhdGggY2xhc3M9InN0MSIgZD0iTTExLjgxODE4MiwyNS41Njc2NTE3YzYuMjgwMDAwNywyLjMwOTk5OTUsMTUuNzgwMDAwNywxLjg4MDAwMTEsMTYtMi4wMjAwMDA1DQoJYzAuMTkwMDAwNS0zLjUtMy4zOTk5OTk2LTcuNzU5OTk5My05LjIxOTk5OTMtMTAuODI5OTk5QzEyLjc2ODE4MTgsOS42NDc2NTE3LDguODg2MjQyOSw4LjQ5OTU5MDksNS44MTgxODIsMTEuNTY3NjUxNw0KCWMtMSwxLTIuNjkwMDAwMSwyLjc5LTMuMDAwMDAwMiw0Ii8+DQo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjMuODE4MTgyLDE1LjU2NzY1MTdjLTAuMjUyMzI3LTIuMTMwNjIxLTAuOTMwMDE1Ni00LjkwMTY1MzMtMy02DQoJYy0xLjg2MDg3OC0wLjk4NzM5MjQtMy40NzMzNDI5LDAuMTA1ODcxMi01LTFjLTEuOTgwMDg3My0xLjQzNDMyMjQtMi41MzQ4ODE2LTUuNjQwMjA3My0xLTcNCgljMi43MTIwMjA5LTIuNDAyNjQ2MSwxNC4xNzc1NzAzLDIuMTA1MDUxLDE3Ljk5OTk5ODEsMTFjMi42MDIzMTAyLDYuMDU1NjgzMSwwLjczNTYzMzksMTEuOTg4ODMwNiwwLDE0Ii8+DQo8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMzYuODE4MTgzOSwyNy41Njc2NTE3aC03LjAwMDAwMzhjLTAuNTUyMjg0MiwwLTAuOTk5OTk4MS0wLjQ0NzcxMzktMC45OTk5OTgxLTAuOTk5OTk4MXYtMC4wMDAwMDE5DQoJYzAtMC41NTIyODQyLDAuNDQ3NzEzOS0xLDAuOTk5OTk4MS0xaDcuMDAwMDAzOGMwLjU1MjI4NDIsMCwwLjk5OTk5NjIsMC40NDc3MTU4LDAuOTk5OTk2MiwxdjAuMDAwMDAxOQ0KCUMzNy44MTgxODAxLDI3LjExOTkzNzksMzcuMzcwNDY4MSwyNy41Njc2NTE3LDM2LjgxODE4MzksMjcuNTY3NjUxN3oiLz4NCjwvc3ZnPg0K"
    },
    {
      "id": 218637,
      "name": "Бытовая химия",
      "parent_id": 218628,
      "priority_index": 50,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218638,
      "name": "Аксессуары для пылесосов",
      "parent_id": 218628,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218639,
      "name": "Аксессуары для утюгов",
      "parent_id": 218628,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218640,
      "name": "Аксессуары для пароочистителей",
      "parent_id": 218628,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218641,
      "name": "Кондиционеры",
      "parent_id": 218629,
      "priority_index": 50,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218642,
      "name": "Осушители воздуха",
      "parent_id": 218629,
      "priority_index": 40,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218643,
      "name": "Вентиляторы",
      "parent_id": 218629,
      "priority_index": 30,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218644,
      "name": "Обогреватели",
      "parent_id": 218629,
      "priority_index": 20,
      "id_product_cat": 2,
      "is_show": true,
      "prefix": null,
      "priority_show": 30,
      "icon": "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNjkgMzI0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNjkgMzI0Ij48c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7ZmlsbDojRkYzQzExO30gLnN0MXtmaWxsOm5vbmU7c3Ryb2tlOiNGRjNDMTE7c3Ryb2tlLXdpZHRoOjU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwO308L3N0eWxlPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMzQuNSAyMGMyNC4wMSAwIDQzLjU1MyA2LjYwNCA1OS43NDUgMjAuMTg5IDE0LjIxMiAxMS45MjQgMjUuODkxIDI5LjQ5NyAzNC43MTIgNTIuMjMzIDEzLjMgMzQuMjc4IDIwLjA0MyA3OS4zODkgMjAuMDQzIDEzNC4wNzkgMCAyOS4wMDYtMTAuNDU2IDU2LjIzNS0yOS42MDMgNzcuNWgtMTY5Ljc5NGMtMTkuMTQ3LTIxLjI2NS0yOS42MDMtNDguNDk0LTI5LjYwMy03Ny41IDAtMzYuNDg2IDEuOTI2LTkwLjEgMTguNTgyLTEzNC4yNTQgOC41NDYtMjIuNjU1IDIwLjExMi00MC4xNDggMzQuMzc1LTUxLjk5MiAxNi40MTQtMTMuNjI5IDM2LjU0NC0yMC4yNTQgNjEuNTQyLTIwLjI1NG0wLTIwYy0xMjYuMzQ4IDAtMTM0LjUgMTUxLjY2NS0xMzQuNSAyMjYuNSAwIDM4LjI4NiAxNS43NjcgNzIuODU4IDQxLjEwOSA5Ny41aDE4Ni43ODJjMjUuMzQzLTI0LjY0MiA0MS4xMDktNTkuMjE0IDQxLjEwOS05Ny41IDAtNzQuODM1LTEyLjIyNy0yMjYuNS0xMzQuNS0yMjYuNXpNMjA1LjMzMyAyNjcuNWM2LjYxNyAwIDEyIDUuMzgzIDEyIDEycy01LjM4MyAxMi0xMiAxMi0xMi01LjM4My0xMi0xMiA1LjM4My0xMiAxMi0xMm0tMTQzIDBjNi42MTcgMCAxMiA1LjM4MyAxMiAxMnMtNS4zODMgMTItMTIgMTItMTItNS4zODMtMTItMTIgNS4zODMtMTIgMTItMTJtMTQzLTVjLTkuMzg5IDAtMTcgNy42MTEtMTcgMTdzNy42MTEgMTcgMTcgMTcgMTctNy42MTEgMTctMTctNy42MTEtMTctMTctMTd6bS0xNDMgMGMtOS4zODkgMC0xNyA3LjYxMS0xNyAxN3M3LjYxMSAxNyAxNyAxNyAxNy03LjYxMSAxNy0xNy03LjYxMS0xNy0xNy0xN3pNMTM0LjUgNDEuNWMyNy4zMzYgMCA1MS4zMTUgMTYuMTIxIDU5Ljc5NyAzOS42ODUtNy44ODQgMTAuMzM3LTMwLjAyNiAyMC4zMTUtNTkuNzk3IDIwLjMxNS0yOS43NzEgMC01MS45MTMtOS45NzktNTkuNzk3LTIwLjMxNSA4LjQ4My0yMy41NjMgMzIuNDYxLTM5LjY4NSA1OS43OTctMzkuNjg1bTUxLjA4NCA3Ni44ODhjMTAuODE1IDcuMDAzIDE5Ljg4MyAxNi4xODcgMjYuNDA3IDI2Ljc5IDcuNTMgMTIuMjM2IDExLjUxIDI2LjE4NiAxMS41MSA0MC4zNCAwIDQ1LjIwNS0zOS45MjUgODEuOTgzLTg5IDgxLjk4M3MtODktMzYuNzc3LTg5LTgxLjk4M2MwLTE0LjE1NCAzLjk4LTI4LjEwNCAxMS41MS00MC4zNCA2LjUyNC0xMC42MDMgMTUuNTkyLTE5Ljc4NyAyNi40MDctMjYuNzkgMTQuNCA2LjAyMyAzMi4yOTUgOS4zMDQgNTEuMDg0IDkuMzA0czM2LjY4My0zLjI4MSA1MS4wODQtOS4zMDRtLTUxLjA4NC04Ni44ODhjLTM0LjAxNSAwLTYyLjU5NiAyMS42NzEtNzAuNyA1MSA4LjEwNCAxNi42NzcgMzYuNjg1IDI5IDcwLjcgMjlzNjIuNTk2LTEyLjMyMyA3MC43LTI5Yy04LjEwNC0yOS4zMjktMzYuNjg1LTUxLTcwLjctNTF6bTUxLjc2IDc1LjU5OGMtMTMuMjIxIDYuNTQzLTMxLjUyOSAxMC41OTQtNTEuNzYgMTAuNTk0LTIwLjIzMSAwLTM4LjUzOS00LjA1MS01MS43Ni0xMC41OTQtMjguMzM5IDE2LjE4Mi00Ny4yNCA0NS4yNDgtNDcuMjQgNzguNDE5IDAgNTAuODAxIDQ0LjMyNCA5MS45ODMgOTkgOTEuOTgzczk5LTQxLjE4MiA5OS05MS45ODNjMC0zMy4xNzEtMTguOTAxLTYyLjIzOC00Ny4yNC03OC40MTl6Ii8+PHBhdGggY2xhc3M9InN0MSIgZD0iTTIwMS44MzMgMTI3Yy02NiAzOS0xMzggMC0xMzggMG0tMTIuNSAxNy41czg1LjA0MyAzOSAxNjMgMG0tMTcxIDE3LjVzOTMuMzkxIDM5IDE3OSAwbS0xODMgMTcuNXM5Ny41NjUgMzkgMTg3IDBtLTE4NiAxNy41czk2LjUyMiAzOSAxODUgMG0tMTc5IDE3LjVzOTAuMjYxIDM5IDE3MyAwbS0xNjUgMTcuNXM4MS45MTMgMzkgMTU3IDBtLTc2LjUtMTEydjE1Mm0tMjYtMTUycy01MCAyNC0yOSAxMzNtMTA4Ljg0OSAyYzIxLTEwOS0yOS0xMzMtMjktMTMzIi8+PC9zdmc+"
    },
    {
      "id": 218645,
      "name": "Инфракрасные обогреватели",
      "parent_id": 218629,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218646,
      "name": "Аксессуары для климатической техники",
      "parent_id": 218630,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    },
    {
      "id": 218647,
      "name": "Аксессуары для приборов личного пользования",
      "parent_id": 218631,
      "priority_index": 10,
      "id_product_cat": 2,
      "is_show": false,
      "prefix": null,
      "priority_show": null,
      "icon": null
    }
  ];

  createDb() {
    const mquotationProducts = this.quotationProducts;
    const mproducts = this.products;
    const mquotation = this.quotations;
    const mcurrencies = this.currencies;
    const msuppliers = this.suppliers;
    const mproductReviews = this.productReviews;
    const manufacturers = this.manufacturers;
    const mcities = this.cities;
    const mstores = this.stores;
    const mtoken = this.tokens;
    const musers = this.users;
    const mproductStorePlaces = this.productStorePlaces;
    const mstorePlaces = this.storePlaces;
    const mlocalization = this.localization;
    const mclients = this.clients;
    const mcountries = this.countries;
    const mclientAddresses = this.clientAddresses;
    const mloEntities = this.loEntities;
    const mloSupplEntities = this.loSupplEntities;
    const mclientOrders = this.clientOrders;
    const mclientOrderSpecProducts = this.clientOrderSpecProducts;
    const mclientOrderSpecProductsOfClient = this.clientOrderSpecProductsOfClient;
    const mcartProducts = this.cartProducts;
    const mpages = this.pages;
    const mactions = this.actions;
    const mactionOffers= this.actionOffers;
    const mstoreReviews = this.storeReviews;
    const mpaymentMethods = this.paymentMethods;
    const mproductSupplCreditGrades = this.productSupplCreditGrades;
    const mcreditProducts = this.creditProducts;
    const mclientDraftOrder = this.clientDraftOrder;
    const mnovelties = this.novelties;
    const mpolls = this.polls;
    const mpollQuestion = this.pollQuestion;
    const mpollQuestionAnswer = this.pollQuestionAnswer;
    const mclientPollAnswers = this.clientPollAnswers;
    const mnoveltyDetails = this.noveltyDetails;
    const mclientBonuses = this.clientBonuses;
    const mpersons = this.persons;
    const mspecLOTrackingLog = this.specLOTrackingLog;
    const mcategories = this.categories;
    const mmeasureUnits = this.measureUnits;
    const mproductDescriptions = this.productDescriptions;
    const mProductImages = this.productImages;

    return {
      mquotationProducts,
      mproducts,
      mquotation,
      mcurrencies,
      msuppliers,
      mproductReviews,
      manufacturers,
      mcities,
      mstores,
      mtoken,
      musers,
      mproductStorePlaces,
      mstorePlaces,
      mlocalization,
      mclients,
      mcountries,
      mclientAddresses,
      mloEntities,
      mloSupplEntities,
      mclientOrders,
      mclientOrderSpecProducts,
      mclientOrderSpecProductsOfClient,
      mcartProducts,
      mpages,
      mactions,
      mactionOffers,
      mstoreReviews,
      mpaymentMethods,
      mproductSupplCreditGrades,
      mcreditProducts,
      mclientDraftOrder,
      mnovelties,
      mpolls,
      mpollQuestion,
      mpollQuestionAnswer,
      mclientPollAnswers,
      mnoveltyDetails,
      mclientBonuses,
      mpersons,
      mspecLOTrackingLog,
      mcategories,
      mmeasureUnits,
      mproductDescriptions,
      mProductImages
    };
  }

  // <editor-fold desc="monkey controller">
  private apiController(info: RequestInfo) {
    let resOpt: ResponseOptions = new ResponseOptions({
      status: 200,
      statusText: "OK",
      body: null
    });

    if (!info) {
      return null;
    }

    switch (info.collectionName) {
      case "mtoken": {
        var loginData = (<any>info.req)._body;
        if (!loginData) return info.utils.createResponse$(() => resOpt);

        const loginModel: { token: string; user: {} } = this.getTokenBehavior(
          loginData.phone,
          loginData.password
        );
        resOpt.body = loginModel;
        return info.utils.createResponse$(() => resOpt);
      }

      case "musers": {
        return this.userHandler[info.method](info, resOpt);
      }

      case "mgetDeliveryDate": {
        let reqData = (<any>info.req)._body;
        let mockDate = new Date();
        mockDate.setDate(mockDate.getDate() + reqData.loEntity);
        resOpt.body = {DeliveryDate: mockDate};
        return info.utils.createResponse$(() => resOpt);
      }

      case "mpostProductView": {
        let reqData = (<any>info.req)._body;
        return info.utils.createResponse$(() => resOpt);
      }

      case "mgetDeliveryCost": {
        let reqData = (<any>info.req)._body;
        if (reqData.order.idStorePlace)
          // Если пикап с магазина - доставка 0
          resOpt.body = {AssessedCost: 0}
        else
          {
            if (reqData.order.idQuotationProduct === 7) //Для телевизора цену доставки умножаем на кол-во товара
              resOpt.body = {AssessedCost: reqData.loEntity/10 * reqData.order.qty}
            else
              resOpt.body = {AssessedCost: reqData.loEntity/10};
          }
        return info.utils.createResponse$(() => resOpt);
      }

      case "mgetBonusesInfoForCheckout": {
        resOpt.body = {bonusLimit: 500, actionBonusLimit: 1000};
        return info.utils.createResponse$(() => resOpt);
      }

      case "mgetPromocodeDiscount": {
        let reqData = (<any>info.req)._body;
        if (reqData.promoCode) {
          let numb = reqData.promoCode.match(/\d/g);
          numb = (numb) ? numb.join("") : 0;
          resOpt.body = {discount: numb};
        }
        return info.utils.createResponse$(() => resOpt);
      }
      case "mclientPollAnswers":{
        return this.clientPollAnswersHandler[info.method](info, resOpt);
      }
      case "mdeviceData": {
        let reqData = (<any>info.req)._body;
        resOpt.body = {
          model: reqData.model,
          os: reqData.os,
          height: reqData.height,
          width: reqData.width,
          pushDeviceToken: reqData.pushDeviceToken,
          userToken: reqData.userToken
        };
        return info.utils.createResponse$(() => resOpt);
      }

      case "mcalculateCart": {
        let reqData = (<any>info.req)._body;
        let _respDataArr = [];

          (<[any]>reqData.cartContent).forEach(i => {
          let _bonusDisc = (reqData.maxBonusCnt > 0) ? Math.round(i.price*0.1):null;
          let _promoCodeDisc = (reqData.promoCode) ? Math.round(i.price*0.05):null;
          let _promoBonusDisc = (reqData.usePromoBonus) ? Math.round(i.price*0.03):null;

          _respDataArr.push(
            {clOrderSpecProdId: i.id, promoCodeDisc: _promoCodeDisc,
                bonusDisc: _bonusDisc, promoBonusDisc: _promoBonusDisc}
                );
          }
        );
        resOpt.body = JSON.stringify(_respDataArr);
        return info.utils.createResponse$(() => resOpt);
      }

      case "mredirectToPaymaster": {
        let reqData = (<any>info.req)._body;
        resOpt.body = {
          form: `
        <form action="https://lmi.paymaster.ua/" method="post" id="paymaster" name="paymaster">
          <input type="hidden" name="LMI_MERCHANT_ID" value="1984" />
          <input type="hidden" name="LMI_PAYMENT_NO" value="${reqData.id}" />
          <input type="hidden" name="LMI_PAYMENT_AMOUNT" value="${reqData.total}" />
          <input type="hidden" name="LMI_PAYMENT_DESC" value="Payment for order in Foxtrot for amount of ${reqData.total}UAH" />
          <input type="hidden" name="LMI_SYS_PAYMENT_ID" value="${reqData.id}" />
          <input type="hidden" name="LMI_SUCCESS_URL" value="" />
          <input type="hidden" name="LMI_FAIL_URL" value="" />
          <input type="hidden" name="LMI_PAYMENT_NOTIFICATION_URL" value="" />
          <!--<input type="hidden" name="LMI_PAYMENT_SYSTEM" value="21" />-->
          <!--<input type="hidden" name="LMI_SIM_MODE" value="0" />-->
        </form>
        <script type="text/javascript">
        window.onload = function() {
           document.forms["paymaster"].submit();
        }
        </script>`
        };
        return info.utils.createResponse$(() => resOpt);
      }

      default:
        return null;
    }
  }

  // </editor-fold>

  // <editor-fold desc="HTTP verbs override collections">

  userHandler: IDictionary<(info: RequestInfo, resOpt?: ResponseOptions) => any> = {
    post: info => null,
    get: info => {
      let tokenStr = (<any>info).req.headers.get("Authorization");
      if (!this.verifyToken(tokenStr)) {
        return info.utils.createResponse$(
          () =>
            new ResponseOptions({
              status: 401,
              statusText: "Unauthorized"
            })
        );
      }
      return null;
    },
    put: (info, resOpt) => {
      const user = (<any>info.req)._body;
      let tokenStr = (<any>info).req.headers.get("Authorization");

      if (!user || !this.verifyToken(tokenStr)) {
        return info.utils.createResponse$(
          () =>
            new ResponseOptions({
              status: 401,
              statusText: "Unauthorized"
            })
        );
      }

      const resultUser: User = this.getEditBehavior(user);
      resOpt.body = resultUser;
      return info.utils.createResponse$(() => resOpt);
    }
  };

  clientPollAnswersHandler:IDictionary<(info: RequestInfo, resOpt?: ResponseOptions) => any> = {
     post: info => {
       const body = (<any>info.req)._body;
       const tokenStr = (<any>info).req.headers.get("Authorization");
       const userId = (<any>info).req.headers.get("x-user");

       if(!userId || !this.verifyToken(tokenStr)) {
          return info.utils.createResponse$(
            ()=> new ResponseOptions({status: 401,statusText:'Unauthorized'})
          );
       }

       if(!body || body.pollResult.length === 0) {
        return info.utils.createResponse$(
          ()=> new ResponseOptions({status: 400,statusText:'Bad Request'})
        );
      }

      const keys:string[] = Object.keys(body.pollResult);
      const lastclientAnswerId:number = this.clientPollAnswers[this.clientPollAnswers.length-1].id;

      for(let i=0; i < keys.length; i++) {
        this.clientPollAnswers.push({
           id:lastclientAnswerId+i+1,
           userId:userId,
           idPoll:body.pollId,
           idPollQuestions: body.pollResult[keys[i]].questionId,
           clientAnswer: body.pollResult[keys[i]].answerValue
        });
      }

        return info.utils.createResponse$(
          ()=> new ResponseOptions(
            {
              status: 201,
              statusText:'Created',
              body:this.clientPollAnswers[this.clientPollAnswers.length-1]
            })
        );
     },
     get: info => null
  };
  // </editor-fold>

  // <editor-fold desc="HTTP verbs helpers">
  private getTokenBehavior(email: string,
                           password: string): { token: string; user: {} } {
    if (!email || !password) return null;

    const userResult = this.users.find(
      val => val.email === email && val.password === password
    );
    return !userResult
      ? null
      : {
        token: this.tokens[Math.floor(Math.random() * this.tokens.length)]
          .token,
        user: userResult
      };
  }

  private getEditBehavior(user: User): User {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].phone=== user.phone) {
        for (let item in this.users[i]) {
          if (item === "password" || item === "appKey") {
            continue;
          }

          this.users[i][item] = user[item];
        }
        if (user.password) this.users[i].password = user.password;
        if (user.appKey) this.users[i].appKey = user.appKey;

        return (<any>this).users[i];
      }
    }
    return null;
  }

  private verifyToken(token: string) {
    if (!token) return false;

    const tokenSplit = token.split(":");

    return (
      tokenSplit.length === 2 &&
      !!this.tokens.find(value => value.token === tokenSplit[1].trim())
    );
  }
  // </editor-fold>
}
