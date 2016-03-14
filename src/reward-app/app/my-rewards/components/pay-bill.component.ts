import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ItemBeltComponent} from './item-belt.component';

@Component({
    selector: 'overview',
    templateUrl: 'app/my-rewards/components/pay-bill.component.html'
})
export class PayBillComponent  {
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService) {
		
		this._layoutService.setCurrentPage('PayBill');
		
	}
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    numberSelectionState(){
        return this._layoutService.getNumberSelectionState();
    }
	
}