'use strict';
import { SSO } from '../services/sso.service';
var request = require('request'); 
var config = require('../config/config');


    export interface accountInterface {
        getAccount
        getRewardBalance():Promise<string>;
        getLatestRewardExpiry():Promise<string>;
        getActivityHistory():Promise<string>;
        register():Promise<string>;
        getCustomerInformation():Promise<string>;
        getListOfLinkedAccounts():Promise<string>;
        linkAccount():Promise<string>;
        unlinkAccount():Promise<string>;
        rewardsAlertNotification():Promise<string>;
        requestMobileNoList():Promise<string>;
        
    }
// export module Login {
    export class AccountController implements accountInterface{
        private ssoService:SSO.sso;
            constructor() {       
            
            }
            
            async getAccount(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
             
                console.log(config.signingKey);
                
                var nJwt = require('njwt');  
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                console.log(token);
                console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();

                try {  
                    var result =  await ssoService.getAccount(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid);
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async getRewardBalance(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                //var min:string =  req.query.min;
                token = token.replace('Bearer ','');
             
                console.log(req.query);
                
                var nJwt = require('njwt');  
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                console.log(token);
                console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();

                try {  
                    var result =  await ssoService.getRewardBalance(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(req.query));
                    console.log(result);          
          
                    var resJson = JSON.parse(result);
                    
                    var finalResult = {
                        rewardPoint : '0'
                    }
                    
                    if(resJson.data.length !== 0){
                        for(var i = 0; i < resJson.data.length; i++){
                            if(resJson.data[i].drawChance === false){
                                finalResult.rewardPoint = resJson.data[i].rwdCashbackValue;
                            }
                        }
                    }       
                    
                    res.json(finalResult);
                }
                catch (err) {
                    res.sendStatus(500);
                }
            }
            
            async getLatestRewardExpiry(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                //var min:string =  req.query.min;
                token = token.replace('Bearer ','');
             
                console.log(req.query);
                
                var nJwt = require('njwt');  
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                console.log(token);
                console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();

                try {  
                    var result =  await ssoService.getLatestRewardExpiry(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(req.query));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async getActivityHistory(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                //var min:string =  req.query.min;
                token = token.replace('Bearer ','');
             
                console.log(req.query);
                
                var nJwt = require('njwt');  
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                console.log(token);
                console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();

                try {  
                    var result =  await ssoService.getActivityHistory(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(req.query));
                    
                    var resultJson = JSON.parse(result).data;
                    var finalResult = [];
                    
                    for(var i = 0; i < resultJson.length; i++){
                        
                        if( (resultJson[i].cuaRemarks.indexOf('Waiting for approval') > -1) ||
                            (resultJson[i].cuaRemarks.indexOf('confirmation') > -1) ||
                            (resultJson[i].cuaRemarks.indexOf('Not') > -1) ||
                            (resultJson[i].cuaRemarks.indexOf('retry') > -1) ||
                            (resultJson[i].cuaRemarks.indexOf('Insufficient') > -1) ){
                            continue;
                        }
                        
                        if(resultJson[i].cuaActivityType === "1"){ //activation
                            
                            var parameter = resultJson[i].cuaParams.split('#');
                            
                            var item:any ={
                                "type": 'registration',
                                "name": 'Number Activation',
                                "desc": 'Activate ' + parameter[0],
                                "date": resultJson[i].cuaDate,
                                "media" : 'Smart Reward App',
                                "point" : '0'
                            };
                            
                            finalResult.push(item);
                            
                        }
                        else if(resultJson[i].cuaActivityType === "2"){ //earning
                            
                            var parameter = resultJson[i].cuaParams.split('#');
                            
                            var item:any ={
                                "type": 'earning',
                                "name": 'Earned Points',
                                "desc": 'Earned Points',
                                "date": resultJson[i].cuaDate,
                                "media" : 'Smart Reward App',
                                "point" : parameter[5]
                            };
                            
                            finalResult.push(item);
                            
                        }
                        else if(resultJson[i].cuaActivityType === "3"){ //redemption
                            
                            var parameter = resultJson[i].cuaParams.split('#');
                            
                            if(parameter.length === 4){
                                if(parameter[3] === '0'){
                                    parameter[3] = 1;
                                }
                                
                                var item:any ={
                                    "type": "redemption",
                                    "name": parameter[0],
                                    "desc": parameter[3] + ' item(s)',
                                    "date": "November 25, 2016",
                                    "media": "Smart Reward App",
                                    "point": '-' + parameter[1]
                                };
                                
                            }else{
                                
                                var name = '';
                                
                                if(req.query.min === parameter[3]){
                                    var item:any ={
                                        "type": "redemption",
                                        "name": "Pasa Reward",
                                        "desc": parameter[4] + ' item(s)',
                                        "date": "November 25, 2016",
                                        "media": "Smart Reward App",
                                        "point": parameter[1]
                                    };
                                }else{
                                    var item:any ={
                                        "type": "redemption",
                                        "name": parameter[0],
                                        "desc": parameter[4] + ' item(s) to ' + parameter[3],
                                        "date": "November 25, 2016",
                                        "media": "Smart Reward App",
                                        "point": parameter[1]
                                    };
                                }
                                
                            }
                            
                            finalResult.push(item);
                            
                            
                        }
                        else if(resultJson[i].cuaActivityType === "4"){ //transfer point
                            
                            var parameter = resultJson[i].cuaParams.split('#');
                            
                            var item:any ={
                                "type": "transfer",
                                "name": "Transfer Points",
                                "desc": "Transfer Points to " + parameter[0],
                                "date": "November 25, 2016",
                                "media": "Smart Reward App",
                                "point": parameter[1]
                            };
                            
                            finalResult.push(item);
                            
                        }
                        else if(resultJson[i].cuaActivityType === "6"){ //point inquiry
                            
                            var parameter = resultJson[i].cuaParams.split('#');
                            
                            var item:any ={
                                "type": "Points Inquiry",
                                "name": "Points Inquiry",
                                "desc": "Points Inquiry to " + parameter[0],
                                "date": "November 25, 2016",
                                "media": "Smart Reward App",
                                "point": parameter[1]
                            };
                            
                            finalResult.push(item);
                            
                        }
                        else if(resultJson[i].cuaActivityType === "8"){ // event register
                            
                            var parameter = resultJson[i].cuaParams.split('#');
                            
                            var item:any ={
                                "type": "Event Registration",
                                "name": "Event Registration",
                                "desc": "Event Registration for " + parameter[0],
                                "date": "November 25, 2016",
                                "media": "Smart Reward App",
                                "point": '0'
                            };
                            
                            finalResult.push(item);
                            
                        }
                        else if(resultJson[i].cuaActivityType === "10"){ //Account Linking/Unlinking
                            
                            var parameter = resultJson[i].cuaParams.split('#');
                            var linkNo = '';
                            var name = '';
                            var desc = '';
                            
                            if(req.query.min === parameter[0]){
                                linkNo = parameter[1];
                            }else{
                                linkNo = parameter[0];
                            }
                            
                            if(resultJson[i].cuaRemarks === 'linked'){
                                name = 'Link Account';
                                desc = 'Link with ';
                            }else{
                                name = 'unlink Account';
                                desc = 'Unlink with ';
                            }
                            
                            var item:any ={
                                "type": "linking",
                                "name": name,
                                "desc": desc + linkNo,
                                "date": "November 25, 2016",
                                "media": "Smart Reward App",
                                "point": parameter[2]
                            };
                            
                            finalResult.push(item);  
                            
                        }
                        else if(resultJson[i].cuaActivityType === "12"){ //account transfer
                            
                            var parameter = resultJson[i].cuaParams.split('#');
                            
                            var item:any ={
                                "type": "Account Transfer",
                                "name": "Change Mobile Number",
                                "desc": "mobile number changed to " + parameter[0],
                                "date": "November 25, 2016",
                                "media": "Smart Reward App",
                                "point": parameter[1]
                            };
                            
                            finalResult.push(item); 
                        }
                        else if(resultJson[i].cuaActivityType === "13"){ //reward expiry
                            
                            var parameter = resultJson[i].cuaParams.split('#');
                            
                            var item:any ={
                                "type": "Reward Expiry",
                                "name": "Points Expiry",
                                "desc": "expired points from " + parameter[0],
                                "date": "November 25, 2016",
                                "media": "Smart Reward App",
                                "point": parameter[1]
                            };
                            
                            finalResult.push(item);
                            
                        }
                        else if(resultJson[i].cuaActivityType === "16"){ //bills payment
                            
                            var parameter = resultJson[i].cuaParams.split('#');
                            
                            var item:any ={
                                "type": "Bills Payment",
                                "name": "Bills Payment",
                                "desc": "bills payment for " + parameter[0],
                                "date": "November 25, 2016",
                                "media": "Smart Reward App",
                                "point": parameter[1]
                            };
                            
                            finalResult.push(item);
                            
                        }
                    }
                    
                    //console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(finalResult);
                    //res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async register(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                //var min:string =  req.query.min;
                token = token.replace('Bearer ','');
             
                var jsonBody ={
                    firstName: req.body.firstName,
                    middleName: req.body.middleName,
                    lastName: req.body.lastName,
                    address: req.body.address,
                    city: req.body.city,
                    province: req.body.province,
                    min: req.body.min,
                    channel: req.body.channel
                };
                
                var nJwt = require('njwt');  
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                console.log(token);
                console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();

                try {  
                    var result =  await ssoService.register(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async getCustomerInformation(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                var data = {};
                token = token.replace('Bearer ','');
                
                var nJwt = require('njwt');  
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                const ssoService:SSO.sso = new SSO.sso();

                try {
                    
                    data = {
                        min : req.params.min
                    };
                    
                    //search customer number by mobile phone number  
                    var result =  await ssoService.searchCustomerInformation(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(data));
                    
                    data = {
                        customerNo : JSON.parse(result).data[0].cusCustomerNo
                    };
                    
                    //get actual customer information
                    result = await ssoService.getCustomerInformation(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(data));   
                    
                    //mapping
                    result = JSON.parse(result);
                    
                    var userProfile ={
                        
                        firstName : result.data.cusFName,
                        middleName : '',
                        lastName : result.data.cusLName,
                        birthdate : result.data.cspCustomerBirthday,
                        email : result.data.cusEmail,
                        address : result.data.cspAddress,
                        province : result.data.cspState,
                        city : result.data.cspCity
                        
                    };
                    
                    if(result.data.additionalInfoDisplayDatas.length !== 0){
                        
                        for(var i = 0; i < result.data.additionalInfoDisplayDatas.length; i ++){
                            
                            if(result.data.additionalInfoDisplayDatas[i].addLabel === "Middle Name"){
                                
                                userProfile.middleName = result.data.additionalInfoDisplayDatas[i].addValue;
                                break;
                                
                            }
                            
                        }
                        
                    }
                    
                    res.json(userProfile);
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async updateCustomerInformation(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
                var data = {};
                var nJwt = require('njwt');  
                
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                console.log(token);
                console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();

                try {
                    
                    data = {
                        min : req.params.min
                    };
                    
                    //search customer number by mobile phone number  
                    var result =  await ssoService.searchCustomerInformation(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(data));
                    
                    data = {
                        customerNo : JSON.parse(result).data[0].cusCustomerNo
                    };
                    
                    //get actual customer information
                    result = await ssoService.getCustomerInformation(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(data));   
                    
                    var userProfile = JSON.parse(result);
                    
                    userProfile.data.cusFName            = req.body.firstName;
                    userProfile.data.cusLName            = req.body.lastName;
                    userProfile.data.cspCustomerBirthday = req.body.birthdate;
                    userProfile.data.cusEmail            = req.body.email;
                    userProfile.data.cspAddress          = req.body.address;
                    userProfile.data.cspState            = req.body.province;
                    userProfile.data.cspCity             = req.body.city;
                    
                    if(userProfile.data.additionalInfoDisplayDatas.length !== 0){
                        
                        for(var i = 0; i < userProfile.data.additionalInfoDisplayDatas.length; i ++){
                            
                            if(userProfile.data.additionalInfoDisplayDatas[i].addLabel === "Middle Name"){
                                
                                userProfile.data.additionalInfoDisplayDatas[i].addValue = req.body.middleName;
                                break;
                                
                            }
                            
                            if(i  === (userProfile.data.additionalInfoDisplayDatas.length -1) ){
                                
                                var addData:any = {
                                    addValue : req.body.middleName,
                                    addSize : 50,
                                    addLabel : "Middle Name",
                                    addMaster : 3,
                                    addId : 3101,
                                    additionalInfoDisplayDataSet : null
                                };
                                
                                userProfile.data.additionalInfoDisplayDatas.push(addData); 
                                
                            }
                            
                        }
                        
                    }else{
                        
                        var addData:any = {
                            addValue : req.body.middleName,
                            addSize : 50,
                            addLabel : "Middle Name",
                            addMaster : 3,
                            addId : 3101,
                            additionalInfoDisplayDataSet : null
                        };
                        
                        userProfile.data.additionalInfoDisplayDatas.push(addData);
                         
                    }
                      
                    result =  await ssoService.updateCustomerInformation(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(userProfile));
                    console.log(result);     
                    
                    res.json(userProfile);
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async getListOfLinkedAccounts(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
             
                console.log(req.query);
                
                var nJwt = require('njwt');  
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                console.log(token);
                console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();

                try {  
                    var result =  await ssoService.getListOfLinkedAccounts(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(req.query));
                    console.log(result);             
                    
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async linkAccount(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                //var min:string =  req.query.min;
                token = token.replace('Bearer ','');
             
                var jsonBody ={
                    min: req.body.min,
                    primaryLoyaltyId: req.body.primaryLoyaltyId,
                    childLoyaltyId: req.body.childLoyaltyId,
                    lrqSource: req.body.lrqSource,
                    lrqInitiator: req.body.lrqInitiator,
                    channel: req.body.channel
                };
                
                var nJwt = require('njwt');  
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                console.log(token);
                console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();

                try {  
                    var result =  await ssoService.linkAccount(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async unlinkAccount(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                //var min:string =  req.query.min;
                token = token.replace('Bearer ','');
             
                var jsonBody ={
                    min: req.body.min,
                    primaryLoyaltyId: req.body.primaryLoyaltyId,
                    childLoyaltyId: req.body.childLoyaltyId,
                    lrqSource: req.body.lrqSource,
                    lrqInitiator: req.body.lrqInitiator,
                    channel: req.body.channel
                };
                
                var nJwt = require('njwt');  
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                console.log(token);
                console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();

                try {  
                    var result =  await ssoService.unlinkAccount(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async rewardsAlertNotification(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
                
                var jsonBody ={
                    min: req.body.min,
                    status: req.body.status
                };
                
                var nJwt = require('njwt');  
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                //console.log(token);
                //console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();

                try {  
                    var result =  await ssoService.rewardsAlertNotification(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async requestMobileNoList(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                //var min:string =  req.query.min;
                token = token.replace('Bearer ','');
             
                console.log(req.query);
                
                var nJwt = require('njwt');  
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                console.log(token);
                console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();

                try {  
                    var result =  await ssoService.requestMobileNoList(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(req.query));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            // async getListOfMobileNumber(req:string,res:string) : Promise<string> {
                
            //     var token:string = req.get("Authorization");
            //     token = token.replace('Bearer ','');
                
            //     var data  = {
            //         min: req.params.min
            //     }
                
            //     var nJwt = require('njwt');  
            //     try{
            //         var jwt = nJwt.verify(token,config.signingKey);
            //     }catch(e){
            //         res.sendStatus(403);
            //     }

            //     const ssoService:SSO.sso = new SSO.sso();
                
            //     try{
                    
            //         var listOfMobile = [];
                    
            //         var result =  await ssoService.requestMobileNoList(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(data));
                    
            //         var resultJson = JSON.parse(result).SubscriptionList;
                    
            //         for(var i = 0; i < resultJson.length; i++){
                        
            //             var mobileListItem = {
            //                 phoneNo: resultJson[i].Subscription,
            //                 name: resultJson[i].SubscriptionName,
            //                 rewards: '0'    
            //             };
                        
            //             data  = {
            //                 min: resultJson[i].Subscription
            //             }
                            
            //             result =  await ssoService.getRewardBalance(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(data));
                        
            //             var resJson = JSON.parse(result);
                        
            //             if(resJson.data.length !== 0){
            //                 for(var i = 0; i < resJson.data.length; i++){
            //                     if(resJson.data[i].drawChance === false){
            //                         mobileListItem.rewards = resJson.data[i].rwdCashbackValue;
            //                     }
            //                 }
            //             }
                        
            //             listOfMobile.push(mobileListItem);
                        
            //         }
                    
                    
            //     }catch(err){
                    
            //     }
                
            // }
            
            async getListOfMobileNumber(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                //var min:string =  req.query.min;
                token = token.replace('Bearer ','');
             
                var data  = {
                    min: req.params.min
                }
                
                var nJwt = require('njwt');  
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                const ssoService:SSO.sso = new SSO.sso();

                try {  
                    var result =  await ssoService.getListOfLinkedAccounts(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(data));
                    console.log("get link list " + result);
                    
                    var jsonObject = JSON.parse(result);
                    
                    var finalResult = {
                        phoneNo: '',
                        name: '',
                        rewards: '0'    
                    };
                    
                    var listOfMobile = [];
                    
                    if(jsonObject.data.length === 0){
                        
                        //return only 1 mobile number
                        console.log(req.params.min);
                        finalResult.phoneNo = req.params.min;
                        
                        result =  await ssoService.getAccount(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid);
                        
                        finalResult.name = JSON.parse(result).FirstName;
                        
                        result =  await ssoService.getRewardBalance(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(data));         
          
                        var resJson = JSON.parse(result);
                        console.log(result);
                        
                        if(resJson.data.length !== 0){
                            for(var i = 0; i < resJson.data.length; i++){
                                if(resJson.data[i].drawChance === false){
                                    finalResult.rewards = resJson.data[i].rwdCashbackValue;
                                }
                            }
                        }
                        
                        listOfMobile.push(finalResult); 
                        
                    }else{
                        
                        finalResult.phoneNo = req.params.min;
                        
                        result =  await ssoService.getAccount(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid);
                        console.log(result);
                        finalResult.name = JSON.parse(result).FirstName;
                        
                        result =  await ssoService.getRewardBalance(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(data));         
          
                        var resJson = JSON.parse(result);
                        console.log(result);
                        
                        if(resJson.data.length !== 0){
                            for(var i = 0; i < resJson.data.length; i++){
                                if(resJson.data[i].drawChance === false){
                                    finalResult.rewards = resJson.data[i].rwdCashbackValue;
                                }
                            }
                        }
                        
                        listOfMobile.push(finalResult);
                        
                        for(var i = 0; i < jsonObject.data.length; i++){
                            
                            var mobileData = {
                                phoneNo: '',
                                name: '',
                                rewards: '0'    
                            };
                            
                            mobileData.phoneNo = jsonObject.data[i].cusLoyaltyId;
                            mobileData.name = jsonObject.data[i].cusFName;
                            
                            data  = {
                                min: jsonObject.data[i].cusLoyaltyId
                            }
                            
                            result =  await ssoService.getRewardBalance(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(data));         
            
                            var resJson = JSON.parse(result);
                            console.log(result);
                            
                            if(resJson.data.length !== 0){
                                for(var i = 0; i < resJson.data.length; i++){
                                    if(resJson.data[i].drawChance === false){
                                        mobileData.rewards = resJson.data[i].rwdCashbackValue;
                                    }
                                }
                            }
                            
                            listOfMobile.push(mobileData);     
                            
                        }
                        
                    }
                    
                    // var resJson = JSON.parse(result);       
                    console.log(listOfMobile);
                    res.json(listOfMobile);
                }
                catch (err) {
                    console.log(err);
                }
            }
            
        }
// }