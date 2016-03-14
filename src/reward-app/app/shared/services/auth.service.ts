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
        var url = this.serviceBase + 'apimysmartws/ssoapi/login/requestValidateUserCredentials';
        
        var data: any = {
            clientKey: '79E19AAA42704B84870633377D33FBC1',
            controlId: '',
            endUserId: userId,
            endUserPassword: password,
            nonce: "C681A2BFF8E94B53BE79D83B1AE9314F"
        };
        
        console.log(userId + "," + password);
        
        //validate user credential
        this._http.post(url, JSON.stringify(data), 
            <RequestOptionsArgs> {headers: new Headers(
                {'Content-Type': 'application/json'})
            }).subscribe(
            response => {
                
                //sessionStorage.setItem('authorizationData', response.json().result.sessionId);
                //sessionStorage.setItem('loginData',JSON.stringify(response.json()));
                
                //TODO we can do this because the user id could be email or phone number 
                //need separate call to get all phone
                
                 if(response.json().status !== "200"){
                     
                    this.errorMessageFlag = true;
                    this.errorMessageText = 'wrong combination of phone no/email and password';
                 
                }else{
                     
                    localStorage.setItem('phoneNumber',userId);
                    sessionStorage.setItem('authorizationData', JSON.stringify(response.json().result));
                    
                    //request access token to the backend
                    var promise = this.requestAccessToken();
                    
                    promise.subscribe(
                    response => {
                        
                        if(response.json().status !== "200"){
                            //internal server error
                            this.errorMessageFlag = true;
                            this.errorMessageText = 'Internal server error';
                        }else{
                            console.log(response.json().result);
                            sessionStorage.setItem('accessToken', JSON.stringify(response.json().result));  
                            this._router.navigate(['MyRewards']);  
                        }
                        
                    },
                    error =>{
                        //internal server error
                        this.errorMessageFlag = true;
                        this.errorMessageText = 'Internal server error';       
                    });
                    
                 }
                
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
    
    requestAccessToken(){
        var url = this.serviceBase + 'apimysmartws/ssoApi/Login/requestAccessToken';
        
        var authData = JSON.parse(sessionStorage.getItem('authorizationData'));
        
        var data: any = {
            clientID: authData.ClientID,
            clientKey: '79E19AAA42704B84870633377D33FBC1',
            authenticationCode: authData.AuthenticationCode
        };
        
        
        return this._http.post(url, JSON.stringify(data), 
            <RequestOptionsArgs> {headers: new Headers(
                {'Content-Type': 'application/json'})
            })
    }
    
    logOut(){
        
        sessionStorage.removeItem('authorizationData');
        sessionStorage.removeItem('loginData');
        
        this._router.navigate(['Starter','Login']);
        
    }

}
