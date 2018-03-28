import {IDictionary} from '../../../core/app-core';
import {AbstractLocalizationRepository} from '../abstract/abstract-localization-repository';
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {AppConstants} from "../../../app-constants";

@Injectable()
export class MockLocalizationRepository extends AbstractLocalizationRepository {
  private _mockLocalizationStore: IDictionary<Array<ILocalization>> = {};

  constructor(private http: Http) {
    super();
  }

  public async setLocalization() {
    try {
      let response = await this.http.get(`${AppConstants.BASE_URL}/api/AppLocalization`).toPromise();
      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      let localization: IDictionary<Array<ILocalization>> = {};
      if (data != null) {
        let componentNames: string[] = [];
        data.forEach(val => {
          if (!componentNames.includes(val.componentName)) {
            componentNames.push(val.componentName);
          }
        });
        for (let i = 0; i < componentNames.length; i++) {
          const locales = new Array<ILocalization>();
          let componentName = componentNames[i];
          data.forEach(val => {
            if (val.componentName && val.componentName !== '' && val.componentName === componentName) {
              locales.push({tagName: val.tagName, lang: val.lang, text: val.text});
            }
          });
          if (!localization[componentName]) {
            localization[componentName] = locales;
          }
        }
      }
      this._mockLocalizationStore = localization;console.log(localization);
    } catch(err) {
      console.log(err.text);
    }
  }

  public getLocalization(data: { componentName: string, lang: number }): IDictionary<string> {
    let mockResult: IDictionary<string> = {};
    let localeArray: ILocalization[] = this._mockLocalizationStore[data.componentName];
    if (localeArray) {
      localeArray = localeArray
        .filter((value) => {
          return value.lang === +data.lang;
        });
      localeArray.forEach((value) => mockResult[value.tagName] = value.text);
    }
    return mockResult;
  }
}

interface ILocalization {
  tagName: string;
  lang: number;
  text: string
}
