import {IDictionary, RefInjector} from '../../app/core/app-core';
import {OnDestroy, OnInit} from '@angular/core';
import {AbstractLocalizationRepository} from '../../app/service/repository/abstract/abstract-localization-repository';
import {EventService} from '../../app/service/event-service';
import {UserService} from '../../app/service/bll/user-service';


export abstract class ComponentBase implements OnDestroy, OnInit {
  // array locale template
  protected _localeList: IDictionary<string> = {};
  // type class name
  protected _componentName: string;
  /*// current LocaleID
  private _localeID: number = -1;*/
  // info about current subscribers
  protected listenersObj: Array<any> = [];
  // userSetting service create
  public userService: UserService;
  // application events service create
  protected evServ: EventService;
  // localization repository create
  protected locRepos: AbstractLocalizationRepository;

  // property logic for array locale template
  public get locale(): IDictionary<string> {
    return this._localeList;
  }

  protected get localeID(): number {
    return +this.userService.lang;
  }

  protected set localeID(id: number) {
    this.userService.profile.userSetting['lang'] = id.toString();
  }

  protected get currencyID(): number {
    return +this.userService.currency;
  }

  // <editor-fold desc='.ctor'>
  protected constructor(protected makeLocale: boolean = true) {
    this._componentName = (<any> this).constructor.name; // get component type
    this.userService = RefInjector.pull(UserService); // service for all user settings
    this.evServ = RefInjector.pull(EventService); // service for all application events
    this.locRepos = RefInjector.pull(AbstractLocalizationRepository); // localization repository

    if (this.makeLocale)
      this.toEventSubscribe();
  }
  // </editor-fold>
  ngOnDestroy() {
    for (let i = 0, max = this.listenersObj.length; i < max; i++) {
      this.listenersObj[i].unsubscribe();
    }
  }

  ngOnInit() {
    if (this.makeLocale)
      this.initLocalization();
  }

  // get localization data from remote service
  protected async setLocaleFromSource(data: any) {
    if (this.makeLocale) {
      let loc = await this.locRepos.getLocalization(data);
      if (loc && (Object.keys(loc).length !== 0)) {
        this._localeList = loc;
      }
    }
    this.localeID = data.lang;
  }

  // filling in (array locale template)
  public addTolocale(localeName: string, localeAlias: string) {
    this._localeList[localeAlias] = localeName;
  }

  // add subscribers
  protected toEventSubscribe() {
    let subEv: any = this.evServ.events['localeChangeEvent']
      .subscribe(data => {
        this.setLocaleFromSource({componentName: this._componentName, lang: data});
      });

    this.listenersObj.push(subEv);
  }

  protected initLocalization(): void {
    this.setLocaleFromSource({componentName: this._componentName, lang: this.userService.lang});
  }

}
