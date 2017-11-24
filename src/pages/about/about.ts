import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {VideoOptions, VideoPlayer} from '@ionic-native/video-player';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams,
              private videoPlayer: VideoPlayer) {
  }

  ionViewDidLoad() {
  }

  // <editor-fold desc="Streaming Media & old VideoPlayer"

  videoOpts: VideoOptions;

  // Video Player
  playVideo() {
    console.log('started playing')
    this.videoOpts = {
      volume: 0.0
    };
    let localVideoUrl = 'file:///android_asset/www/assets/video/promo.mp4';
    this.platform.ready().then(() =>
      this.videoPlayer.play(localVideoUrl).then(() => {
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
