'use strict';
import { SSO } from '../services/sso.service';
var request = require('request'); 
var config = require('../config/config');


    export interface rewardInterface {
        redeemAnItem():Promise<string>;
        getListOfRedeemableItems():Promise<string>;
        getFavorites():Promise<string>;
        transferpoints():Promise<string>;
        favouriteItem():Promise<string>;
        removeFavouriteItem():Promise<string>;
        getCatalogDisplayPreferences():Promise<string>;
        payBillWithPoints():Promise<string>;
    }
// export module Login {
    export class RewardController implements rewardInterface{
        private ssoService:SSO.sso;
            constructor() {       
            
            }
            
            async redeemAnItem(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
                
                var jsonBody ={
                    min: req.body.min,
                    productCode: req.body.productCode,
                    quantity: req.body.quantity,
                    channel: req.body.channel,
                    destLoyaltyId: req.body.destLoyaltyId
                };
                
                var nJwt = require('nJwt');  
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                console.log(token);
                console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();

                try {  
                    var result =  await ssoService.redeemAnItem(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async getListOfRedeemableItems(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
                
                
                var nJwt = require('nJwt');  
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                //console.log(token);
                //console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();

                try {  
                    var result =  await ssoService.getListOfRedeemableItems(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(req.query));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async getFavorites(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
                
                
                var nJwt = require('nJwt');  
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                //console.log(token);
                //console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();

                try {  
                    var result =  await ssoService.getFavorites(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(req.query));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async transferpoints(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
                
                var jsonBody ={
                    min: req.body.min,
                    destLoyaltyId: req.body.destLoyaltyId,
                    srcCurrencyId: req.body.srcCurrencyId,
                    destCurrencyId: req.body.estCurrencyId,
                    rwdQty: req.body.lrqInitiator
                };
                
                var nJwt = require('nJwt');  
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                //console.log(token);
                //console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();

                try {  
                    var result =  await ssoService.transferpoints(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async favouriteItem(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
                
                var jsonBody ={
                    min: req.body.min,
                    cafProductNo: req.body.cafProductNo,
                    cafFavoriteFlag: req.body.cafFavoriteFlag
                };
                
                var nJwt = require('nJwt');  
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                //console.log(token);
                //console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();

                try {  
                    var result =  await ssoService.favouriteItem(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async removeFavouriteItem(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
                
                var jsonBody ={
                    min: req.body.min,
                    cafProductNo: req.body.cafProductNo,
                    cafFavoriteFlag: req.body.cafFavoriteFlag
                };
                
                var nJwt = require('nJwt');  
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                //console.log(token);
                //console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();

                try {  
                    var result =  await ssoService.removeFavouriteItem(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async getCatalogDisplayPreferences(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
                
                var nJwt = require('nJwt');  
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                //console.log(token);
                //console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();

                try {  
                    var result =  await ssoService.getCatalogDisplayPreferences(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid);
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async payBillWithPoints(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
                
                var jsonBody ={
                    min: req.body.min,
                    merchantIdentifier: req.body.merchantIdentifier,
                    amount: req.body.amount,
                    pin: req.body.pin,
                    channel: req.body.channel,
                    ref: req.body.ref
                };
                
                var nJwt = require('nJwt');  
                try{
                    var jwt = nJwt.verify(token,config.signingKey);
                }catch(e){
                    res.sendStatus(403);
                }

                //console.log(token);
                //console.log(jwt);
                const ssoService:SSO.sso = new SSO.sso();

                try {  
                    var result =  await ssoService.payBillWithPoints(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
        }
// }