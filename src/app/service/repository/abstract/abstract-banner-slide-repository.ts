import {BannerSlide} from '../../../model/banner-slide';

export abstract class AbstractBannerSlideRepository {
  public async abstract getBannerSlides(): Promise<BannerSlide[]>;
}
