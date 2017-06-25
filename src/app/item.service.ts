import { Injectable } from '@angular/core';
import { Entity, Item } from './models/item'
import { TimeService } from './time.service';
import { AscensionStorageService } from './ascension-storage.service';
import { Storage } from '@ionic/storage';
import { COSMAppUtilsService } from './utils/cosm-apputils.service';
import { UUID } from 'angular2-uuid';
import  moment  from 'moment';
import {AscensionIndexedDBService } from './ascension-indexdb.service';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ItemService {

  constructor(public timeService: TimeService, private asc: Storage, public entity: Entity) {


  }

  savedItem: object;
  items: Item[] = [];
  dailies: Item[] = [];
  item: object;
  sample: object;
  dailyItems: Item[] = [];
  nextItem: Item;
  sortedDaily: any;
  day: string;
  time: string;
  ids: any = [];
  selectedSchedule: any;
  schedules: any = [];



  sortItems() {

    this.entity.sortSchedule();

  }

  init(): void{


    this.getDayAndTime();

    setTimeout(() => {
      this.items = this.entity.schedule;
      this.itemsForToday();

    }, 2000);





  }

  getDayAndTime(){

      this.day = this.timeService.getDay();
      this.time = this.timeService.getTime();
  }

  get ITEMS(): Observable<Array<Item>> {

    return new Observable((observer: Observer<Array<Item>>) => {

      observer.next(this.entity.schedule);

      observer.complete();

    });

  }

  itemsForToday(){

    this.items.forEach(key =>{
      console.log(key);
      if(key['days'][this.day] == true){

        console.log(moment(key['moment']).isAfter(moment()));
        if(moment(key['moment']).isAfter(moment())){
          this.dailyItems.push(key);
        }

      }
    })

    this.nextItem = this.dailyItems[0];



  }

  getNext(){

    if(this.nextItem){
      return this.nextItem;
    }

  }

  getItemsForToday(){

    return this.dailyItems;
  }


  //
  // getItems(): any {
  //
  //   this.items = [];
  //   this.asc.get('items').then(data => {
  //     console.log('Items: ' + data);
  //     this.sample = data;
  //     console.log(this.sample);
  //
  //
  //   });
  //
  //   this.asc.forEach((value, key, index) => {
  //     // console.log("This is the value", value);
  //     // console.log("from the key", key);
  //     // console.log("Index is", index);
  //
  //     if (key == 'items') {
  //       console.log('Found item ids:' + value);
  //       this.ids = value;
  //     }
  //
  //     if (value['is'] == 'item') {
  //       console.log('Found item:' + value['name']);
  //
  //       console.log(value['moment']);
  //       // let re = /"/;
  //       //
  //       // let string = value['moment'];
  //       //
  //       // let string2 = string.replace(/"/g, "", 'g');
  //
  //       // console.log(string2);
  //       // let date = moment(value['moment'].replace('"',''));
  //       // value['moment'] = date;
  //
  //       this.items.push(value);
  //     }
  //
  //
  //   });
  //
  //   return this.items;
  //   // else{
  //   //   console.log('Found no items');
  //   //   this.items = ITEMS;
  //   //   this.asc.set('items', this.items);
  //   //   console.log('Items now' + this.items);
  //   //   return this.items;
  //   // }
  //   // stub
  //
  //
  // }

  //
  // saveLocal(item) {
  //   this.asc.set(item['id'], item);
  //
  // }

  saveItem(item): any {
    this.savedItem = item;
    console.log(this.savedItem);
    this.createID(this.savedItem);
    //
    // console.log('Saving: ' + this.asc.get(item['id']));


    // console.log(this.items[this.items.length - 1]);
    // this.items.push(item);
    // console.log(this.items[this.items.length - 1]);
    // this.asc.set('items', this.items);
  }

  deleteItem(item){

    this.asc.remove(item.id);
  }


  createID(item): any {
    let uuid = UUID.UUID();
    item['id'] = uuid;

    console.log(item);


    this.ids = this.asc.get('ids');

    if (this.ids.length > 0) {
      this.ids.push(uuid);
      this.asc.set('ids', this.ids);

    }
    else {
      this.ids = [uuid];
      this.asc.set('ids', this.ids);
    }


  }



  getDailySortedItems(): any {

    let current = this.timeService.getDay();
    let num = 0;
    let time;

    this.asc.forEach((value, key, index) => {
      // console.log("This is the value", value);
      // console.log("from the key", key);
      // console.log("Index is", index);

      if (key == 'items') {
        console.log('Found item ids:' + value);
        this.ids = value;
      }

      if (value['is'] == 'item') {
        console.log('Found item:' + value['name']);
        console.log(value['days'][current]);

        if(value['days'][current] == true){

          this.dailies.push(value);
        }

        // let re = /"/;
        //
        // let string = value['moment'];
        //
        // let string2 = string.replace(/"/g, "", 'g');

        // console.log(string2);
        // let date = moment(value['moment'].replace('"',''));
        // value['moment'] = date;

      }

    });

    var sortedDailies: any[] = this.dailies.sort((n1,n2) => {

      let num: number = parseInt(n1['time'].slice(0,2));
      let num2: number = parseInt(n2['time'].slice(0,2));

      if (num < num2) {
        return 1;
      }

      if (num > num2) {
        return -1;
      }

      return 0;
    });


    return sortedDailies;



  }


  getDailyItems(): any {

    let current = this.timeService.getDay();

    let num = 0;
    this.asc.forEach((value, key, index) => {
      // console.log("This is the value", value);
      // console.log("from the key", key);
      // console.log("Index is", index);

      if (key == 'items') {
        console.log('Found item ids:' + value);
        this.ids = value;
      }

      if (value['is'] == 'item') {
        console.log('Found item:' + value['name']);
        console.log(value['days'][current]);
        if(value['days'][current] == true){

          let time = parseInt(value['time'].slice(0,2));

          if(time >= num){
            this.dailies.push(value);

          }
          if(time < num){

            for(let x = this.dailies.length; x>= 0; x--){

              if(time < parseInt(this.dailies[x]['time'].slice(0,2))){
                continue;
              }
              if(time >= parseInt(this.dailies[x]['time'].slice(0,2))){
                this.dailies.splice(x, 0, value);
              }


            }
          }

        }

        // let re = /"/;
        //
        // let string = value['moment'];
        //
        // let string2 = string.replace(/"/g, "", 'g');

        // console.log(string2);
        // let date = moment(value['moment'].replace('"',''));
        // value['moment'] = date;

      }

    });
    return this.dailies;



  }

    //
    // isToday(element, index, array)
    // {
    //   console.log((ITEMS[index]['days']));
    //   console.log(this.timeService.getTime());
    //   console.log(this.timeService.getDay());
    //   // console.log((ITEMS[index].days.indexOf('Tuesday') > -1));
    //   return ITEMS[index]['days'].Thursday;
    // }

}
