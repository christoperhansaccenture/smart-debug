import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {AccountService} from '../../shared/services/account.service';
import {ModalService} from '../../shared/services/modal.service';
import {SmartLeftMenuComponent} from '../../shared/components/smart-left-menu.component';
import {CircularSpinnerComponent} from '../../shared/components/spinners/circular-spinner.component';

@Component({
    selector: 'profile',
    templateUrl: './app/account/components/profile.component.html',
    directives: [
        SmartLeftMenuComponent,
        CircularSpinnerComponent
    ]
})
export class ProfileComponent  {
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _accountService: AccountService,
        private _modalService: ModalService) {
		
		this._layoutService.setCurrentPage('Profile');
		this._accountService.getUserProfileFromBackEnd(false);
        
	}
    
    getSpinnerStatus(){
        return this._accountService.spinnerProfile;
    }
    
    getUserProfile(){
        console.log(this._accountService.getUserProfile());
        return this._accountService.getUserProfile();
    }
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    updateProfile(){
        this._accountService.updateUserProfileToBackEnd();
    }
	
}