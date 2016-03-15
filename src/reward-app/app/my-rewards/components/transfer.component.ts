import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ModalService} from '../../shared/services/modal.service';

@Component({
    selector: 'transfer',
    templateUrl: 'app/my-rewards/components/transfer.component.html'
})
export class TransferComponent  {
    
    starting = 1010;
    transferred = 0;
    phone = '';
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _modalService: ModalService) {
		
		this._layoutService.setCurrentPage('Transfer');
		
	}
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    doTransfer(){
        this._modalService.toggleTransferModal();
        this._modalService.setTransferData(this.transferred,this.phone);
    }
	
}