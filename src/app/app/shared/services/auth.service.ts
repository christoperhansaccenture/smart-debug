import {Injectable} from 'angular2/core';
import { Router } from 'angular2/router';
import {Response} from "angular2/http";
import {RequestOptionsArgs} from "angular2/http";
import {Headers} from "angular2/http";
import {Http} from 'angular2/http';
import {Connection} from 'angular2/http';
import {RequestOptions} from 'angular2/http';
import {SmartIntegrationService} from './smart-integration.service';
import {AccountService} from './account.service';
import {CatalogService} from '../../my-rewards/services/catalog.service';

declare var configChannel: any;
declare var configAppType: any;

@Injectable()
export class AuthService {
    
    //serviceBase = 'http://localhost:8080/';
    serviceBase;
    
    errorMessageFlag = false;
    errorMessageText = '';
    isLoadingLogin = false;
    
    constructor (private _http: Http,
    private _router:Router,
    private _smartIntegrationService: SmartIntegrationService,
        private _accountService: AccountService,
        private _catalogService: CatalogService) {
        // get service base from config file
        var url = 'services/api.json';
        this._http.get(url)
            .subscribe(file => {
                let config = file.json().config;
                this.serviceBase = config.baseUrl;
            });
    }
    
    getErrorMessageFlag(){
        return this.errorMessageFlag;
    }
    
    getErrorMessageText(){
        return this.errorMessageText;
    }
    
    getLoadingState(){
        return this.isLoadingLogin;
    }
    
    login(userId, password) {
        
        this.isLoadingLogin = true;
         
        if(this.checkIDPassword(userId,password)==0) 
         {
             //alert("Please enter your password!");
             this.errorMessageText="Please enter your phone no/email and password";
             this.errorMessageFlag=true;
             this.isLoadingLogin = false;
         }
         else if(this.checkIDPassword(userId,password)==2)
         {
              this.errorMessageText="Please enter a valid email address";
              this.errorMessageFlag=true;
              this.isLoadingLogin = false;
         } 
         else if(this.checkIDPassword(userId,password)==1)
         {
            this.doLogin(userId,password);
         }
        
    }
    
    checkIDPassword(userId,passoword){      
        
        if(userId==null || userId=="" || passoword==null || passoword=="")
        { 
            return 0;
        }
        else if(isNaN(userId))
        {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userId))  
            {  
                return 1;
            }  
            else
            {
                return 2;                
            }          
        }
        else {
            if(passoword==null || passoword=="")
             {
                return 0;
             }
             else{
                return 1; 
             }
        }
        
    }

    autoLogin() {
        const refreshToken: string = localStorage.getItem('refreshToken');
        if (refreshToken) {
            this.refreshAccessToken()
            .subscribe(
                response => {
                    /*
                    localStorage.setItem('accessToken', response.json().accessToken);  
                    this._router.navigate(['MyRewards']);  
                   */
                    localStorage.setItem('accessToken', response.json().accessToken);  
                    this._accountService.getMobileNumberlistFromBackEndPromise(true).then(
                        resolve => {
                            // load catalogs
                            this._catalogService.loadAllCatalogs(false);
                            if(configChannel === 'app'){
                                if(configAppType === 'smart'){
                                    this._router.navigate(['MySmart']);
                                }else{
                                    this._router.navigate(['MyRewards']);
                                }
                                
                            }else{
                                this._router.navigate(['MySmart']);  
                            }  
                        }
                    );
                },
                error =>{
                    this.logOut();
                }
            );
        }
    }

    refreshAccessToken() {
        const url: string = this.serviceBase + '/token/renew';
        if (configChannel === 'app') {
            const refreshToken: string = localStorage.getItem('refreshToken');
            if (refreshToken) {
                let data = {
                    "refreshToken": refreshToken
                };
                return this._http.post(url, JSON.stringify(data));
            }
        } else {
            return this._http.post(url, null);
        }
        return null;
    }

    doLogin(userId, password){
        var url = this.serviceBase + '/login';
        
        // var data: any = {
        //     endUserId: userId,
        //     endUserPassword: password
        // };
        
        var data = "username=" + userId + "&password=" + password;
        
        //console.log(userId + "," + password);
        
        //validate user credential
        this._http.post(url, data, 
            <RequestOptionsArgs> {headers: new Headers(
                {'Content-Type': 'application/x-www-form-urlencoded'})
            })
            .subscribe(
            response => {
                
                //localStorage.setItem('phoneNumber',userId);
                localStorage.setItem('mobileNo',userId);
                
                localStorage.setItem('accessToken', response.json().token);  
                localStorage.setItem('refreshToken', response.json().refreshToken);
                this._accountService.getMobileNumberlistFromBackEndPromise(true).then(
                    resolve => {
                        // load catalogs
                        this._catalogService.loadAllCatalogs(false);
                        if(configChannel === 'app'){
                            if(configAppType === 'smart'){
                                this._router.navigate(['MainPage','MySmart']);
                            }else{
                                this._router.navigate(['MainPage','MyRewards']);
                            }
                            
                        }else{
                            this._router.navigate(['MainPage','MySmart']);  
                        }
                        this.isLoadingLogin = false;
                    },
                    
                    reject => {
                        
                        if(reject.status === 408){
                            this.errorMessageFlag = true;
                            this.errorMessageText = 'network error, please try again';
                        }
                        
                    }
                );
                
            },
            error =>{
                
                console.log(error);
                
                if(error.status === 408){
                    this.errorMessageFlag = true;
                    this.errorMessageText = 'network error, please try again';
                }else{
                    //console.log(error.status);
                    console.log('wrong combination of phone no/email and password');
                    this.errorMessageFlag = true;
                    this.errorMessageText = 'wrong combination of phone no/email and password';
                    //LoginComponentcheckErrorStatus=true;
                    //this._loginComponent.errorMessageText='wrong combination of phone no/email and password';
                }
                this.isLoadingLogin = false;
                
            }
        );
    }
    
    logOut(){
        
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this._router.navigate(['Starter','Login']);
        
    }

}
