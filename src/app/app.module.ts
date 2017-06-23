import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FormsModule }   from '@angular/forms';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SchedulePage } from '../pages/schedule/schedule';
import { AssignmentPage } from '../pages/assignment/assignment';

import { CreateItemModalPage } from '../pages/create-item-modal/create-item-modal';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScheduleDetailComponent } from '../components/schedule-detail/schedule-detail';
import { ItemService } from './item.service';
import { TimeService } from './time.service';
import { AscensionStorageService } from './ascension-storage.service';
import { LocalStorageModule } from 'angular-2-local-storage';
import { IonicStorageModule } from '@ionic/storage'
import {MomentModule} from 'angular2-moment';
import { Elastic } from '../directives/elastic/elastic';
import { ItemPipe } from '../pipes/item/item';
import { UtilsModule } from './utils/utils.module';
import { HttpModule } from '@angular/http';
import {AngularIndexedDB} from 'angular2-indexeddb';
import {COSMAngularIndexedDBService} from './utils/cosm-angularindexdb.service'
import {AscensionIndexedDBService} from './ascension-indexdb.service';
import { Entity, Item } from './models/item';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SchedulePage,
    AssignmentPage,
    ScheduleDetailComponent,
    CreateItemModalPage,
    Elastic,
    ItemPipe
  ],
  imports: [
    HttpModule,
    UtilsModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(MyApp),
    FormsModule,
    MomentModule,
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    })

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SchedulePage,
    AssignmentPage,
    CreateItemModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AscensionStorageService,
    LocalStorageModule,
    ItemService,
    TimeService,
    AscensionIndexedDBService,
    Entity,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})


export class AppModule {}

