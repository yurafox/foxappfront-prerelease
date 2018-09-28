import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {ComponentBase} from '../../components/component-extension/component-base';
import {AbstractLegalPolicyRepository} from '../../app/service/repository/abstract/abstract-legal-policy-repository';

@IonicPage()
@Component({
  selector: 'page-legal-policy',
  templateUrl: 'legal-policy.html',
})
export class LegalPolicyPage extends ComponentBase {
  legalPolicyText: string;

  constructor(public legalPolicyRepo: AbstractLegalPolicyRepository) {
    super();
  }

  async ngOnInit() {
    this.legalPolicyRepo.getLegalPolicy(this.userService.profile.userSetting['lang'])
      .then( legalPolicyText => {
        this.legalPolicyText = legalPolicyText;
      }
    );
  }
}
