import {Component} from 'angular2/core';
import {ModalService} from '../../services/modal.service';

@Component({
    selector: 'update-credit',
    templateUrl: 'app/shared/components/modal-includes/update-credit-modal.component.html'
})
export class UpdateCreditModalComponent {
    
    constructor (private _modalService: ModalService) {}

    cancelCreditLimit(){
        return this._modalService.openCloseUpdateCredit();
    }
    
    updateCredit(){
        this._modalService.openCloseUpdateCredit();
        this._modalService.openCloseUpdateCreditConf();
    }
    
}
