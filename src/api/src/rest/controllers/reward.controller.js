'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
var sso_service_1 = require('../services/sso.service');
var error_handling_service_1 = require('../services/error-handling.service');
var request = require('request');
var config = require('../config/config');
// export module Login {
class RewardController {
    constructor() {
    }
    redeemAnItem(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var token = req.get("Authorization");
            token = token.replace('Bearer ', '');
            var jsonBody = {
                min: req.body.min,
                productCode: req.body.productCode,
                quantity: req.body.quantity,
                channel: req.body.channel,
                destLoyaltyId: req.body.destLoyaltyId
            };
            var nJwt = require('njwt');
            try {
                var jwt = nJwt.verify(token, config.signingKey);
            }
            catch (e) {
                res.sendStatus(403);
            }
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
            var token = req.get("Authorization");
            token = token.replace('Bearer ', '');
            var nJwt = require('njwt');
            try {
                var jwt = nJwt.verify(token, config.signingKey);
            }
            catch (e) {
                res.sendStatus(403);
            }
            //console.log(token);
            //console.log(jwt);
            const ssoService = new sso_service_1.SSO.sso();
            try {
                var result = yield ssoService.getListOfRedeemableItems(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(req.query));
                console.log(result);
                // var resJson = JSON.parse(result);       
                res.json(JSON.parse(result));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getFavorites(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var token = req.get("Authorization");
            token = token.replace('Bearer ', '');
            var nJwt = require('njwt');
            try {
                var jwt = nJwt.verify(token, config.signingKey);
            }
            catch (e) {
                res.sendStatus(403);
            }
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
            var token = req.get("Authorization");
            token = token.replace('Bearer ', '');
            var jsonBody = {
                min: req.body.from,
                destLoyaltyId: req.body.to,
                srcCurrencyId: req.body.srcCurrId,
                destCurrencyId: req.body.destCurrId,
                rwdQty: req.body.amount
            };
            var nJwt = require('njwt');
            try {
                var jwt = nJwt.verify(token, config.signingKey);
            }
            catch (e) {
                res.sendStatus(403);
            }
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
            var token = req.get("Authorization");
            token = token.replace('Bearer ', '');
            var jsonBody = {
                min: req.params.min,
                cafProductNo: req.params.catalogId,
                cafFavoriteFlag: 1
            };
            var nJwt = require('njwt');
            try {
                var jwt = nJwt.verify(token, config.signingKey);
            }
            catch (e) {
                res.sendStatus(403);
            }
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
            var token = req.get("Authorization");
            token = token.replace('Bearer ', '');
            var jsonBody = {
                min: req.params.min,
                cafProductNo: req.params.catalogId,
                cafFavoriteFlag: 0
            };
            var nJwt = require('njwt');
            try {
                var jwt = nJwt.verify(token, config.signingKey);
            }
            catch (e) {
                res.sendStatus(403);
            }
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
            var token = req.get("Authorization");
            token = token.replace('Bearer ', '');
            var nJwt = require('njwt');
            try {
                var jwt = nJwt.verify(token, config.signingKey);
            }
            catch (e) {
                res.sendStatus(403);
            }
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
            var token = req.get("Authorization");
            token = token.replace('Bearer ', '');
            var jsonBody = {
                min: req.body.min,
                merchantIdentifier: req.body.merchantIdentifier,
                amount: req.body.amount,
                pin: req.body.pin,
                channel: req.body.channel,
                ref: req.body.ref
            };
            var nJwt = require('njwt');
            try {
                var jwt = nJwt.verify(token, config.signingKey);
            }
            catch (e) {
                res.sendStatus(403);
            }
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
            var token = req.get("Authorization");
            //var min:string =  req.query.min;
            token = token.replace('Bearer ', '');
            // var data  = {
            //min: req.params.min
            //}
            var nJwt = require('njwt');
            try {
                var jwt = nJwt.verify(token, config.signingKey);
            }
            catch (e) {
                res.sendStatus(403);
            }
            const ssoService = new sso_service_1.SSO.sso();
            try {
                console.log(req.body);
                var data = JSON.parse(req.body);
                for (var i = 0; i < data.length; i++) {
                    if (data[0].type === 'catalog') {
                        var jsonBody = {
                            min: req.params.min,
                            productCode: data[0].catalog.code,
                            quantity: data[0].catalog.quantity,
                            channel: '2',
                            destLoyaltyId: data[0].catalog.dest
                        };
                        var result = yield ssoService.redeemAnItem(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(jsonBody));
                    }
                    else if (data[0].type === 'bill') {
                        var jsonBody = {
                            min: req.params.min,
                            merchantIdentifier: data[0].bill.merchantIdentifier,
                            amount: data[0].bill.amount,
                            pin: data[0].bill.pin,
                            channel: '2',
                            ref: data[0].bill.ref
                        };
                        var result = yield ssoService.payBillWithPoints(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(jsonBody));
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getCatalogById(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var token = req.get("Authorization");
            token = token.replace('Bearer ', '');
            var id = req.params.min;
            console.log(id);
            var nJwt = require('njwt');
            try {
                var jwt = nJwt.verify(token, config.signingKey);
            }
            catch (e) {
                res.sendStatus(403);
            }
            //console.log(token);
            //console.log(jwt);
            const ssoService = new sso_service_1.SSO.sso();
            try {
                var result = yield ssoService.getCatalogById(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(req.query), id);
                var resultFavorite = yield ssoService.getFavorites(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify({ min: id }));
                //console.log(result);
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