import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MyNumberComponent} from './my-number.component';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
//import { Layout } from '../../model/layout';
import {AccountService} from '../../shared/services/account.service';
import {ModalService} from '../../shared/services/modal.service';

@Component({
    selector: 'plan',
    templateUrl: 'app/my-smart/components/plan.component.html',
    directives: [
        MyNumberComponent
    ]
})
export class PlanComponent  {
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _accountService: AccountService,
        private _modalService: ModalService) {
		
		this._layoutService.setCurrentPage('Plan');
		
	}
    
    getPlanName(){
        this._accountService.getPlanName();
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
    
    editCreditLimit(){
        return this._modalService.openCloseUpdateCredit();
    }
    
    renewPlan(){
        return this._modalService.openCloseRenewPlan();
    }
	
}