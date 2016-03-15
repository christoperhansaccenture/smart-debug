/// <reference path="dao.ts" />


'use strict';
export class getMinutesToRaceDaoImpl implements DAO.DAO {
    private raceServices;
    private raceServicesDescription;
    private soap;
    
    constructor() {
        var vm = this;
        vm.soap = require('soap');
        
        var wsdlOptions = {
        endpoint: 'http://localhost:1080/GetMinutesToRaceBMCS' ///raceInfo
        };
        var url = './wsdl/RaceServices.wsdl.xml';
        
        var soap = this.soap;
        var raceServices= this.raceServices;
        
        var q = new Promise(
            function(resolve, reject) {
                soap.createClient(url, wsdlOptions, function(err, client) {
                    resolve(client);
                });
        });
        q.then(
            function(val) {
                vm.raceServices = val;
            })
        .catch(
            function(reason) {
                var test2 = "here";
            });

    }
    

    
   async getMinutesToRace() : Promise<string> {
        var vm = this;
        
        //create input message
        var raceServicesDescription = vm.raceServices.describe();
        var getMinutesToRaceMessageInput = raceServicesDescription.RaceServiceReceiverWSDL_Service.RaceServiceReceiverWSDL_Port.GetMinutesToRaceBMCS.input;       
 
        getMinutesToRaceMessageInput.Header.BusinessEvent = "getMinutesToRace";
        getMinutesToRaceMessageInput.Header.Session.SessionId = "testId";
        getMinutesToRaceMessageInput.Header.Session.SessionPassword = "testPassword";
        getMinutesToRaceMessageInput.Header.SourceSystem= "API";
        getMinutesToRaceMessageInput.Header.SourceSystemTransactionId ="1234";
        getMinutesToRaceMessageInput.ListOfFixture.Fixture.FixtureDate ="12-10-1981";
        getMinutesToRaceMessageInput.ListOfFixture.Fixture.FixtureDate ="12";
        getMinutesToRaceMessageInput.ListOfFixture.Fixture.Meeting.ListOfRace.Race.RaceNo = "1";
        getMinutesToRaceMessageInput.ListOfFixture.Fixture.Meeting.MeetingCode ="SP";

        return new Promise<string> (
            function(resolve, reject) {
                vm.raceServices.GetMinutesToRaceBMCS(getMinutesToRaceMessageInput, function(err, result) {
                    resolve(result.MinutesToRace);
                });
            });        
    }

}