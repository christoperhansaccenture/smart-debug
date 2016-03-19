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
            var nJwt = require('nJwt');
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
            var nJwt = require('nJwt');
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
            var nJwt = require('nJwt');
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
                min: req.body.min,
                destLoyaltyId: req.body.destLoyaltyId,
                srcCurrencyId: req.body.srcCurrencyId,
                destCurrencyId: req.body.estCurrencyId,
                rwdQty: req.body.lrqInitiator
            };
            var nJwt = require('nJwt');
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
                var result = yield ssoService.transferpoints(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid, JSON.stringify(jsonBody));
                console.log(result);
                // var resJson = JSON.parse(result);       
                res.json(JSON.parse(result));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    favouriteItem(req, res) {
        return __awaiter(this, void 0, Promise, function* () {
            var token = req.get("Authorization");
            token = token.replace('Bearer ', '');
            var jsonBody = {
                min: req.body.min,
                cafProductNo: req.body.cafProductNo,
                cafFavoriteFlag: req.body.cafFavoriteFlag
            };
            var nJwt = require('nJwt');
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
                min: req.body.min,
                cafProductNo: req.body.cafProductNo,
                cafFavoriteFlag: req.body.cafFavoriteFlag
            };
            var nJwt = require('nJwt');
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
            var nJwt = require('nJwt');
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
            var nJwt = require('nJwt');
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
}
exports.RewardController = RewardController;
// } 
//# sourceMappingURL=reward.controller.js.map