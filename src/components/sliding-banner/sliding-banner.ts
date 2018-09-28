import { Component, ViewChild } from '@angular/core';
import {NavController, Slides} from "ionic-angular";
import {BannerSlide} from "../../app/model/banner-slide";
import {AbstractProductRepository} from "../../app/service/repository/abstract/abstract-product-repository";
import {AbstractBannerSlideRepository} from "../../app/service/repository/abstract/abstract-banner-slide-repository";

@Component({
  selector: 'sliding-banner',
  templateUrl: 'sliding-banner.html'
})
export class SlidingBannerComponent {
  // list slides for slider
  public slides: BannerSlide[] = [];
  @ViewChild(Slides) _slides: Slides;

  constructor(public nav: NavController, public _productRepo: AbstractProductRepository,
              public _bannerSlidesRepo: AbstractBannerSlideRepository) {}

  async ngOnInit() {
    this.slides = await this._bannerSlidesRepo.getBannerSlides();
  }

  handleClick() {
    if (this._slides && this._slides._slides) {
      if (this._slides.clickedIndex >= 0 &&
        this._slides._slides[this._slides.clickedIndex] &&
        this._slides._slides[this._slides.clickedIndex].getAttribute('data-swiper-slide-index')) {
        let slideIndx: number = +(this._slides._slides[this._slides.clickedIndex].getAttribute('data-swiper-slide-index'));
        if (this.slides[slideIndx] && this.slides[slideIndx].actionType >= 0) {
          switch (this.slides[slideIndx].actionType) {
            case 1: {
              this._productRepo.getProductById(this.slides[slideIndx].paramNum).then((product) => {
                if (product && product !== null) {
                  this.nav.push('ItemDetailPage', {prod: product, loadQuotes: true}).catch(console.error);
                }
              });
              break;
            }
            case 2: {
              let productIdsStr: string[] = this.slides[slideIndx].paramString.split(',' || ', ' || ' ,' || ' , ');
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
              if (this.slides[slideIndx].paramString && this.slides[slideIndx].paramString !== null) {
                category = this.slides[slideIndx].paramString;
              } else if (this.slides[slideIndx].paramNum && this.slides[slideIndx].paramNum !== null) {
                category = this.slides[slideIndx].paramNum;
              }
              this.nav.push('CategoryPage', category).catch(err => {
                console.log(`Couldn't navigate to CategoryPage: ${err}`);
              });
              break;
            }
            case 4: {
              let idProduct = Number.parseInt(this.slides[slideIndx].paramString);
              this.nav.push('NoveltyPage', {id: this.slides[slideIndx].paramNum, productId: idProduct}).catch(err => {
                console.log(`Couldn't navigate to NoveltyPage: ${err}`);
              });
              break;
            }
            case 5: {
              this.nav.push('ActionPage', {id: this.slides[slideIndx].paramNum}).catch(err => {
                console.log(`Couldn't navigate to ActionPage: ${err}`);
              });
              break;
            }
            default: {
              console.log(`Action type "${this.slides[slideIndx].actionType}" didn't match any known types`);
              break;
            }
          }
        }
      }
    }
  }
}
