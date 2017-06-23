import { Component, Input } from '@angular/core';
import { Item } from '../../app/item';


@Component({
  selector: 'schedule-detail',
  templateUrl: 'schedule-detail.html'
})
export class ScheduleDetailComponent {

@Input() item: Item;

  constructor() {

  }

}
