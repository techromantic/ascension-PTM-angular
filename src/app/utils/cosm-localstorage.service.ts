import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';


@Injectable()
export class COSMLocalStorageService {

  set(key, value?) : boolean {
    //console.log('COSMLocalStorageService set -->> ' + key + "-" + value);
    return this.localStorageService.set(key, value);
  }

  get(key) : any {
    //console.log('COSMLocalStorageService get -->> ' + key);
    return this.localStorageService.get(key);
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

  constructor(private localStorageService: LocalStorageService) {
    console.log('constructor COSMLocalStorageService');
  }
}



