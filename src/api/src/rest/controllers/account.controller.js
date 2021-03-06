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
var request = require('request');
var config = require('../config/config');
// export module Login {
class AccountController {
    constructor() {
    }
    getAccount(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var jwt = res.locals.jwt;
            const ssoService = new sso_service_1.SSO.sso();
            try {
                var result = yield ssoService.getAccount(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid);
                res.json(JSON.parse(result));
            }
            catch (err) {
            }
        });
    }
    getRewardBalance(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var jwt = res.locals.jwt;
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
            var jwt = res.locals.jwt;
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
            console.log(req.query);
            var jwt = res.locals.jwt;
            //console.log(token);
            console.log(jwt);
            const ssoService = new sso_service_1.SSO.sso();
            try {
                var result = yield ssoService.getActivityHistory(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(req.query));
                console.log(result);
                var resultJson = JSON.parse(result).data;
                var finalResult = [];
                for (var i = 0; i < resultJson.length; i++) {
                    var arrayDate = resultJson[i].cuaDate.split('-');
                    var month = '';
                    if (arrayDate[1] === '01') {
                        month = 'January';
                    }
                    else if (arrayDate[1] === '02') {
                        month = 'February';
                    }
                    else if (arrayDate[1] === '03') {
                        month = 'March';
                    }
                    else if (arrayDate[1] === '04') {
                        month = 'April';
                    }
                    else if (arrayDate[1] === '05') {
                        month = 'May';
                    }
                    else if (arrayDate[1] === '06') {
                        month = 'June';
                    }
                    else if (arrayDate[1] === '07') {
                        month = 'July';
                    }
                    else if (arrayDate[1] === '08') {
                        month = 'August';
                    }
                    else if (arrayDate[1] === '09') {
                        month = 'September';
                    }
                    else if (arrayDate[1] === '10') {
                        month = 'October';
                    }
                    else if (arrayDate[1] === '11') {
                        month = 'November';
                    }
                    else if (arrayDate[1] === '12') {
                        month = 'December';
                    }
                    var date = month + ' ' + arrayDate[2] + ', ' + arrayDate[0];
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
                            "date": date,
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
                            "date": date,
                            "media": 'Smart Reward App',
                            "point": parameter[5]
                        };
                        finalResult.push(item);
                    }
                    else if (resultJson[i].cuaActivityType === "3") {
                        var parameter = resultJson[i].cuaParams.split('#');
                        var point = '0';
                        if (parameter[1] === undefined || parameter[1] === null) {
                            point = '0';
                        }
                        else {
                            if (parameter[1] === '0' || parameter[1] === '0.0') {
                                point = parameter[1];
                            }
                            else {
                                point = '-' + parameter[1];
                            }
                        }
                        if (parameter.length === 4) {
                            if (parameter[3] === '0') {
                                parameter[3] = 1;
                            }
                            var item = {
                                "type": "redemption",
                                "name": parameter[0],
                                "desc": parameter[3] + ' item(s)',
                                "date": date,
                                "media": "Smart Reward App",
                                "point": point
                            };
                        }
                        else {
                            var name = '';
                            if (req.query.min === parameter[3]) {
                                var item = {
                                    "type": "redemption",
                                    "name": "Pasa Reward",
                                    "desc": parameter[4] + ' item(s)',
                                    "date": date,
                                    "media": "Smart Reward App",
                                    "point": point
                                };
                            }
                            else {
                                var item = {
                                    "type": "redemption",
                                    "name": parameter[0],
                                    "desc": parameter[4] + ' item(s) to ' + parameter[3],
                                    "date": date,
                                    "media": "Smart Reward App",
                                    "point": point
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
                            "date": date,
                            "media": "Smart Reward App",
                            "point": '-' + parameter[1]
                        };
                        finalResult.push(item);
                    }
                    else if (resultJson[i].cuaActivityType === "6") {
                        var parameter = resultJson[i].cuaParams.split('#');
                        var item = {
                            "type": "Points Inquiry",
                            "name": "Points Inquiry",
                            "desc": "Points Inquiry to " + parameter[0],
                            "date": date,
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
                            "date": date,
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
                            "date": date,
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
                            "date": date,
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
                            "date": date,
                            "media": "Smart Reward App",
                            "point": '-' + parameter[1]
                        };
                        finalResult.push(item);
                    }
                    else if (resultJson[i].cuaActivityType === "16") {
                        var parameter = resultJson[i].cuaParams.split('#');
                        var item = {
                            "type": "Bills Payment",
                            "name": "Bills Payment",
                            "desc": "bills payment for " + parameter[0],
                            "date": date,
                            "media": "Smart Reward App",
                            "point": '-' + parameter[1]
                        };
                        finalResult.push(item);
                    }
                }
                console.log(result);
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
            var jwt = res.locals.jwt;
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
    initializeRecoverPassword(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var jsonBody = {
                prefferedTypeID: req.params.type,
                value: req.params.account
            };
            const ssoService = new sso_service_1.SSO.sso();
            try {
                var result = yield ssoService.initializeRecoverPassword(JSON.stringify(jsonBody));
                console.log(result);
                // var resJson = JSON.parse(result);       
                res.json(JSON.parse(result));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    recoverPassword(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var jsonBody = {
                FPKey: req.body.FPKey,
                password: req.body.password,
                mobileValidationCode: req.body.mobileValidationCode
            };
            const ssoService = new sso_service_1.SSO.sso();
            try {
                var result = yield ssoService.recoverPassword(JSON.stringify(jsonBody));
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
            //var token:string = req.get("Authorization");
            var data = {};
            /*token = token.replace('Bearer ','');
            
            var nJwt = require('njwt');
            try{
                var jwt = nJwt.verify(token,config.signingKey);
            }catch(e){
                res.sendStatus(403);
            }*/
            var jwt = res.locals.jwt;
            const ssoService = new sso_service_1.SSO.sso();
            try {
                data = {
                    min: req.params.min
                };
                //search customer number by mobile phone number  
                var result = yield ssoService.searchCustomerInformation(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(data));
                data = {
                    customerNo: JSON.parse(result).data[0].cusCustomerNo
                };
                //get actual customer information
                result = yield ssoService.getCustomerInformation(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(data));
                //mapping
                result = JSON.parse(result);
                var userProfile = {
                    firstName: result.data.cusFName,
                    middleName: '',
                    lastName: result.data.cusLName,
                    birthdate: result.data.cspCustomerBirthday,
                    email: result.data.cusEmail,
                    address: result.data.cspAddress,
                    province: result.data.cspState,
                    city: result.data.cspCity,
                    gender: result.data.cspGender,
                    familyStatus: result.data.cspFamilyStatus
                };
                if (result.data.additionalInfoDisplayDatas.length !== 0) {
                    for (var i = 0; i < result.data.additionalInfoDisplayDatas.length; i++) {
                        if (result.data.additionalInfoDisplayDatas[i].addLabel === "Middle Name") {
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
        });
    }
    updateCustomerInformation(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var data = {};
            var jwt = res.locals.jwt;
            console.log(jwt);
            const ssoService = new sso_service_1.SSO.sso();
            try {
                data = {
                    min: req.params.min
                };
                //search customer number by mobile phone number  
                var result = yield ssoService.searchCustomerInformation(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(data));
                data = {
                    customerNo: JSON.parse(result).data[0].cusCustomerNo
                };
                //get actual customer information
                result = yield ssoService.getCustomerInformation(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(data));
                var userProfile = JSON.parse(result);
                userProfile.data.cusFName = req.body.firstName;
                userProfile.data.cusLName = req.body.lastName;
                userProfile.data.cspCustomerBirthday = req.body.birthdate;
                userProfile.data.cusEmail = req.body.email;
                userProfile.data.cspAddress = req.body.address;
                userProfile.data.cspState = req.body.province;
                userProfile.data.cspCity = req.body.city;
                if (userProfile.data.additionalInfoDisplayDatas.length !== 0) {
                    for (var i = 0; i < userProfile.data.additionalInfoDisplayDatas.length; i++) {
                        if (userProfile.data.additionalInfoDisplayDatas[i].addLabel === "Middle Name") {
                            userProfile.data.additionalInfoDisplayDatas[i].addValue = req.body.middleName;
                            break;
                        }
                        if (i === (userProfile.data.additionalInfoDisplayDatas.length - 1)) {
                            var addData = {
                                addValue: req.body.middleName,
                                addSize: 50,
                                addLabel: "Middle Name",
                                addMaster: 3,
                                addId: 3101,
                                additionalInfoDisplayDataSet: null
                            };
                            userProfile.data.additionalInfoDisplayDatas.push(addData);
                        }
                    }
                }
                else {
                    var addData = {
                        addValue: req.body.middleName,
                        addSize: 50,
                        addLabel: "Middle Name",
                        addMaster: 3,
                        addId: 3101,
                        additionalInfoDisplayDataSet: null
                    };
                    userProfile.data.additionalInfoDisplayDatas.push(addData);
                }
                result = yield ssoService.updateCustomerInformation(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(userProfile));
                console.log(result);
                res.json(userProfile);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getListOfLinkedAccounts(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            console.log(req.query);
            var jwt = res.locals.jwt;
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
            var jsonBody = {
                min: req.body.parentNumber,
                primaryLoyaltyId: req.body.parentNumber,
                childLoyaltyId: req.body.childNumber,
                lrqSource: req.body.source,
                lrqInitiator: req.body.parentNumber,
                channel: req.body.source
            };
            var jwt = res.locals.jwt;
            console.log(jwt);
            const ssoService = new sso_service_1.SSO.sso();
            const errorHandlingService = new error_handling_service_1.ErrorHandlingService.ErrorHandlingService();
            try {
                let result = yield ssoService.linkAccount(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(jsonBody));
                console.log(result);
                let errorCheckRes;
                errorCheckRes = errorHandlingService.linkAccountErrorHandling(result);
                if (!errorCheckRes) {
                    res.json({ message: 'success' });
                }
                else {
                    res.status(400).json(errorCheckRes);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    unlinkAccount(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var jsonBody = {
                min: req.body.parentNumber,
                primaryLoyaltyId: req.body.parentNumber,
                childLoyaltyId: req.body.childNumber,
                lrqSource: req.body.source,
                lrqInitiator: req.body.parentNumber,
                channel: req.body.source
            };
            var jwt = res.locals.jwt;
            console.log(jwt);
            const ssoService = new sso_service_1.SSO.sso();
            const errorHandlingService = new error_handling_service_1.ErrorHandlingService.ErrorHandlingService();
            try {
                let result = yield ssoService.unlinkAccount(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(jsonBody));
                console.log(result);
                // var resJson = JSON.parse(result);       
                let errorCheckRes;
                errorCheckRes = errorHandlingService.unlinkAccountErrorHandling(result);
                if (!errorCheckRes) {
                    res.json({ message: 'success' });
                }
                else {
                    res.status(400).json(errorCheckRes);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    rewardsAlertNotification(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var jsonBody = {
                min: req.body.min,
                status: req.body.status
            };
            var jwt = res.locals.jwt;
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
            let brandMap = {};
            brandMap['50000'] = 'Prepaid';
            brandMap['50001'] = 'Postpaid';
            brandMap['50002'] = 'TalkNText';
            brandMap['50005'] = 'BroPrepaid';
            brandMap['50006'] = 'BroPostpaid';
            brandMap['50008'] = 'BroPostpaidShareIt';
            brandMap['50014'] = 'PostpaidServiceUnit';
            brandMap['50027'] = 'Infinity';
            var token = req.get("Authorization");
            console.log(req.query);
            var jwt = res.locals.jwt;
            console.log(jwt);
            const ssoService = new sso_service_1.SSO.sso();
            try {
                var result = yield ssoService.requestMobileNoList(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(req.query));
                console.log(result);
                // var resJson = JSON.parse(result);       
                result = JSON.parse(result);
                result.SubscriptionList.forEach(subs => {
                    subs.ssoBrand = brandMap[subs.BrandTypeId];
                });
                res.json(result);
            }
            catch (err) {
                console.log(err);
            }
        });
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
    getListOfMobileNumber(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var data = {
                min: req.params.min
            };
            var jwt = res.locals.jwt;
            const ssoService = new sso_service_1.SSO.sso();
            try {
                var result = yield ssoService.getListOfLinkedAccounts(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(data));
                console.log("get link list " + result);
                var jsonObject = JSON.parse(result);
                var userData = {
                    phoneData: [],
                    rewards: '0',
                    expPoints: '0',
                    expDate: ''
                };
                //var listOfMobile = [];
                if (jsonObject.data.length === 0) {
                    var phoneData = {
                        phoneNo: '',
                        name: '',
                        primary: ''
                    };
                    //return only 1 mobile number
                    console.log(req.params.min);
                    phoneData.phoneNo = req.params.min;
                    phoneData.primary = true;
                    result = yield ssoService.getAccount(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid);
                    phoneData.name = JSON.parse(result).FirstName;
                    result = yield ssoService.getRewardBalance(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(data));
                    userData.phoneData.push(phoneData);
                    var resJson = JSON.parse(result);
                    console.log(result);
                    if (resJson.data.length !== 0) {
                        for (var i = 0; i < resJson.data.length; i++) {
                            if (resJson.data[i].drawChance === false) {
                                userData.rewards = resJson.data[i].rwdCashbackValue;
                            }
                        }
                    }
                    result = yield ssoService.getLatestRewardExpiry(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(data));
                    resJson = JSON.parse(result).data;
                    console.log(result);
                    if (resJson.length !== 0) {
                        userData.expPoints = resJson[0].creRewardBalance;
                        userData.expDate = resJson[0].creExpiryDt;
                    }
                }
                else {
                    if (jsonObject.data[0].primary === 'True') {
                        //number used is child, so return from linked list is primary
                        //call linked list again to get child numbers
                        var phoneData = {
                            phoneNo: jsonObject.data[0].cusLoyaltyId,
                            name: jsonObject.data[0].cusFName,
                            primary: true
                        };
                        userData.phoneData.push(phoneData);
                        data = {
                            min: jsonObject.data[0].cusLoyaltyId
                        };
                        result = yield ssoService.getRewardBalance(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(data));
                        var resJson = JSON.parse(result);
                        console.log(result);
                        if (resJson.data.length !== 0) {
                            for (var i = 0; i < resJson.data.length; i++) {
                                if (resJson.data[i].drawChance === false) {
                                    userData.rewards = resJson.data[i].rwdCashbackValue;
                                }
                            }
                        }
                        result = yield ssoService.getLatestRewardExpiry(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(data));
                        resJson = JSON.parse(result).data;
                        console.log(result);
                        if (resJson.length !== 0) {
                            userData.expPoints = resJson[0].creRewardBalance;
                            userData.expDate = resJson[0].creExpiryDt;
                        }
                        result = yield ssoService.getListOfLinkedAccounts(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(data));
                        console.log("get link list " + result);
                        jsonObject = JSON.parse(result);
                    }
                    else {
                        //number used is primary number
                        var phoneData = {
                            phoneNo: '',
                            name: '',
                            primary: false
                        };
                        phoneData.phoneNo = req.params.min;
                        phoneData.primary = true;
                        result = yield ssoService.getAccount(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid);
                        phoneData.name = JSON.parse(result).FirstName;
                        userData.phoneData.push(phoneData);
                        data = {
                            min: req.params.min
                        };
                        result = yield ssoService.getRewardBalance(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(data));
                        var resJson = JSON.parse(result);
                        console.log(result);
                        if (resJson.data.length !== 0) {
                            for (var i = 0; i < resJson.data.length; i++) {
                                if (resJson.data[i].drawChance === false) {
                                    userData.rewards = resJson.data[i].rwdCashbackValue;
                                }
                            }
                        }
                        result = yield ssoService.getLatestRewardExpiry(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(data));
                        resJson = JSON.parse(result).data;
                        console.log(result);
                        if (resJson.length !== 0) {
                            userData.expPoints = resJson[0].creRewardBalance;
                            userData.expDate = resJson[0].creExpiryDt;
                        }
                    }
                    for (var i = 0; i < jsonObject.data.length; i++) {
                        var phoneData = {
                            phoneNo: '',
                            name: '',
                            primary: ''
                        };
                        phoneData.phoneNo = jsonObject.data[i].cusLoyaltyId;
                        phoneData.name = jsonObject.data[i].cusFName;
                        if (jsonObject.data[i].primary === 'True') {
                            phoneData.primary = true;
                        }
                        else {
                            phoneData.primary = false;
                        }
                        userData.phoneData.push(phoneData);
                    }
                }
                // var resJson = JSON.parse(result);       
                console.log('before last: ' + userData);
                // get brands
                let brandMap = {};
                brandMap['50000'] = 'Prepaid';
                brandMap['50001'] = 'Postpaid';
                brandMap['50002'] = 'TalkNText';
                brandMap['50005'] = 'BroPrepaid';
                brandMap['50006'] = 'BroPostpaid';
                brandMap['50008'] = 'BroPostpaidShareIt';
                brandMap['50014'] = 'PostpaidServiceUnit';
                brandMap['50027'] = 'Infinity';
                try {
                    var result = yield ssoService.requestMobileNoList(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify({}));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    result = JSON.parse(result);
                    result.SubscriptionList.forEach(subs => {
                        //subs.ssoBrand = brandMap[subs.BrandTypeId];
                        userData.phoneData.forEach(phone => {
                            if (phone.phoneNo == subs.Subscription) {
                                console.log('match for: ' + phone.phoneNo);
                                phone.ssoBrand = brandMap[subs.BrandTypeId];
                            }
                        });
                    });
                    console.log('done');
                }
                catch (err) {
                    console.log(err);
                }
                // end brands
                res.json(userData);
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