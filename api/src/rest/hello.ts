/// <reference path="../../typings/requirejs/require.d.ts" />
'use strict';
var cluster = require('cluster');
import DAO = require('./test-dao');

if (cluster.isMaster) {
	var numWorkers = require('os').cpus().length;
	console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });

// Code to run if we're in a worker process
} else {


	var express = require('express');
    var process = require('process');
	const app = express();
	var bodyParser = require('body-parser');

	var raceServices;
	var raceServicesDescription;

	var wsdlOptions = {
	  endpoint: 'http://localhost:1080/GetMinutesToRaceBMCS' ///raceInfo
	};
	var url = './wsdl/RaceServices.wsdl.xml';
	var args = {name: 'value'};

	// configure our app to use bodyParser(it let us get the json data from a POST)
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	const port:number = process.env.PORT || 8080;
	const router = express.Router();
    const minutesDAO:DAO.getMinutesToRaceDaoImpl = new DAO.getMinutesToRaceDaoImpl();

	// test route

	router.get('/', async function (req, res) {
        // var minutes = minutesDAO.getMinutesToRace();
        try {
            var minutes =  await minutesDAO.getMinutesToRace();
        }
        catch (err) {
            console.log(err);
        }


	    res.json({MinutesToRace: minutes});


	});

	// prefixed all routes with /api
	app.use('/api', router);

	// app.all('/*', function(req, res) {res.send('process ' + process.pid + ' says hello!').end();})

	app.listen(port);
	console.log('http://127.0.0.1:' + port + '/api');


}




