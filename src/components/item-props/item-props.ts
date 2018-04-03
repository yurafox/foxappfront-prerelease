import {Component, Input, OnInit} from '@angular/core';
import {ComponentBase} from '../component-extension/component-base';
import {Product} from '../../app/model/product';
import {Prop} from '../../app/model/prop';
import {ProductPropValue} from '../../app/model/product-prop-value';


export class ItemPropsTable {
  constructor(
    public prop?: Prop,
    public vals?: ProductPropValue[],
    public propStr?: string
  ){}
}

@Component({
  selector: 'item-props',
  templateUrl: 'item-props.html'
})
export class ItemPropsComponent extends ComponentBase implements OnInit {

  @Input()
  product: Product;

  // Сколько свойств отображать в гриде. Если значение -1 - то все
  @Input()
  displayPropCount: number;

  showPeriod = false;

  propsArr = new Array<ItemPropsTable>();

  constructor() {
    super();

    }

  ngOnInit () {
    this.showPeriod = (!(this.displayPropCount == -1) && (this.product.props.length > this.displayPropCount));
    super.ngOnInit();
    this.getUniqueProps();
  }

  getUniqueProps() {
    let uniqueProps = new Array<Prop>();
    let sortedProps = this.product.props.sort( (x,y) => {return x.idx - y.idx});

    sortedProps.forEach(i => {
        if (!uniqueProps.find((x) => {return x.id === i.id_Prop.id}))
           uniqueProps.push(i.id_Prop);
      }
    );

    uniqueProps.forEach(i => {
        let vals = this.product.props.filter(x => (x.id_Prop.id === i.id));
        this.propsArr.push(new ItemPropsTable(i, vals, vals.map(x => {return x.pVal;}).join('; ')));
      }
    );
  }

}
