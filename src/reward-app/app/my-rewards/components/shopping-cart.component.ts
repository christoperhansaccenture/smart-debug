import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ItemBeltComponent} from './item-belt.component';
import {MostPopularItemBeltComponent} from './most-popular-item-belt.component';
import {AllCategoryItemBeltComponent} from './all-category-item-belt.component';
import {RewardTypeService} from '../services/reward-type.service';
import {CatalogService} from '../services/catalog.service';

@Component({
    selector: 'shopping-cart',
    templateUrl: 'app/my-rewards/components/shopping-cart.component.html',
    directives: [
        ItemBeltComponent,
        MostPopularItemBeltComponent,
        AllCategoryItemBeltComponent
    ]
})
export class ShoppingCartComponent  {
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _rewardTypeService: RewardTypeService,
        private _catalogService: CatalogService) {
		
		this._layoutService.setCurrentPage('Catalog');
	}
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    openDetailPage(type:string){
        this._rewardTypeService.setSelectedType(type);
    }
    
    goToPayBill(){
        this._router.navigate(['PayBill']);
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
