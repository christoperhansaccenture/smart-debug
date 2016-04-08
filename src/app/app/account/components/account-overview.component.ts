import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {AccountService} from '../../shared/services/account.service';
import {ActivityHistoryService} from '../../account/services/activity-history.service';
import {CircularSpinnerComponent} from '../../shared/components/spinners/circular-spinner.component';

declare var ga:any;
@Component({
    selector: 'account-overview',
    templateUrl: './app/account/components/account-overview.component.html',
    directives: [
        CircularSpinnerComponent
    ]
})
export class AccountOverviewComponent  {
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _accountService: AccountService,
        private _activityHistoryService: ActivityHistoryService) {
		
		this._layoutService.setCurrentPage('AccountOverview');
        this._activityHistoryService.loadAllActivity();
		
	}
    
    getActivitySpinnerStatus(){
        return !this._activityHistoryService.isActivityLoaded();
    }
    
    getSpinnerStatus(){
        return this._accountService.spinnerAccount;
    }
    
    getLatestActivity() {
        if (this._activityHistoryService.activities) {
            return this._activityHistoryService.activities
            .slice(0, 2);
        }
        else{
            return null;
        }
    }
    
    getUserData(){
        return this._accountService.selectedUserPhone;
    }
    
    getRewardsBalance(){
        return this._accountService.getRewardsBalance();
    }
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    gotoActivityHistory(){
        this._layoutService.historyFromAccount = true;
        this._router.navigate(['ActivityHistory']);
        ga('send','event','Button Clicked','ActivityHistory','');
    }
	
}