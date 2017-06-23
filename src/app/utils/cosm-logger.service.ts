import { Injectable } from '@angular/core';
import { Logger } from "angular2-logger/core";

@Injectable()
export class COSMLoggerService {

  logInfo(msg: any) {
    this._logger.info(msg);
  }

  logDebug(msg: any) {
    this._logger.debug(msg);
  }

  logError(msg: any) {
    this._logger.error(msg);
  }

  constructor(private _logger : Logger){
  }
}
