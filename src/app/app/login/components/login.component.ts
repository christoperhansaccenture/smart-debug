import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {AuthService} from '../../shared/services/auth.service';
import {NgModel} from 'angular2/common';
import {HorizontalSpinnerComponent} from '../../shared/components/spinners/horizontal-spinner.component';
declare var ga:any;

@Component({
    selector: 'login',
    templateUrl: './app/login/components/login.html',
    directives: [
        NgModel,
        HorizontalSpinnerComponent
    ]
})
export class LoginComponent {
    userId: string;
    password: string;
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
		private _authService: AuthService) {
		
        this._authService.autoLogin();

		this._layoutService.setCurrentPage('Login');
		
	}
    
    // getErroMessageFlag(){
    //     return this._authService.getErrorMessageFlag();
    // }
    
    getLoadingState(){
        return this._authService.getLoadingState();
    }
    
    getErrorMessageText(){
        return this._authService.getErrorMessageText();
    }
    
    login(event) {
	
        event.preventDefault();
        
        if(!this._authService.getLoadingState()){
            this._authService.login(this.userId,this.password);
        }
        ga('send','event','Button Clicked','Login','');
    }
    
    gotoForgotPassword() {
        let link = ['ForgotPassword'];
        this._router.navigate(link);
        ga('send','event','Button Clicked','Forgot Password','');
    }
	
	gotoRegister(){
		let link = ['Register'];
        this._router.navigate(link);
        ga('send','event','Button Clicked','Register','');
	}
	
	getResize(){
        return this._matchMediaService.getmm();
        
    }
	
}
