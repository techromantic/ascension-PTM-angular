import { NgModule, ErrorHandler, Injectable, APP_INITIALIZER } from '@angular/core';
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
import { HttpModule } from '@angular/http';
import {AngularIndexedDB} from 'angular2-indexeddb';
import {AscensionIndexedDBService} from './ascension-indexdb.service';
import { Entity, Item } from './models/item';
import { Geolocation } from '@ionic-native/geolocation';
import { default as Ng2WeatherIconsModule } from 'ng2-weather-icons';


@Injectable() export class IndexedDB {

  constructor(public indexedDB: AscensionIndexedDBService, public entity: Entity) { }

  load(): Promise<void> {

    // Opens the "Angular2IndexedDB" database. If it doesn't exist, it will be created.
    var promise: Promise<any> = new Promise((resolve: any) => {

      this.indexedDB.openDBAsync("AscensionDB", 1).forEach(

        (readyState: string) => {

          console.log('IndexedDB service: opening db: ' + readyState);

        }, null

      ).then(

        () => {

          // Gets all records from "TodoStore".
          this.indexedDB.getAllRecordsAsync("ItemStore").forEach(

            // Next.
            (record: Item) => {

              // Adds next record to the Todos entity.
              if (record != null) {

                this.entity.addItem(record);
              }
            }, null

          ).then(() => {

            resolve(true);
            console.log('IndexedDB service: obtaining of all records completed.');

          });

        });

    });

    return promise;

  }

}

export function initIndexedDB(indexedDB: IndexedDB): Function {
  return () => indexedDB.load();
}


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
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(MyApp),
    FormsModule,
    MomentModule,
    Ng2WeatherIconsModule,
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
    IndexedDB,
    {
      provide: APP_INITIALIZER,
      useFactory: initIndexedDB,
      deps: [IndexedDB],
      multi: true
    },
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})


export class AppModule {}

