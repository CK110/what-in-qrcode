import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  code:any;
  constructor(public navCtrl: NavController,private barcodeScanner: BarcodeScanner) {

  }
  qrcode(){
    this.barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.cancelled) {
        console.log("用户取消操作");
        return false;
      }
      this.code = barcodeData;
    }, (err) => {
      console.log(err);
    });
  }

  reset(){
    this.code={};
  }

}
