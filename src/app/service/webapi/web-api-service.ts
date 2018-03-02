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
      idStore: 36,
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
      idStore: 36,
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
  stores = [
    // Александрия
    {
      id: 1,
      stores: [
        {
          id: 1,
          position: {lat: 48.6805, lng: 33.1154},
          address: "просп. Соборний, 11",
          openTime: "9:00",
          closeTime: "21:00"
        }
      ]
    },
    // Бахмут
    {
      id: 2,
      stores: [{
        id: 2,
        position: {lat: 48.586815, lng: 38.004897},
        address: 'вул. Незалежності, 81',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Белая Церковь
    {
      id: 3, stores: [
        {
          id: 3,
          position: {lat: 49.8093, lng: 30.0949},
          address: 'бульв. Олександрійський, 115',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 4,
          position: {lat: 49.797983, lng: 30.121724},
          address: 'вул. Ярослава Мудрого, 40',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Белгород-Днестровский
    {
      id: 4,
      stores: [{
        id: 5,
        position: {lat: 46.1764, lng: 30.3537},
        address: 'вул. Тімчішина, 8',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Бердичев
    {
      id: 5,
      stores: [{
        id: 6,
        position: {lat: 49.8916, lng: 28.5843},
        address: 'вул. Вінницька, 18',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Бердянск
    {
      id: 6, stores: [
        {
          id: 7,
          position: {lat: 46.755478, lng: 36.7872},
          address: 'вул. Университетская, 43/ просп. Праці, 37',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 8,
          position: {lat: 46.760454, lng: 36.80152},
          address: 'вул. Комунарів, 75-З',
          openTime: '9:00',
          closeTime: '21:00'
        }]
    },
    // Борисполь
    {
      id: 7,
      stores: [{
        id: 9,
        position: {lat: 50.363245, lng: 30.929128},
        address: 'вул. Київський шлях, 67',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Бровары
    {
      id: 8,
      stores: [{
        id: 10,
        position: {lat: 50.52629, lng: 30.79642},
        address: 'вул. Київська, 316',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Васильков
    {
      id: 9,
      stores: [{
        id: 11,
        position: {lat: 50.1771, lng: 30.3171},
        address: 'вул. Соборна, 60',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Винница
    {
      id: 10, stores: [
        {
          id: 12,
          position: {lat: 49.2261, lng: 28.4134},
          address: 'вул. Келецька, 80',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 13,
          position: {lat: 49.240307, lng: 28.505989},
          address: 'вул. Євгена Пікуса, 1-А',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Вознесенск
    {
      id: 11,
      stores: [{
        id: 14,
        position: {lat: 47.564, lng: 31.3409},
        address: 'вул. Київська, 16',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Днепр
    {
      id: 12, stores: [
        {
          id: 15,
          position: {lat: 48.47593, lng: 35.0208},
          address: 'вул. Пастера, 6-А',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 16,
          position: {lat: 48.4773, lng: 35.0139},
          address: 'пл. Петрівського, 5',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 17,
          position: {lat: 48.4837, lng: 34.9236},
          address: 'вул. Кондратюка, 8',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 18,
          position: {lat: 48.4291, lng: 35.0651},
          address: 'вул. Набережна Перемоги, 86-А',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Дрогобыч
    {
      id: 13,
      stores: [{
        id: 19,
        position: {lat: 49.3626, lng: 23.5136},
        address: 'вул. Пилипа Орлика, 18-Б',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Дубно
    {
      id: 14,
      stores: [{
        id: 20,
        position: {lat: 50.417962, lng: 25.745615},
        address: 'пл. Незалежності, 3',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Житомир
    {
      id: 15, stores: [
        {
          id: 21,
          position: {lat: 50.2664, lng: 28.6851},
          address: 'вул. Київська, 77',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 22,
          position: {lat: 50.2561, lng: 28.673},
          address: 'пл. Житній Ринок, 1',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Запорожье
    {
      id: 16, stores: [
        {
          id: 23,
          position: {lat: 47.8179, lng: 35.1746},
          address: 'просп. Соборний, 53',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 24,
          position: {lat: 47.8563, lng: 35.1067},
          address: 'просп. Соборний, 175',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 25,
          position: {lat: 47.8208, lng: 35.0513},
          address: 'просп. Ювілейний, 16-А',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 26,
          position: {lat: 47.835, lng: 35.122},
          address: 'вул. Перемоги, 64',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Ивано-Франковск
    {
      id: 17, stores: [
        {
          id: 27,
          position: {lat: 48.9257, lng: 24.7134},
          address: 'вул. Дністровська, 26',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 28,
          position: {lat: 48.907769, lng: 24.683458},
          address: 'вул. Мазепи, 168-Б',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 29,
          position: {lat: 48.932875, lng: 24.746035},
          address: 'вул. Миколайчука, 2',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Измаил
    {
      id: 18,
      stores: [{
        id: 30,
        position: {lat: 45.3573, lng: 28.8194},
        address: 'просп. Леніна, 12',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Ирпень
    {
      id: 19,
      stores: [{
        id: 31,
        position: {lat: 50.5197, lng: 30.2446},
        address: 'вул. Шевченко, 4-Г',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Калуш
    {
      id: 20,
      stores: [{
        id: 32,
        position: {lat: 49.041445, lng: 24.354076},
        address: 'вул. Богдана Хмельницького, 50',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Каменец-Подольский
    {
      id: 21,
      stores: [{
        id: 33,
        position: {lat: 48.679713, lng: 26.587617},
        address: 'вул. Соборна, 25',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Каменское
    {
      id: 22,
      stores: [{
        id: 34,
        position: {lat: 48.516057, lng: 34.606908},
        address: 'просп. Тараса Шевченко, 9',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Киев
    {
      id: 23, stores: [
        {
          id: 35,
          position: {lat: 50.4357, lng: 30.5164},
          address: 'вул. В. Васильківська, 45',
          openTime: '9:00',
          closeTime: '21:00',
          rating: 3
        },
        {
          id: 36,
          position: {lat: 50.4898, lng: 30.4927},
          address: 'просп. Степана Бандери, 21',
          openTime: '9:00',
          closeTime: '22:00',
          rating: 4
        },
        {
          id: 37,
          position: {lat: 50.4316, lng: 30.5131},
          address: 'вул. Антоновича, 52',
          openTime: '9:00',
          closeTime: '21:00',
          rating: 4
        },
        {
          id: 38,
          position: {lat: 50.5145, lng: 30.4986},
          address: 'просп. Оболонський, 21Б',
          openTime: '9:00',
          closeTime: '21:00',
          rating: 5
        },
        {
          id: 39,
          position: {lat: 50.381827, lng: 30.44093},
          address: 'вул. Велика Кільцева, 110',
          openTime: '9:00',
          closeTime: '21:00',
          rating: 3
        },
        {
          id: 40,
          position: {lat: 50.4605, lng: 30.3469},
          address: 'вул. Чорнобильська, 16/80',
          openTime: '9:00',
          closeTime: '21:00',
          rating: 4
        },
        {
          id: 41,
          position: {lat: 50.4083, lng: 30.6552},
          address: 'вул. Вербицького, 18',
          openTime: '9:00',
          closeTime: '21:00',
          rating: 4
        },
        {
          id: 42,
          position: {lat: 50.399, lng: 30.5107},
          address: 'просп. Голосіївський, 68а',
          openTime: '9:00',
          closeTime: '21:00',
          rating: 5
        },
        {
          id: 43,
          position: {lat: 50.4634, lng: 30.5992},
          address: 'просп. Визволителів, 17',
          openTime: '9:00',
          closeTime: '21:00',
          rating: 2
        },
        {
          id: 44,
          position: {lat: 50.454762, lng: 30.636051},
          address: 'вул. Гната Хоткевича, 1-В',
          openTime: '9:00',
          closeTime: '21:00',
          rating: 5
        },
        {
          id: 45,
          position: {lat: 50.4304, lng: 30.4552},
          address: 'бульв. Чоколівський, 19',
          openTime: '9:00',
          closeTime: '21:00',
          rating: 4
        },
        {
          id: 46,
          position: {lat: 50.4312, lng: 30.3836},
          address: 'вул. Гната Юри, 20',
          openTime: '9:00',
          closeTime: '21:00',
          rating: 3
        },
        {
          id: 47,
          position: {lat: 50.3976, lng: 30.6382},
          address: 'вул. Олександра Мішуги, 4',
          openTime: '9:00',
          closeTime: '21:00',
          rating: 2
        },
        {
          id: 48,
          position: {lat: 50.451, lng: 30.4416},
          address: 'вул. Гетьмана, 6 (літери "Б,Б")',
          openTime: '9:00',
          closeTime: '21:00',
          rating: 5
        },
        {
          id: 49,
          position: {lat: 50.4567, lng: 30.3832},
          address: 'просп. Перемоги, 87',
          openTime: '9:00',
          closeTime: '21:00',
          rating: 4
        },
        {
          id: 50,
          position: {lat: 50.49375, lng: 30.56128},
          address: 'вул. Генерала Ватутіна, 2',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 51,
          position: {lat: 50.5198, lng: 30.4656},
          address: 'вул. Калнишевського, 2',
          openTime: '9:00',
          closeTime: '21:00',
          rating: 3
        },
        {
          id: 161,
          position: {lat: 50.489967, lng: 30.495350},
          address: 'просп. Степана Бандери, 23',
          openTime: '9:00',
          closeTime: '22:00'
        }
      ]
    },
    // Ковель
    {
      id: 24,
      stores: [{
        id: 52,
        position: {lat: 51.214107, lng: 24.707476},
        address: 'вул. Незалежності, 83',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Коломыя
    {
      id: 25,
      stores: [{
        id: 53,
        position: {lat: 48.5257, lng: 25.0359},
        address: 'просп. Грушевського, 12',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Конотоп
    {
      id: 26,
      stores: [{
        id: 54,
        position: {lat: 51.2278, lng: 33.1973},
        address: 'просп. Миру, 61',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Коростень
    {
      id: 27,
      stores: [{
        id: 55,
        position: {lat: 50.9506, lng: 28.6395},
        address: 'вул. Красіна, 5',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Краматорск
    {
      id: 28,
      stores: [{
        id: 56,
        position: {lat: 48.736715, lng: 37.587819},
        address: 'вул. Василя Стуса, 49',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Кременчуг
    {
      id: 29, stores: [
        {
          id: 57,
          position: {lat: 49.0658, lng: 33.4236},
          address: 'вул. Першотравнева, 44',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 58,
          position: {lat: 49.091025, lng: 33.425882},
          address: 'вул. Київська, 5-А',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Кривой Рог
    {
      id: 30, stores: [
        {
          id: 59,
          position: {lat: 47.9022, lng: 33.3941},
          address: 'просп. Металургів, 35/3',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 60,
          position: {lat: 47.730983, lng: 33.250241},
          address: 'вул. Неділіна, 43',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 61,
          position: {lat: 47.9024, lng: 33.3588},
          address: 'вул. Лермонтова, 26-А',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 62,
          position: {lat: 47.935898, lng: 33.433841},
          address: 'бульв. Вечірній, 31-А',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 63,
          position: {lat: 48.021463, lng: 33.473223},
          address: 'вул. Ватутіна, 39',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 64,
          position: {lat: 47.9636, lng: 33.4369},
          address: 'просп. 200-річчя Кривого Рогу, 7-Д',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Кропивницкий
    {
      id: 31, stores: [
        {
          id: 65,
          position: {lat: 48.507581, lng: 32.264394},
          address: 'вул. Велика Перспективна, 48',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 66,
          position: {lat: 48.5015, lng: 32.2091},
          address: 'вул. Юрія Коваленко, 6-А',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Ладыжин
    {
      id: 32,
      stores: [{
        id: 67,
        position: {lat: 48.683368, lng: 29.233181},
        address: 'вул. Будівельників, 15',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Лиман
    {
      id: 33,
      stores: [{
        id: 68,
        position: {lat: 48.964797, lng: 37.822462},
        address: 'вул. Привокзальна, 19-В',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Лисичанск
    {
      id: 34,
      stores: [{
        id: 69,
        position: {lat: 48.9121, lng: 38.4274},
        address: 'вул. Гарибальді, 50',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Лубны
    {
      id: 35,
      stores: [{
        id: 70,
        position: {lat: 50.0213, lng: 32.9835},
        address: 'просп. Володимирський, 98',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Луцк
    {
      id: 36, stores: [
        {
          id: 71,
          position: {lat: 50.745798, lng: 25.338923},
          address: 'просп. Волі, 27',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 72,
          position: {lat: 50.75522, lng: 25.35552},
          address: 'вул. Сухомлинського, 1',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Львов
    {
      id: 37, stores: [
        {
          id: 73,
          position: {lat: 49.8435, lng: 24.023},
          address: 'вул. Городоцька, 16',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 74,
          position: {lat: 49.792, lng: 24.0576},
          address: 'просп. Червоної Калини, 62',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 75,
          position: {lat: 49.856, lng: 24.0213},
          address: 'просп. Чорновола, 57',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 76,
          position: {lat: 49.807337, lng: 23.978681},
          address: 'вул. Кульпарковська, 226-А',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 77,
          position: {lat: 49.8092, lng: 23.9979},
          address: 'вул. Княгині Ольги, 106',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 78,
          position: {lat: 49.8118, lng: 24.0615},
          address: 'вул. Зелена, 147',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Мариуполь
    {
      id: 38, stores: [
        {
          id: 79,
          position: {lat: 47.1075, lng: 37.5521},
          address: 'просп. Металургів, 100',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 80,
          position: {lat: 47.1007, lng: 37.5053},
          address: 'просп. Миру, 149',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Мелитополь
    {
      id: 39,
      stores: [{
        id: 81,
        position: {lat: 46.8479, lng: 35.3756},
        address: 'просп. Богдана Хмельницького, 10',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Миргород
    {
      id: 40,
      stores: [{
        id: 82,
        position: {lat: 49.966, lng: 33.61},
        address: 'вул. Миколи Гоголя, 98/6',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Мукачево
    {
      id: 41,
      stores: [{
        id: 83,
        position: {lat: 48.441785, lng: 22.73166},
        address: 'вул. Миру, 151-Г',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Николаев
    {
      id: 42, stores: [
        {
          id: 84,
          position: {lat: 46.9636, lng: 32.0252},
          address: 'просп. Центральний, 259/1',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 85,
          position: {lat: 46.9675, lng: 31.9744},
          address: 'просп. Центральний, 27-ББ/1',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 86,
          position: {lat: 46.8558, lng: 32.014},
          address: 'просп. Корабелів, 14',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Надвирна
    {
      id: 43,
      stores: [{
        id: 87,
        position: {lat: 48.63264, lng: 24.5687},
        address: 'вул. Чорновола, 4',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Нежин
    {
      id: 44,
      stores: [{
        id: 88,
        position: {lat: 51.051148, lng: 31.88917},
        address: 'вул. Московська, 12',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Нетешин
    {
      id: 45,
      stores: [{
        id: 89,
        position: {lat: 50.33518, lng: 26.64125},
        address: 'просп. Незалежності, 11',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Никополь
    {
      id: 46,
      stores: [{
        id: 90,
        position: {lat: 47.566237, lng: 34.393076},
        address: 'вул. Електрометалургів, 42-Г',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Новая Каховка
    {
      id: 47,
      stores: [{
        id: 91,
        position: {lat: 46.7579, lng: 33.3769},
        address: 'вул. Французська, 26',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Новомосковск
    {
      id: 48,
      stores: [{
        id: 92,
        position: {lat: 48.64049, lng: 35.25982},
        address: 'вул. Гетьманська, 40-А',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Обухов
    {
      id: 49,
      stores: [{
        id: 93,
        position: {lat: 50.126007, lng: 30.653335},
        address: 'вул. Каштанова, 6/1',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Одесса
    {
      id: 50, stores: [
        {
          id: 94,
          position: {lat: 46.4681, lng: 30.7356},
          address: 'вул. Новощіпний Ряд, 2',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 95,
          position: {lat: 46.470605, lng: 30.730999},
          address: 'вул. Пантелеймонівська, 88/1',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 96,
          position: {lat: 46.443, lng: 30.7048},
          address: 'пл. Бориса Деревянко, 2',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 97,
          position: {lat: 46.3979, lng: 30.7186},
          address: 'просп. Академіка Глушка, 19',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 98,
          position: {lat: 46.5827, lng: 30.8018},
          address: 'вул. Дніпропетровська дорога, 125-Б',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 99,
          position: {lat: 46.4162, lng: 30.7125},
          address: 'просп. Маршала Жукова, 2',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Павлоград
    {
      id: 51,
      stores: [{
        id: 100,
        position: {lat: 48.529933, lng: 35.870285},
        address: 'вул. Тараса Шевченка, 118',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Первомайск
    {
      id: 52,
      stores: [{
        id: 101,
        position: {lat: 48.041942, lng: 30.850899},
        address: 'вул. Тараса Шевченка, 1',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Подольск
    {
      id: 53,
      stores: [{
        id: 102,
        position: {lat: 47.748, lng: 29.5343},
        address: 'вул. 50 років жовтня, 121-В',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Покров
    {
      id: 54,
      stores: [{
        id: 103,
        position: {lat: 47.6561, lng: 34.1073},
        address: 'вул. Центральна, 37',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Покровск
    {
      id: 55, stores: [
        {
          id: 104,
          position: {lat: 48.265877, lng: 37.181286},
          address: 'мікрорайон Південний, 41-А',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 105,
          position: {lat: 48.27321, lng: 37.176236},
          address: 'вул. Європейська, 90',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Полтава
    {
      id: 56, stores: [
        {
          id: 106,
          position: {lat: 49.5842, lng: 34.5476},
          address: 'вул. Тараса Шевченка, 44',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 107,
          position: {lat: 49.601398, lng: 34.53096},
          address: 'вул. Зіньківська, 6/1-А',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Прилуки
    {
      id: 57,
      stores: [{
        id: 108,
        position: {lat: 50.6036, lng: 32.3856},
        address: 'вул. Незалежності, 63',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Ровно
    {
      id: 58, stores: [
        {
          id: 109,
          position: {lat: 50.626095, lng: 26.200207},
          address: 'вул. Макарова, 23',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 110,
          position: {lat: 50.6245, lng: 26.2499},
          address: 'просп. Миру, 10',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 111,
          position: {lat: 50.6162, lng: 26.2805},
          address: 'вул. Київська, 67-А',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Ромны
    {
      id: 59,
      stores: [{
        id: 112,
        position: {lat: 50.751274, lng: 33.476734},
        address: 'бульв. Свободи, 10-В',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Рубежное
    {
      id: 60,
      stores: [{
        id: 113,
        position: {lat: 49.026339, lng: 38.376377},
        address: 'вул. Менделєєва, 31',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Самбор
    {
      id: 61,
      stores: [{
        id: 114,
        position: {lat: 49.515090, lng: 23.196048},
        address: 'вул. Валова, 24/1',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Северодонецк
    {
      id: 62,
      stores: [{
        id: 115,
        position: {lat: 48.941857, lng: 38.518090},
        address: 'просп. Гвардійський, 38-Б',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Славута
    {
      id: 63,
      stores: [{
        id: 116,
        position: {lat: 50.296555, lng: 26.857033},
        address: 'вул. Площа Шевченка, 12',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Славянск
    {
      id: 64,
      stores: [{
        id: 117,
        position: {lat: 48.852007, lng: 37.604062},
        address: 'пл. Соборна, 3',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Смела
    {
      id: 65,
      stores: [{
        id: 118,
        position: {lat: 49.228423, lng: 31.865693},
        address: 'вул. Леніна, 70',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Сокольники
    {
      id: 66,
      stores: [{
        id: 119,
        position: {lat: 49.772609, lng: 24.009539},
        address: 'вул. Стрийська, 30',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Старобельск
    {
      id: 67,
      stores: [{
        id: 120,
        position: {lat: 49.283316, lng: 38.908971},
        address: 'вул. Комунарів, 39-А',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Стрый
    {
      id: 68,
      stores: [{
        id: 121,
        position: {lat: 49.2607146, lng: 23.8539935},
        address: 'вул. Тараса Шевченка, 72',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Сумы
    {
      id: 69, stores: [
        {
          id: 122,
          position: {lat: 50.903244, lng: 34.812884},
          address: 'вул. Харківська, 9',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 123,
          position: {lat: 50.904678, lng: 34.805757},
          address: 'вул. Харківська, 2',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Тернополь
    {
      id: 70, stores: [
        {
          id: 124,
          position: {lat: 49.545749, lng: 25.589506},
          address: 'вул. Живова, 15-А',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 125,
          position: {lat: 49.575467, lng: 25.639449},
          address: 'вул. Текстильна, 28-Ч',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Токмак
    {
      id: 71,
      stores: [{
        id: 126,
        position: {lat: 47.264227, lng: 35.713658},
        address: 'вул. Шевченка, 54',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Ужгород
    {
      id: 72, stores: [
        {
          id: 127,
          position: {lat: 48.619844, lng: 22.294909},
          address: 'вул. Капушанська, 2',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 128,
          position: {lat: 48.618344, lng: 22.289116},
          address: 'просп. Свободи, 28',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Умань
    {
      id: 73,
      stores: [{
        id: 129,
        position: {lat: 48.756094, lng: 30.221755},
        address: 'вул. Велика Фонтанна, 31',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Фастов
    {
      id: 74,
      stores: [{
        id: 130,
        position: {lat: 50.077378, lng: 29.913310},
        address: 'вул. Зигмунда Козара, 5',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Харьков
    {
      id: 75, stores: [
        {
          id: 131,
          position: {lat: 49.943075, lng: 36.301864},
          address: 'просп. Героїв Сталінграду, 136/8',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 132,
          position: {lat: 49.990327, lng: 36.290466},
          address: 'вул. Академіка Павлова, 44-Б',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 133,
          position: {lat: 49.986365, lng: 36.259809},
          address: 'майдан Захисників України, 7/8',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 134,
          position: {lat: 49.9822, lng: 36.2396},
          address: 'вул. Вернадського, 2, літ. А-3',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 135,
          position: {lat: 49.956403, lng: 36.361966},
          address: 'просп. Московський, 256-Б',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 136,
          position: {lat: 50.058932, lng: 36.204024},
          address: 'просп. Перемоги, 62-З',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 137,
          position: {lat: 49.996009, lng: 36.339274},
          address: 'просп. Тракторобудівників, 59/56',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 138,
          position: {lat: 49.9875, lng: 36.209},
          address: 'вул. Полтавський Шлях, 56',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Херсон
    {
      id: 76, stores: [
        {
          id: 139,
          position: {lat: 46.639193, lng: 32.615326},
          address: 'просп. Ушакова, 26',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 140,
          position: {lat: 46.672824, lng: 32.644061},
          address: 'вул. Залаегерсег, 18',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Хмельницкий
    {
      id: 77, stores: [
        {
          id: 141,
          position: {lat: 49.404766, lng: 26.958422},
          address: 'вул. Кам\'янецька, 122',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 142,
          position: {lat: 49.4204, lng: 26.9885},
          address: 'вул. Свободи, 73',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Хуст
    {
      id: 78,
      stores: [{
        id: 143,
        position: {lat: 48.1776, lng: 23.2925},
        address: 'вул. Духновича, 17-А/2',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Червоноград
    {
      id: 79,
      stores: [{
        id: 144,
        position: {lat: 50.391774, lng: 24.247073},
        address: 'просп. Шевченка, 25',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Черкассы
    {
      id: 80, stores: [
        {
          id: 145,
          position: {lat: 49.441, lng: 32.0665},
          address: 'бульв. Тараса Шевченка, 207',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 146,
          position: {lat: 49.424112, lng: 32.096021},
          address: 'бульв. Тараса Шевченка, 385',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 147,
          position: {lat: 49.4248, lng: 32.0147},
          address: 'вул. 30-річчя Перемоги, 29',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Чернигов
    {
      id: 81, stores: [
        {
          id: 148,
          position: {lat: 51.515306, lng: 31.306962},
          address: 'вул. 77-ї Гвардійської Дивізії, 1',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 149,
          position: {lat: 51.513528, lng: 31.324022},
          address: 'вул. Рокоссовського, 18-А',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 150,
          position: {lat: 51.495711, lng: 31.293263},
          address: 'просп. Миру, 35',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Черновцы
    {
      id: 82, stores: [
        {
          id: 151,
          position: {lat: 48.319616, lng: 25.962154},
          address: 'вул. Калинівська, 13-А',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 152,
          position: {lat: 48.2677, lng: 25.939},
          address: 'просп. Незалежності, 80',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 153,
          position: {lat: 48.258779, lng: 25.956744},
          address: 'вул. Головна, 265-А',
          openTime: '9:00',
          closeTime: '21:00'
        },
        {
          id: 154,
          position: {lat: 48.2928, lng: 25.9346},
          address: 'вул. Університецька, 2',
          openTime: '9:00',
          closeTime: '21:00'
        }
      ]
    },
    // Черноморск
    {
      id: 83,
      stores: [{
        id: 155,
        position: {lat: 46.301214, lng: 30.654565},
        address: 'вул. 1-го Травня, 5',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Шепетовка
    {
      id: 84,
      stores: [{
        id: 156,
        position: {lat: 50.179083, lng: 27.067428},
        address: 'вул. Героїв Небесної Сотні, 48',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Шостка
    {
      id: 85,
      stores: [{
        id: 157,
        position: {lat: 51.866299, lng: 33.481032},
        address: 'вул. Свободи, 30',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Энергодар
    {
      id: 86,
      stores: [{
        id: 158,
        position: {lat: 47.500765, lng: 34.655972},
        address: 'просп. Будівельників, 27-А',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Южноукраинск
    {
      id: 87,
      stores: [{
        id: 159,
        position: {lat: 47.826007, lng: 31.172942},
        address: 'просп. Незалежності, 25',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    },
    // Южный
    {
      id: 88,
      stores: [{
        id: 160,
        position: {lat: 46.626595, lng: 31.100375},
        address: 'просп. Григорівського Десанту, 34',
        openTime: '9:00',
        closeTime: '21:00'
      }]
    }
  ];
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
      favoriteStoresId: [35, 41]
    },
    {
      name: "vladimir",
      email: "dealio07@fox.com",
      password: "dealio07",
      id: 2,
      appKey: '',
      userSetting: {'currency': '1', 'lang': '2'},
      favoriteStoresId: [36, 44, 40]
    },
    {
      name: "Yuri",
      email: "yurafox@fox.com",
      password: "yurafox",
      id: 3,
      appKey: '',
      userSetting: {'currency': '0', 'lang': '3'},
      favoriteStoresId: [37, 39]
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
      idProduct: 6310491
    },
    {
      id: 2,
      noveltyId: 1,
      idProduct: 6312913
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
          loginData.email,
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
      if (this.users[i].id === user.id) {
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
