import { Component } from '@angular/core';
import {NavController} from "ionic-angular";
import {AbstractDataRepository} from "../../app/service/repository/abstract/abstract-data-repository";
import {BannerSlide} from "../../app/model/banner-slide";

@Component({
  selector: 'sliding-banner',
  templateUrl: 'sliding-banner.html'
})
export class SlidingBannerComponent {
  // list slides for slider
  public slides: BannerSlide[] = [];

  constructor(private nav: NavController, private _repo: AbstractDataRepository) {}

  async ngOnInit() {
    this.slides = await this._repo.getBannerSlides();
  }

  async handleClick(slide: BannerSlide) {
    if (slide && slide.actionType) {
      switch (slide.actionType) {
        case 1: {
          this._repo.getProductById(slide.paramNum).then((product) => {
            if (product && product !== null) {
              this.nav.push('ItemDetailPage', {prod: product, loadQuotes: true});
            }
          });
          break;
        }
        case 2: {
          let productIdsStr: string[] = slide.paramString.split(','||', '||' ,'||' , ');
          let productIds: number[] = [];
          for (let i = 0; i < productIdsStr.length; i++) {
            productIds[i] = Number.parseInt(productIdsStr[i]);
          }
          this.nav.push('CategoryPage', productIds).catch(err => {
            console.log(`Couldn't navigate to CategoryPage: ${err}`);
          });
          break;
        }
        case 3: {
          let category = null;
          if (slide.paramString && slide.paramString !== null) {
            category = slide.paramString;
          } else if (slide.paramNum && slide.paramNum !== null) {
            category = slide.paramNum;
          }
          this.nav.push('CategoryPage', category).catch(err => {
            console.log(`Couldn't navigate to CategoryPage: ${err}`);
          });
          break;
        }
        case 4: {
          let idProduct = Number.parseInt(slide.paramString);
          this.nav.push('NoveltyPage', {id: slide.paramNum, productId: idProduct}).catch(err => {
            console.log(`Couldn't navigate to NoveltyPage: ${err}`);
          });
          break;
        }
        case 5: {
          this.nav.push('ActionPage', {id: slide.paramNum}).catch(err => {
            console.log(`Couldn't navigate to ActionPage: ${err}`);
          });
          break;
        }
        default: {
          console.log(`Action type "${slide.actionType}" didn't match any known types`);
          break;
        }
      }
    }
  }
}
