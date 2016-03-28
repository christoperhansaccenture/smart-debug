import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {AccountService} from '../../shared/services/account.service';

@Component({
    selector: 'forgotpassword',
    templateUrl: './app/login/components/forgotpassword.html'
})
export class ForgotPasswordComponent {
    
    userId: string;
    errorMessageText: string;
    errorMessageFlag = false;
    
    type = '';
	
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _accountService: AccountService) {
	
		this._layoutService.setCurrentPage('ForgotPassword');
	
	}
    
    gotoVerificationForm() {
        
        if(this.validateInput(this.userId)){
            
            this._accountService.initializeForgotPassword(this.type,this.userId);
             
        }else{
            this.errorMessageText = 'Please enter a valid phone number / email address';
            this.errorMessageFlag = true;
        }
        
    }
    
    getErrorMessageText(){
        return this.errorMessageText;
    }
	
	getResize(){
        return this._matchMediaService.getmm();
        
    }
    
    validateInput(userId){    
          
        if(userId==null || userId=="") {
            return false;
        }     
        else if(isNaN(userId))
        {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userId))  
            {
                this.type = '1';  
                return true;
            }  
            else
            {
                return false;                
            }          
        }
        else{
            this.type = '2';
            return true;
        }
    }
	
}