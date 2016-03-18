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
    class sso {
        constructor() {
            var vm = this;
        }
        requestValidateUserCredentials(username, password) {
            return __awaiter(this, void 0, Promise, function* () {
                var path = '/apimysmartws/ssoapi/login/requestValidateUserCredentials';
                var uuid = require('uuid');
                return new Promise(function (resolve, reject) {
                    request.post({
                        url: config.baseurl + path,
                        headers: {
                            'Content-Type': 'application/json',
                            'clientKey': config.clientKey,
                            'nonce': uuid.v4()
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
    }
    SSO.sso = sso;
})(SSO = exports.SSO || (exports.SSO = {}));
//# sourceMappingURL=sso.service.js.map