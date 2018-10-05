import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {retry} from "rxjs/operators";
import { AppConstants } from './../../../app-constants';
import { RequestFactory } from './../../../core/app-core';
import { ConnectivityService } from '../../connectivity-service';
import { Category } from '../../../model/category';
import {AbstractCatalogRepository} from "../abstract/abstract-catalog-repository";

// <editor-fold desc="url const">
const categoriesUrl = `${AppConstants.BASE_URL}/catalog`;
// </editor-fold

@Injectable()
export class CatalogRepository extends AbstractCatalogRepository {
  constructor(public http: HttpClient, public connServ: ConnectivityService) {
    super();
  }

  public async getCategories(): Promise<Category[]> {
    try {
      const response: any = await this.http
        .get(categoriesUrl, RequestFactory.makeAuthHeader()).pipe(retry(3)).toPromise();
      const data = response.body;

      if (response.status !== 200) {
        throw new Error("server side status error");
      }
      
      const categories: Category[] = new Array<Category>();
      if (data != null) {
        if (data) data.forEach(val =>
          categories.push(
            new Category(val.id, val.id_group, val.name, val.id_parent_group, val.id_product_cat, val.prefix,
              val.icon, val.is_show, val.priority)
          )
        );
      }
      return categories;
    } catch (err) {
      return await this.handleError(err);
    }
  }

  // <editor-fold desc="error handler"
  public handleError(error?: Error): any {
    if (this.connServ.counter < 1) {
      this.connServ.handleNoConnection(error);
    }
  }
  // </editor-fold>
}
