import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateItemModalPage } from './create-item-modal';

@NgModule({
  declarations: [
    CreateItemModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateItemModalPage),
  ],
  exports: [
    CreateItemModalPage
  ]
})
export class CreateItemModalPageModule {}
