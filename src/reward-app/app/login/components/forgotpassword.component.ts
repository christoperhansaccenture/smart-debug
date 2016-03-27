import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';

@Component({
    selector: 'forgotpassword',
    templateUrl: './app/login/components/forgotpassword.html'
})
export class ForgotPasswordComponent {
    
    userId: string;
    errorMessageText: string;
    errorMessageFlag = false;
	
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService) {
	
		this._layoutService.setCurrentPage('ForgotPassword');
	
	}
    
    gotoVerificationForm() {
        
        if(this.validateInput(this.userId)){
            let link = ['VerificationForm'];
            this._router.navigate(link);    
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
                return true;
            }  
            else
            {
                return false;                
            }          
        }
        else{
            return true;
        }
    }
	
}