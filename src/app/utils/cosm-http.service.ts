import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


// this will be a config option - LWW
export const PROTOCOL = 'http';
//export const SITE = 'app.ff2e.com';
export var SITE = '34.198.172.200';
export const REST_ENDPOINT = 'custom/service/v4_1/rest.php?method=';


@Injectable()
export class COSMHttpService {


    private handleError(error: any): Observable<any> {
        console.error('An error occurred', error);
        return Observable.throw(error.message || error);
    }

    /**
     *  opts : {
   *    method : BLAH
   *  httpOptions :
   *   {session : BLAH,
   *    module : BLAH,
   *    project_name : required_conditionally
   *   }
   *
   * */

    post(opts): Observable<any> {

        const headers = new Headers();
        headers.append('Content-type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        const url = PROTOCOL + '://' + SITE + '/' + REST_ENDPOINT + opts.method;
        //console.log('COSMHttpService -> url: '  + url);
        //console.log('COSMHttpService -> httpOptions '  + JSON.stringify(opts.httpOptions));
        //console.log('COSMHttpService -> headers '  + JSON.stringify(headers));
        return this.http.post(url, JSON.stringify(opts.httpOptions), headers)
            .map(response => {
                const result = response.json();
                // console.log('COSMHttpService -> response '  + JSON.stringify(result));
                return result;
            }).catch(error => this.handleError(error));
    }

    /**
     *  opts : {
   *    method : BLAH
   *  httpOptions :
   *   {session : BLAH,
   *    module : BLAH,
   *    project_name : required_conditionally
   *   }
   *
   * */

    get(opts): Observable<any> {

        const headers = new Headers();
        headers.append('Content-type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        let url = PROTOCOL + '://' + SITE + '/' + REST_ENDPOINT + opts.method;
        if (opts.httpOptions) {
            url += '?' + opts.httpOptions;
        }
        // console.log('COSMHttpService -> url: '  + url);
        return this.http.get(url, headers)
            .map(response => {
                const result = response.json();
                // console.log('COSMHttpService -> response '  + JSON.stringify(result));
                return result;
            })
            .catch(this.handleError);
    }

    /* tested 05/23/2017 - Lee Walton - Good*/
    test() : any {
        console.log('COSMHttpService -> test post');
        var postResult = this.post({method : 'get_docs',
            httpOptions : {session : 'XYZ',
                module : 'EXOPP_Departments'
            }
        });
        console.log('COSMHttpService -> postResult: '  + JSON.stringify(postResult));
        console.log('COSMHttpService -> test get');
        var getResult = this.get({method : 'get_server_time'});
        console.log('COSMHttpService -> getResult: '  + JSON.stringify(getResult));
    }

    constructor(private http: Http) { }

}
