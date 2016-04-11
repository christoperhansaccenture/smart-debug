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
    
    initializeForgotPassword(type:String,account:string) {

    }


    getCatalogs() {
        let min = localStorage.getItem('mobileNo');
        //let brands = JSON.parse(localStorage.getItem('brands'));
        //let brands = this._accountService.mobileNoList.map(phone => phone.ssoBrand);
        //let brands = ['Infinity'];
        let brands = JSON.parse(localStorage.getItem('brands'));
        console.log('get catalog brands: ' + JSON.stringify(brands));

        let url = this.serviceBase + '/catalog?brands=' + brands.join(',');
        //let url = this.serviceBase + '/customer/' + min + '/catalog?pagesize=200&pagepage=1';
        //let url = this.serviceBase + '/customer/' + min + '/catalog';
        //var url = 'http://localhost:8080/catalog';
        //var url = 'services/success.json';

        return this._http.get(url);
        /*
        return this._http.get(url,
        <RequestOptionsArgs> {headers: new Headers(
                {'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('accessToken'))
            })});
           */
    }
    
    getActivityHistory() {
        var url = this.serviceBase + '/activityHistory';
        //var url = 'http://localhost:8080/catalog';
        //var url = 'services/activity.json';        
        
        var data = "?min=" + localStorage.getItem('mobileNo') + "&actvityType=0&fromDate=2015-05-01&endDate=2016-03-16&pagesize=1000&pagepage=1";

        return this._http.get(url + data);
    }

    confirmOrder(items: CartItem[]) {
        let min = localStorage.getItem('mobileNo');
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
                    merchantIdentifier: item.merchantIdentifier,
                    amount: item.amount,
                    pin: item.pin,
                    ref: item.ref
                    //ref: item.ref
                };
            }
            let result = {
                type: item.type,
                channel: 3,
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
        let min = localStorage.getItem('mobileNo');
        var url = this.serviceBase + '/customer/' + min + '/catalog/' + catalog.id + '/favorite';
        if (catalog.favorite) {
            console.log('mark as favorite: ' + url);
            return this._http.put(url, null);
        }
        else {
            console.log('delete favorite: ' + url);
            return this._http.delete(url);
        }
    }
    
    getMobileListNumber(){
        let min = localStorage.getItem('mobileNo');
        let url = this.serviceBase + '/mobileNoList/' + min;      

        return this._http.get(url);
    }
    
    getProfileInformation(){
        let min = localStorage.getItem('mobileNo');
        let url = this.serviceBase + '/customerInformation/' + min;      

        return this._http.get(url);

    }
    
    updateProfileInformation(userProfile:string){
        let min = localStorage.getItem('mobileNo');
        let url = this.serviceBase + '/customerInformation/' + min;      

        return this._http.put(url,userProfile);

    }
    
    transferPoints(transferData:string){
        let url = this.serviceBase + '/transfer';
        //let url = 'http://localhost:8080/api/transfer';      

        return this._http.post(url,transferData);

    }
    
}
