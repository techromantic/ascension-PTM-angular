import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleDetailComponent } from './schedule-detail';

@NgModule({
  declarations: [
    ScheduleDetailComponent,
  ],
  imports: [
    IonicPageModule.forChild(ScheduleDetailComponent),
  ],
  exports: [
    ScheduleDetailComponent
  ]
})
export class ScheduleDetailComponentModule {}
