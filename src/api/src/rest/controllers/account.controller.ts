'use strict';
import { SSO } from '../services/sso.service';
var request = require('request'); 
var config = require('../config/config');


    export interface accountInterface {
        getAccount
        getRewardBalance():Promise<string>;
        getLatestRewardExpiry():Promise<string>;
        getActivityHistory():Promise<string>;
        register():Promise<string>;
        getCustomerInformation():Promise<string>;
        getListOfLinkedAccounts():Promise<string>;
        linkAccount():Promise<string>;
        unlinkAccount():Promise<string>;
        rewardsAlertNotification():Promise<string>;
        requestMobileNoList():Promise<string>;
        
    }
// export module Login {
    export class AccountController implements accountInterface{
        private ssoService:SSO.sso;
            constructor() {       
            
            }
            
            async getAccount(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
             
                console.log(config.signingKey);
                
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
                    var result =  await ssoService.getAccount(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid);
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async getRewardBalance(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                //var min:string =  req.query.min;
                token = token.replace('Bearer ','');
             
                console.log(req.query);
                
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
                    var result =  await ssoService.getRewardBalance(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(req.query));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async getLatestRewardExpiry(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                //var min:string =  req.query.min;
                token = token.replace('Bearer ','');
             
                console.log(req.query);
                
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
                    var result =  await ssoService.getLatestRewardExpiry(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(req.query));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async getActivityHistory(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                //var min:string =  req.query.min;
                token = token.replace('Bearer ','');
             
                console.log(req.query);
                
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
                    var result =  await ssoService.getActivityHistory(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(req.query));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async register(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                //var min:string =  req.query.min;
                token = token.replace('Bearer ','');
             
                var jsonBody ={
                    firstName: req.body.firstName,
                    middleName: req.body.middleName,
                    lastName: req.body.lastName,
                    address: req.body.address,
                    city: req.body.city,
                    province: req.body.province,
                    min: req.body.min,
                    channel: req.body.channel
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
                    var result =  await ssoService.register(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async getCustomerInformation(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                //var min:string =  req.query.min;
                token = token.replace('Bearer ','');
             
                console.log(req.query);
                
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
                    var result =  await ssoService.getCustomerInformation(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(req.query));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async getListOfLinkedAccounts(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                //var min:string =  req.query.min;
                token = token.replace('Bearer ','');
             
                console.log(req.query);
                
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
                    var result =  await ssoService.getListOfLinkedAccounts(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(req.query));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async linkAccount(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                //var min:string =  req.query.min;
                token = token.replace('Bearer ','');
             
                var jsonBody ={
                    min: req.body.min,
                    primaryLoyaltyId: req.body.primaryLoyaltyId,
                    childLoyaltyId: req.body.childLoyaltyId,
                    lrqSource: req.body.lrqSource,
                    lrqInitiator: req.body.lrqInitiator,
                    channel: req.body.channel
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
                    var result =  await ssoService.linkAccount(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async unlinkAccount(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                //var min:string =  req.query.min;
                token = token.replace('Bearer ','');
             
                var jsonBody ={
                    min: req.body.min,
                    primaryLoyaltyId: req.body.primaryLoyaltyId,
                    childLoyaltyId: req.body.childLoyaltyId,
                    lrqSource: req.body.lrqSource,
                    lrqInitiator: req.body.lrqInitiator,
                    channel: req.body.channel
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
                    var result =  await ssoService.unlinkAccount(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async rewardsAlertNotification(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                token = token.replace('Bearer ','');
                
                var jsonBody ={
                    min: req.body.min,
                    status: req.body.status
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
                    var result =  await ssoService.rewardsAlertNotification(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(jsonBody));
                    console.log(result);
                    // var resJson = JSON.parse(result);       
                    
                    res.json(JSON.parse(result));
                }
                catch (err) {
                    console.log(err);
                }
            }
            
            async requestMobileNoList(req:string,res:string) : Promise<string> {
                
                var token:string = req.get("Authorization");
                //var min:string =  req.query.min;
                token = token.replace('Bearer ','');
             
                console.log(req.query);
                
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
                    var result =  await ssoService.requestMobileNoList(jwt.body.accessToken, jwt.body.clientId, jwt.body.msaid,JSON.stringify(req.query));
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