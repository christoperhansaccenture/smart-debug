import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ActivityHistoryService} from '../services/activity-history.service';
import {AccountService} from '../../shared/services/account.service';
import {SmartLeftMenuComponent} from '../../shared/components/smart-left-menu.component';
declare var ga:any;

@Component({
    selector: 'account-overview',
    templateUrl: './app/account/components/activity-history.component.html',
    directives: [
        SmartLeftMenuComponent
    ]
})
export class ActivityHistoryComponent  {
    
    historyFilter=false;
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _activityHistoryService:ActivityHistoryService,
        private _accountService: AccountService) {
		
		this._layoutService.setCurrentPage('ActivityHistory');
		this._activityHistoryService.loadAllActivity();
        
	}
    
    getRewardsBalance(){
        return this._accountService.getRewardsBalance();
    }
    
    toggleFilter(){
        this.historyFilter = !this.historyFilter;
    }
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    numberSelectionState(){
        return this._layoutService.getNumberSelectionState();
    }
    
    getFilter(){
        return this._activityHistoryService.filter;
    }
    
    getActivity() {
        
        console.log(this._activityHistoryService.activities);
        
        if (this._activityHistoryService.activities) {
            return this._activityHistoryService.activities
                .filter(e => {
                    let filter = this._activityHistoryService.filter;
                    let result = false;
                    let categoryArray = filter.getCategoryArray();
                    
                    //console.log(filter.categories.allTransaction);
                    
                    // filter activity
                    if (filter.categories.allTransaction || categoryArray.indexOf(e.type) > -1) {
                        result = true;
                    }
                    return result;
                });
        }
        else
            return null;
    }
    
    toggleAllTransaction() {
        this.getFilter().reset();
    }
    
    toggleEarning() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.earning = !this.getFilter().categories.earning;
        ga('send','event','Button Clicked','toggleEarning','');
    }
    
    toggleRedemption() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.redemption = !this.getFilter().categories.redemption;
        ga('send','event','Button Clicked','toggleRedemption','');
    }
    
    toggleTransfer() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.transfer = !this.getFilter().categories.transfer;
        ga('send','event','Button Clicked','toggleTransfer','');
    }
    
    toggleRegistration() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.registration = !this.getFilter().categories.registration;
        ga('send','event','Button Clicked','toggleRegistration','');
    }
    
    toggleInquiry() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.inquiry = !this.getFilter().categories.inquiry;
        ga('send','event','Button Clicked','toggleInquiry','');
    }
    
    toggleLinking() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.linking = !this.getFilter().categories.linking;
        ga('send','event','Button Clicked','toggleLinking','');
    }
	
}