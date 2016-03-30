/// <reference path="../../../typings/main.d.ts" />
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
                //console.log(resultJson);
                var result2 = yield ssoService.requestAccessToken(resultJson.result.AuthenticationCode, resultJson.result.ClientID);
                var result2Json = JSON.parse(result2);
                //console.log(result2Json);    
                var nJwt = require('njwt');
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
                res.sendStatus(401);
                console.log(err);
            }
        });
    }
}
exports.loginController = loginController;
// } 
//# sourceMappingURL=login.controller.js.map