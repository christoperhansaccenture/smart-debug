import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {AuthService} from '../../shared/services/auth.service';
import {NgModel} from 'angular2/common';

@Component({
    directives: [NgModel],
    selector: 'login',
    templateUrl: 'app/login/components/login.html'
})
export class LoginComponent {
    userId: string;
    password: string;
    
    checkErrorStatus=false;
    errorMessageText: string;
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
		private _authService: AuthService) {
		
		this._layoutService.setCurrentPage('Login');
		
	}
    
    getErrorMessageText(){
        return this.errorMessageText;
    }
    
    login(event) {
	
        event.preventDefault();
		
         if(this.checkIDPassword(event,this.userId,this.password)==0) 
         {
             //alert("Please enter your password!");
             this.errorMessageText="Please enter your phone no/email and password";
             this.checkErrorStatus=true;
         }
         else if(this.checkIDPassword(event,this.userId,this.password)==2)
         {
              //alert("Email address is invalid!");
              this.errorMessageText="Please enter a valid email address";
              this.checkErrorStatus=true;
         } 
         else if(this.checkIDPassword(event,this.userId,this.password)==1)
         {
            this._authService.login(this.userId,this.password);
            this.errorMessageText = this._authService.errorMessageText;
            this.checkErrorStatus = this._authService.errorMessageFlag;
         }

    }
     
     
    checkIDPassword(event,userId,passoword){      
        if(userId==null || userId=="" || passoword==null || passoword=="")
        { 
            return 0;
        }
        else if(isNaN(userId))
        {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userId))  
            {  
                return 1;
            }  
            else
            {
                return 2;                
            }          
        }
        else {
            if(passoword==null || passoword=="")
             {
                return 0;
             }
             else{
                return 1; 
             }
        }
        
    }
    
    gotoForgotPassword() {
        let link = ['ForgotPassword'];
        this._router.navigate(link);
    }
	
	gotoRegister(){
		let link = ['Register'];
        this._router.navigate(link);
	}
	
	getResize(){
        return this._matchMediaService.getmm();
        
    }
	
}