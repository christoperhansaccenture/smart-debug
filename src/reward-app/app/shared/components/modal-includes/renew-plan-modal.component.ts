import {Component} from 'angular2/core';
import {ModalService} from '../../services/modal.service';

@Component({
    selector: 'renew-plan',
    templateUrl: 'app/shared/components/modal-includes/renew-plan-modal.component.html'
})
export class RenewPlanModalComponent {

    constructor (private _modalService: ModalService) {}

    cancelRenewPlan(){
        return this._modalService.openCloseRenewPlan();
    }
    
    updatePlan(){
        this._modalService.openCloseRenewPlan();
        this._modalService.openCloseRenewPlanConf();
    }
    
}
