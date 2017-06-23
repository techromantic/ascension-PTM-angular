'use strict';

import { Injectable } from '@angular/core';
import { Observer, Observable } from 'rxjs';

//import { ObjectStore } from './object-store';
import { COSMLoggerService } from './cosm-logger.service';

export var DB_NAME = 'ac-db';
export var DB_VERSION = 1;
export var DOC_STORE_NAME = 'docStore';

@Injectable()
export class COSMIndexDBService {
  db: IDBDatabase;

  constructor(private logger: COSMLoggerService) {
  }

  private getObjectStore(storeName: string, mode: string) {
    var tx: IDBTransaction = this.db.transaction(storeName, mode);
    return tx.objectStore(storeName);
  }

  findByDocType(docType : string):Observable<any> {
    return this.openDB(DB_NAME, DB_VERSION).map(
      response => {
        this.logger.logDebug('openDB Response:' +  response);
        return response;
      }).map(res => res)
      .flatMap(res => {
        return this.getById(DOC_STORE_NAME, docType).map((res) => {
          this.logger.logDebug(res);
          return res;
        });
      });
  }

  findById(docType : string, id : string):Observable<any> {
    return this.openDB(DB_NAME, DB_VERSION).map(
      response => {
        this.logger.logDebug('openDB Response:' +  response);
        return response;
      }).map(res => res)
      .flatMap(res => {
        return this.getById(DOC_STORE_NAME, docType).map((res) => {
          var doc = res.value;
          if (!doc){
            doc = {_id : docType,
              docType : docType,
              docs : {}
            }
          }
          this.logger.logDebug(doc.modules[id]);
          return doc.modules[id];
        });
      });
  }

  findAll():Observable<any> {
    return this.openDB(DB_NAME, DB_VERSION).map(
      response => {
        this.logger.logDebug('openDB Response:' +  response);
        return response;
      }).map(res => res)
      .flatMap(res => {
        return this.getAll(DOC_STORE_NAME).map((res) => {
          this.logger.logDebug(res);
          return res;
        });
      });
  }

  save(doc):Observable<any> {
    return this.openDB(DB_NAME, DB_VERSION).map(
      response => {
        this.logger.logDebug('openDB Response:' +  response);
        return response;
      }).map(res => res)
      .flatMap(res => {
        return this.update(DOC_STORE_NAME,doc).map((res) => {
          this.logger.logDebug(res);
          return res;
        });
      });
  }

  private openDB(dbName: string, version: number) {
    return new Observable((observer: Observer<string>) => {
      // open
      var request: IDBOpenDBRequest = indexedDB.open(dbName, version);
      // success
      request.onsuccess = (event: Event) => {
        this.db = (<IDBOpenDBRequest>event.target).result;
        observer.next((<IDBOpenDBRequest>event.target).readyState);
        observer.complete();
      };
      // error
      request.onerror = (event: Event) => {
        this.logger.logError('IndexedDB service: openDBAsync: ' + (<IDBOpenDBRequest>event.target).error.name);
        observer.error((<IDBOpenDBRequest>event.target).error.name);
      };
      // upgrade - does not exist - create it.
      request.onupgradeneeded = (event: Event) => {
        this.db = (<IDBOpenDBRequest>event.target).result;
        //var objectStores: ObjectStore = new ObjectStore();
        //objectStores.createStores(this.db);
        let objectStore = this.db.createObjectStore(DOC_STORE_NAME, { keyPath: "_id"});
        //objectStore.createIndex("docType", "docType", { unique: false });
        this.logger.logInfo('IndexedDB server: creating ' + dbName + ' completed');
      }
    })
  }

  private getById(storeName: string, key: string) {
    // Gets the object store.
    var store: IDBObjectStore = this.getObjectStore(storeName, "readonly");
    return new Observable((observer: Observer<any>) => {
      var request: IDBRequest = store.get(key);
      // Success.
      request.onsuccess = (event: Event) => {
        observer.next((<IDBRequest>event.target).result);
        observer.complete();
      };
      // Error.
      request.onerror = (event: Event) => {
        this.logger.logError('IndexedDB service: getRecordAsync: ' + (<IDBRequest>event.target).error.name);
        observer.error((<IDBRequest>event.target).error.name);
      }
    });
  }

  private getAll(storeName: string) {
    // Gets the object store.
    var store: IDBObjectStore = this.getObjectStore(storeName, "readonly");
    return new Observable((observer: Observer<any>) => {
      var request: IDBRequest = store.openCursor();
      // Success.
      request.onsuccess = (event: Event) => {
        // Steps through all the values in the object store.
        var cursor: IDBCursorWithValue = (<IDBRequest>event.target).result;
        if (cursor) {
          observer.next(cursor.value);
          cursor.continue();
        }
        else {
          observer.complete();
        }
      };
      // Error.
      request.onerror = (event: Event) => {
        this.logger.logError('IndexedDB service: getAllRecordsAsync: ' + (<IDBRequest>event.target).error.name);
        observer.error((<IDBRequest>event.target).error.name);
      }
    });
  }

  private add(storeName: string, record: any) {
    // Gets the object store.
    var store: IDBObjectStore = this.getObjectStore(storeName, "readwrite");
    return new Observable((observer: Observer<any>) => {
      var request: IDBRequest = store.add(record); // Adds a new record.
      // Success.
      request.onsuccess = (event: Event) => {
        observer.next(record);
        observer.complete();
      };
      // Error.
      request.onerror = (event: Event) => {
        this.logger.logError('IndexedDB service: add: ' + (<IDBRequest>event.target).error.name);
        observer.error((<IDBRequest>event.target).error.name);
      }
    });
  }

  private update(storeName: string, record: any) {
    // Gets the object store.
    var store: IDBObjectStore = this.getObjectStore(storeName, "readwrite");
    return new Observable((observer: Observer<any>) => {
      var request: IDBRequest = store.put(record); // Puts the updated record back into the database.
      // Success.
      request.onsuccess = (event: Event) => {
        observer.next(record);
        observer.complete();
      };
      // Error.
      request.onerror = (event: Event) => {
        this.logger.logError('IndexedDB service: updateRecordAsync: ' + (<IDBRequest>event.target).error.name);
        observer.error((<IDBRequest>event.target).error.name);
      }
    });
  }

  private delete(storeName: string, key: string) {
    // Gets the object store.
    var store: IDBObjectStore = this.getObjectStore(storeName, "readwrite");
    return new Observable((observer: Observer<any>) => {
      var request: IDBRequest = store.delete(key); // Deletes the record by the key.
      // Success.
      request.onsuccess = (event: Event) => {
        observer.next(event);
        observer.complete();
      };
      // Error.
      request.onerror = (event: Event) => {
        this.logger.logError('IndexedDB service: deleteRecordAsync: ' + (<IDBRequest>event.target).error.name);
        observer.error((<IDBRequest>event.target).error.name);
      }
    });
  }

  private clear(storeName: string) {
    // Gets the object store.
    var store: IDBObjectStore = this.getObjectStore(storeName, "readwrite");
    return new Observable((observer: Observer<any>) => {
      var request: IDBRequest = store.clear(); // Clears the object store.
      // Success.
      request.onsuccess = (event: Event) => {
        observer.next(event);
        observer.complete();
      };
      // Error.
      request.onerror = (event: Event) => {
        this.logger.logError('IndexedDB service: clearObjectStorage: ' + (<IDBRequest>event.target).error.name);
        observer.error((<IDBRequest>event.target).error.name);
      }
    });
  }

  private closeDB() {
    this.db.close();
  }
}
