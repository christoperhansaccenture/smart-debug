import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ItemBeltComponent} from './item-belt.component';
import {MostPopularItemBeltComponent} from './most-popular-item-belt.component';
import {AllCategoryItemBeltComponent} from './all-category-item-belt.component';
import {RewardTypeService} from '../services/reward-type.service';
import {CatalogService} from '../services/catalog.service';
import {CartService} from '../../shared/services/cart.service';
import {Catalog} from '../../shared/models/catalog';
import {CartItem} from '../../shared/models/cart-item';

@Component({
    selector: 'confirm-order',
    templateUrl: 'app/my-rewards/components/confirm-order.component.html',
    directives: [
        ItemBeltComponent,
        MostPopularItemBeltComponent,
        AllCategoryItemBeltComponent
    ]
})
export class ConfirmOrderComponent  {
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _rewardTypeService: RewardTypeService,
        private _catalogService: CatalogService,
        private _cartService: CartService) {
		
		this._layoutService.setCurrentPage('ConfirmOrder');
	}
	
	getResize(){
        return this._matchMediaService.getmm();  
    }

    getCurrentPoints() {
        return 1010;
    }

    getPointsRequired() {
        if (this.getItems() && this.getItems().length > 0) {
            return this.getItems()
            .map(e => e.amount * e.catalog.points)
            .reduce((prev, curr) => {
                return prev + curr;
            });
        }
        return 0;
    }

    getPointsRemaining() {
        return this.getCurrentPoints() - this.getPointsRequired();
    }

    getItems() {
        let items = [];
        for (let key in this._cartService.items) 
            items.push(this._cartService.items[key]);
        return items;
    }

    removeItem(item: CartItem) {
        console.log('remove item');
    }

    plusItem(item: CartItem) {
        item.amount++;
    }

    minusItem(item: CartItem) {
        if (item.amount > 1) {
            item.amount--;
        }
    }

    getNumberSelection() {
        return this._cartService.numberSelection;
    }

    toggleParentOneNumber() {
        this.getNumberSelection().oneNumber = !this.getNumberSelection().oneNumber;
    }

    toggleParentMyNumber() {
        this.getNumberSelection().gift.checked = false;
        this.getNumberSelection().myNumber.checked = !this.getNumberSelection().myNumber.checked;
    }

    toggleParentGift() {
        this.getNumberSelection().myNumber.checked = false;
        this.getNumberSelection().gift.checked = !this.getNumberSelection().gift.checked;
    }

    toggleMyNumber(item: CartItem) {
        item.numberSelection.gift.checked = false;
        item.numberSelection.myNumber.checked = !this.getNumberSelection().myNumber.checked;
    }

    toggleGift(item: CartItem) {
        item.numberSelection.myNumber.checked = false;
        item.numberSelection.gift.checked = !item.numberSelection.gift.checked;
    }

    goToNext() {
        this._router.navigate(['ConfirmOrder']);
    }
	
}
