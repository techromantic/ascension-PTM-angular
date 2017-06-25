import { Injectable } from '@angular/core';
import  moment  from 'moment';
import { UUID } from 'angular2-uuid';
/**
 * Item entity.
 */
export class Item {

  /**
   * Key.
   */
  id: string;
  /**
   * Value.
   */
  name: string;
  days: {
    Monday: boolean;
    Tuesday: boolean;
    Wednesday: boolean;
    Thursday: boolean;
    Friday: boolean;
    Saturday: boolean;
    Sunday: boolean;
  };
  time: string;
  meridian: string;
  moment: string;
  displayTime: string;
  notes: string;
  type: string;
  completed: boolean;

}

/**
 * Entity class. Defines each entity and its methods.
 */
@Injectable() export class Entity {

  /**
   * schedule entity.
   */
  schedule: Array<Item> = [];
  next: Item;

  // nextItem(){
  //
  //   return this.schedule[0];
  // }

  logIt(){
    console.log(this.schedule);
    console.log(this.schedule[0]);

  }
  /**
   * Adds a Item.
   *
   * @param record
   */
  addItem(record: Item) {

    this.schedule.push(record);

  }

  /**
   * Deletes a Item.
   *
   * @param record
   */
  deleteItem(record: Item) {

    var index: number = this.schedule.indexOf(record);
    this.schedule.splice(index, 1);

  }

  nextItem(): any{

    this.next = this.schedule[0];
    return this.next;

  }

  /**
   * Edits a Item.
   *
   * @param record
   */
  editItem(record: Item) {

    var index: number = this.schedule.indexOf(record);
    this.schedule[index].id = record.id;
    this.schedule[index].name = record.name;
    this.schedule[index].time = record.time;
    this.schedule[index].meridian = record.meridian;
    this.schedule[index].notes = record.notes;
    this.schedule[index].type = record.type;
    this.schedule[index].moment = JSON.stringify(moment().hour(parseInt(record.time.slice(0, 2))).minute(parseInt(record.time.slice(3, record.time.length))));
    this.schedule[index].days = record.days;
  }

  /**
   * Clears the schedule entity.
   */
  clearSchedule() {

    this.schedule.splice(0);

  }

  /**
   * Creates key.
   *
   * @return A new key
   */
  createKey(): string {

    // Generates and returns a RFC4122 v4 UUID.
    return UUID.UUID();
  }

  /**
   * Sorts schedule by date.
   */
  sortSchedule() {

    this.schedule = this.schedule.sort((record1, record2) => {

      let time1 = moment().hour(parseInt(record1.time.slice(0, 2))).minute(parseInt(record1.time.slice(3, record1.time.length))).format();
      let dig = record1.time.slice(0,2);
      let dig2 = record2.time.slice(0,2);
      let time2 = moment().hour(parseInt(record2.time.slice(0, 2))).minute(parseInt(record2.time.slice(3, record2.time.length))).format();
      if (moment(time1).isBefore(time2)) {
        return -1;
      }
      if (moment(time1).isAfter(time2)) {
        return 1;
      }

    });

  }

}
