import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {CartService} from '../../shared/services/cart.service';
import {ItemBeltComponent} from './item-belt.component';

@Component({
    selector: 'overview',
    templateUrl: 'app/my-rewards/components/pay-bill.component.html'
})
export class PayBillComponent  {

    selection = 'SMART';
    number;
    amount;
    pin;
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _cartService: CartService) {
		
		this._layoutService.setCurrentPage('PayBill');
		
	}
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    numberSelectionState(){
        return this._layoutService.getNumberSelectionState();
    }

    addToCart() {
        this._cartService.addBillToCart(this.selection, this.number, this.amount, this.pin);
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
	
}
