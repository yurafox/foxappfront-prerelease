import {Component, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {ComponentBase} from '../../components/component-extension/component-base';
import {AbstractDataRepository} from '../../app/service/repository/abstract/abstract-data-repository';
import {CartService} from '../../app/service/cart-service';

@IonicPage()
@Component({
  selector: 'page-select-pmt-method',
  templateUrl: 'select-pmt-method.html',
})
export class SelectPmtMethodPage extends ComponentBase {

  @ViewChild('f') personInfoEditForm: NgForm;
  pmtMethods = [];
  dataLoaded = false;
  passpSeries: string = '';
  grid: HTMLElement;
  keyboardHeight = 300;
  allowTakeOnCreditButton = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public repo: AbstractDataRepository, public cart: CartService,
              public modalCtrl: ModalController)
  {
    super();
    /* this.cart.initBonusData();
    this.getPmtMethods();
    if (cart.person.passportSeries && cart.person.passportSeries.length > 0) {
      this.passpSeries = cart.person.passportSeries.toUpperCase();
    }*/
  }

  async ngOnInit() {
    super.ngOnInit();

    await this.cart.initBonusData();
    this.allowTakeOnCreditButton = await this.cart.checkAllowTakeOnCredit();
    await this.getPmtMethods();
    if (this.cart.person.passportSeries && this.cart.person.passportSeries.length > 0) {
      this.passpSeries = this.cart.person.passportSeries.toUpperCase();
    }
  }

  ionViewDidLoad() {
    this.grid = document.getElementById("grid");
  }

  async getPmtMethods () {
    let pmt = await this.repo.getPmtMethods();
    if (pmt) pmt.forEach(i => {
      if( (i.id === 3 && this.allowTakeOnCreditButton) || i.id !==3 )
          this.pmtMethods.push({isChecked: ((this.cart.order.idPaymentMethod === i.id)), method: i});
      }
    );
    this.dataLoaded = true;
  }

  isAnyOptionSelected(): boolean {
    let res = false;
    for (let item of this.pmtMethods) {
        if (item.isChecked){
          res = true;
          break;
        }
    }
    return res;
  }

  personInfoValid(): boolean {
    return !((this.personInfoEditForm) && (!this.personInfoEditForm.valid));
  }

  validatePage() : boolean {
    if (!this.cart.order)
      return false;

    switch (this.cart.order.idPaymentMethod) {
      case 3: {
        return ((this.isAnyOptionSelected()) && (this.personInfoValid()) && !(this.cart.loan === null) && (this.cart.loanValid));
      }
      default: {
        return this.isAnyOptionSelected();
      }
    }
  }

  async onSelectOptionClick(option) {
    if (option.method.id === this.cart.order.idPaymentMethod)
      return;

    for (let i of this.pmtMethods) {
      let match = (i === option);
      i.isChecked = match;

      if (match) {
        this.cart.order.idPaymentMethod = option.method.id;
        if ((this.cart.order.idPaymentMethod === 1) || (this.cart.order.idPaymentMethod === 2)) {
          this.cart.loan = null;
          await this.cart.saveOrder(true);
        }
      }
    }
  }

  onShowCreditCalculatorClick() {
    let calcModal = this.modalCtrl.create('CreditCalcPage', {quotProduct: null});
    calcModal.present();
  }

  async onContinueClick() {

    if ((this.cart.person) && (this.cart.order.idPaymentMethod === 3)) {
      if (this.cart.order.idPerson)
        this.cart.person = await this.repo.updatePerson(this.cart.person)
      else
        this.cart.person = await this.repo.insertPerson(this.cart.person);

      this.cart.order.idPerson = this.cart.person.id;
    };

    await this.cart.saveOrder(true);

    if ((this.cart.availBonus > 0) || (this.cart.availPromoBonus > 0)) {
      this.navCtrl.push('BalancePage', {checkoutMode: true});
    }
    else {
      this.navCtrl.push('CheckoutPage');
    };
  }

  birthDateChanged(newDate: Date) // <-- angular date input handling workaround
  {
    this.cart.person.birthDate = new Date(newDate);
  }

  public getMaxDate(age:number=undefined):string {
    const cDate:Date = new Date();
    const checkPoint:number = age || 21;

    return `${ cDate.getFullYear() - checkPoint}-${this.convertDateNumber(cDate.getMonth(),true)}-${this.convertDateNumber(cDate.getDate())}`;
  }

  public getMinDate(age:number=undefined):string {
    const cDate:Date = new Date();
    const checkPoint:number = age || 100;

    return `${ cDate.getFullYear() - checkPoint}-${this.convertDateNumber(cDate.getMonth(),true)}-${this.convertDateNumber(cDate.getDate())}`;
  }

  convertDateNumber(value:number, isMonth:boolean = false):string {
    if(!value)
     return '';

    if(isMonth)
     value += 1;

    return (value < 10) ? `0${value}`:`${value}`;
  }

  addPaddingBottom() {
    let height = window.innerHeight/2;
    if (this.grid) this.grid.style.paddingBottom = `${height}px`;
  }

  removePaddingBottom() {
    if (this.grid) this.grid.style.paddingBottom = `0px`;
  }
}
