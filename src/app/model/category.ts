export class Category {
    constructor(public id?: number,
                public id_group?: number,
                public name?: string,                       
                public id_parent_group?:number,
                public id_product_cat?:number,
                public prefix?:string,
                public icon?:string,
                public is_show?:boolean,
                public priority?:number
                ) {
    }
  }
  