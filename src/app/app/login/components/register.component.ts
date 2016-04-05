import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';

@Component({
    selector: 'register',
    templateUrl: './app/login/components/register.component.html'
})
export class RegisterComponent {
	
    checkErrorStatus=false;
    errorMessageText: string;
    userid;
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService) {
		
		this._layoutService.setCurrentPage('Register');
		
	}
    
    getErrorMessageText(){
        return this.errorMessageText;
    }
    
    showNumberField(){
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userid)){
            return true;
        }else{
            return false;
        }
    }
    
    register(firstname,lastname,password,confirmpassword){
		 if(this.validate(this.userid,firstname,lastname,password,confirmpassword)==0) 
         {
             this.errorMessageText="Please enter all required information";
             this.getErrorMessageText();
             this.checkErrorStatus=true;

         }
         else if(this.validate(this.userid,firstname,lastname,password,confirmpassword)==1)
         {
             this.errorMessageText="Password did not match";
             this.getErrorMessageText();
             this.checkErrorStatus=true;
         }         
         else if(this.validate(this.userid,firstname,lastname,password,confirmpassword)==2)
         {
            let link = ['VerificationForm'];
            this._router.navigate(link)
         };
	}
    
    validate(userid,firstname,lastname,password,confirmpassword){
      if(userid==null || userid=="" || 
      firstname==null || firstname=="" || 
      lastname==null || lastname=="" || 
      password==null || password=="" || 
      confirmpassword==null || confirmpassword=="")
        {
            return 0;       
        }
        else if (password != confirmpassword) {
           return 1;
        }
        else{
           return 2;
        }
    }
	
	getResize(){
        return this._matchMediaService.getmm();
        
    }
	
}