import {Component} from 'angular2/core';
import {ModalService} from '../../services/modal.service';

@Component({
    selector: 'info-modal',
    templateUrl: 'app/shared/components/modal-includes/information-modal.component.html'
})
export class InformationModalComponent {
    
    points;
    phone;
    
    constructor(private _modalService: ModalService){
        this.points = _modalService.getTransferData().point;
        this.phone = _modalService.getTransferData().phone;
    }
    
    getInfoModalStatus(){
        return this._modalService.getInfoModalState();
    }
    
    close(){
        this._modalService.toggleTransferModal();
    }
    
}
