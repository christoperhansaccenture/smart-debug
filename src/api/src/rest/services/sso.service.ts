'use strict';
export module SSO {
    
    var config = require('../config/config');
    var request = require('request'); 
    
    export interface ssoInterface {
        requestValidateUserCredentials(username:string, password: string):Promise<string>;
        requestAccessToken(authenticationCode:string, clientId:string):Promise<string>;
        getAccount(accessToken:string, clientId:string, msaId:string):Promise<string>;
    }
    
    export class sso implements ssoInterface {

        constructor() {
            var vm = this;       
        }
        
        async requestValidateUserCredentials(username:string, password: string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/login/requestValidateUserCredentials';          
            var uuid = require('uuid');
            
            
            return new Promise<string> (function(resolve, reject) {
                request.post({
                    url:    config.baseurl + path, 
                    headers: {
                        'Content-Type': 'application/json',
                        'clientKey': config.clientKey,
                        'nonce': uuid.v4()
                    },
                    form:   {
                        EndUserId: username,
                        EndUserPassword: password
                    }
                },
                function(err,httpResponse,body){     
                    resolve(body);
                })    
            });
        }
        
        async requestAccessToken(authenticationCode:string, clientId:string) : Promise<string> {
            
            var path:string = '/apimysmartws/ssoapi/login/requestAccessToken';
            return new Promise<string> (
                function(resolve, reject) { 
                        request.get({
                            url: config.baseurl + path,
                            headers: {
                                'Content-Type': 'application/json',
                                'clientID': clientId,
                                'authenticationCode': authenticationCode
                            }
                        
                        }, 
                        function(err,httpResponse,body){  
                            resolve(body);
                }) 
            });
        }
        
        async getAccount(accessToken:string, clientId:string, msaId:string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/account/requestUserProfileInfo';

            return new Promise<string> (
                function(resolve, reject) { 
                    request.get({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken
                        }
                    }, 
                    function(err,httpResponse,body){  
                        resolve(body);
                })   
            });
        }
    }
}
