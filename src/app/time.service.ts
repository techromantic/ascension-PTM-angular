import {Inject, Injectable} from '@angular/core';
import  moment  from 'moment';


@Injectable()
export class TimeService {


  today: string;
  now: string;


  ngOnInit(){
    this.today = moment().format('dddd');
    this.now = moment().format('HHmmss');
    console.log('today is: ', this.today + ' and time: ', this.now);
    // this.schedules = this.itemService.getToday(day);
    // this.utcTime();

  }

  getDay() :string {
    this.today = moment().format('dddd');
    console.log('Returning the day:' + this.today);
    return this.today;

  }

  getTime() :string {
    this.now = moment().format('HHmmss');
    console.log('Returning the day:' + this.today);
    return this.now;
  }



}
