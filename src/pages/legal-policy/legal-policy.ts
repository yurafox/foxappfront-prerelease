import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';

@IonicPage()
@Component({
  selector: 'page-legal-policy',
  templateUrl: 'legal-policy.html',
})
export class LegalPolicyPage extends ComponentBase {
  legalPolicyText: string;

  constructor(public navCtrl: NavController,
              public repo: AbstractDataRepository) {
    super();
  }

  async ngOnInit() {
    this.repo.getLegalPolicy(this.userService.profile.userSetting['lang']).then( legalPolicyText => {
        this.legalPolicyText = legalPolicyText;
      }
    );
  }
}
