'use strict';
import { SSO } from '../services/sso.service';
import { ErrorHandlingService } from '../services/error-handling.service';

var request = require('request'); 
var config = require('../config/config');


    export interface rewardInterface {
        redeemAnItem():Promise<string>;
        getListOfRedeemableItems():Promise<string>;
        getFavorites():Promise<string>;
        transferpoints():Promise<string>;
        favouriteItem():Promise<string>;
        removeFavouriteItem():Promise<string>;
        getCatalogDisplayPreferences():Promise<string>;
        payBillWithPoints():Promise<string>;
    }
// export module Login {
    export class RewardController implements rewardInterface{
        private ssoService:SSO.sso;
        private errorHandlingService:ErrorHandlingService.ErrorHandlingService;
            constructor() {       
            
            }
            
            async redeemAnItem(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
                
                var jsonBody ={
                    min: req.body.min,
                    productCode: req.body.productCode,
                    quantity: req.body.quantity,
                    channel: req.body.channel,
                    destLoyaltyId: req.body.destLoyaltyId
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
                    var result =  await ssoService.redeemAnItem(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async getListOfRedeemableItems(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
                
                
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
                    var result =  await ssoService.getListOfRedeemableItems(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(req.query));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async getFavorites(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
                
                
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
                    var result =  await ssoService.getFavorites(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(req.query));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async transferpoints(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
                
                var jsonBody = {
                    min: req.body.from,
                    destLoyaltyId: req.body.to,
                    srcCurrencyId: req.body.srcCurrId,
                    destCurrencyId: req.body.destCurrId,
                    rwdQty: req.body.amount
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
                    var result =  await ssoService.transferpoints(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                    console.log(result);
                    var errorCheckRes = res;
                    
                    const errorHandlingService:ErrorHandlingService.ErrorHandlingService = new ErrorHandlingService.ErrorHandlingService();
                    
                    errorCheckRes = errorHandlingService.transferRequestErrorHandling(res,result);
                    
                    if(errorCheckRes === null){
                        res.json(JSON.parse(result));
                    }else{
                        res = errorCheckRes;
                    }

                }
                catch (err) {
                    res.sendStatus(500);
                    console.log(err);
                }
            }
            
            async favouriteItem(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
                
                var jsonBody ={
                    min: req.params.min,
                    cafProductNo: req.params.catalogId,
                    cafFavoriteFlag: 1
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
                    var result =  await ssoService.favouriteItem(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async removeFavouriteItem(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
                
                var jsonBody ={
                    min: req.params.min,
                    cafProductNo: req.params.catalogId,
                    cafFavoriteFlag: 0
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
                    var result =  await ssoService.removeFavouriteItem(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async getCatalogDisplayPreferences(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
                
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
                    var result =  await ssoService.getCatalogDisplayPreferences(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid);
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async payBillWithPoints(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
                
                var jsonBody ={
                    min: req.body.min,
                    merchantIdentifier: req.body.merchantIdentifier,
                    amount: req.body.amount,
                    pin: req.body.pin,
                    channel: req.body.channel,
                    ref: req.body.ref
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
                    var result =  await ssoService.payBillWithPoints(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async redeemItems(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                //var min:string =  req.query.min;
                token = token.replace('Bearer ','');
             
               // var data  = {
                   //min: req.params.min
                //}
                
                var nJwt = require('njwt');  
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                const ssoService:SSO.sso = new SSO.sso();

                try {  
                    
                      console.log(req.body);
                      
                      var data = JSON.parse(req.body);
                      
                      for(var i = 0; i < data.length; i++){
                          
                          if(data[0].type === 'catalog'){
                              
                              var jsonBody ={
                                    min: req.params.min,
                                    productCode: data[0].catalog.code,
                                    quantity: data[0].catalog.quantity,
                                    channel: '2',
                                    destLoyaltyId: data[0].catalog.dest
                                };
                              
                              var result =  await ssoService.redeemAnItem(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                              
                          }else if(data[0].type === 'bill'){
                              
                              var jsonBody ={
                                    min: req.params.min,
                                    merchantIdentifier: data[0].bill.merchantIdentifier,
                                    amount: data[0].bill.amount,
                                    pin: data[0].bill.pin,
                                    channel: '2',
                                    ref: data[0].bill.ref
                                };
                                
                                var result =  await ssoService.payBillWithPoints(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                              
                          }
                          
                      }
                    
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async getCatalogById(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
				
				var id:string = req.params.min;
				
				console.log(id);
                
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
                    var result =  await ssoService.getCatalogById(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(req.query), id);
                    var resultFavorite =  await ssoService.getFavorites(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify({min:id}));
                    //console.log(result);
                    var resultJson = JSON.parse(result).data;
                    var resultFavoriteJson = JSON.parse(resultFavorite).data;
                    console.log(result);
					var finalResult = {
						"data" :[]
					};
					
					 for(var i = 0; i < resultJson.length; i++){
						var item:any ={
							"id": resultJson[i].catProductNo,
							"code": resultJson[i].catProductCode,
							"name": resultJson[i].catDescription,
							"description": resultJson[i].catLongDescription,
							"categories" : [],
							"points" : resultJson[i].catNumPoints,
							"stock" : resultJson[i].catAvailableStock,
							"favorite": false,
							"giftable": resultJson[i].catPasaRewardsEnabled,
							"expiry": resultJson[i].catEndDate,
                            "imageUrl": resultJson[i].catProductImagePath
                        };
                        
                        for(var j = 0; j < resultFavoriteJson.length; j++){
                            
                            if(resultJson[i].catProductNo === resultFavoriteJson[j].catProductNo){
                                item.favorite = true;
                                break;
                            }
                            
                        }
                        
						if(resultJson[i].catCategory === "15" ){
							item.categories.push("Most Popular");
						}
						else if(resultJson[i].catCategory === "19" ){
							item.categories.push("Deals");
						}
						else if(resultJson[i].catCategory === "20" ){
							item.categories.push("Lifestyle");
						}
						else if(resultJson[i].catCategory === "21" ){
							item.categories.push("Mobile");
						}
						
						var rules:string = 'Most Popular,Deals,Lifestyle,Mobile,Prepaid,Postpaid,Bro Prepaid,Bro Postpaid'
						
						var catProductValues = 	resultJson[i].catProductValues.split(',');
						for(var j = 0; j < catProductValues.length; j++){
							if(catProductValues[j].indexOf('Sun') > -1 || catProductValues[j].indexOf('SUN') > -1){
								continue;
							}
							
							var temp:any = catProductValues[j];
							
							if(catProductValues[j].startsWith('GSM ')){
								temp = catProductValues[j].replace('GSM ','');
							}
							
							if(rules.indexOf(temp) > -1){
								item.categories.push(temp);
							}
						}					
						finalResult.data.push(item);
					 }
					
					
                    res.json(finalResult);
					
					
                }
                catch (err) {
                    console.log(err);
                }
            }
            
        }
// }