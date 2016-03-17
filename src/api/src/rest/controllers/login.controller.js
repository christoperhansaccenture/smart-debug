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
// export module Login {
class loginController {
    constructor() {
    }
    postLogin(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            const ssoService = new sso_service_1.SSO.sso();
            try {
                var result = yield ssoService.requestValidateUserCredentials();
                var resultJSON = JSON.parse(result);
                var result2 = yield ssoService.requestAccessToken();
                var resJson = JSON.parse(result2);
                var nJwt = require('nJwt');
                var signingKey = 'a8f35732-f700-48de-a05a-dccb7a2e517a'; //get from config file
                var claims = {
                    accessToken: resJson.result.AccessToken,
                    msaid: resJson.result.MSAID
                };
                var jwt = nJwt.create(claims, signingKey);
                console.log(jwt);
                var token = jwt.compact();
                res.json({ token: token });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getAccount(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            // var token:string = req.get("Authorization");
            // token = token.replace('Bearer ','');
            // var signingKey = 'a8f35732-f700-48de-a05a-dccb7a2e517a'; //get from config file
            // var nJwt = require('nJwt');  
            // try{
            //     var verifiedJwt = nJwt.verify(token,signingKey);
            // }catch(e){
            //     res.sendStatus(403);
            // }
            // console.log(token);
            // console.log(verifiedJwt);
            const ssoService = new sso_service_1.SSO.sso();
            try {
                var result = yield ssoService.getAccount();
                var resJson = JSON.parse(result);
                res.json(resJson.result);
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