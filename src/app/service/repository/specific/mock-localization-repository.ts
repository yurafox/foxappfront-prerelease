import {IDictionary} from '../../../core/app-core';
import {AbstractLocalizationRepository} from '../abstract/abstract-localization-repository';
import {Injectable} from '@angular/core';

@Injectable()
export class MockLocalizationRepository extends AbstractLocalizationRepository {
  private _mockLocalizationStore: IDictionary<Array<MockLocalization>> = {};

  constructor() {
    super();
    // Глобальные месседжи и проч. локализумые строки
    this._mockLocalizationStore['App'] = [
      new MockLocalization('msgError', 1, 'Ошибка'),
      new MockLocalization('msgError', 2, 'Помилка'),
      new MockLocalization('msgErrorEncountered', 1, 'Возникла ошибка'),
      new MockLocalization('msgErrorEncountered', 2, 'Сталася помилка')
    ];

    this._mockLocalizationStore['HeaderComponent'] = [
      new MockLocalization('actionHeader', 1, 'Акции'),
      new MockLocalization('creditHeader', 1, 'Кредиты'),
      new MockLocalization('loyaltyHeader', 1, 'Программа лояльности'),
      new MockLocalization('deliveryHeader', 1, 'Доставка'),
      new MockLocalization('paymentHeader', 1, 'Оплата'),
      new MockLocalization('shopHeader', 1, 'Адресса магазинов'),
      new MockLocalization('returnLinkHeader', 1, 'Обратная связь'),
      new MockLocalization('watchOrderHeader', 1, 'Отследить заказ'),
      new MockLocalization('personalAreaHeader', 1, 'Личный кабинет'),
      new MockLocalization('actionHeader', 2, 'Акції'),
      new MockLocalization('creditHeader', 2, 'Кредити'),
      new MockLocalization('loyaltyHeader', 2, 'Програма лояльності'),
      new MockLocalization('deliveryHeader', 2, 'Доставка'),
      new MockLocalization('paymentHeader', 2, 'Оплата'),
      new MockLocalization('shopHeader', 2, 'Адреса магазинів'),
      new MockLocalization('returnLinkHeader', 2, 'Зворотній зв\'язок'),
      new MockLocalization('watchOrderHeader', 2, 'Відстежити заказ'),
      new MockLocalization('personalAreaHeader', 2, 'Особистий кабінет')
    ];

    this._mockLocalizationStore['ProductFilterComponent'] = [
      new MockLocalization('manufacturesFilter', 1, 'Производители'),
      new MockLocalization('manufacturesFilter', 2, 'Виробники')
    ];

    this._mockLocalizationStore['FooterComponent'] = [
      new MockLocalization('btnSubscribe', 1, 'Подписаться'),
      new MockLocalization('btnSubscribe', 2, 'Підписатися'),
      new MockLocalization('subscribeToNewsMsgBoxCaption', 1, 'Подписка на рассылку'),
      new MockLocalization('subscribeToNewsMsgBoxCaption', 2, 'Підписка на розсилку'),
      new MockLocalization('subscribeToNewsMsgBoxSuccessText', 1, '<p>Спасибо за подписку! На Ваш почтовый ящик было отправлено письмо. Подтвердите подписку, перейдя по ссылке в письме.</p>'),
      new MockLocalization('subscribeToNewsMsgBoxSuccessText', 2, '<p>Дякуємо за те, що підписалися! На Вашу поштову скриньку був відправлений лист. Для підтвердження підписки перейдіть за посиланням у листі</p>')
    ];
  }

  public getLocalization(data: { componentName: string, lang: number }): Promise<IDictionary<string>> {
    let mockResult: IDictionary<string> = {};
    let localeArray: MockLocalization[] = this._mockLocalizationStore[data.componentName];
    if(localeArray) {
      localeArray = localeArray
        .filter((value) => {
          return value.lang === +data.lang;
        });
      localeArray.forEach((value) => mockResult[value.tagname] = value.text);
    }
    let promise = Promise.resolve(mockResult);
    return promise;
  }
}

class MockLocalization {
  constructor(public tagname: string,
              public lang: number,
              public text: string) {
  }
}
