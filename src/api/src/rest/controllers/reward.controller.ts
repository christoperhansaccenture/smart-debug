'use strict';
import { SSO } from '../services/sso.service';
import { ErrorHandlingService } from '../services/error-handling.service';

var process = require('process');
var redis = require('redis');

var request = require('request'); 
var config = require('../config/config');



    export interface rewardInterface {
        redeemAnItem():Promise<string>;
        getListOfRedeemableItems():Promise<string>;
        getMostPopularItems():Promise<string>;
        refreshCatalog():Promise<void>;
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
                var jsonBody ={
                    min: req.body.min,
                    productCode: req.body.productCode,
                    quantity: req.body.quantity,
                    channel: req.body.channel,
                    destLoyaltyId: req.body.destLoyaltyId
                };
                
                var jwt = res.locals.jwt;

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
                var jwt = res.locals.jwt;
                
                console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();

                /*
                let brandMap: { [id: string] : string; } = {};
                brandMap['Postpaid'] = 'GOLD';
                brandMap['Prepaid'] = 'BUDDY';
                brandMap['BroPostpaid'] = 'PLUGIT';
                brandMap['BroPostpaidShareIt'] = 'SHAREIT';
                brandMap['BroPrepaid'] = 'SPBRO';
                brandMap['PostpaidServiceUnit'] = 'SU';
                brandMap['Infinity'] = 'INFINITY';
                brandMap['TalkNText'] = 'TNT';
               */
                console.log('request: ' + req.query.brands);

                console.log('redis_url: ' + process.env.REDIS_URL);
                let client = redis.createClient(process.env.REDIS_URL);
                console.log('after redis_url');

                let promise: Promise<string> = new Promise((resolve, reject) => {
                    let brands = req.query.brands.split(',');
                    let keys = brands.map(brand => 'catalogItems:' + brand);
                    client.sunion(keys, (err, ids) => {
                        if (!err) {
                            client.get('catalogs:all', (err, catalogString) => {
                                let catalogs = JSON.parse(catalogString);
                                catalogs.data = catalogs.data.filter(catalog => ids.indexOf(catalog.catProductNo) > -1);
                                resolve(catalogs);
                            });
                        } else {
                            reject(err);
                        }
                    });
                });
                promise.then(
                    result => {

                        //var resultFavorite =  await ssoService.getFavorites(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify({min:id}));
                        var resultJson = result.data;
                        //var resultFavoriteJson = JSON.parse(resultFavorite).data;
                        var finalResult = {
                            "data" :[]
                        };

                        for(var i = 0; i < resultJson.length; i++){
                            var item:any ={
                                "id": resultJson[i].catProductNo,
                                "code": resultJson[i].catProductCode,
                                "name": resultJson[i].catDescription,
                                "ssoBrands": resultJson[i].ssoBrands,
                                "description": resultJson[i].catLongDescription,
                                "categories" : [],
                                "points" : resultJson[i].catNumPoints,
                                "stock" : resultJson[i].catAvailableStock,
                                "favorite": false,
                                "giftable": resultJson[i].catPasaRewardsEnabled == '1' ? true : false,
                                "expiry": resultJson[i].catEndDate,
                                "imageUrl": resultJson[i].catProductImagePath
                            };

                            /*
                            for(var j = 0; j < resultFavoriteJson.length; j++){

                                if(resultJson[i].catProductCode === resultFavoriteJson[j].catProductCode){
                                    item.favorite = true;
                                    break;
                                }

                            }
                           */

                          /*
                            if(resultJson[i].catCategory === "15" ){
                                item.categories.push("Most Popular");
                            }
                           */
                            if(resultJson[i].catCategory === "19" ){
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

                        //res.json(response);
                    }, err => {
                        console.log('error');
                    }
                );
                
            }

            async refreshCatalog(req, res): Promise<void> {
                console.log('refresh catalog');

                console.log('redis_url: ' + process.env.REDIS_URL);
                let client = redis.createClient(process.env.REDIS_URL);
                console.log('refresh catalog');

                var jwt = res.locals.jwt;

                const ssoService:SSO.sso = new SSO.sso();

                try {  
                    req.query.min = "9999924161";
                    req.query.pagesize = "100000";
                    req.query.pagepage = "1";
                    console.log('before api call');
                    let result = await ssoService.getListOfRedeemableItems(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(req.query));
                    console.log('after api call');
                    
                    let catalogs = JSON.parse(result);
                    const now = new Date();
                    catalogs.data = catalogs.data.filter(catalog => {
                        const expiryDate = new Date(catalog.catEndDate);
                        const expired = !(expiryDate > now);
                        if (expired) {
                            // remove from most popular
                            client.zrem(['mostpopular', catalog.catProductNo]);
                        } else {
                            // add to most popular if not exists
                            client.zrank(['mostpopular', catalog.catProductNo], (err, reply) => {
                                if (reply == null) {
                                    client.zadd(['mostpopular', 0, catalog.catProductNo]);
                                }
                            });
                        }
                        return !expired;
                    });
                    let brandMap: { [id: string] : string; } = {};
                    brandMap['GOLD'] = 'Postpaid';
                    brandMap['BUDDY'] = 'Prepaid';
                    brandMap['PLUGIT'] = 'BroPostpaid';
                    brandMap['SHAREIT'] = 'BroPostpaidShareIt';
                    brandMap['SPBRO'] = 'BroPrepaid';
                    brandMap['SU'] = 'PostpaidServiceUnit';
                    brandMap['INFINITY'] = 'Infinity';
                    brandMap['TNT'] = 'TalkNText';
                    catalogs.data.forEach(catalog => {
                        let stockLevel: number = 0;
                        if (catalog.catAvailableStock > 10) {
                            stockLevel = 1;
                        }
                        if (catalog.catAvailableStock > 30) {
                            stockLevel = 2;
                        }
                        catalog.stockLevel = stockLevel;

                        catalog.ssoBrands = [];
                        catalog.catProductValues.split(',').forEach(e => {
                            if (brandMap[e]) {
                                catalog.ssoBrands.push(brandMap[e]);
                            }
                        });
                    });
                    client.set('catalogs:all', JSON.stringify(catalogs));
                    /*
                    let brands = [
                        "ADDICT","BUDDY","BUDDY_IN",
                        "GOLD","GOLDPS","INFINITY",
                        "SPBRO","GSM Prepaid","GSM Postpaid",
                        "Bro Prepaid","Bro Postpaid","PLUGIT",
                        "TNT","Sun Broadband FLP","Sun GSM FLP","SHAREIT"
                    ];
                   */
                    let brands = [
                        'Postpaid', 'Prepaid', 'BroPostpaid',
                        'BroPostpaidShareIt', 'BroPrepaid',
                        'PostpaidServiceUnit', 'Infinity', 'TalkNText'
                    ];
                    let brandMap2: { [id: string] : string; } = {};
                    brandMap2['Postpaid'] = 'GOLD';
                    brandMap2['Prepaid'] = 'BUDDY';
                    brandMap2['BroPostpaid'] = 'PLUGIT';
                    brandMap2['BroPostpaidShareIt'] = 'SHAREIT';
                    brandMap2['BroPrepaid'] = 'SPBRO';
                    brandMap2['PostpaidServiceUnit'] = 'SU';
                    brandMap2['Infinity'] = 'INFINITY';
                    brandMap2['TalkNText'] = 'TNT';
                    // filter based on brands
                    brands.forEach(brand => {
                        const ids: number[] = catalogs.data.filter(catalog => {
                            return catalog.catProductValues.split(",").indexOf(brandMap2[brand]) > -1;
                        }).map(catalog => catalog.catProductNo);
                        const keyName = 'catalogItems:' + brand;
                        client.del(keyName);
                        let params = [keyName].concat(ids);
                        if (params.length > 1) {
                            client.sadd(params);
                        }
                    });

                    res.sendStatus(200);

                }
                catch (err) {
                    console.log(err);
                }

                console.log('finished redis');

            }
            
            async getFavorites(req:string,res:string) : Promise<string> {
                
                var jwt = res.locals.jwt;

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
                
                var jsonBody = {
                    min: req.body.from,
                    destLoyaltyId: req.body.to,
                    srcCurrencyId: req.body.srcCurrId,
                    destCurrencyId: req.body.destCurrId,
                    rwdQty: req.body.amount
                };
                
                var jwt = res.locals.jwt;

                //console.log(token);
                //console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();
                const errorHandlingService:ErrorHandlingService.ErrorHandlingService = new ErrorHandlingService.ErrorHandlingService();

                try {  
                    var result =  await ssoService.transferpoints(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                    console.log(result);
                    var errorCheckRes = '';

                    errorCheckRes = errorHandlingService.transferRequestErrorHandling(res,result);
                    
                    if(errorCheckRes === null){
                        res.json(JSON.parse(result));
                    }

                }
                catch (err) {
                    res.sendStatus(500);
                    console.log(err);
                }
            }
            
            async favouriteItem(req:string,res:string) : Promise<string> {
                
                var jsonBody ={
                    min: req.params.min,
                    cafProductNo: req.params.catalogId,
                    cafFavoriteFlag: 1
                };
                
                var jwt = res.locals.jwt;

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
                
                var jsonBody ={
                    min: req.params.min,
                    cafProductNo: req.params.catalogId,
                    cafFavoriteFlag: 0
                };
                
                var jwt = res.locals.jwt;

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
                var jwt = res.locals.jwt;

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
                var jsonBody ={
                    min: req.body.min,
                    merchantIdentifier: req.body.merchantIdentifier,
                    amount: req.body.amount,
                    pin: req.body.pin,
                    channel: req.body.channel,
                    reference: req.body.ref
                };
                
                var jwt = res.locals.jwt;

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
                var jwt = res.locals.jwt;

                const ssoService:SSO.sso = new SSO.sso();
                const errorHandlingService:ErrorHandlingService.ErrorHandlingService = new ErrorHandlingService.ErrorHandlingService();

                try {  
                    
                      console.log(req.body);
                      
                      var data = req.body;
                      
                      let resultArray: any[] = [];

                      console.log('redis_url: ' + process.env.REDIS_URL);
                      let client = redis.createClient(process.env.REDIS_URL);

                      for(var i = 0; i < data.length; i++){
                          
                          if(data[i].type === 'catalog'){
                              
                              let jsonBody ={
                                    min: req.params.min,
                                    productCode: data[i].catalog.code,
                                    quantity: data[i].catalog.quantity,
                                    channel: data[i].channel,
                                    destLoyaltyId: data[i].catalog.dest == req.params.min ? "" : data[i].catalog.dest
                                };
                              
                                /*
                              var result =  await ssoService.redeemAnItem(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                              console.log(JSON.stringify(result));
                             */

                              try {  
                                  let result =  await ssoService.redeemAnItem(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                                  let errorCheckRes;

                                  errorCheckRes = errorHandlingService.redeemAnItemErrorHandling(data[i].catalog.code, result);

                                  if (!errorCheckRes) {
                                      resultArray.push({
                                          status: 200,
                                          productCode: data[i].catalog.code
                                      });
                                      // increment most popular
                                      //console.log('catalog: ' + data[i].catalog);
                                      client.zincrby(['mostpopular', data[i].catalog.quantity, data[i].catalog.catProductNo]);
                                  } else {
                                      resultArray.push(errorCheckRes);
                                  }

                              }
                              catch (err) {
                                  res.sendStatus(500);
                                  resultArray.push({
                                      status: 500,
                                      productCode: data[i].catalog.code,
                                      message: 'Internal server error'
                                  });
                                  console.log(err);
                              }

                              
                              
                          }else if(data[i].type === 'bill'){
                              
                              let jsonBody ={
                                    min: req.params.min,
                                    merchantIdentifier: data[i].bill.merchantIdentifier,
                                    amount: data[i].bill.amount,
                                    pin: data[i].bill.pin,
                                    channel: data[i].channel,
                                    reference: data[i].bill.ref
                                };
                                
                                /*
                                var result =  await ssoService.payBillWithPoints(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                              
                                console.log(JSON.stringify(result));
                                */
                                try {  
                                    let result =  await ssoService.payBillWithPoints(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                                    let errorCheckRes;

                                    errorCheckRes = errorHandlingService.payBillErrorHandling(data[i].bill.ref, result);

                                    if (!errorCheckRes) {
                                        resultArray.push({
                                            status: 200,
                                            ref: data[i].bill.ref
                                        });
                                    } else {
                                        resultArray.push(errorCheckRes);
                                    }

                                }
                              catch (err) {
                                  res.sendStatus(500);
                                  resultArray.push({
                                      status: 500,
                                      ref: data[i].bill.ref,
                                      message: 'Internal server error'
                                  });
                                  console.log(err);
                              }
                          }
                          
                      }
                      res.json(resultArray);
                    
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async getCatalogById(req:string,res:string) : Promise<string> {
                
				var id:string = req.params.min;
				
				console.log(id);
                
                var jwt = res.locals.jwt;

                //console.log(token);
                //console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();
				

                try {  
                    var result =  await ssoService.getCatalogById(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(req.query), id);
                    var resultFavorite =  await ssoService.getFavorites(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify({min:id}));
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
                            
                            if(resultJson[i].catProductCode === resultFavoriteJson[j].catProductCode){
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

            async getMostPopularItems(req:string,res:string) : Promise<string> {
                var jwt = res.locals.jwt;
                
                console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();

                /*
                let brandMap: { [id: string] : string; } = {};
                brandMap['Postpaid'] = 'GOLD';
                brandMap['Prepaid'] = 'BUDDY';
                brandMap['BroPostpaid'] = 'PLUGIT';
                brandMap['BroPostpaidShareIt'] = 'SHAREIT';
                brandMap['BroPrepaid'] = 'SPBRO';
                brandMap['PostpaidServiceUnit'] = 'SU';
                brandMap['Infinity'] = 'INFINITY';
                brandMap['TalkNText'] = 'TNT';
               */
                console.log('request: ' + req.query.brands);

                console.log('redis_url: ' + process.env.REDIS_URL);
                let client = redis.createClient(process.env.REDIS_URL);
                console.log('after redis_url');

                let promise: Promise<string> = new Promise((resolve, reject) => {
                    let brands = req.query.brands.split(',');
                    let keys = brands.map(brand => 'catalogItems:' + brand);
                    client.sunion(keys, (err, ids) => {
                        if (!err) {
                            client.get('catalogs:all', (err, catalogString) => {
                                let catalogs = JSON.parse(catalogString);
                                client.zrevrange(['mostpopular', 1, -1], (err, list) => {
                                    list = catalogs.data.filter(catalog => list.indexOf(catalog.catProductNo) > -1).map(e => e.catProductNo);
                                    resolve(list);
                                });
                            });
                        } else {
                            reject(err);
                        }
                    });
                });
                promise.then(
                    result => {
                        res.json(result);
                    }, err => {
                        console.log('error');
                    }
                );
            }
            
        }
// }
