/// <reference path="../../typings/main.d.ts" />


'use strict';
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

	const port:number = process.env.PORT || 8080;
	const router = express.Router();
    // const ssoint:SSO.sso = new SSO.sso();
    const loginCtrl:loginController = new loginController();
    const accountCtrl:AccountController = new AccountController();
    const rewardCtrl:RewardController = new RewardController();
    // const minutesDAO:getMinutesToRaceDaoImpl = new getMinutesToRaceDaoImpl();
    // const SSO:SSO = new sso();

	// login related services
    router.post('/login', loginCtrl.postLogin);
    
    //account related services
    router.get('/account', accountCtrl.getAccount);
    router.get('/rewardBalance', accountCtrl.getRewardBalance);
    router.get('/rewardExpiry', accountCtrl.getLatestRewardExpiry);
    router.get('/activityHistory', accountCtrl.getActivityHistory);
    router.post('/register', accountCtrl.register);
    router.get('/customerInformation', accountCtrl.getCustomerInformation);
    router.get('/LinkedAccounts', accountCtrl.getListOfLinkedAccounts);
    router.post('/linkAccount', accountCtrl.linkAccount);
    router.post('/unlinkAccount', accountCtrl.unlinkAccount);
    router.post('/rewardsNotification', accountCtrl.rewardsAlertNotification);
    router.get('/mobileList', accountCtrl.requestMobileNoList);
    
    //reward and redeem related services
    router.post('/redeem',rewardCtrl.redeemAnItem);
    router.get('/catalog',rewardCtrl.getListOfRedeemableItems);
    router.get('/favourites',rewardCtrl.getFavorites);
    router.post('/transfer',rewardCtrl.transferpoints);
    router.post('/markAsFavourite',rewardCtrl.favouriteItem);
    router.post('/unmarkAsFavourite',rewardCtrl.removeFavouriteItem);
    router.get('/catalogDisplay',rewardCtrl.getCatalogDisplayPreferences);
    router.put('/payBill',rewardCtrl.payBillWithPoints);
    
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




