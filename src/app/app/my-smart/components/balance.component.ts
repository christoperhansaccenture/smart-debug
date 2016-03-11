import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MyNumberComponent} from './my-number.component';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
//import { Layout } from '../../model/layout';
import {AccountService} from '../../shared/services/account.service';
import {ModalService} from '../../shared/services/modal.service';

@Component({
    selector: 'balance',
    templateUrl: 'app/my-smart/components/balance.component.html',
    directives: [
        MyNumberComponent
    ]
})
export class BalanceComponent  {
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _accountService: AccountService,
        private _modalService: ModalService) {
		
		this._layoutService.setCurrentPage('Balance');
        this._accountService.getBalanceFromBackEnd(false);
		
	}
    
    getBalance(){
        
        return this._accountService.getBalance();
    }
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    numberSelectionState(){
        return this._layoutService.getNumberSelectionState();      
    }
    
    selectedPhoneNumber(){
        return this._accountService.getSelectedPhoneNumber();
    }
    
    PrevBillDesc(){
        return this._modalService.openClosePrevBillDesc();
    }
    
    CurrBillDesc(){
        return this._modalService.openCloseCurrBillDesc();
    }
    
    AmountDueDesc(){
        return this._modalService.openCloseAmountDueDesc();
    }
    
    PaymentDueDesc(){
        return this._modalService.openClosePaymentDueDesc();
    }
    
    MinDueDesc(){
        return this._modalService.openCloseMinDueDesc();
    }
    
    UnbilledUsageDesc(){
        return this._modalService.openCloseUnbilledUsageDesc();
    }
    
    LoadBalDesc(){
        return this._modalService.openCloseLoadBalDesc();
    }
    
    CurBillChargeDesc(){
        return this._modalService.openCloseCurBillChargeDesc();
    }
    
}