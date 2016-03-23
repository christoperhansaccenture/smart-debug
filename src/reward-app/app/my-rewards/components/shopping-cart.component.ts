import {Component, AfterViewInit} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ItemBeltComponent} from './item-belt.component';
import {MostPopularItemBeltComponent} from './most-popular-item-belt.component';
import {AllCategoryItemBeltComponent} from './all-category-item-belt.component';
import {RewardTypeService} from '../services/reward-type.service';
import {CatalogService} from '../services/catalog.service';
import {CartService} from '../../shared/services/cart.service';
import {AccountService} from '../../shared/services/account.service';
import {Catalog} from '../../shared/models/catalog';
import {CartItem} from '../../shared/models/cart-item';

@Component({
    selector: 'shopping-cart',
    templateUrl: 'app/my-rewards/components/shopping-cart.component.html',
    directives: [
        ItemBeltComponent,
        MostPopularItemBeltComponent,
        AllCategoryItemBeltComponent
    ]
})
export class ShoppingCartComponent implements AfterViewInit {

    editBill:boolean = false;
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _rewardTypeService: RewardTypeService,
        private _catalogService: CatalogService,
        private _cartService: CartService,
        private _accountService: AccountService) {
		
            this._accountService.getMobileNumberlist();
		this._layoutService.setCurrentPage('ShoppingCart');

        let numberSelection = this.getNumberSelection();
        let dirty: boolean = this.getItems().filter(e => e.changedOnCart).length > 0;
        if (!dirty) {
            if (this.getBill().length == 1 && this.getBill()[0]) {
                numberSelection.currentNumber = false;
                numberSelection.decidePerItem = true;
            }
        }
	}

    ngAfterViewInit() {
    }
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    goToPayBill(){
        this._router.navigate(['PayBill']);
    }

    getCurrentPoints() {
        return this._accountService.selectedUserPhone.rewards;
    }

    getPointsRequired() {
        if (this.getItems() && this.getItems().length > 0) {
            return this.getItems()
            .map(e => {
                return +e.getTotalPoints();
            })
            .reduce((prev, curr) => {
                return prev + curr;
            });
        }
        return 0;
    }

    getPointsRemaining() {
        return this.getCurrentPoints() - this.getPointsRequired();
    }

    getItems(): CartItem[] {
        let items: CartItem[] = [];
        for (let key in this._cartService.items) 
            items.push(this._cartService.items[key]);
        return items;
    }

    removeItem(item: CartItem) {
        this._cartService.removeItem(item);
        if (this.getItems().length == 0) {
            this.getNumberSelection().currentNumber = true;
            this.getNumberSelection().oneNumber = false;
            this.getNumberSelection().decidePerItem = false;
            this.getNumberSelection().clear();
        }
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

    toggleParentCurrentNumber() {
        this.getNumberSelection().currentNumber = !this.getNumberSelection().currentNumber;
        this._cartService.saveToStorage();
    }

    toggleParentMyNumber() {
        this.getNumberSelection().gift.checked = false;
        this.getNumberSelection().decidePerItem = false;
        this.getNumberSelection().myNumber.checked = !this.getNumberSelection().myNumber.checked;
        this._cartService.saveToStorage();
    }

    toggleParentGift() {
        this.getNumberSelection().myNumber.checked = false;
        this.getNumberSelection().decidePerItem = false;
        this.getNumberSelection().gift.checked = !this.getNumberSelection().gift.checked;
        this._cartService.saveToStorage();
    }

    toggleDecidePerItem() {
        this.getNumberSelection().gift.checked = false;
        this.getNumberSelection().myNumber.checked = false;
        this.getNumberSelection().decidePerItem = !this.getNumberSelection().decidePerItem;
        this._cartService.saveToStorage();
    }

    toggleCurrentNumber(item: CartItem) {
        item.numberSelection.gift.checked = false;
        item.numberSelection.myNumber.checked = false;
        item.numberSelection.currentNumber.checked = !item.numberSelection.currentNumber.checked;
        item.changedOnCart = true;
        this._cartService.saveToStorage();
    }

    toggleMyNumber(item: CartItem) {
        item.numberSelection.gift.checked = false;
        item.numberSelection.currentNumber.checked = false;
        item.numberSelection.myNumber.checked = !item.numberSelection.myNumber.checked;
        item.changedOnCart = true;
        this._cartService.saveToStorage();
    }

    toggleGift(item: CartItem) {
        item.numberSelection.myNumber.checked = false;
        item.numberSelection.currentNumber.checked = false;
        item.numberSelection.gift.checked = !item.numberSelection.gift.checked;
        item.changedOnCart = true;
        this._cartService.saveToStorage();
    }

    getBill() {
        return this.getItems().filter(e => e.isBill());
    }

    canContinue() {
        return this.getItems().length < 1 || this.getPointsRemaining() < 0
            || (this.getBill().length == 1 && this.getBill()[0]);
    }

    goToNext() {
        if (!this.canContinue())
            return;

        // if one number
        if (this.getNumberSelection().currentNumber) {
            this.getItems().forEach(e => { 
                e.clearNumberSelection();
                e.numberSelection.currentNumber = {
                    checked: true,
                    number: this.getCurrentNumber()
                };
            });
        }
        else if (this.getNumberSelection().oneNumber) {
            if (this.getNumberSelection().myNumber.checked) {
                this.getItems().forEach(e => { 
                    e.clearNumberSelection();
                    e.numberSelection.myNumber = {
                        checked: true,
                        number: this.getNumberSelection().myNumber.number
                    };
                });
            }
            else if (this.getNumberSelection().gift.checked) {
                this.getItems().forEach(e => { 
                    e.clearNumberSelection();
                    e.numberSelection.gift = {
                        checked: true,
                        number: this.getNumberSelection().gift.number
                    };
                });
            }
            else
                return;
        }

        this._cartService.saveToStorage();
        this._router.navigate(['ConfirmOrder']);
    }

    getOverlayText(catalog: Catalog) {
        if (catalog.isOnlyPrepaid()) {
            return 'Prepaid';
        }
        else if (catalog.isOnlyPostpaid()) {
            return 'Postpaid';
        }
        else if (catalog.isOnlyBroPrepaid()) {
            return 'Bro Prepaid';
        }
        else if (catalog.isOnlyBroPostpaid()) {
            return 'Bro Postpaid';
        }
    }

    getMobileNumbers() {
        return this._accountService.mobileNoList
            .map(e => e.phoneNo)
            .filter(e => e !== this.getCurrentNumber());
    }

    getCurrentNumber() {
        return this._accountService.selectedUserPhone.phoneNo;
    }

    stopPropagation(event) {
        event.stopPropagation();
    }

    toggleEditBill() {
        this.editBill = !this.editBill;
    }
	
}
