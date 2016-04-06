import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {CartService} from '../../shared/services/cart.service';
import {ItemBeltComponent} from './item-belt.component';
import {AccountService} from '../../shared/services/account.service';
import {SmartLeftMenuComponent} from '../../shared/components/smart-left-menu.component';
declare var ga:any;

@Component({
    selector: 'overview',
    templateUrl: './app/my-rewards/components/pay-bill.component.html',
    directives: [
        SmartLeftMenuComponent
    ]
})
export class PayBillComponent  {

    selection = 'SMART';
    number;
    amount;
    pin;
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _cartService: CartService,
        private _accountService: AccountService) {
		
		this._layoutService.setCurrentPage('PayBill');
		
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

    addToCart() {
        if (this.isFormValid()) {
            this._cartService.addBillToCart(this.selection, this.number, this.amount, this.pin);
            this.resetForm();
            ga('send','event','Order','Add Item to Cart','Pay Bill ' + this.selection);
        }
    }

    getNumberPlaceholder() {
        let str: string = 'Number';
        if (this.selection === 'SMART')
            str = 'Smart ' + str;
        else if (this.selection === 'PLDT')
            str = 'PLDT ' + str;
        return str;
    }

    getPointsNeeded() {
        return this.amount ? this.amount : 0;
    }

    isFormValid() {
        return this.number && this.amount && this.pin;
    }

    resetForm() {
        this.selection = 'SMART';
        this.number = "";
        this.amount = "";
        this.pin = "";
    }
	
}
