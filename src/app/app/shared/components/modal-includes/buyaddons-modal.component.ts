import {Component} from 'angular2/core';
import {ModalService} from '../../services/modal.service';

@Component({
    selector: 'buyaddons-modal',
    templateUrl: 'app/shared/components/modal-includes/buyaddons-modal.component.html'
})
export class BuyAddOnsModalComponent {
    
    constructor(private _modalService: ModalService){
    }
    
    close(){
        this._modalService.toggleBuyAddOnsModal();
    }
    
}