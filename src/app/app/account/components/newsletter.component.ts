import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {AccountService} from '../../shared/services/account.service';
import {ModalService} from '../../shared/services/modal.service';
import {SmartLeftMenuComponent} from '../../shared/components/smart-left-menu.component';

@Component({
    selector: 'newsletter',
    templateUrl: './app/account/components/newsletter.component.html',
    directives: [
        SmartLeftMenuComponent
    ]
})
export class NewsletterComponent  {
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _accountService: AccountService,
        private _modalService: ModalService) {
		
		this._layoutService.setCurrentPage('Newsletter');
		//this._accountService.getUserProfileFromBackEnd(false);
        
	}
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    updateProfile(){
        this._accountService.updateUserProfileToBackEnd();
    }
	
}