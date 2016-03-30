'use strict';
export module SSO {
    
    var config = require('../config/config');
    var request = require('request'); 
    var uuid = require('uuid');
    
    export interface ssoInterface {
        requestValidateUserCredentials(username:string, password: string):Promise<string>;
        requestAccessToken(authenticationCode:string, clientId:string):Promise<string>;
        getAccount(accessToken:string, clientId:string, msaId:string):Promise<string>;
        getRewardBalance(accessToken:string, clientId:string, msaId:string):Promise<string>;
    }
    
    export class sso implements ssoInterface {

        constructor() {
            var vm = this;       
        }
        
        async requestValidateUserCredentials(username:string, password: string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/login/requestValidateUserCredentials';
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }          
            
            return new Promise<string> (function(resolve, reject) {
                request.post({
                    url:    config.baseurl + path, 
                    headers: {
                        'Content-Type': 'application/json',
                        'clientKey': config.clientKey,
                        'nonce': uuidString
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
        
        async initializeRecoverPassword(body: string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/login/requestValidateUserCredentials';
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }
            
            var json = JSON.parse(body);          
            
            return new Promise<string> (function(resolve, reject) {
                request.post({
                    url:    config.baseurl + path, 
                    headers: {
                        'Content-Type': 'application/json',
                        'clientKey': config.clientKey
                    },
                    form: json
                },
                function(err,httpResponse,body){     
                    resolve(body);
                })    
            });
        }
        
        async recoverPassword(body: string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/login/requestValidateUserCredentials';
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }
            
            var json = JSON.parse(body);          
            
            return new Promise<string> (function(resolve, reject) {
                request.post({
                    url:    config.baseurl + path, 
                    headers: {
                        'Content-Type': 'application/json',
                        'clientKey': config.clientKey
                    },
                    form: json
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
        
        async getRewardBalance(accessToken:string, clientId:string, msaId:string, min:string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/rewards/GetRewardBalance';
            var jsonMin = JSON.parse(min);
            
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }

            return new Promise<string> (
                function(resolve, reject) { 
                    request.get({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        },
                        qs: jsonMin
                    }, 
                    function(err,httpResponse,body){  
                        resolve(body);
                })   
            });
        }
        
        async updateCustomerInformation(accessToken:string, clientId:string, msaId:string, body:string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/rewards/CustomerInfo';
            var jsonBody = JSON.parse(body);
            
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }

            return new Promise<string> (
                function(resolve, reject) { 
                    request.put({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        },
                        form: jsonBody
                    }, 
                    function(err,httpResponse,body){  
                        resolve(body);
                })   
            });
        }
        
        async searchCustomerInformation(accessToken:string, clientId:string, msaId:string, query:string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/rewards/SearchCustomerInfo';
            var jsonQuery = JSON.parse(query);
            
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }

            return new Promise<string> (
                function(resolve, reject) { 
                    request.get({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        },
                        qs: jsonQuery
                    }, 
                    function(err,httpResponse,body){  
                        resolve(body);
                })   
            });
        }
        
        async getCustomerInformation(accessToken:string, clientId:string, msaId:string, query:string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/rewards/GetCustomerInfo';
            var jsonQuery = JSON.parse(query);
            
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }

            return new Promise<string> (
                function(resolve, reject) { 
                    request.get({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        },
                        qs: jsonQuery
                    }, 
                    function(err,httpResponse,body){  
                        resolve(body);
                })   
            });
        }
        
        async getListOfRedeemableItems(accessToken:string, clientId:string, msaId:string, query:string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/rewards/GetListOfRedeemableItems';
            var jsonQuery = JSON.parse(query);
            
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }

            return new Promise<string> (
                function(resolve, reject) { 
                    request.get({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        },
                        qs: jsonQuery
                    }, 
                    function(err,httpResponse,body){  
                        resolve(body);
                })   
            });
        }
        
        async redeemAnItem(accessToken:string, clientId:string, msaId:string, body:string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/rewards/RedeemAnItem';
            
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }
            
            var json = JSON.parse(body);

            return new Promise<string> (
                function(resolve, reject) { 
                    request.post({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        },
                        form: json
                    }, 
                    function(err,httpResponse,body){  
                        if (err) {
                            reject(err);
                        }
                        resolve(JSON.parse(body));
                })   
            });
        }
        
        async getLatestRewardExpiry(accessToken:string, clientId:string, msaId:string, query:string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/rewards/GetLatestRewardExpiry';
            var jsonQuery = JSON.parse(query);
            
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }

            return new Promise<string> (
                function(resolve, reject) { 
                    request.get({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        },
                        qs: jsonQuery
                    }, 
                    function(err,httpResponse,body){  
                        resolve(body);
                })   
            });
        }
        
        async getActivityHistory(accessToken:string, clientId:string, msaId:string, query:string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/rewards/GetTransactionHistory';
            var jsonQuery = JSON.parse(query);
            
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }

            return new Promise<string> (
                function(resolve, reject) { 
                    request.get({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        },
                        qs: jsonQuery
                    }, 
                    function(err,httpResponse,body){  
                        resolve(body);
                })   
            });
        }
        
        async register(accessToken:string, clientId:string, msaId:string, body:string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/rewards/register';
            
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }
            
            var json = JSON.parse(body);

            return new Promise<string> (
                function(resolve, reject) { 
                    request.post({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        },
                        form: json
                    }, 
                    function(err,httpResponse,body){  
                        resolve(body);
                })   
            });
        }
        
        async getFavorites(accessToken:string, clientId:string, msaId:string, query:string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/rewards/GetFavorites';
            
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }
            
            var json = JSON.parse(query);

            return new Promise<string> (
                function(resolve, reject) { 
                    request.get({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        },
                        qs: json
                    }, 
                    function(err,httpResponse,body){  
                        resolve(body);
                })   
            });
        }
        
        async getListOfLinkedAccounts(accessToken:string, clientId:string, msaId:string, query:string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/rewards/GetListOfLinkedAccounts';
            
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }
            
            var json = JSON.parse(query);

            return new Promise<string> (
                function(resolve, reject) { 
                    request.get({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        },
                        qs: json
                    }, 
                    function(err,httpResponse,body){  
                        resolve(body);
                })   
            });
        }
        
        async linkAccount(accessToken:string, clientId:string, msaId:string, body:string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/rewards/LinkAccount';
            
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }
            
            var json = JSON.parse(body);

            return new Promise<string> (
                function(resolve, reject) { 
                    request.post({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        },
                        form: json
                    }, 
                    function(err,httpResponse,body){  
                        resolve(body);
                })   
            });
        }
        
        async transferpoints(accessToken:string, clientId:string, msaId:string, body:string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/rewards/Transferpoints';
            
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }
            
            var json = JSON.parse(body);
            
            console.log(body);

            return new Promise<string> (
                function(resolve, reject) { 
                    request.post({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        },
                        form: json
                    }, 
                    function(err,httpResponse,body){  
                        resolve(body);
                })   
            });
        }
        
        async unlinkAccount(accessToken:string, clientId:string, msaId:string, body:string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/rewards/UnlinkAccount';
            
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }
            
            var json = JSON.parse(body);

            return new Promise<string> (
                function(resolve, reject) { 
                    request.post({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        },
                        form: json
                    }, 
                    function(err,httpResponse,body){  
                        resolve(body);
                })   
            });
        }
        
        async favouriteItem(accessToken:string, clientId:string, msaId:string, body:string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/rewards/FavoriteItem';
            
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }
            
            var json = JSON.parse(body);

            return new Promise<string> (
                function(resolve, reject) { 
                    request.post({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        },
                        form: json
                    }, 
                    function(err,httpResponse,body){  
                        resolve(body);
                })   
            });
        }
        
        async removeFavouriteItem(accessToken:string, clientId:string, msaId:string, body:string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/rewards/FavoriteItem';
            
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }
            
            var json = JSON.parse(body);

            return new Promise<string> (
                function(resolve, reject) { 
                    request.post({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        },
                        form: json
                    }, 
                    function(err,httpResponse,body){  
                        resolve(body);
                })   
            });
        }
        
        async getCatalogDisplayPreferences(accessToken:string, clientId:string, msaId:string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/rewards/GetCatalogDisplayPreferences';
            
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }

            return new Promise<string> (
                function(resolve, reject) { 
                    request.get({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        }
                    }, 
                    function(err,httpResponse,body){  
                        resolve(body);
                })   
            });
        }
        
        async payBillWithPoints(accessToken:string, clientId:string, msaId:string, body:string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/rewards/PayBillWithPoints';
            
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }
            
            var json = JSON.parse(body);

            return new Promise<string> (
                function(resolve, reject) { 
                    request.put({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        },
                        form: json
                    }, 
                    function(err,httpResponse,body){  
                        resolve(body);
                })   
            });
        }
        
        async rewardsAlertNotification(accessToken:string, clientId:string, msaId:string, body:string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/rewards/RewardsAlertNotification';
            
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }
            
            var json = JSON.parse(body);

            return new Promise<string> (
                function(resolve, reject) { 
                    request.post({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        },
                        form: json
                    }, 
                    function(err,httpResponse,body){  
                        resolve(body);
                })   
            });
        }
        
        async requestMobileNoList(accessToken:string, clientId:string, msaId:string, query:string) : Promise<string> {

            var path:string = '/apimysmartws/ssoapi/account/requestMobileNoList';
            
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }
            
            var json = JSON.parse(query);

            return new Promise<string> (
                function(resolve, reject) { 
                    request.get({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        },
                        qs: json
                    }, 
                    function(err,httpResponse,body){  
                        resolve(body);
                })   
            });
        }
        
        async getCatalogById(accessToken:string, clientId:string, msaId:string, query:string, id:string) : Promise<string> {
			
			
			console.log("sso");
            var path:string = '/apimysmartws/ssoapi/rewards/GetListOfRedeemableItems';
            
            var uuidString = uuid.v4();
            var arrUuid = uuidString.split('-');
            uuidString = '';
            for(var i = 0; i < arrUuid.length; i++){
                uuidString = uuidString + arrUuid[i];    
            }
            
            var json = JSON.parse(query);
			json.min = id;

            return new Promise<string> (
                function(resolve, reject) { 
					console.log(config.baseurl);
                    request.get({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        },
                        qs: json
                    }, 
                    function(err,httpResponse,body){  
                        resolve(body);
                })   
            });
        }
        
    }
}
