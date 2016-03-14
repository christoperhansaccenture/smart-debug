import {Component} from 'angular2/core';
import {ModalService} from '../../services/modal.service';

@Component({
    selector: 'info-modal',
    templateUrl: 'app/shared/components/modal-includes/information-modal.component.html'
})
export class InformationModalComponent {
    
    constructor(private _modalService: ModalService){
        
    }
    
    getInfoModalStatus(){
        return this._modalService.getInfoModalState();
    }
    
    close(){
        
        // if(this._modalService.getInfoModalState().renewPlan){
        //     this._modalService.openCloseRenewPlanConf();
        // }
        // else{
        //     this._modalService.openCloseUpdateCreditConf();
        // }
    }
    
}
