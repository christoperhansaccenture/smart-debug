/// <reference path="../../../typings/main.d.ts" />


'use strict';
import { SSO } from '../services/sso.service';
var request = require('request'); 
var config = require('../config/config');


    export interface loginInterface {
        postLogin():Promise<string>;
    }
// export module Login {
    export class loginController implements loginInterface{
        private ssoService:SSO.sso;
            constructor() {       
            
            }
            
            async postLogin(req: string,res: string) : Promise<string> {
                    const ssoService:SSO.sso = new SSO.sso();
                    var username = req.body.username;
                    var password = req.body.password;

                    try {
                        console.log(username);
                        console.log(password);
                        var result:string =  await ssoService.requestValidateUserCredentials(username, password);
                        console.log(result);
                        var resultJson = JSON.parse(result);
                        //console.log(resultJson);
                        var result2 =  await ssoService.requestAccessToken(resultJson.result.AuthenticationCode, resultJson.result.ClientID);
                        var result2Json = JSON.parse(result2);   
                        //console.log(result2Json);    
                        var nJwt = require('njwt');  
                        var signingKey = config.signingKey; //get from config file

                        var claims = {
                           accessToken: result2Json.result.AccessToken,
                           clientId: resultJson.result.ClientID,
                           msaid: result2Json.result.MSAID
                        }

                        var jwt = nJwt.create(claims,signingKey)
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
            }
            
        }
// }