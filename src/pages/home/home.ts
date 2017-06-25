import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScheduleModel } from '../../models/schedule-model';
// import { Item } from '../../app/item';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ScheduleDetailComponent } from '../../components/schedule-detail';
import { ItemService } from '../../app/item.service';
import { TimeService } from '../../app/time.service';
import  moment  from 'moment';
import { Observer } from 'rxjs/Observer';
import {Observable} from 'rxjs/Rx';
// Services.
import {AscensionIndexedDBService } from '../../app/ascension-indexdb.service';
// Models.
import { Entity, Item } from '../../app/models/item';
import { Geolocation } from '@ionic-native/geolocation';

import 'rxjs/add/operator/toPromise';

declare var google;



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ItemService, TimeService]
})
export class HomePage {


  @Input() items:  Observable<Array<Item>>;
  myDate: any;
  schedules : any;
  selectedSchedule: Item;
  today: string;
  location: any;
  city: any;
  state: any;
  zip: any;
  weather: any;
  w_icon: any;
  dailies: any =[];
  tasks: any = [];

  constructor(public navCtrl: NavController,
              private itemService: ItemService,
              public asc: AscensionIndexedDBService,
              public entity: Entity,
              public geolocation: Geolocation,
              private http: Http) {

    this.sortItems();




  }

  ionSelected(){
    this.sortItems();

  }

  getSchedulesToday(){
    console.log(this.entity.schedule);
    this.entity.schedule.forEach((element, index)=>{

      if(element['days'][this.today] == true){


        this.dailies.push(element);






      }



    });
  }

  getSchedulesFromNow(){

    this.dailies.forEach((element, index)=>{


      if(index < this.dailies.length - 1){
        console.log(moment(this.dailies[index + 1]['moment']).isAfter(moment()));
        if(moment(this.dailies[index + 1]['moment']).isAfter(moment())){
          this.tasks.push(element);
        }

      }
      else{
        this.tasks.push(element);
      }


    })

    console.log(this.tasks);
  }


  ngOnInit(){
    this.today = moment().format('dddd');
    let time = moment().format('HHmmss');
    // console.log('today is: ', day + ' and time: ', time);
    // this.schedules = [];
    // this.schedules = this.itemService.getDailyItems();
    // console.log(this.schedules);

    // this.schedules.forEach((element) => {
    //   console.log(element);
    // });

    this.utcTime();
    this.selectedSchedule = this.entity.schedule[0];
    // this.init();
    this.sortItems();
    this.getLocation();
    this.getSchedulesToday();
    this.getSchedulesFromNow();

  }





  getLocation(){

    this.geolocation.getCurrentPosition().then((position) => {



      this.location = position;
      console.log(this.location['coords']['latitude']);

      this.requestCity(this.location['coords']['latitude'], this.location['coords']['longitude'])
        .subscribe(
          res => {
            console.log(res['results'][0]);
            console.log(res['results'][0]['address_components'][6]['long_name']);
            this.zip = res['results'][0]['address_components'][6]['long_name'];
            this.city = res['results'][0]['address_components'][2]['long_name'];


            this.requestWeather(this.zip)
              .subscribe(
                res => {
                  console.log(res['weather'][0]['description']);
                  this.weather =  (res['weather'][0]['description']);
                  this.w_icon = 'http://openweathermap.org/img/w/' + (res['weather'][0]['icon']) + '.png';
                  console.log(this.w_icon);
                }, //Bind to view
                err => {
                  // Log errors if any
                  console.log(err);
                });





          }, //Bind to view
          err => {
            // Log errors if any
            console.log(err);
          });





    }, (err) => {
      console.log(err);
    });


  }


  requestCity(lat, lng): any{
    let key = '&key=AIzaSyDLRcYgCs13_6MzL8EZ3oS5Mr8duwr5yA0';
    let lati = lat;
    let long = lng;
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lati + ',' + long + key;
    return this.http.get(url)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      //...errors if any
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  requestWeather(zip): any{
console.log(zip);
    let key = '&APPID=d235f03b154a180a1855a97d26bbe885';
    let url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zip + '&APPID=d235f03b154a180a1855a97d26bbe885';

    return this.http.get(url)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      //...errors if any
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

//   getCity(lat, lng) {
//
//   let latlng = new google.maps.LatLng(lat, lng);
//   geocoder.geocode({'latLng': latlng}, function(results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//       // console.log(results);
//       if (results[1]) {
//         //formatted address
//         // alert(results[0].formatted_address);
//         //find country name
//         for (let i=0; i<results[0].address_components.length; i++) {
//           for (let b=0;b<results[0].address_components[i].types.length;b++) {
//
//             //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
//             if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
//               //this is the object you are looking for
//               this.city = results[0].address_components[i];
//               break;
//             }
//           }
//         }
//         //city data
//         alert(this.city.short_name + " " + this.city.long_name)
//
//
//       } else {
//         alert("No results found");
//       }
//     } else {
//       alert("Geocoder failed due to: " + status);
//     }
//   });
// }



  onSelect(schedule){

    this.selectedSchedule = schedule;
    console.log(this.selectedSchedule);
    // this.schedules.forEach((element) => {
    //   console.log(element);
    // });


  }

  // nextItem(){
  //   this.selectedSchedule = this.entity.nextItem();
  // }

  //
  //
  //
  // getNext() {
  //
  //
  //   this.selectedSchedule = this.entity.schedule[0];
  //
  //   for(let i = 0; i < this.entity.schedule.length; i++){
  //     this.schedules.push(this.entity.schedule[i]);
  //
  //   }
  //
  // }





  get ITEMS(): Observable<Item[]> {


    return new Observable((observer: Observer<Array<Item>>) => {


      observer.next(this.entity.schedule);

      observer.complete();
    });




  }


  sortItems() {

    this.entity.sortSchedule();

  }

  utcTime(): void {
    setInterval(() => {
      this.myDate = new Date();
      // console.log(this.myDate); // just testing if it is working
    }, 2000);
  }

  //
  // init(): void{
  //   setInterval(()=> {
  //
  //     this.getNext();
  //   },1000);
  //
  // }


}
