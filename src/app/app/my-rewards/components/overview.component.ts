import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {AccountService} from '../../shared/services/account.service';
import {SmartLeftMenuComponent} from '../../shared/components/smart-left-menu.component';
import {CatalogService} from '../services/catalog.service';
import {ItemBeltComponent} from './item-belt.component';
import {MostPopularItemBeltComponent} from './most-popular-item-belt.component';
import {AllCategoryItemBeltComponent} from './all-category-item-belt.component';
import {AlmostGetItemBeltComponent} from './almost-get-item-belt.component';
import {LifestyleItemBeltComponent} from './lifestyle-item-belt.component';
import {MobileItemBeltComponent} from './mobile-item-belt.component';
import {FavoriteItemBeltComponent} from './favorite-item-belt.component';
import {ActivityHistoryService} from '../../account/services/activity-history.service';
import {CircularSpinnerComponent} from '../../shared/components/spinners/circular-spinner.component';
declare var ga:any;

@Component({
    selector: 'overview',
    templateUrl: './app/my-rewards/components/overview.component.html',
    directives: [
        ItemBeltComponent,
        MostPopularItemBeltComponent,
        AllCategoryItemBeltComponent,
        AlmostGetItemBeltComponent,
        LifestyleItemBeltComponent,
        MobileItemBeltComponent,
        FavoriteItemBeltComponent,
        CircularSpinnerComponent,
        SmartLeftMenuComponent
    ]
})
export class OverviewComponent  {
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _catalogService: CatalogService,
        private _accountService: AccountService,
        private _activityHistoryService: ActivityHistoryService) {
		
		this._layoutService.setCurrentPage('MyRewards');
        this._catalogService.loadAllCatalogs();
        this._activityHistoryService.loadAllActivity();
        this._accountService.getMobileNumberlistFromBackEnd(false);
		
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
    
    getActivitySpinnerStatus(){
        return !this._activityHistoryService.isActivityLoaded();
    }
    
    getSpinnerStatus(){
        return this._accountService.spinnerAccount;
    }
    
    getUserData(){
        return this._accountService.selectedUserPhone;
    }
    
    getRewardsBalance(){
        return this._accountService.rewardsData;
    }
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    numberSelectionState(){
        return this._layoutService.getNumberSelectionState();
    }
    
    openDetailPage(type:string){
        //this._rewardTypeService.setSelectedType(type);
    }
    
    gotoAccountOverview(){
        this._layoutService.accountFromHome = true;
        this._router.navigate(['AccountOverview']);
        ga('send','event','Button Clicked','Account Overview','');
    }
    
    goToCatalogList(category: string) {
        // set filter in service
        this._catalogService.filter.reset();
        if (category === 'Most Popular') {
            this._catalogService.filter.categories.mostPopular = true;
        }
        else if (category === 'All Categories') {
            this._catalogService.filter.all();
        }
        // go to page
        this._router.navigate(['CatalogList']);
        ga('send','event','Button Clicked','Catalog List',category);
    }
	
    getCategories() {
        let currentPoints = Number((this._accountService.rewardsData.rewards) ? this._accountService.rewardsData.rewards : 0);
        if (this._catalogService.catalogs) {
            return this._catalogService.catalogs
                .filter(e => e.points > currentPoints).length;
        }
        else
            return null;
    }
}
