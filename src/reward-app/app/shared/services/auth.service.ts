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
    
    //serviceBase = 'http://localhost:8080/';
    serviceBase;
    
    errorMessageFlag = false;
    errorMessageText = '';
    
    constructor (private _http: Http,
    private _router:Router,
    private _smartIntegrationService: SmartIntegrationService) {
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
    
    login(userId, password) {
         
        if(this.checkIDPassword(userId,password)==0) 
         {
             //alert("Please enter your password!");
             this.errorMessageText="Please enter your phone no/email and password";
             this.errorMessageFlag=true;
         }
         else if(this.checkIDPassword(userId,password)==2)
         {
              this.errorMessageText="Please enter a valid email address";
              this.errorMessageFlag=true;
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
            }).subscribe(
            response => {
                
                localStorage.setItem('phoneNumber',userId);
                
                sessionStorage.setItem('accessToken', JSON.stringify(response.json().token));  
                this._router.navigate(['MyRewards']);  
                
                
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
