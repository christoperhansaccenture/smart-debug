'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const sso_service_1 = require('../services/sso.service');
const error_handling_service_1 = require('../services/error-handling.service');
var process = require('process');
var redis = require('redis');
var request = require('request');
var config = require('../config/config');
// export module Login {
class RewardController {
    constructor() {
    }
    redeemAnItem(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var jsonBody = {
                min: req.body.min,
                productCode: req.body.productCode,
                quantity: req.body.quantity,
                channel: req.body.channel,
                destLoyaltyId: req.body.destLoyaltyId
            };
            var jwt = res.locals.jwt;
            console.log(token);
            console.log(jwt);
            const ssoService = new sso_service_1.SSO.sso();
            try {
                var result = yield ssoService.redeemAnItem(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(jsonBody));
                console.log(result);
                // var resJson = JSON.parse(result);       
                res.json(JSON.parse(result));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getListOfRedeemableItems(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var jwt = res.locals.jwt;
            console.log(jwt);
            const ssoService = new sso_service_1.SSO.sso();
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
            let promise = new Promise((resolve, reject) => {
                let brands = req.query.brands.split(',');
                let keys = brands.map(brand => 'catalogItems:' + brand);
                client.sunion(keys, (err, ids) => {
                    if (!err) {
                        client.get('catalogs:all', (err, catalogString) => {
                            let catalogs = JSON.parse(catalogString);
                            catalogs.data = catalogs.data.filter(catalog => ids.indexOf(catalog.catProductNo) > -1);
                            resolve(catalogs);
                        });
                    }
                    else {
                        reject(err);
                    }
                });
            });
            promise.then(result => {
                //var resultFavorite =  await ssoService.getFavorites(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify({min:id}));
                var resultJson = result.data;
                //var resultFavoriteJson = JSON.parse(resultFavorite).data;
                var finalResult = {
                    "data": []
                };
                for (var i = 0; i < resultJson.length; i++) {
                    var item = {
                        "id": resultJson[i].catProductNo,
                        "code": resultJson[i].catProductCode,
                        "name": resultJson[i].catDescription,
                        "ssoBrands": resultJson[i].ssoBrands,
                        "description": resultJson[i].catLongDescription,
                        "categories": [],
                        "points": resultJson[i].catNumPoints,
                        "stock": resultJson[i].catAvailableStock,
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
                    if (resultJson[i].catCategory === "15") {
                        item.categories.push("Most Popular");
                    }
                    else if (resultJson[i].catCategory === "19") {
                        item.categories.push("Deals");
                    }
                    else if (resultJson[i].catCategory === "20") {
                        item.categories.push("Lifestyle");
                    }
                    else if (resultJson[i].catCategory === "21") {
                        item.categories.push("Mobile");
                    }
                    var rules = 'Most Popular,Deals,Lifestyle,Mobile,Prepaid,Postpaid,Bro Prepaid,Bro Postpaid';
                    var catProductValues = resultJson[i].catProductValues.split(',');
                    for (var j = 0; j < catProductValues.length; j++) {
                        if (catProductValues[j].indexOf('Sun') > -1 || catProductValues[j].indexOf('SUN') > -1) {
                            continue;
                        }
                        var temp = catProductValues[j];
                        if (catProductValues[j].startsWith('GSM ')) {
                            temp = catProductValues[j].replace('GSM ', '');
                        }
                        if (rules.indexOf(temp) > -1) {
                            item.categories.push(temp);
                        }
                    }
                    finalResult.data.push(item);
                }
                res.json(finalResult);
                //res.json(response);
            }, err => {
                console.log('error');
            });
            /*
            var token:string = req.get("Authorization");
            token = token.replace('Bearer ','');
            
            
            var nJwt = require('njwt');
            try{
                var jwt = nJwt.verify(token,config.signingKey);
            }catch(e){
                res.sendStatus(403);
            }

            const ssoService:SSO.sso = new SSO.sso();

            try {
                var result =  await ssoService.getListOfRedeemableItems(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(req.query));
                console.log(result);
                
                res.json(JSON.parse(result));
            }
            catch (err) {
                console.log(err);
            }
            */
        });
    }
    refreshCatalog(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            console.log('refresh catalog');
            console.log('redis_url: ' + process.env.REDIS_URL);
            let client = redis.createClient(process.env.REDIS_URL);
            console.log('refresh catalog');
            var jwt = res.locals.jwt;
            const ssoService = new sso_service_1.SSO.sso();
            try {
                req.query.min = "9999924161";
                req.query.pagesize = "100000";
                req.query.pagepage = "1";
                console.log('before api call');
                let result = yield ssoService.getListOfRedeemableItems(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(req.query));
                console.log('after api call');
                let catalogs = JSON.parse(result);
                const now = new Date();
                catalogs.data = catalogs.data.filter(catalog => {
                    const expiryDate = new Date(catalog.catEndDate);
                    const expired = !(expiryDate > now);
                    if (expired) {
                        // remove from most popular
                        client.zrem(['mostpopular', catalog.catProductNo]);
                    }
                    else {
                        // add to most popular if not exists
                        client.zrank(['mostpopular', catalog.catProductNo], (err, reply) => {
                            if (reply == null) {
                                client.zadd(['mostpopular', 0, catalog.catProductNo]);
                            }
                        });
                    }
                    return !expired;
                });
                let brandMap = {};
                brandMap['GOLD'] = 'Postpaid';
                brandMap['BUDDY'] = 'Prepaid';
                brandMap['PLUGIT'] = 'BroPostpaid';
                brandMap['SHAREIT'] = 'BroPostpaidShareIt';
                brandMap['SPBRO'] = 'BroPrepaid';
                brandMap['SU'] = 'PostpaidServiceUnit';
                brandMap['INFINITY'] = 'Infinity';
                brandMap['TNT'] = 'TalkNText';
                catalogs.data.forEach(catalog => {
                    let stockLevel = 0;
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
                let brandMap2 = {};
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
                    const ids = catalogs.data.filter(catalog => {
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
        });
    }
    getFavorites(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var jwt = res.locals.jwt;
            //console.log(token);
            //console.log(jwt);
            const ssoService = new sso_service_1.SSO.sso();
            try {
                var result = yield ssoService.getFavorites(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(req.query));
                console.log(result);
                // var resJson = JSON.parse(result);       
                res.json(JSON.parse(result));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    transferpoints(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
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
            const ssoService = new sso_service_1.SSO.sso();
            const errorHandlingService = new error_handling_service_1.ErrorHandlingService.ErrorHandlingService();
            try {
                var result = yield ssoService.transferpoints(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(jsonBody));
                console.log(result);
                var errorCheckRes = '';
                errorCheckRes = errorHandlingService.transferRequestErrorHandling(res, result);
                if (errorCheckRes === null) {
                    res.json(JSON.parse(result));
                }
            }
            catch (err) {
                res.sendStatus(500);
                console.log(err);
            }
        });
    }
    favouriteItem(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var jsonBody = {
                min: req.params.min,
                cafProductNo: req.params.catalogId,
                cafFavoriteFlag: 1
            };
            var jwt = res.locals.jwt;
            //console.log(token);
            //console.log(jwt);
            const ssoService = new sso_service_1.SSO.sso();
            try {
                var result = yield ssoService.favouriteItem(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(jsonBody));
                console.log(result);
                // var resJson = JSON.parse(result);       
                res.json(JSON.parse(result));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    removeFavouriteItem(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var jsonBody = {
                min: req.params.min,
                cafProductNo: req.params.catalogId,
                cafFavoriteFlag: 0
            };
            var jwt = res.locals.jwt;
            //console.log(token);
            //console.log(jwt);
            const ssoService = new sso_service_1.SSO.sso();
            try {
                var result = yield ssoService.removeFavouriteItem(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(jsonBody));
                console.log(result);
                // var resJson = JSON.parse(result);       
                res.json(JSON.parse(result));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getCatalogDisplayPreferences(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var jwt = res.locals.jwt;
            //console.log(token);
            //console.log(jwt);
            const ssoService = new sso_service_1.SSO.sso();
            try {
                var result = yield ssoService.getCatalogDisplayPreferences(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid);
                console.log(result);
                // var resJson = JSON.parse(result);       
                res.json(JSON.parse(result));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    payBillWithPoints(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var jsonBody = {
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
            const ssoService = new sso_service_1.SSO.sso();
            try {
                var result = yield ssoService.payBillWithPoints(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(jsonBody));
                console.log(result);
                // var resJson = JSON.parse(result);       
                res.json(JSON.parse(result));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    redeemItems(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var jwt = res.locals.jwt;
            const ssoService = new sso_service_1.SSO.sso();
            const errorHandlingService = new error_handling_service_1.ErrorHandlingService.ErrorHandlingService();
            try {
                console.log(req.body);
                var data = req.body;
                let resultArray = [];
                console.log('redis_url: ' + process.env.REDIS_URL);
                let client = redis.createClient(process.env.REDIS_URL);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].type === 'catalog') {
                        let jsonBody = {
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
                            let result = yield ssoService.redeemAnItem(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(jsonBody));
                            let errorCheckRes;
                            errorCheckRes = errorHandlingService.redeemAnItemErrorHandling(data[i].catalog.code, result);
                            if (!errorCheckRes) {
                                resultArray.push({
                                    status: 200,
                                    productCode: data[i].catalog.code
                                });
                            }
                            else {
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
                    }
                    else if (data[i].type === 'bill') {
                        let jsonBody = {
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
                            let result = yield ssoService.payBillWithPoints(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(jsonBody));
                            let errorCheckRes;
                            errorCheckRes = errorHandlingService.payBillErrorHandling(data[i].bill.ref, result);
                            if (!errorCheckRes) {
                                resultArray.push({
                                    status: 200,
                                    ref: data[i].bill.ref
                                });
                            }
                            else {
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
        });
    }
    getCatalogById(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var id = req.params.min;
            console.log(id);
            var jwt = res.locals.jwt;
            //console.log(token);
            //console.log(jwt);
            const ssoService = new sso_service_1.SSO.sso();
            try {
                var result = yield ssoService.getCatalogById(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(req.query), id);
                var resultFavorite = yield ssoService.getFavorites(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify({ min: id }));
                var resultJson = JSON.parse(result).data;
                var resultFavoriteJson = JSON.parse(resultFavorite).data;
                console.log(result);
                var finalResult = {
                    "data": []
                };
                for (var i = 0; i < resultJson.length; i++) {
                    var item = {
                        "id": resultJson[i].catProductNo,
                        "code": resultJson[i].catProductCode,
                        "name": resultJson[i].catDescription,
                        "description": resultJson[i].catLongDescription,
                        "categories": [],
                        "points": resultJson[i].catNumPoints,
                        "stock": resultJson[i].catAvailableStock,
                        "favorite": false,
                        "giftable": resultJson[i].catPasaRewardsEnabled,
                        "expiry": resultJson[i].catEndDate,
                        "imageUrl": resultJson[i].catProductImagePath
                    };
                    for (var j = 0; j < resultFavoriteJson.length; j++) {
                        if (resultJson[i].catProductCode === resultFavoriteJson[j].catProductCode) {
                            item.favorite = true;
                            break;
                        }
                    }
                    if (resultJson[i].catCategory === "15") {
                        item.categories.push("Most Popular");
                    }
                    else if (resultJson[i].catCategory === "19") {
                        item.categories.push("Deals");
                    }
                    else if (resultJson[i].catCategory === "20") {
                        item.categories.push("Lifestyle");
                    }
                    else if (resultJson[i].catCategory === "21") {
                        item.categories.push("Mobile");
                    }
                    var rules = 'Most Popular,Deals,Lifestyle,Mobile,Prepaid,Postpaid,Bro Prepaid,Bro Postpaid';
                    var catProductValues = resultJson[i].catProductValues.split(',');
                    for (var j = 0; j < catProductValues.length; j++) {
                        if (catProductValues[j].indexOf('Sun') > -1 || catProductValues[j].indexOf('SUN') > -1) {
                            continue;
                        }
                        var temp = catProductValues[j];
                        if (catProductValues[j].startsWith('GSM ')) {
                            temp = catProductValues[j].replace('GSM ', '');
                        }
                        if (rules.indexOf(temp) > -1) {
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
        });
    }
}
exports.RewardController = RewardController;
// }
//# sourceMappingURL=reward.controller.js.map