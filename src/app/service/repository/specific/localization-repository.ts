import {IDictionary} from '../../../core/app-core';
import {AbstractLocalizationRepository} from '../abstract/abstract-localization-repository';
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {AppConstants} from "../../../app-constants";
import {ConnectivityService} from "../../connectivity-service";

export function getLocString() {
  switch (localStorage.getItem('lang')) {
    case '0':
      return "en-US";
    case '1':
      return "ru-UA";
    case '2':
      return "uk-UA";
    // case '3':
    //   return "ro-MD";
    default:
      return "ru-UA";
  }
}

const appLocUrl = `/api/AppLocalization`;

@Injectable()
export class LocalizationRepository extends AbstractLocalizationRepository {
  _localizationStore: IDictionary<Array<ILocalization>> = {};

  constructor(public http: Http, public connServ: ConnectivityService) {
    super();
  }

  public async setLocalization() {
    try {
      let response = await this.http.get(`${AppConstants.BASE_URL}${appLocUrl}`).toPromise();
      const data = response.json();
      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      let localization: IDictionary<Array<ILocalization>> = {};
      if (data != null) {
        let componentNames: string[] = [];
        data.forEach(val => {
          if (!(componentNames.indexOf(val.componentName) > -1)) {
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
      this._localizationStore = localization;
    } catch(err) {
      await this.handleError(err);
    }
  }

  public async getLocalization(data: { componentName: string, lang: number }): Promise<IDictionary<string>> {
    if (this._localizationStore === {}) {
      await this.setLocalization();
    }
    let result: IDictionary<string> = {};
    let localeArray: ILocalization[] = this._localizationStore[data.componentName];
    if (localeArray) {
      // Uncomment this filter if you're working with all 3 languages at time
      /*localeArray = localeArray
        .filter((value) => {
          return value.lang === data.lang;
        });*/
      for (let value of localeArray) {
        result[value.tagName] = value.text;
      }
    }
    return result;
  }

  // <editor-fold desc="error handler"
  public handleError(error?: Error): any {
    if (this.connServ.counter < 1) {
      this.connServ.checkConnection(error);
    }
  }
  // </editor-fold>

  public getLocString(): string {
    switch (localStorage.getItem('lang')) {
      case '0':
        return "en-US";
      case '1':
        return "ru-UA";
      case '2':
        return "uk-UA";
      // case '3':
      //   return "ro-MD";
      default:
        return "ru-UA";
    }
  }
}

interface ILocalization {
  tagName: string;
  lang: number;
  text: string
}
