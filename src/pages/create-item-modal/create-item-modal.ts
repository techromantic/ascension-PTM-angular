import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ItemService } from '../../app/item.service';
/**
 * Generated class for the CreateItemModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-item-modal',
  templateUrl: 'create-item-modal.html',
})
export class CreateItemModalPage {


  item: object;
  day: string;

  newItem: object;

  newname: string;
  newdays: object;
  newtime: string;
  newmoment: Date;
  newmeridian: string;
  newnotes: string;
  newtype: string;
  newcompleted: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public itemService: ItemService) {



      this.item  = this.navParams.get('item');
      this.day = this.navParams.get('day');

    console.log(this.item);
    console.log(this.day);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateItemModalPage');
  }

  addItem(){
    console.log(this.item);
    this.viewCtrl.dismiss(this.item);
  }

  ngOnInit(){

  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
