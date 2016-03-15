import {Injectable} from 'angular2/core';
import {Response} from "angular2/http";
import {RequestOptionsArgs} from "angular2/http";
import {Headers} from "angular2/http";
import {Http} from 'angular2/http';
import {Connection} from 'angular2/http';
import {RequestOptions} from 'angular2/http';

@Injectable()
export class SmartIntegrationService {
    
    serviceBase = 'https://powerful-beyond-41122.herokuapp.com/';
    
    constructor (private _http: Http) {}
    
    getBalance(phoneNumber:string){
        
        var url = this.serviceBase + 'postpaidws/accountManagement/accounts/' + phoneNumber + '/billingDetails';
        
        return this._http.get(url, 
         <RequestOptionsArgs> {headers: new Headers(
             {'Content-Type': 'application/json',
             'Authorization': 'Basic cG9zdHBhaWR3czp3c0BQMCR0cEAhRDEyMyE=',
             'X-session': sessionStorage.getItem('authorizationData')
            })}
            );
    }
    
    getAvalaiblePoints(phoneNumber:string){
        
        var url = this.serviceBase + 'postpaidws/accountManagement/accounts/' + phoneNumber + '/details';
        
        return this._http.get(url, 
         <RequestOptionsArgs> {headers: new Headers(
             {'Content-Type': 'application/json',
             'Authorization': 'Basic cG9zdHBhaWR3czp3c0BQMCR0cEAhRDEyMyE=',
             'X-session': sessionStorage.getItem('authorizationData')
            })});
        
    }

    getCatalogs() {
        //var url = this.serviceBase + 'products';
        var url = 'http://localhost:8080/catalog';

        return this._http.get(url);
    }
    
}
