import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import { Item } from './item';
import { ITEMS } from './mock-items';
import { Assignment } from './assignment';
import { ASSIGNMENTS } from './mock-assignments';
import { LocalStorageService } from 'angular-2-local-storage';
/*
 Generated class for the Localstorage provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class AscensionStorageService {

  set(key, value?) : any {
    //console.log('COSMLocalStorageService set -->> ' + key + "-" + value);
    console.log('Setting ' + value + ' to ' + key);
    this.localStorageService.set(key, value);


  }

  get(key) : any {
    //console.log('COSMLocalStorageService get -->> ' + key);
    this.localStorageService.get(key).then(data=>{
      console.log('Retrieved:' + data);
      return data;
    });

  }

  /* tested 05/23/2017 - Lee Walton - Good*/
  test() : any {
    console.log('COSMLocalStorageService -> test set');
    var tSet = this.set('TEST','THIS IS A TEST');
    console.log('COSMLocalStorageService -> test set!' + tSet);
    console.log('COSMLocalStorageService -> test ls.get');
    var tGet = this.get('TEST');
    console.log('COSMLocalStorageService -> test get!' + tGet);
  }

  constructor(private localStorageService: Storage) {
  }
}



