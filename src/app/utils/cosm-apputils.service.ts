import { Injectable} from '@angular/core';
//import { COSMAngularIndexedDBService } from './cosm-angularindexdb.service';
import { COSMLocalStorageService } from './cosm-localstorage.service';
import { COSMHttpService } from './cosm-http.service';
import { COSMIndexDBService } from './cosm-indexdb.service';
import { COSMLoggerService } from './cosm-logger.service';
//import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { UUID } from 'angular2-uuid';

@Injectable()
export class COSMAppUtilsService {

  testUtilsPackage():any {
    //this.ls.test();
    //this.http.test();
    // this.idb.test();
    this.login('lee.walton@cosmsolutions.com', 'OrcaOrca01');
  }

  logDebug(msg:any) {
    this.logger.logDebug(msg);
  }

  logInfo(msg:any) {
    this.logger.logInfo(msg);
  }

  logError(msg:any) {
    this.logger.logError(msg);
  }

  login(userName:string, password:string):Observable<any> {
    return this.http.post({
      method: 'user_login',
      httpOptions: {
        userName: userName,
        password: password
      }
    }).map(
      response => {
        this.ls.set('session-id', response.session.id);
      },
      error => {
        this.logger.logError(error);
      });
  }

  //to be implemented - LWW
  pullFromServer(docTypes):Observable<any> {
    var sessionId = this.ls.get('session-id');
    return this.http.post({
      method: 'get_docs',
      httpOptions: {
        docTypes: docTypes,
        session: sessionId
      }
    }).map(
      response => {
        this.logger.logDebug('pullFromServer Response:' + response);
        return response;
      },
      error => {
        this.logger.logError(error);
      });
  }

  private loadLocal(doc):Observable<any> {
    return this.idb.save(doc).map(
      response => {
        this.logger.logDebug('loadLocal Response:' + response);
        return response;
      },
      error => {
        this.logger.logError(error);
      });
  }

  getLocalDocs(docTypes, opts? : any):Observable<any> {
    var fetchLocalArr = [];
    for (let docType of docTypes) {
      this.logger.logDebug('getLocalDocs -->> ' + docType);
      fetchLocalArr.push(this.idb.findByDocType(docType));
    }
    return Observable.forkJoin(fetchLocalArr).map((docArray) => {
        this.logger.logDebug(docArray);
        return docArray;
    });
  }

  getLocalDoc(docType, opts? : any):Observable<any> {

    return this.idb.findByDocType(docType).map(
      doc => {
        this.logger.logDebug('getLocalDoc Response:' + doc);
        if (opts && opts.returnDirty){
          //TODO : hack we need an index on 'dirty' - LWW
          let dirArray = {};
          for (var key in doc){
            var doc = doc[key];
            if (doc['dirty']) dirArray[key] = doc;
          }
          return dirArray;
        } else {
          return doc;
        }
      },
      error => {
        this.logger.logError(error);
      });
  }

  pullAndLoadFromServer(docTypes):Observable<any> {
    var sessionId = this.ls.get('session-id');
    return this.http.post({
      method: 'get_docs',
      httpOptions: {
        docTypes: docTypes,
        session: sessionId
      }
    }).map(res => res)
      .flatMap((res) => {
        var loadlocalArr = [];
        for (var key in res.modules) {
          var doc = res.modules[key];
          doc['_id'] = key;//redundant
          doc['docType'] = key;//redundant
          loadlocalArr.push(this.loadLocal(doc));
        }
        return Observable.forkJoin(loadlocalArr).map((docArray) => {
          this.logger.logDebug(docArray);
          return docArray;
        });
      });
  }

  //to be implemented - LWW
  pushToServer(docs):Observable<any> {
    var sessionId = this.ls.get('session-id');
    return this.http.post({
      method: 'put_docs',
      httpOptions: {
        docs: docs,
        session: sessionId
      }
    }).map(
      response => {
        this.logger.logDebug('pushToServer Response:' + response);
        return response;
      },
      error => {
        this.logger.logError(error);
      });
  }

  saveLocal(docType:string, doc):Observable<any> {
    //var sessionId = this.ls.get('session-id');
    return this.idb.findByDocType(docType).map(
      response => {
        this.logger.logDebug('saveLocal Response:' + response);
        return response;
      }).map(res => res)
      .flatMap((cDoc) => {
        if (!cDoc) {
         cDoc = {
            _id: docType,
            docType: docType,
            docs: {}
          };
        }

        //merge
        if (!doc._id) {
          let uuid = UUID.UUID();
          doc['_id'] = uuid;
          doc['id'] = uuid;
        }
        cDoc.docs[doc._id] = doc;

        return this.loadLocal(cDoc).map((res) => {
          this.logger.logDebug(res);
          return res;
        });
      });
  }


  constructor(private ls:COSMLocalStorageService,
              private http:COSMHttpService,
              private idb:COSMIndexDBService,
              //private idb:COSMAngularIndexedDBService,
              private logger:COSMLoggerService) {
    this.logger.logDebug('constructor COSMAppUtilsService');


  }

}
