import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Item } from '../../app/item';
import { ScheduleDetailComponent } from '../../components/schedule-detail';
import { ItemService } from '../../app/item.service';
import { TimeService } from '../../app/time.service';
import { OnInit, AfterViewInit } from '@angular/core';
import { CreateItemModalPage } from '../create-item-modal/create-item-modal';
import { ModalController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import {ItemPipe} from "../../pipes/item/item";
import  moment  from 'moment';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
// Services.
import {AscensionIndexedDBService } from '../../app/ascension-indexdb.service';
// Models.
import { Entity, Item } from '../../app/models/item';


@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  providers: [ItemService, TimeService],

})
export class SchedulePage implements OnInit {


  @ViewChild(Slides) slides: Slides;

  ngOnInit(): void{

  }


  // ITEMS: Item[];
  items: any[];
  item: object;
  selectedItem: Item;
  view: string;
  view_days: string[];
  today: string;
  object: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private itemService: ItemService,
              public modalCtrl: ModalController,
              public timeService: TimeService,
              public asc: AscensionIndexedDBService,
              public entity: Entity) {

    this.view_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    this.today = this.timeService.getDay();
    console.log(this.view_days.indexOf(this.today));
    this.view = this.view_days[this.view_days.indexOf(this.today)];



  }

  get ITEMS(): Observable<Array<Item>> {

    return new Observable((observer: Observer<Array<Item>>) => {

      observer.next(this.entity.schedule);
      observer.complete();

    });

  }

  // Adds a Item.
  addItem(name: string, time: string, meridian: string, notes: string, type: string, days: any) {

    // Creates a new record.
    var record: Item = new Item();
    record.id = this.entity.createKey();
    record.name = name;
    record.time = time;
    record.meridian = meridian;
    record.notes = notes;
    record.type = type;
    record.days = days;
    record.moment = moment().hour(parseInt(time.slice(0, 2))).minute(parseInt(time.slice(3, record.time.length))).format();
    record.displayTime = moment().hour(parseInt(time.slice(0, 2))).minute(parseInt(time.slice(3, record.time.length))).format('h:mm');
    console.log(record.moment);
    // this.schedule[index].id = record.id;
    // this.schedule[index].name = record.name;
    // this.schedule[index].time = record.time;
    // this.schedule[index].meridian = record.meridian;
    // this.schedule[index].notes = record.notes;
    // this.schedule[index].type = record.type;
    // this.schedule[index].moment = JSON.stringify(moment().hour(parseInt(record.time.slice(0, 2))).minute(parseInt(record.time.slice(3, record.time.length))));
    // this.schedule[index].days = record.days;
    //

    // Adds the record.
    this.asc.addRecordAsync("ItemStore", record).forEach(

      // Next.
      (readyState) => { console.log('IndexedDB service: adding record: ' + readyState); }, null

    );

    // Updates the entity.
    this.entity.addItem(record);

    // Clears description.


  }

  // Deletes a todo.
  deleteItem(record: Item) {

    // Gets the record key.
    var key: string = record.id;

    // Deletes the record.
    this.asc.deleteRecordAsync("ItemStore", key).forEach(

      // Next.
      (readyState) => { console.log('IndexedDB service: deleting record: ' + readyState); }, null

    );

    // Updates the entity.
    this.entity.deleteItem(record);

  }

  // Edits a Item.
  editItem(record: Item) {

    // Edits the record.
    this.asc.editRecordAsync("ItemStore", record).forEach(

      // Next.
      (readyState) => { console.log('IndexedDB service: editing record: ' + readyState); }, null

    );

    // Updates the entity.
    this.entity.editItem(record);

  }

  // Clears the Items.
  clearSchedule() {

    // Clears the object store.
    this.asc.clearObjectStoreAsync("ItemStore").forEach(

      // Next.
      (readyState) => { console.log('IndexedDB service: clearing object store: ' + readyState); }, null

    );

    // Updates the entity.
    this.entity.clearSchedule();

  }

  // Sorts by description.
  sortItems() {

    this.entity.sortSchedule();

  }



  // getItems(){
  //
  //   this.ITEMS = this.itemService.getItems();
  // }


  ionViewDidEnter() {
    this.slides.slideTo(this.view_days.indexOf(this.today));

  }


  slideChanged() {
    this.view = this.view_days[this.slides.getActiveIndex()];
    console.log(this.view);

  }

  nextDay() {
    this.slides.slideNext();
  }

  prevDay() {
    this.slides.slidePrev();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }

  onSelect(item){
    // this.selectedItem = item;
    this.openItemModal(item);
  }

  onRemove(item){
    console.log('im hit');
    this.itemService.deleteItem(item);
    // this.getItems();
  }



  openItemModal(item?) {


    if(item){

          let itemModal = this.modalCtrl.create(CreateItemModalPage, { item: item } );
          itemModal.present();
          itemModal.onDidDismiss(data=>{ //This is a listener which wil get the data passed from modal when the modal's view controller is dismissed

            if(data){
              this.item = data;
              this.item['moment'] = JSON.stringify(moment().hour(this.item['time'].slice(0, 2)));

              console.log('Updating Item: ' + this.item);
              this.itemService.saveItem(this.item);
              this.itemService.getItems();//This will log the form entered by user in add modal.

            }


          });
    }
    if(!item){

      this.item = {
        is: 'item',
        name: '',
        days: {
          Monday: false,
          Tuesday: false,
          Wednesday: false,
          Thursday: false,
          Friday: false,
          Saturday: false,
          Sunday: false,
        },
        time: '',
        moment: null,
        meridian: '',
        notes: '',
        type: '',
        completed: false

      };

      this.item['days'][this.view] = true;

      let itemModal = this.modalCtrl.create(CreateItemModalPage, {item: this.item} );
      itemModal.present();
      itemModal.onDidDismiss(data=>{ //This is a listener which wil get the data passed from modal when the modal's view controller is dismissed

        if(data){

          this.item = data;

          if(this.item['time'].slice(0, 2) < 12){
            data['meridian'] = 'AM';
          }
          if(this.item['time'].slice(0, 2) >= 12){
            data['meridian'] = 'PM';
          }

          data['moment'] = moment().hour(this.item['time'].slice(0, 2)).minute(this.item['time'].slice(3, this.item['time'].length)).format('h:mm');
          console.log(data['moment']);

          console.log('Saving Item: ' + this.item);

          this.addItem(data.name, data.time, data.meridian, data.notes, data.type, data['days']);
          // this.itemService.saveItem(this.item);



          //This will log the form entered by user in add modal.


        }
        // this.ITEMS = [];
        // this.getItems();
      });


    }
  }



}
