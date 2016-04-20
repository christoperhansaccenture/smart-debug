/// <reference path="../../typings/main.d.ts" />


'use strict';
require('newrelic');
var cluster = require('cluster');
var request = require('request'); 

// import { SSO } from "./services/sso.service";
import {loginController} from './controllers/login.controller';
import {AccountController} from './controllers/account.controller';
import {RewardController} from './controllers/reward.controller';


// if (cluster.isMaster) {
// 	var numWorkers = require('os').cpus().length;
// 	console.log('Master cluster setting up ' + numWorkers + ' workers...');

//     for(var i = 0; i < numWorkers; i++) {
//         cluster.fork();
//     }

//     cluster.on('online', function(worker) {
//         console.log('Worker ' + worker.process.pid + ' is online');
//     });

//     cluster.on('exit', function(worker, code, signal) {
//         console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
//         console.log('Starting a new worker');
//         cluster.fork();
//     });

// // Code to run if we're in a worker process
// } else {


	var express = require('express');
    var process = require('process');
    var config = require('./config/config');
	const app = express();
	var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser');

    console.log(config.baseurl);
	

	// app.use(function(req, res, next) {
    //     // Verify authentication
        
    //     // exclude /api/login
    //     // if(req.path === '/api/login') {
    //     //     // Do nothing
    //     //     next();
    //     // }
    //     // else{
    //     //     var token:string = req.get("Authorization").replace('Bearer ','');
    //     //     var signingKey = 'a8f35732-f700-48de-a05a-dccb7a2e517a'; //get from config file
    //     //     var nJwt = require('nJwt');  
    //     //     try{
    //     //         var verifiedJwt = nJwt.verify(token,signingKey);
    //     //         next();
    //     //     }catch(e){
    //     //         res.sendStatus(403);
    //     //     }
    //     // }
        
        
    // });

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(function(req, res, next) {
        //res.header("Access-Control-Allow-Origin", "*"); // doesn't work when using cookie
        let allow: string;
        let origin: string = req.get('origin');
        console.log('origin: ' + req.get('origin'));
        if (origin == 'http://localhost:3000') {
            allow = 'http://localhost:3000';
        } 
        else if (origin == 'http://smart-web.s3-website-ap-southeast-1.amazonaws.com') {
            allow = 'http://smart-web.s3-website-ap-southeast-1.amazonaws.com';
        }
        if (allow) {
            res.header("Access-Control-Allow-Origin", allow);
        }
        //res.header("Access-Control-Allow-Origin", "http://localhost:3000, http://smart-web.s3-website-ap-southeast-1.amazonaws.com");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Headers", 
        "Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept,Authorization,Proxy-Authorization,X-session");
        res.header("Access-Control-Allow-Methods","GET,PUT,DELETE,POST");
        //console.log("log cookies main : " + cookieParser.JSONCookies(req.cookies));
        console.log("request path : " + req.path);
        console.log("log app main : " + res.locals.jwt);
        console.log('request method: ' + req.method);
        if(req.path === '/api/login'){
            if(req.cookies['mysmartSession']){
                req.url = '/api/loginWithCookies';
                console.log("url : " + req.url);
            }    
        }else if (req.method !== 'OPTIONS') {
            if(req.cookies['accessToken']){ // if accessed from web
                if(req.path === '/api/token/renew'){
                    //console.log("refresh token : " + cookieParser.JSONCookies(req.cookies).refreshToken);
                    req.body['refreshToken'] = cookieParser.JSONCookies(req.cookies).refreshToken;
                    //console.log("log body : " + JSON.stringify(req.body));
                }
                var token:string = cookieParser.JSONCookies(req.cookies).accessToken;
            }else{
                var token:string = req.get('Authorization');
                token = token.replace('Bearer ','');
            }           
            var nJwt = require('njwt');  
            console.log("token : " + token);
            try{
                var jwt = nJwt.verify(token,config.signingKey);
                res.locals.jwt = jwt;
                console.log("log jwt main : " + res.locals.jwt);
                //console.log("log cookies jwt : " + cookieParser.JSONCookies(req.cookies));
            }catch(err){
                console.log("error : " + err);
                res.sendStatus(403);
            }          
        }
        next();
    });

	const port:number = process.env.PORT || 8080;
	const router = express.Router();
    // const ssoint:SSO.sso = new SSO.sso();
    const loginCtrl:loginController = new loginController();
    const accountCtrl:AccountController = new AccountController();
    const rewardCtrl:RewardController = new RewardController();
    // const minutesDAO:getMinutesToRaceDaoImpl = new getMinutesToRaceDaoImpl();
    // const SSO:SSO = new sso();

	//used in app and web
    router.post('/login', loginCtrl.postLogin);
    router.post('/token/renew', loginCtrl.renewToken);
    router.get('/catalog/popular',rewardCtrl.getMostPopularItems);
    router.get('/catalog',rewardCtrl.getListOfRedeemableItems);
    router.get('/activityHistory', accountCtrl.getActivityHistory);
    router.post('/customer/:min/redeem', rewardCtrl.redeemItems);
    router.put('/customer/:min/catalog/:catalogId/favorite', rewardCtrl.favouriteItem);
    router.get('/mobileNoList/:min', accountCtrl.getListOfMobileNumber);
    router.get('/customerInformation/:min', accountCtrl.getCustomerInformation);
    router.put('/customerInformation/:min', accountCtrl.updateCustomerInformation);
    router.post('/transfer',rewardCtrl.transferpoints);
    router.post('/linkAccount', accountCtrl.linkAccount);
    router.post('/unlinkAccount', accountCtrl.unlinkAccount);
    
    
    // login related services
    router.post('/account',accountCtrl.register);
    router.get('/test', loginCtrl.testCookie);
    //router.post('/accountpassword/recover/:type/:account',accountCtrl.initializeRecoverPassword);
    //router.post('/accountpassword/recover',accountCtrl.recoverPassword);
    
    //account related services
    router.get('/account', accountCtrl.getAccount);
    router.get('/rewardBalance', accountCtrl.getRewardBalance);
    router.get('/rewardExpiry', accountCtrl.getLatestRewardExpiry);
    router.post('/register', accountCtrl.register);
    router.get('/LinkedAccounts', accountCtrl.getListOfLinkedAccounts);
    router.post('/rewardsNotification', accountCtrl.rewardsAlertNotification);
    router.get('/mobileList', accountCtrl.requestMobileNoList);
        
    //reward and redeem related services
    router.post('/redeem',rewardCtrl.redeemAnItem);
    router.get('/catalog/refresh',rewardCtrl.refreshCatalog);
    router.get('/favourites',rewardCtrl.getFavorites);
    //router.post('/markAsFavourite',rewardCtrl.favouriteItem);
    //router.post('/unmarkAsFavourite',rewardCtrl.removeFavouriteItem);
    router.get('/catalogDisplay',rewardCtrl.getCatalogDisplayPreferences);
    router.put('/payBill',rewardCtrl.payBillWithPoints);
    router.get('/customer/:min/catalog', rewardCtrl.getCatalogById);
    router.delete('/customer/:min/catalog/:catalogId/favorite', rewardCtrl.removeFavouriteItem);
    
	// router.get('/', async function (req, res) {
    //     // var minutes = minutesDAO.getMinutesToRace();
    //     // res.json({message: 'welcome'});
    //     try {
    //         var result =  await ssoint.login();
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
        
    //     var uuid = 'a8f35732-f700-48de-a05a-dccb7a2e517a';
     
    //     var nJwt = require('nJwt');  
    //     var signingKey = uuid; // For example purposes

    //     var claims = {
    //     iss: "http://myapp.com/",  // The URL of your service
    //     sub: "users/user1234",    // The UID of the user in your system
    //     scope: "self, admins"
    //     }

    //     var jwt = nJwt.create(claims,signingKey)
    //     var token = jwt.compact();
	//     res.json({token: token});


	// });

	// prefixed all routes with /api
	app.use('/api', router);

	// app.all('/*', function(req, res) {res.send('process ' + process.pid + ' says hello!').end();})

	app.listen(port);
	console.log('http://127.0.0.1:' + port + '/api');


// }




