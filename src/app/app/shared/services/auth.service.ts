import {Injectable} from 'angular2/core';
import { Router } from 'angular2/router';
import {Response} from "angular2/http";
import {RequestOptionsArgs} from "angular2/http";
import {Headers} from "angular2/http";
import {Http} from 'angular2/http';
import {Connection} from 'angular2/http';
import {RequestOptions} from 'angular2/http';
import {SmartIntegrationService} from './smart-integration.service';

@Injectable()
export class AuthService {
    
    serviceBase = 'https://powerful-beyond-41122.herokuapp.com/';
    
    errorMessageFlag = false;
    errorMessageText = '';
    
    constructor (private _http: Http,
    private _router:Router,
    private _smartIntegrationService: SmartIntegrationService) {}
    
    login(userId, password) {

        var url = this.serviceBase + 'apimysmartws/ssoapi/login/requestValidateUserCredentials';
        
        var data: any = {
            clientKey: '79E19AAA42704B84870633377D33FBC1',
            controlId: '0213CDD5B6B1',
            endUserId: userId,
            endUserPassword: password,
            nonce: "C681A2BFF8E94B53BE79D83B1AE9314F"
        };
        
        this._http.post(url, JSON.stringify(data))
        .subscribe(
        response => {
            
            //sessionStorage.setItem('authorizationData', response.json().result.sessionId);
            //sessionStorage.setItem('loginData',JSON.stringify(response.json()));
            
            //TODO we can do this because the iser id could be email or phone number 
            //need separate call to get all phone
            localStorage.setItem('phoneNumber',userId);
            
            this._router.navigate(['MySmart']);
            
        },
        error =>{
            
            console.log('wrong combination of phone no/email and password');
            this.errorMessageFlag = true;
            this.errorMessageText = 'wrong combination of phone no/email and password';
            //LoginComponentcheckErrorStatus=true;
            //this._loginComponent.errorMessageText='wrong combination of phone no/email and password';
            
        }
    );
        
    }
    
    logOut(){
        
        sessionStorage.removeItem('authorizationData');
        sessionStorage.removeItem('loginData');
        
        this._router.navigate(['Starter','Login']);
        
    }

}
