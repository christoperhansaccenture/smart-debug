import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ModalService} from '../../shared/services/modal.service';
import {AccountService} from '../../shared/services/account.service';
import {SmartLeftMenuComponent} from '../../shared/components/smart-left-menu.component';
declare var ga:any;

@Component({
    selector: 'transfer',
    templateUrl: './app/my-rewards/components/transfer.component.html',
    directives: [
        SmartLeftMenuComponent
    ]
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
    
    getRewardsBalance(){
        return this._accountService.getRewardsBalance();
    }
    
    getPointValue(){
        return (this._accountService.getRewardsBalance().rewards) ? this._accountService.getRewardsBalance().rewards : 0;
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
    
    ableToTransfer(){
        if((this.phone !== '' || this.phone !== undefined || this.phone !== null) &&
            (this.transferred !== '' || this.transferred !== undefined || this.transferred !== null)){
            
            if(this.getPointValue() - this.transferred >= 0){
               return true; 
            }else{
                return false;
            }
                    
        }else{
            return false;
        }
        
    }
    
    doTransfer(){
        
        if(this.ableToTransfer()){
                
            var transferData:any = {
         
                from: this._accountService.getSelectedUserPhone().phoneNo,
                to : this.phone,
                srcCurrId: 1,
                destCurrId: 1,
                amount: this.transferred 
                
            };
            
            this._accountService.transferPoints(transferData);     
            ga('send','event','Transfer','Transfer', transferData);
        }

    }
	
}