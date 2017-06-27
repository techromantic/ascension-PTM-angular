import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpandingDashboardComponent } from './expanding-dashboard';

@NgModule({
  declarations: [
    ExpandingDashboardComponent,
  ],
  imports: [
    IonicPageModule.forChild(ExpandingDashboardComponent),
  ],
  exports: [
    ExpandingDashboardComponent
  ]
})
export class ExpandingDashboardComponentModule {}
