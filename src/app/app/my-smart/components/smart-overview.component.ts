import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {AccountService} from '../../shared/services/account.service';
import {CircularSpinnerComponent} from '../../shared/components/spinners/circular-spinner.component';
//import { Layout } from '../../model/layout';

@Component({
    selector: 'overview',
    templateUrl: './app/my-smart/components/smart-overview.component.html',
    directives: [
        CircularSpinnerComponent
    ]
})
export class SmartOverviewComponent  {
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _accountService: AccountService) {
		
		this._layoutService.setCurrentPage('MySmart');
        //this._accountService.getMobileNumberlistFromBackEnd(false);
		
	}
    
    getSpinnerStatus(){
        return this._accountService.spinnerAccount;
    }
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
	
}
