import {Injectable} from 'angular2/core';
import {Response} from "angular2/http";
import {RequestOptionsArgs} from "angular2/http";
import {Headers} from "angular2/http";
import {Http} from 'angular2/http';
import {Connection} from 'angular2/http';
import {RequestOptions} from 'angular2/http';

@Injectable()
export class SmartIntegrationService {
    
    //serviceBase = 'https://powerful-beyond-41122.herokuapp.com/';
    serviceBase: string;
    imageUrlBase: string;
    
    constructor (private _http: Http) {
        // get service base from config file
        var url = 'services/api.json';
        this._http.get(url)
            .subscribe(file => {
                let config = file.json().config;
                this.serviceBase = config.baseUrl;
                this.imageUrlBase = config.baseImageUrl;
            });
    }
    
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
        let min = localStorage.getItem('phoneNumber');
        let url = this.serviceBase + '/customer/' + min + '/catalog';
        //var url = 'http://localhost:8080/catalog';
        //var url = 'services/success.json';

        return this._http.get(url);
    }
    
    getActivityHistory() {
        var url = 'http://localhost:8080/' + 'api/activityHistory';
        //var url = 'http://localhost:8080/catalog';
        //var url = 'services/activity.json';        
        
        var data = "?min=" + localStorage.getItem('phoneNumber') + "&actvityType=0&fromDate=2015-05-01&endDate=2016-03-16&pagesize=1000&pagepage=1";

        return this._http.get(url + data);
    }
    
}
