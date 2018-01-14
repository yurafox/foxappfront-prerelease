import {IDictionary} from '../../../core/app-core';
import {AbstractLocalizationRepository} from '../abstract/abstract-localization-repository';
import {Injectable} from '@angular/core';

@Injectable()
export class MockLocalizationRepository extends AbstractLocalizationRepository {
  private _mockLocalizationStore: IDictionary<Array<ILocalization>> = {};

  constructor() {
    super();
    // Глобальные месседжи и проч. локализумые строки
    this._mockLocalizationStore['App'] = [
      { tagName:'msgError', lang:1, text:'Ошибка'},
      { tagName:'msgError', lang:2, text:'Помилка'},
      { tagName:'msgError', lang:3, text:'Error'},
      { tagName:'msgErrorEncountered', lang:1, text:'Возникла ошибка'},
      { tagName:'msgErrorEncountered', lang:2, text:'Сталася помилка'},
      { tagName:'msgErrorEncountered', lang:3, text:'There was an error'}
    ];

    this._mockLocalizationStore['FoxApp'] = [
      { tagName:'MainMenu', lang:1, text:'Меню'},
      { tagName:'MainMenu', lang:2, text:'Меню'},
      { tagName:'MainMenu', lang:3, text:'Menu'},
      { tagName:'InfoMenu', lang:1, text:'Информация'},
      { tagName:'InfoMenu', lang:2, text:'Інформація'},
      { tagName:'InfoMenu', lang:3, text:'Information'},
      { tagName:'OutApp', lang:1, text:'Выйти'},
      { tagName:'OutApp', lang:2, text:'Вийти'},
      { tagName:'OutApp', lang:3, text:'Go out'},

      { tagName:'Home', lang:1, text:'Главная'},
      { tagName:'Home', lang:2, text:'Головна'},
      { tagName:'Home', lang:3, text:'Main Page'},
      { tagName:'Categories', lang:1, text:'Категории'},
      { tagName:'Categories', lang:2, text:'Категорії'},
      { tagName:'Categories', lang:3, text:'Categories'},
      { tagName:'Account', lang:1, text:'Профиль'},
      { tagName:'Account', lang:2, text:'Профіль'},
      { tagName:'Account', lang:3, text:'Profile'},

      { tagName:'Map', lang:1, text:'Магазины на карте'},
      { tagName:'Map', lang:2, text:'Магазини на мапі'},
      { tagName:'Map', lang:3, text:'Shop on the map'},
      { tagName:'Actions', lang:1, text:'Акции'},
      { tagName:'Actions', lang:2, text:'Акції'},
      { tagName:'Actions', lang:3, text:'Actions'},
      { tagName:'About', lang:1, text:'О нас'},
      { tagName:'About', lang:2, text:'Про нас'},
      { tagName:'About', lang:3, text:'About us'},
      { tagName:'Support', lang:1, text:'Поддержка'},
      { tagName:'Support', lang:2, text:'Підтримка'},
      { tagName:'Support', lang:3, text:'Support'}
    ];
  }

  public getLocalization(data: { componentName: string, lang: number }): Promise<IDictionary<string>> {
    let mockResult: IDictionary<string> = {};
    let localeArray: ILocalization[] = this._mockLocalizationStore[data.componentName];
    if(localeArray) {
      localeArray = localeArray
        .filter((value) => {
          return value.lang === +data.lang;
        });
      localeArray.forEach((value) => mockResult[value.tagName] = value.text);
    }
    let promise = Promise.resolve(mockResult);
    return promise;
  }
}

interface ILocalization {
  tagName: string;
  lang: number;
  text: string
}
