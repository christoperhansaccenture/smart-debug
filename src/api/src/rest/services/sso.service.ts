'use strict';
export module SSO {
    
    var config = require('../config/config');
    var request = require('request'); 
    
    export interface ssoInterface {
        requestValidateUserCredentials():Promise<string>;
        requestAccessToken():Promise<string>;
        getAccount():Promise<string>;
    }
    
    export class sso implements ssoInterface {

        constructor() {
            var vm = this;       
        }
        
        async requestValidateUserCredentials() : Promise<string> {
            var vm = this;
            // var request = require('request');  
            //  var config = require('../config/config');
            // var baseurl:string = 'http://localhost:8000';
            var path:string = '/apimysmartws/ssoapi/login/requestValidateUserCredentials';
            
            return new Promise<string> (
                function(resolve, reject) {
                    request.post({url: config.baseurl + path}, function(err,httpResponse,body){     
                        resolve(body);
                })    
            });
        }
        
        async requestAccessToken() : Promise<string> {
            var vm = this;
            // var request = require('request'); 
            //  var config = require('../config/config'); 
            // var baseurl:string = 'http://localhost:8000';
            var path:string = '/apimysmartws/ssoapi/login/requestAccessToken';
            
            return new Promise<string> (
                function(resolve, reject) { 
                        request.post({url: config.baseurl + path}, function(err,httpResponse,body){  
                            resolve(body);
                })
                  
            });
        }
        
        async getAccount() : Promise<string> {
            var vm = this;
            var request = require('request');  
            var baseurl:string = 'http://localhost:8000';
            var path1:string = '/apimysmartws/ssoapi/login/requestUserProfileInfo';

            return new Promise<string> (
                function(resolve, reject) {
                    request.post({url: baseurl + path1}, function(err,httpResponse,body){              
                        resolve(body);                        
                })    
            });
        }
    }
}
