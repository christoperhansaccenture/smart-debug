import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {AccountService} from '../../shared/services/account.service';
import {RewardTypeService} from '../services/reward-type.service';
import {CatalogService} from '../services/catalog.service';
import {ItemBeltComponent} from './item-belt.component';
import {MostPopularItemBeltComponent} from './most-popular-item-belt.component';
import {AllCategoryItemBeltComponent} from './all-category-item-belt.component';
import {AlmostGetItemBeltComponent} from './almost-get-item-belt.component';
import {LifestyleItemBeltComponent} from './lifestyle-item-belt.component';
import {MobileItemBeltComponent} from './mobile-item-belt.component';
import {FavoriteItemBeltComponent} from './favorite-item-belt.component';
//import { Layout } from '../../model/layout';

@Component({
    selector: 'overview',
    templateUrl: 'app/my-rewards/components/overview.component.html',
    directives: [
        ItemBeltComponent,
        MostPopularItemBeltComponent,
        AllCategoryItemBeltComponent,
        AlmostGetItemBeltComponent,
        LifestyleItemBeltComponent,
        MobileItemBeltComponent,
        FavoriteItemBeltComponent
    ]
})
export class OverviewComponent  {
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _rewardTypeService: RewardTypeService,
        private _catalogService: CatalogService,
        private _accountService: AccountService) {
		
		this._layoutService.setCurrentPage('MyRewards');
        this._catalogService.loadAllCatalogs();
        this._accountService.getMobileNumberlistFromBackEnd(true);
		
	}
    
    getUserData(){
        return this._accountService.getSelectedUserPhone();
    }
    
    getRewardsBalance(){
        return this._accountService.getRewardsBalance();
    }
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    numberSelectionState(){
        return this._layoutService.getNumberSelectionState();
    }
    
    openDetailPage(type:string){
        this._rewardTypeService.setSelectedType(type);
    }
    
    gotoAccountOverview(){
        this._layoutService.accountFromHome = true;
        this._router.navigate(['AccountOverview']);
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
    }
	
}
