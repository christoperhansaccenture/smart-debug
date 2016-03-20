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
var request = require('request');
var config = require('../config/config');
// export module Login {
class AccountController {
    constructor() {
    }
    getAccount(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var token = req.get("Authorization");
            token = token.replace('Bearer ', '');
            console.log(config.signingKey);
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
                var result = yield ssoService.getAccount(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid);
                console.log(result);
                // var resJson = JSON.parse(result);       
                res.json(JSON.parse(result));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getRewardBalance(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var token = req.get("Authorization");
            //var min:string =  req.query.min;
            token = token.replace('Bearer ', '');
            console.log(req.query);
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
                var result = yield ssoService.getRewardBalance(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(req.query));
                console.log(result);
                var resJson = JSON.parse(result);
                var finalResult = {
                    rewardPoint: '0'
                };
                if (resJson.data.length !== 0) {
                    for (var i = 0; i < resJson.data.length; i++) {
                        if (resJson.data[i].drawChance === false) {
                            finalResult.rewardPoint = resJson.data[i].rwdCashbackValue;
                        }
                    }
                }
                res.json(finalResult);
            }
            catch (err) {
                res.sendStatus(500);
            }
        });
    }
    getLatestRewardExpiry(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var token = req.get("Authorization");
            //var min:string =  req.query.min;
            token = token.replace('Bearer ', '');
            console.log(req.query);
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
                var result = yield ssoService.getLatestRewardExpiry(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(req.query));
                console.log(result);
                // var resJson = JSON.parse(result);       
                res.json(JSON.parse(result));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getActivityHistory(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var token = req.get("Authorization");
            //var min:string =  req.query.min;
            token = token.replace('Bearer ', '');
            console.log(req.query);
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
                var result = yield ssoService.getActivityHistory(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(req.query));
                var resultJson = JSON.parse(result).data;
                var finalResult = [];
                for (var i = 0; i < resultJson.length; i++) {
                    if ((resultJson[i].cuaRemarks.indexOf('Waiting for approval') > -1) ||
                        (resultJson[i].cuaRemarks.indexOf('confirmation') > -1) ||
                        (resultJson[i].cuaRemarks.indexOf('Not') > -1) ||
                        (resultJson[i].cuaRemarks.indexOf('retry') > -1) ||
                        (resultJson[i].cuaRemarks.indexOf('Insufficient') > -1)) {
                        continue;
                    }
                    if (resultJson[i].cuaActivityType === "1") {
                        var parameter = resultJson[i].cuaParams.split('#');
                        var item = {
                            "type": 'registration',
                            "name": 'Number Activation',
                            "desc": 'Activate ' + parameter[0],
                            "date": resultJson[i].cuaDate,
                            "media": 'Smart Reward App',
                            "point": '0'
                        };
                        finalResult.push(item);
                    }
                    else if (resultJson[i].cuaActivityType === "2") {
                        var parameter = resultJson[i].cuaParams.split('#');
                        var item = {
                            "type": 'earning',
                            "name": 'Earned Points',
                            "desc": 'Earned Points',
                            "date": resultJson[i].cuaDate,
                            "media": 'Smart Reward App',
                            "point": parameter[5]
                        };
                        finalResult.push(item);
                    }
                    else if (resultJson[i].cuaActivityType === "3") {
                        var parameter = resultJson[i].cuaParams.split('#');
                        if (parameter.length === 4) {
                            if (parameter[3] === '0') {
                                parameter[3] = 1;
                            }
                            var item = {
                                "type": "redemption",
                                "name": parameter[0],
                                "desc": parameter[3] + ' item(s)',
                                "date": "November 25, 2016",
                                "media": "Smart Reward App",
                                "point": '-' + parameter[1]
                            };
                        }
                        else {
                            var name = '';
                            if (req.query.min === parameter[3]) {
                                var item = {
                                    "type": "redemption",
                                    "name": "Pasa Reward",
                                    "desc": parameter[4] + ' item(s)',
                                    "date": "November 25, 2016",
                                    "media": "Smart Reward App",
                                    "point": parameter[1]
                                };
                            }
                            else {
                                var item = {
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
                    else if (resultJson[i].cuaActivityType === "4") {
                        var parameter = resultJson[i].cuaParams.split('#');
                        var item = {
                            "type": "transfer",
                            "name": "Transfer Points",
                            "desc": "Transfer Points to " + parameter[0],
                            "date": "November 25, 2016",
                            "media": "Smart Reward App",
                            "point": parameter[1]
                        };
                        finalResult.push(item);
                    }
                    else if (resultJson[i].cuaActivityType === "6") {
                        var parameter = resultJson[i].cuaParams.split('#');
                        var item = {
                            "type": "Points Inquiry",
                            "name": "Points Inquiry",
                            "desc": "Points Inquiry to " + parameter[0],
                            "date": "November 25, 2016",
                            "media": "Smart Reward App",
                            "point": parameter[1]
                        };
                        finalResult.push(item);
                    }
                    else if (resultJson[i].cuaActivityType === "8") {
                        var parameter = resultJson[i].cuaParams.split('#');
                        var item = {
                            "type": "Event Registration",
                            "name": "Event Registration",
                            "desc": "Event Registration for " + parameter[0],
                            "date": "November 25, 2016",
                            "media": "Smart Reward App",
                            "point": '0'
                        };
                        finalResult.push(item);
                    }
                    else if (resultJson[i].cuaActivityType === "10") {
                        var parameter = resultJson[i].cuaParams.split('#');
                        var linkNo = '';
                        var name = '';
                        var desc = '';
                        if (req.query.min === parameter[0]) {
                            linkNo = parameter[1];
                        }
                        else {
                            linkNo = parameter[0];
                        }
                        if (resultJson[i].cuaRemarks === 'linked') {
                            name = 'Link Account';
                            desc = 'Link with ';
                        }
                        else {
                            name = 'unlink Account';
                            desc = 'Unlink with ';
                        }
                        var item = {
                            "type": "linking",
                            "name": name,
                            "desc": desc + linkNo,
                            "date": "November 25, 2016",
                            "media": "Smart Reward App",
                            "point": parameter[2]
                        };
                        finalResult.push(item);
                    }
                    else if (resultJson[i].cuaActivityType === "12") {
                        var parameter = resultJson[i].cuaParams.split('#');
                        var item = {
                            "type": "Account Transfer",
                            "name": "Change Mobile Number",
                            "desc": "mobile number changed to " + parameter[0],
                            "date": "November 25, 2016",
                            "media": "Smart Reward App",
                            "point": parameter[1]
                        };
                        finalResult.push(item);
                    }
                    else if (resultJson[i].cuaActivityType === "13") {
                        var parameter = resultJson[i].cuaParams.split('#');
                        var item = {
                            "type": "Reward Expiry",
                            "name": "Points Expiry",
                            "desc": "expired points from " + parameter[0],
                            "date": "November 25, 2016",
                            "media": "Smart Reward App",
                            "point": parameter[1]
                        };
                        finalResult.push(item);
                    }
                    else if (resultJson[i].cuaActivityType === "16") {
                        var parameter = resultJson[i].cuaParams.split('#');
                        var item = {
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
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var token = req.get("Authorization");
            //var min:string =  req.query.min;
            token = token.replace('Bearer ', '');
            var jsonBody = {
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
                var result = yield ssoService.register(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(jsonBody));
                console.log(result);
                // var resJson = JSON.parse(result);       
                res.json(JSON.parse(result));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getCustomerInformation(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var token = req.get("Authorization");
            //var min:string =  req.query.min;
            token = token.replace('Bearer ', '');
            console.log(req.query);
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
                var result = yield ssoService.getCustomerInformation(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(req.query));
                console.log(result);
                // var resJson = JSON.parse(result);       
                res.json(JSON.parse(result));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getListOfLinkedAccounts(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var token = req.get("Authorization");
            //var min:string =  req.query.min;
            token = token.replace('Bearer ', '');
            console.log(req.query);
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
                var result = yield ssoService.getListOfLinkedAccounts(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(req.query));
                console.log(result);
                // var resJson = JSON.parse(result);       
                res.json(JSON.parse(result));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    linkAccount(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var token = req.get("Authorization");
            //var min:string =  req.query.min;
            token = token.replace('Bearer ', '');
            var jsonBody = {
                min: req.body.min,
                primaryLoyaltyId: req.body.primaryLoyaltyId,
                childLoyaltyId: req.body.childLoyaltyId,
                lrqSource: req.body.lrqSource,
                lrqInitiator: req.body.lrqInitiator,
                channel: req.body.channel
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
                var result = yield ssoService.linkAccount(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(jsonBody));
                console.log(result);
                // var resJson = JSON.parse(result);       
                res.json(JSON.parse(result));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    unlinkAccount(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var token = req.get("Authorization");
            //var min:string =  req.query.min;
            token = token.replace('Bearer ', '');
            var jsonBody = {
                min: req.body.min,
                primaryLoyaltyId: req.body.primaryLoyaltyId,
                childLoyaltyId: req.body.childLoyaltyId,
                lrqSource: req.body.lrqSource,
                lrqInitiator: req.body.lrqInitiator,
                channel: req.body.channel
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
                var result = yield ssoService.unlinkAccount(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(jsonBody));
                console.log(result);
                // var resJson = JSON.parse(result);       
                res.json(JSON.parse(result));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    rewardsAlertNotification(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var token = req.get("Authorization");
            token = token.replace('Bearer ', '');
            var jsonBody = {
                min: req.body.min,
                status: req.body.status
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
                var result = yield ssoService.rewardsAlertNotification(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(jsonBody));
                console.log(result);
                // var resJson = JSON.parse(result);       
                res.json(JSON.parse(result));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    requestMobileNoList(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var token = req.get("Authorization");
            //var min:string =  req.query.min;
            token = token.replace('Bearer ', '');
            console.log(req.query);
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
                var result = yield ssoService.requestMobileNoList(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(req.query));
                console.log(result);
                // var resJson = JSON.parse(result);       
                res.json(JSON.parse(result));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getListOfMobileNumber(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var token = req.get("Authorization");
            //var min:string =  req.query.min;
            token = token.replace('Bearer ', '');
            var data = {
                min: req.params.min
            };
            var nJwt = require('njwt');
            try {
                var jwt = nJwt.verify(token, config.signingKey);
            }
            catch (e) {
                res.sendStatus(403);
            }
            const ssoService = new sso_service_1.SSO.sso();
            try {
                var result = yield ssoService.getListOfLinkedAccounts(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(data));
                console.log(result);
                var jsonObject = JSON.parse(result);
                var finalResult = {
                    phoneNo: '',
                    name: '',
                    rewards: '0'
                };
                var listOfMobile = [];
                if (jsonObject.data.length === 0) {
                    //return only 1 mobile number
                    finalResult.phoneNo = req.params.min;
                    result = yield ssoService.getAccount(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid);
                    finalResult.name = JSON.parse(result).FirstName;
                    result = yield ssoService.getRewardBalance(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(data));
                    var resJson = JSON.parse(result);
                    console.log(result);
                    if (resJson.data.length !== 0) {
                        for (var i = 0; i < resJson.data.length; i++) {
                            if (resJson.data[i].drawChance === false) {
                                finalResult.rewards = resJson.data[i].rwdCashbackValue;
                            }
                        }
                    }
                    listOfMobile.push(finalResult);
                }
                else {
                    finalResult.phoneNo = req.params.min;
                    result = yield ssoService.getAccount(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid);
                    console.log(result);
                    finalResult.name = JSON.parse(result).FirstName;
                    result = yield ssoService.getRewardBalance(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(data));
                    var resJson = JSON.parse(result);
                    console.log(result);
                    if (resJson.data.length !== 0) {
                        for (var i = 0; i < resJson.data.length; i++) {
                            if (resJson.data[i].drawChance === false) {
                                finalResult.rewards = resJson.data[i].rwdCashbackValue;
                            }
                        }
                    }
                    listOfMobile.push(finalResult);
                    for (var i = 0; i < jsonObject.data.length; i++) {
                        var mobileData = {
                            phoneNo: '',
                            name: '',
                            rewards: '0'
                        };
                        mobileData.phoneNo = jsonObject.data[i].cusLoyaltyId;
                        mobileData.name = jsonObject.data[i].cusFName;
                        data = {
                            min: jsonObject.data[i].cusLoyaltyId
                        };
                        result = yield ssoService.getRewardBalance(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(data));
                        var resJson = JSON.parse(result);
                        console.log(result);
                        if (resJson.data.length !== 0) {
                            for (var i = 0; i < resJson.data.length; i++) {
                                if (resJson.data[i].drawChance === false) {
                                    mobileData.rewards = resJson.data[i].rwdCashbackValue;
                                }
                            }
                        }
                        listOfMobile.push(mobileData);
                    }
                }
                // var resJson = JSON.parse(result);       
                res.json(listOfMobile);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.AccountController = AccountController;
// } 
//# sourceMappingURL=account.controller.js.map