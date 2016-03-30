import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ItemBeltComponent} from './item-belt.component';
import {SmartLeftMenuComponent} from '../../shared/components/smart-left-menu.component';
import {MostPopularItemBeltComponent} from './most-popular-item-belt.component';
import {AllCategoryItemBeltComponent} from './all-category-item-belt.component';
import {LifestyleItemBeltComponent} from './lifestyle-item-belt.component';
import {MobileItemBeltComponent} from './mobile-item-belt.component';
import {FavoriteItemBeltComponent} from './favorite-item-belt.component';
import {RewardTypeService} from '../services/reward-type.service';
import {CatalogService} from '../services/catalog.service';
import {AccountService} from '../../shared/services/account.service';

@Component({
    selector: 'overview',
    templateUrl: './app/my-rewards/components/catalog.component.html',
    directives: [
        ItemBeltComponent,
        MostPopularItemBeltComponent,
        AllCategoryItemBeltComponent,
        LifestyleItemBeltComponent,
        MobileItemBeltComponent,
        FavoriteItemBeltComponent,
        SmartLeftMenuComponent
    ]
})
export class CatalogComponent  {
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _rewardTypeService: RewardTypeService,
        private _catalogService: CatalogService,
        private _accountService: AccountService) {
		
		this._layoutService.setCurrentPage('Catalog');
	}
    
    getRewardsBalance(){
        return this._accountService.getRewardsBalance();
    }
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    openDetailPage(type:string){
        this._rewardTypeService.setSelectedType(type);
    }

    goToCatalogList(category: string) {
        // set filter in service
        this._catalogService.filter.reset();
        if (category === 'Most Popular') {
            this._catalogService.filter.categories.mostPopular = true;
        }
        else if (category === 'My Favorite') {
            this._catalogService.filter.categories.myFavorites = true;
        }
        else if (category === 'All Categories') {
            this._catalogService.filter.all();
        }
        else if (category === 'Lifestyle') {
            this._catalogService.filter.categories.lifestyle = true;
        }
        else if (category === 'Mobile') {
            this._catalogService.filter.categories.mobile = true;
        }
        // go to page
        this._router.navigate(['CatalogList']);
    }

    getFavorites() {
        if (this._catalogService.catalogs) {
            return this._catalogService.catalogs
                .filter(e => e.favorite).length;
        }
        else
            return null;
    }
	
}
