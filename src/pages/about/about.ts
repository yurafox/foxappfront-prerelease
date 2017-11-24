import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {VideoOptions, VideoPlayer} from '@ionic-native/video-player';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  readonly LOCAL_VIDEO_URL = 'file:///android_asset/www/assets/video/';
  videoOpts: VideoOptions;
  videoFileName: string;

  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams,
              private videoPlayer: VideoPlayer) {
    this.videoFileName = 'promo';
  }

  ionViewDidLoad() {
  }

  // <editor-fold desc="Streaming Media & old VideoPlayer"
  // Video Player
  playVideo(){
    // ScalingMode: 1 - without cropping, 2 - with cropping
    this.videoOpts = {
      volume : 0.7,
      scalingMode: 2
    };
    this.platform.ready().then(() =>
      this.videoPlayer.play(this.LOCAL_VIDEO_URL + this.videoFileName + '.mp4').then(() => {
        console.log('video completed');
      }).catch(err => {
        console.log(err);
      }));
  }
  stopPlayingVideo() {
    console.log('stopped playing')
    this.videoPlayer.close();
  }
  // </editor-fold>
}
