import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {CodePush} from "@ionic-native/code-push";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(public platform: Platform, public statusBar: StatusBar,
              public splashScreen: SplashScreen,public codePush:CodePush) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


      platform.resume.subscribe(()=>{
        this.assertCodePush();
      })
    });
  }

  /**
   * 热更新
   */
  assertCodePush(){
    //热更新
    if (this.isMobile()) {
      console.log('手机模式');
      this.platform.resume.subscribe(() =>{
        console.log('后台切换 - 热更新--> start');
        const downloadProgress = (progress) => {
          console.log(`下载进度 ${progress.receivedBytes} / ${progress.totalBytes}`);
        }

        this.codePush.sync({'updateDialog':true}, downloadProgress).subscribe((syncStatus) =>{
          console.log(syncStatus);
          console.log( '热更新 ios--> end');
        });
      });
    }
  }

  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }
}

