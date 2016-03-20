import {Injectable} from 'angular2/core';
import {Response} from "angular2/http";
import {RequestOptionsArgs} from "angular2/http";
import {Headers} from "angular2/http";
import {Http} from 'angular2/http';
import {Connection} from 'angular2/http';
import {RequestOptions} from 'angular2/http';
import {Catalog} from '../models/catalog';
import {CartItem} from '../models/cart-item';

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
        let url = 'https://salty-fjord-81743.herokuapp.com' + '/customer/' + min + '/catalog';
        //var url = 'http://localhost:8080/catalog';
        //var url = 'services/success.json';

        return this._http.get(url,
        <RequestOptionsArgs> {headers: new Headers(
                {'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('accessToken'))
            })});
    }
    
    getActivityHistory() {
        var url = 'https://salty-fjord-81743.herokuapp.com/' + 'api/activityHistory';
        //var url = 'http://localhost:8080/catalog';
        //var url = 'services/activity.json';        
        
        var data = "?min=" + localStorage.getItem('phoneNumber') + "&actvityType=0&fromDate=2015-05-01&endDate=2016-03-16&pagesize=1000&pagepage=1";

        return this._http.get(url + data,
        <RequestOptionsArgs> {headers: new Headers(
                {'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('accessToken'))
            })});
    }

    confirmOrder(items: CartItem[]) {
        let min = localStorage.getItem('phoneNumber');
        var url = this.serviceBase + '/customer/' + min + '/redeem';

        let data = items.map(item => {
            let catalog;
            let bill;
            if (item.type === 'catalog') {
                catalog = {
                    code: item.catalog.code,
                    quantity: item.amount,
                    dest: item.getSendTo()
                };
            }
            else {
                bill = {
                    merchantIdentifier: "0",
                    amount: 0,
                    pin: "0",
                    ref: "0"
                };
            }
            let result = {
                type: item.type,
                channel: 2,
                catalog: catalog,
                bill: bill
            };
            return result;
        });

        console.log('confirm order: ');
        console.log(JSON.stringify(data));
        return this._http.post(url, JSON.stringify(data));
    }

    updateFavorite(catalog: Catalog) {
        let min = localStorage.getItem('phoneNumber');
        var url = this.serviceBase + '/customer/' + min + '/catalog/' + catalog.id + '/favorite';
        if (catalog.favorite) {
            console.log('mark as favorite: ' + url);
            return this._http.put(url, null,<RequestOptionsArgs> {headers: new Headers(
                {'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('accessToken'))
            })});
        }
        else {
            console.log('delete favorite: ' + url);
            return this._http.delete(url,<RequestOptionsArgs> {headers: new Headers(
                {'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('accessToken'))
            })});
        }
    }
    
    getMobileListNumber(){
        var url = 'https://salty-fjord-81743.herokuapp.com/' + 'api/mobileNoList/';
        //var url = 'http://localhost:8080/catalog';
        //var url = 'services/activity.json';        

        return this._http.get(url + localStorage.getItem('phoneNumber'),
        <RequestOptionsArgs> {headers: new Headers(
                {'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('accessToken'))
            })});

    }
    
}
