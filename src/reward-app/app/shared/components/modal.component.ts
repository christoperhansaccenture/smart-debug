import {Component} from 'angular2/core';
import {UpdateCreditModalComponent} from './modal-includes/update-credit-modal.component';
import {InformationModalComponent} from './modal-includes/information-modal.component';
import {RenewPlanModalComponent} from './modal-includes/renew-plan-modal.component';
import {BalanceModalComponent} from './modal-includes/balance-description.component';
import {ModalService} from '../services/modal.service';

@Component({
    selector: 'my-modal',
    templateUrl: 'app/shared/components/modal.component.html',
    directives: [
        UpdateCreditModalComponent,
        InformationModalComponent,
        RenewPlanModalComponent,
        BalanceModalComponent
    ]
})
export class ModalComponent {
    
    constructor(private _modalService: ModalService){
        
    }
    
    getModalStatus(){
        return this._modalService.getModalState();
    }
    
    getMainModalStatus(){
        return this._modalService.getMainModalState();
    }
    
}