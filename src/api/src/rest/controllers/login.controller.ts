/// <reference path="../../../typings/main.d.ts" />


'use strict';
import { SSO } from '../services/sso.service';


    export interface loginInterface {
        postLogin():Promise<string>;
        getAccount():Promise<string>;
    }
// export module Login {
    export class loginController implements loginInterface{
        private ssoService:SSO.sso;
            constructor() {       
            
            }
            
            async postLogin(req: string,res: string) : Promise<string> {
                    const ssoService:SSO.sso = new SSO.sso();

                    try {
                        var result:string =  await ssoService.requestValidateUserCredentials();
                        var resultJSON = JSON.parse(result)
                        var result2 =  await ssoService.requestAccessToken();
                        var resJson = JSON.parse(result2);       
                        var nJwt = require('nJwt');  
                        var signingKey = 'a8f35732-f700-48de-a05a-dccb7a2e517a'; //get from config file

                        var claims = {
                           accessToken: resJson.result.AccessToken,
                           msaid: resJson.result.MSAID
                        }

                        var jwt = nJwt.create(claims,signingKey)
                        console.log(jwt);
                        var token = jwt.compact();
                        res.json({token: token});
                    }
                    catch (err) {
                        console.log(err);
                    }
            }
            
            
            async getAccount(req:string,res:string) : Promise<string> {
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
                    const ssoService:SSO.sso = new SSO.sso();
                    
           
                    try {
                        
                        var result =  await ssoService.getAccount();
                        var resJson = JSON.parse(result);       

                        res.json(resJson.result);
                    }
                    catch (err) {
                        console.log(err);
                    }
            }
            
        }
// }