/// <reference path="../../../typings/main.d.ts" />
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
class loginController {
    constructor() {
    }
    postLogin(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            const ssoService = new sso_service_1.SSO.sso();
            var username = req.body.username;
            var password = req.body.password;
            try {
                console.log(username);
                console.log(password);
                var result = yield ssoService.requestValidateUserCredentials(username, password);
                console.log(result);
                var resultJson = JSON.parse(result);
                console.log(resultJson);
                var result2 = yield ssoService.requestAccessToken(resultJson.result.AuthenticationCode, resultJson.result.ClientID);
                var result2Json = JSON.parse(result2);
                console.log(result2Json);
                var nJwt = require('nJwt');
                var signingKey = config.signingKey; //get from config file
                var claims = {
                    accessToken: result2Json.result.AccessToken,
                    clientId: resultJson.result.ClientID,
                    msaid: result2Json.result.MSAID
                };
                var jwt = nJwt.create(claims, signingKey);
                console.log(jwt);
                var token = jwt.compact();
                res.json({
                    token: token,
                    refreshToken: result2Json.result.RefreshToken
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.loginController = loginController;
// } 
//# sourceMappingURL=login.controller.js.map