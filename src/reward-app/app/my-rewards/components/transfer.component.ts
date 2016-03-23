import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ModalService} from '../../shared/services/modal.service';
import {AccountService} from '../../shared/services/account.service';

@Component({
    selector: 'transfer',
    templateUrl: 'app/my-rewards/components/transfer.component.html'
})
export class TransferComponent  {
    
    transferred;
    phone = '';
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _accountService: AccountService,
        private _modalService: ModalService) {
		
		this._layoutService.setCurrentPage('Transfer');
		
	}
    
    getPointValue(){
        return (this._accountService.selectedUserPhone.rewards) ? this._accountService.selectedUserPhone.rewards : 0;
    }
    
    getRemainingPoints(){
        if(this.transferred === "" || this.transferred === null || this.transferred === undefined){
            return  this.getPointValue();
        }else{
            return ( this.getPointValue() - this.transferred);
        }
    }
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    doTransfer(){
        this._modalService.toggleTransferModal();
        this._modalService.setTransferData(this.transferred,this.phone);
    }
	
}