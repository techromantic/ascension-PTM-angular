import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { AscensionIndexedDBService } from './ascension-indexdb.service'; // IndexedDBService class.
// Models.
import { Entity, Item } from './models/item'; // Entity classes.
// Components.
import { TodoComponent } from './todo.component';

@Component({
  templateUrl: 'app.html'
})


export class MyApp {
  rootPage:any = TabsPage;




constructor(platform: Platform, statusBar: StatusBar,
            splashScreen: SplashScreen,
            public indexedDB: AscensionIndexedDBService,
            public entity: Entity) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.openDB("AscensionDB");
    });
  }

  openDB(dbName: string) {

    // Opens the database.
    this.indexedDB.openDBAsync(dbName, 1).forEach(

      // Next.
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

        ).then(() => console.log('IndexedDB service: obtaining of all records completed.'))
      }

    );

  }

}





