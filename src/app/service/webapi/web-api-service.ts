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
    // console.log( info);
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
      freeShipping: true
    },
    {
      id: 2,
      idQuotation: 4,
      idProduct: 6293680,
      price: 349.0,
      maxDeliveryDays: 2,
      stockQuant: 102.0
    },
    {
      id: 3,
      idQuotation: 2,
      idProduct: 6280637,
      price: 5220.0,
      maxDeliveryDays: 5,
      stockQuant: 25
    },
    {
      id: 4,
      idQuotation: 3,
      idProduct: 6293680,
      price: 330.0,
      maxDeliveryDays: 2,
      stockQuant: 85.0
    },
    {
      id: 5,
      idQuotation: 1,
      idProduct: 6294898,
      price: 3899.0,
      maxDeliveryDays: 2,
      stockQuant: 5.0
    },
    {
      id: 6,
      idQuotation: 3,
      idProduct: 6280637,
      price: 167.7,
      maxDeliveryDays: 3,
      stockQuant: 28
    },
    {
      id: 7,
      idQuotation: 4,
      idProduct: 6337781,
      price: 13999,
      maxDeliveryDays: 2,
      stockQuant: 50,
      stockLow: true,
      freeShipping: true
    },
    {
      id: 8,
      idQuotation: 2,
      idProduct: 6325585,
      price: 3600,
      maxDeliveryDays: 2,
      stockQuant: 61
    },
    {
      id: 9,
      idQuotation: 1,
      idProduct: 6325585,
      price: 3500,
      maxDeliveryDays: 2,
      stockQuant: 54
    },
    {
      id: 10,
      idQuotation: 1,
      idProduct: 6324182,
      price: 4600,
      maxDeliveryDays: 2,
      stockQuant: 68
    },
    {
      id: 11,
      idQuotation: 4,
      idProduct: 6324182,
      price: 185,
      maxDeliveryDays: 3,
      stockQuant: 30
    },
    {
      id: 12,
      idQuotation: 2,
      idProduct: 6252121,
      price: 6000,
      maxDeliveryDays: 2,
      stockQuant: 70
    },
    {
      id: 13,
      idQuotation: 4,
      idProduct: 6252121,
      price: 499,
      maxDeliveryDays: 3,
      stockQuant: 43
    },
    {
      id: 14,
      idQuotation: 1,
      idProduct: 6202929,
      price: 4600,
      maxDeliveryDays: 2,
      stockQuant: 30
    },
    {
      id: 15,
      idQuotation: 3,
      idProduct: 6202929,
      price: 150,
      maxDeliveryDays: 2,
      stockQuant: 10
    },
    {
      id: 16,
      idQuotation: 2,
      idProduct: 6324216,
      price: 4599,
      maxDeliveryDays: 2,
      stockQuant: 40
    },
    {
      id: 17,
      idQuotation: 1,
      idProduct: 6324216,
      price: 4630,
      maxDeliveryDays: 3,
      stockQuant: 24
    },
    {
      id: 18,
      idQuotation: 3,
      idProduct: 6324213,
      price: 120,
      maxDeliveryDays: 2,
      stockQuant: 29
    },
    {
      id: 19,
      idQuotation: 1,
      idProduct: 6324213,
      price: 3270,
      maxDeliveryDays: 2,
      stockQuant: 15
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
    prop_Value_Long: null
  };
  private productPropValue2 = {
    id: 2,
    id_Product: 6280637,
    id_Prop: this.prop2,
    prop_Value_Str: null,
    prop_Value_Number: null,
    prop_Value_Bool: null,
    prop_Value_Enum: this.propEnumList1,
    prop_Value_Long: null
  };
  private productPropValue3 = {
    id: 3,
    id_Product: 6294898,
    id_Prop: this.prop2,
    prop_Value_Str: null,
    prop_Value_Number: null,
    prop_Value_Bool: null,
    prop_Value_Enum: this.propEnumList1,
    prop_Value_Long: null
  };
  private productPropValue4 = {
    id: 4,
    id_Product: 6293680,
    id_Prop: this.prop3,
    prop_Value_Str: null,
    prop_Value_Number: null,
    prop_Value_Bool: null,
    prop_Value_Enum: this.propEnumList3,
    prop_Value_Long: null
  };
  private productPropValue5 = {
    id: 5,
    id_Product: 6280637,
    id_Prop: this.prop3,
    prop_Value_Str: null,
    prop_Value_Number: null,
    prop_Value_Bool: null,
    prop_Value_Enum: this.propEnumList4,
    prop_Value_Long: null
  };
  private productPropValue6 = {
    id: 6,
    id_Product: 6294898,
    id_Prop: this.prop3,
    prop_Value_Str: null,
    prop_Value_Number: null,
    prop_Value_Bool: null,
    prop_Value_Enum: this.propEnumList5,
    prop_Value_Long: null
  };
  private productPropValue7 = {
    id: 7,
    id_Product: 6293680,
    id_Prop: this.prop1,
    prop_Value_Str: null,
    prop_Value_Number: 1,
    prop_Value_Bool: null,
    prop_Value_Enum: null,
    prop_Value_Long: null
  };
  private productPropValue8 = {
    id: 8,
    id_Product: 6280637,
    id_Prop: this.prop1,
    prop_Value_Str: null,
    prop_Value_Number: 2,
    prop_Value_Bool: null,
    prop_Value_Enum: null,
    prop_Value_Long: null
  };
  private productPropValue9 = {
    id: 9,
    id_Product: 6294898,
    id_Prop: this.prop1,
    prop_Value_Str: null,
    prop_Value_Number: 2,
    prop_Value_Bool: null,
    prop_Value_Enum: null,
    prop_Value_Long: null
  };
  private productPropValue10 = {
    id: 10,
    id_Product: 6293680,
    id_Prop: this.prop4,
    prop_Value_Str: null,
    prop_Value_Number: null,
    prop_Value_Bool: null,
    prop_Value_Enum: this.propEnumList6,
    prop_Value_Long: null
  };
  // </editor-fold>
  products = [
    {
      id: 6280637,
      name: "smart/tel SAMSUNG SM-J510H Galaxy J5 Duos ZDD (gold)",
      price: 5031,
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
      description:
      "Этот смартфон порадует обладателя своей функциональностью и стильным дизайном. Благодаря эргономичной конструкции модель <b>SAMSUNG SM-J510H Galaxy J5 Duos ZDD</b> комфортно лежит в ладони, а ее компактные габариты позволяют управлять устройством одной рукой. Смартфон оснащен большим сенсорным экраном <b>Super AMOLED</b> диагональю 5.2 дюйма, который способен передать до 16 миллионов цветов и оттенков.<br><br>Устройство с легкостью справиться с поставленными задачами благодаря мощному <b>4-ядерному процессору</b> с тактовой частотой 1.2 ГГц. Смартфон получил <b>2&nbsp;Гб оперативной памяти</b>, которой вполне достаточно для использования современных мультимедийных приложений. Встроенные <b>Wi-Fi и Bluetooth</b> модули обеспечат беспроводную передачу данных и подключение к сети Интернет. Стоит отметить, что модель комплектуется аккумулятором, ёмкость которого составляет <b>3100&nbsp;мАч</b>. Он обеспечит многочасовую, бесперебойную работу устройства без необходимости подзарядки. Для хранения музыки, фильмов, фотографий и других файлов предусмотрен накопитель объемом <b>16&nbsp;Гб</b>.\n" +
      "<p>Запечатлейте интересные моменты жизни в невероятном качестве с помощью камеры с разрешением матрицы <b>13 Мп</b> и объективом f/1.9. Для получения ярких селфи, групповых снимков и участия в видеочатах предусмотрена фронтальная камера с разрешением <b>5 Мп</b>. Функция автофокус и наличие вспышки обеспечат качественными фотографиями даже в условиях низкой освещенности.</p>",
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
      description:
      "<h2>Описание HUAWEI Y6II Dual Sim (black)</h2>\n" +
      "<h3>Производительность и память</h3>\n" +
      "<p>Смартфон от производителя <b>HUAWEI</b> работает под управлением 8-ядерного процессора с графический ускорителем Mali-450MP4. Для обеспечения быстродействия системы во время игр и работы с приложениями модель оснащена 2 Гб оперативной памяти. Объема встроенной памяти (16 Гб) будет достаточно для хранения большого количества игр, программ и файлов мультимедиа. При желании объем встроенной памяти можно расширить до 128 Гб при помощи карты памяти micro-SD. Устройство работает на базе операционной системы ОС Android 6.0 Marshmallow с удобным и доступным для понимания интерфейсом, который позволяет быстро находить необходимую информацию, изменять настройки, скачивать приложения в Play Market, изменять оформление рабочего стола и много другое.</p>\n" +
      "<h3>Качество изображения</h3>\n" +
      "<p>Вся информация в <b>HUAWEI Y6II Dual Sim (black)</b> выводится на экран диагональю 5.5 дюймов, который построен на базе IPS-матрицы. Картинка на таком дисплее отличается яркими и насыщенными цветами, а разрешающая способность 1280 x 720 пикселей обеспечит точное отображение каждой детали. Теперь качественным изображением во время просмотра фильмов и фото можно наслаждаться под любым углом обзора.</p>\n" +
      "<h3>Камера</h3>\n" +
      "<p>Модель <b>HUAWEI Y6II Dual Sim (black)</b> имеет фронтальную камеру с разрешением 13 Мп, которая не только оснащена одинарной светодиодной вспышкой, но также поддерживает режим съемки HDR, дает возможность вручную настраивать ISO, регулировать скорость затвора и много другое. Фронтальная камера с разрешающей способностью 8 Мп позволит делать яркие и детализированные автопортреты. Кроме того, при помощи основной камеры можно снимать видео в формате FullHD.</p>",
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
      url: "led_televizory.html"
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
      barcode: '+11000002680'
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
    {id: 1, idSuppler: 1, idLoEntity: 150},
    {id: 2, idSuppler: 1, idLoEntity: 100},
    {id: 3, idSuppler: 2, idLoEntity: 102},
    {id: 4, idSuppler: 2, idLoEntity: 150}
  ];

  clientOrders = [
    {
      id: 1,
      orderDate: "29/10/2017",
      idCur: 1,
      idClient: 100,
      total: 11117,
      idPaymentMethod: 1,
      idPaymentStatus: 1,
      idStatus: 0,
      loIdEntity: null,
      loIdClientAddress: null
    },
    {
      id: 2,
      orderDate: "19/10/2017",
      idCur: 0,
      idClient: 101,
      total: 497.7,
      idPaymentMethod: 2,
      idPaymentStatus: 1,
      idStatus: 2,
      loIdEntity: null,
      loIdClientAddress: null
    },
    {
      id: 3,
      orderDate: "30/10/2017",
      idCur: 0,
      idClient: 100,
      total: 120,
      idPaymentMethod: 2,
      idPaymentStatus: 1,
      idStatus: 1,
      loIdEntity: null,
      loIdClientAddress: null
    }
  ];

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
      errorMessage: null
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
      errorMessage: null
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
      errorMessage: null
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
      errorMessage: "This item currently out of stock"
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
      errorMessage: "Price for this item has changed"
    },
    {
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
    }
  ];

  cartProducts = [
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
      errorMessage: "This item currently out of stock"
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
      errorMessage: "Price for this item has changed"
    }
  ];

  //<editor-fold desc="Tokens">
  tokens = [
    {token: "fdtefdetfdwytdfetfdtewyfdeyt"},
    {token: "cscstefdetfxscdcwytdfetfdtewyfdeysc"},
    {token: "nhnhnstefdetfxscdcwytdfetfdtewyfdehnhnh"}
  ];
  //</editor-fold>

  //<editor-fold desc="Users">
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
      userSetting: {'currency': '2', 'lang': '3'},
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
      dateStart: new Date(2017, 11, 16),
      dateEnd: new Date(2017, 11, 31),
      priority: 10,
      img_url: 'assets/imgs/actions/partspay.jpg',
      sketch_content: this.dynamicContent['ACTION'],
      action_content: this.dynamicContent['PARTSPAY']
    },
    {
      id: 2,
      name: 'Роутер в подарок',
      dateStart: new Date(2017, 11, 16),
      dateEnd: new Date(2017, 11, 30),
      priority: 20,
      img_url: 'assets/imgs/actions/gift.jpg',
      sketch_content: this.dynamicContent['ACTION'],
      action_content: this.dynamicContent['ROUTERGIFT']
    }
  ];
  // </editor-fold>


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
    const mcartProducts = this.cartProducts;
    const mpages = this.pages;
    const mactions = this.actions;
    const mstoreReviews = this.storeReviews;

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
      mcartProducts,
      mpages,
      mactions,
      mstoreReviews
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
