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
var SSO;
(function (SSO) {
    var config = require('../config/config');
    var request = require('request');
    var uuid = require('uuid');
    class sso {
        constructor() {
            var vm = this;
        }
        requestValidateUserCredentials(username, password) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/login/requestValidateUserCredentials';
                var uuidString = uuid.v4();
                var arrUuid = uuidString.split('-');
                uuidString = '';
                for (var i = 0; i < arrUuid.length; i++) {
                    uuidString = uuidString + arrUuid[i];
                }
                return new Promise(function (resolve, reject) {
                    request.post({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientKey': config.clientKey,
                            'nonce': uuidString
                        },
                        form: {
                            EndUserId: username,
                            EndUserPassword: password
                        }
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
        requestAccessToken(authenticationCode, clientId) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/login/requestAccessToken';
                return new Promise(function (resolve, reject) {
                    request.get({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'authenticationCode': authenticationCode
                        }
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
        getAccount(accessToken, clientId, msaId) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/account/requestUserProfileInfo';
                return new Promise(function (resolve, reject) {
                    request.get({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken
                        }
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
        getRewardBalance(accessToken, clientId, msaId, min) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/rewards/GetRewardBalance';
                var jsonMin = JSON.parse(min);
                var uuidString = uuid.v4();
                var arrUuid = uuidString.split('-');
                uuidString = '';
                for (var i = 0; i < arrUuid.length; i++) {
                    uuidString = uuidString + arrUuid[i];
                }
                return new Promise(function (resolve, reject) {
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
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
        getCustomerInformation(accessToken, clientId, msaId, query) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/rewards/GetCustomerInformation';
                var jsonQuery = JSON.parse(query);
                var uuidString = uuid.v4();
                var arrUuid = uuidString.split('-');
                uuidString = '';
                for (var i = 0; i < arrUuid.length; i++) {
                    uuidString = uuidString + arrUuid[i];
                }
                return new Promise(function (resolve, reject) {
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
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
        getListOfRedeemableItems(accessToken, clientId, msaId, query) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/rewards/GetListOfRedeemableItems';
                var jsonQuery = JSON.parse(query);
                var uuidString = uuid.v4();
                var arrUuid = uuidString.split('-');
                uuidString = '';
                for (var i = 0; i < arrUuid.length; i++) {
                    uuidString = uuidString + arrUuid[i];
                }
                return new Promise(function (resolve, reject) {
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
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
        redeemAnItem(accessToken, clientId, msaId, body) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/rewards/RedeemAnItem';
                var uuidString = uuid.v4();
                var arrUuid = uuidString.split('-');
                uuidString = '';
                for (var i = 0; i < arrUuid.length; i++) {
                    uuidString = uuidString + arrUuid[i];
                }
                var json = JSON.parse(body);
                return new Promise(function (resolve, reject) {
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
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
        getLatestRewardExpiry(accessToken, clientId, msaId, query) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/rewards/GetLatestRewardExpiry';
                var jsonQuery = JSON.parse(query);
                var uuidString = uuid.v4();
                var arrUuid = uuidString.split('-');
                uuidString = '';
                for (var i = 0; i < arrUuid.length; i++) {
                    uuidString = uuidString + arrUuid[i];
                }
                return new Promise(function (resolve, reject) {
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
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
        getActivityHistory(accessToken, clientId, msaId, query) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/rewards/GetTransactionHistory';
                var jsonQuery = JSON.parse(query);
                var uuidString = uuid.v4();
                var arrUuid = uuidString.split('-');
                uuidString = '';
                for (var i = 0; i < arrUuid.length; i++) {
                    uuidString = uuidString + arrUuid[i];
                }
                return new Promise(function (resolve, reject) {
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
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
        register(accessToken, clientId, msaId, body) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/rewards/register';
                var uuidString = uuid.v4();
                var arrUuid = uuidString.split('-');
                uuidString = '';
                for (var i = 0; i < arrUuid.length; i++) {
                    uuidString = uuidString + arrUuid[i];
                }
                var json = JSON.parse(body);
                return new Promise(function (resolve, reject) {
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
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
        getFavorites(accessToken, clientId, msaId, query) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/rewards/GetFavorites';
                var uuidString = uuid.v4();
                var arrUuid = uuidString.split('-');
                uuidString = '';
                for (var i = 0; i < arrUuid.length; i++) {
                    uuidString = uuidString + arrUuid[i];
                }
                var json = JSON.parse(query);
                return new Promise(function (resolve, reject) {
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
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
        getListOfLinkedAccounts(accessToken, clientId, msaId, query) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/rewards/GetListOfLinkedAccounts';
                var uuidString = uuid.v4();
                var arrUuid = uuidString.split('-');
                uuidString = '';
                for (var i = 0; i < arrUuid.length; i++) {
                    uuidString = uuidString + arrUuid[i];
                }
                var json = JSON.parse(query);
                return new Promise(function (resolve, reject) {
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
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
        linkAccount(accessToken, clientId, msaId, body) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/rewards/LinkAccount';
                var uuidString = uuid.v4();
                var arrUuid = uuidString.split('-');
                uuidString = '';
                for (var i = 0; i < arrUuid.length; i++) {
                    uuidString = uuidString + arrUuid[i];
                }
                var json = JSON.parse(body);
                return new Promise(function (resolve, reject) {
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
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
        transferpoints(accessToken, clientId, msaId, body) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/rewards/Transferpoints';
                var uuidString = uuid.v4();
                var arrUuid = uuidString.split('-');
                uuidString = '';
                for (var i = 0; i < arrUuid.length; i++) {
                    uuidString = uuidString + arrUuid[i];
                }
                var json = JSON.parse(body);
                return new Promise(function (resolve, reject) {
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
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
        unlinkAccount(accessToken, clientId, msaId, body) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/rewards/UnlinkAccount';
                var uuidString = uuid.v4();
                var arrUuid = uuidString.split('-');
                uuidString = '';
                for (var i = 0; i < arrUuid.length; i++) {
                    uuidString = uuidString + arrUuid[i];
                }
                var json = JSON.parse(body);
                return new Promise(function (resolve, reject) {
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
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
        getFavourite(accessToken, clientId, msaId, query) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/rewards/GetFavorites';
                var uuidString = uuid.v4();
                var arrUuid = uuidString.split('-');
                uuidString = '';
                for (var i = 0; i < arrUuid.length; i++) {
                    uuidString = uuidString + arrUuid[i];
                }
                var json = JSON.parse(query);
                return new Promise(function (resolve, reject) {
                    request.post({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        },
                        qs: json
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
        favouriteItem(accessToken, clientId, msaId, body) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/rewards/FavoriteItem';
                var uuidString = uuid.v4();
                var arrUuid = uuidString.split('-');
                uuidString = '';
                for (var i = 0; i < arrUuid.length; i++) {
                    uuidString = uuidString + arrUuid[i];
                }
                var json = JSON.parse(body);
                return new Promise(function (resolve, reject) {
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
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
        removeFavouriteItem(accessToken, clientId, msaId, body) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/rewards/FavoriteItem';
                var uuidString = uuid.v4();
                var arrUuid = uuidString.split('-');
                uuidString = '';
                for (var i = 0; i < arrUuid.length; i++) {
                    uuidString = uuidString + arrUuid[i];
                }
                var json = JSON.parse(body);
                return new Promise(function (resolve, reject) {
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
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
        getCatalogDisplayPreferences(accessToken, clientId, msaId) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/rewards/GetCatalogDisplayPreferences';
                var uuidString = uuid.v4();
                var arrUuid = uuidString.split('-');
                uuidString = '';
                for (var i = 0; i < arrUuid.length; i++) {
                    uuidString = uuidString + arrUuid[i];
                }
                return new Promise(function (resolve, reject) {
                    request.get({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientID': clientId,
                            'msaID': msaId,
                            'accessToken': accessToken,
                            'nonce': uuidString
                        }
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
        payBillWithPoints(accessToken, clientId, msaId, body) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/rewards/PayBillWithPoints';
                var uuidString = uuid.v4();
                var arrUuid = uuidString.split('-');
                uuidString = '';
                for (var i = 0; i < arrUuid.length; i++) {
                    uuidString = uuidString + arrUuid[i];
                }
                var json = JSON.parse(body);
                return new Promise(function (resolve, reject) {
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
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
        rewardsAlertNotification(accessToken, clientId, msaId, body) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/rewards/RewardsAlertNotification';
                var uuidString = uuid.v4();
                var arrUuid = uuidString.split('-');
                uuidString = '';
                for (var i = 0; i < arrUuid.length; i++) {
                    uuidString = uuidString + arrUuid[i];
                }
                var json = JSON.parse(body);
                return new Promise(function (resolve, reject) {
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
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
        requestMobileNoList(accessToken, clientId, msaId, query) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/account/requestMobileNoList';
                var uuidString = uuid.v4();
                var arrUuid = uuidString.split('-');
                uuidString = '';
                for (var i = 0; i < arrUuid.length; i++) {
                    uuidString = uuidString + arrUuid[i];
                }
                var json = JSON.parse(query);
                return new Promise(function (resolve, reject) {
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
                    }, function (err, httpResponse, body) {
                        resolve(body);
                    });
                });
            });
        }
    }
    SSO.sso = sso;
})(SSO = exports.SSO || (exports.SSO = {}));
//# sourceMappingURL=sso.service.js.map