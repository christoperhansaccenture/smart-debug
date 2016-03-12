import {Component} from 'angular2/core';
import {ModalService} from '../../services/modal.service';

@Component({
    selector: 'balance-modal',
    templateUrl: 'app/shared/components/modal-includes/balance-description.component.html'
})
export class BalanceModalComponent {
    
    constructor (private _modalService: ModalService) {}

    closePrevBill(){
        return this._modalService.openClosePrevBillDesc();
    }
    
    closeCurrBill(){
        return this._modalService.openCloseCurrBillDesc();
    }
    
    closeAmountDue(){
        return this._modalService.openCloseAmountDueDesc();
    }
    
    closePaymentDue(){
        return this._modalService.openClosePaymentDueDesc();
    }
    
    closeMinDue(){
        return this._modalService.openCloseMinDueDesc();
    }
    
    closeUnbilledUsage(){
        return this._modalService.openCloseUnbilledUsageDesc();
    }
    
    closeLoadBal(){
        return this._modalService.openCloseLoadBalDesc();
    }
    
    closeCurBillCharge(){
        return this._modalService.openCloseCurBillChargeDesc();
    }
    
    getBalanceModalStatus(){
        return this._modalService.getBalanceModalState();
    }
    
}
