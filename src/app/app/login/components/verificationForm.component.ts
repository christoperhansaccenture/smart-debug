import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
declare var ga:any;

@Component({
    selector: 'verificationForm',
    templateUrl: './app/login/components/verificationForm.html'
})
export class VerificationFormComponent {
    
    checkErrorStatus = false;
    messageText: string;
	
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _pageNavigationService: PageNavigationService) {
	
		this._layoutService.setCurrentPage('VerificationForm');
	
	}
    
    gotoNextStep(code) {
        
        if(code !== '1234' || code==null || code==""){
            this.messageText = 'Please enter a valid verification code';
            this.checkErrorStatus = true;
        }else{
            
            console.log(this._pageNavigationService.getPreviousPage());
            
            if(this._pageNavigationService.getPreviousPage() == 'ForgotPassword'){
                let link;
                link = ['NewPassword'];
                this._router.navigate(link);
                ga('send','event','Account Management','Password Changed','');
            }
            else if(this._pageNavigationService.getPreviousPage() == 'Register'){
                let link;
                link = ['Login'];
                this._router.navigate(link);
                ga('send','event','Account Management','New Account Registered','');
            }
            
        }

    }
    
    getErrorMessageText(){
        return this.messageText;
    }
	
	getResize(){
        return this._matchMediaService.getmm();
        
    }
    
    gotoNewPass(){
		let link = ['NewPassword'];
        this._router.navigate(link);
	}
	
}