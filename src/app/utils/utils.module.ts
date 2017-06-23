import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageModule, ILocalStorageServiceConfig } from 'angular-2-local-storage';
//import { COSMAngularIndexedDBService } from './cosm-angularindexdb.service';
import { COSMLocalStorageService } from './cosm-localstorage.service';
import { COSMIndexDBService } from './cosm-indexdb.service';
import { COSMHttpService } from './cosm-http.service';
import { COSMLoggerService } from './cosm-logger.service';
import { COSMAppUtilsService } from './cosm-apputils.service';
import { Logger, Options as LoggerOptions, Level as LoggerLevel } from "angular2-logger/core";

//this will be a config option - LWW
export var LS_NAME = 'sa-ls-';

const lsOptions: ILocalStorageServiceConfig = [
  {
    notifyOptions : {
      setItem : true,
      removeItem : true
    },
    prefix:LS_NAME,
    storageType: 'localStorage'
  }
];

@NgModule({
  imports: [
    CommonModule,
    LocalStorageModule.withConfig(lsOptions)
],
  declarations: [],
  providers: [
    COSMLocalStorageService,
    COSMIndexDBService,
    { provide: LoggerOptions, useValue: { level: LoggerLevel.INFO }},
    Logger,
    COSMHttpService,
    COSMAppUtilsService,
    COSMLoggerService],
  exports: []
})
export class UtilsModule {

  constructor(){}

}
