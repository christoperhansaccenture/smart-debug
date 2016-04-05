import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {GetStartedComponent} from './getStarted.component';
import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';
import {NewPassComponent} from './new-pass.component';
import {ForgotPasswordComponent} from './forgotpassword.component';
import {VerificationFormComponent} from './verificationForm.component';

@Component({
    template: `
		<div class="backgroundImage login" [ngClass]="{ blur : !OnGetStarted() }"></div>
        <router-outlet></router-outlet>
    `,
	directives: [
		ROUTER_DIRECTIVES
    ]
})
@RouteConfig([
    {
        path: '/',
        name: 'GetStarted',
        component: GetStartedComponent,
		useAsDefault: true
    },
	{
        path: '/login',
        name: 'Login',
        component: LoginComponent
    },
	{
        path: '/register',
        name: 'Register',
        component: RegisterComponent
	},
    {
        path: '/new_password',
        name: 'NewPassword',
        component: NewPassComponent
	},
	{
        path: '/verificationForm',
        name: 'VerificationForm',
        component: VerificationFormComponent
    },
    {
        path: '/forgotpassword',
        name: 'ForgotPassword',
        component: ForgotPasswordComponent
    }
	
])
export class MainLoginComponent {

	constructor (private _layoutService: LayoutService) {}
	
	OnGetStarted(){
        if (this._layoutService.getCurrentPage() == 'GetStarted'){
			return true;
		}else{
			return false;
		}
		
	}

}