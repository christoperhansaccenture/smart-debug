import {Component} from 'angular2/core';
import {ModalService} from '../../services/modal.service';

@Component({
    selector: 'error-modal',
    templateUrl: 'app/shared/components/modal-includes/error-modal.component.html'
})
export class ErrorModalComponent {
    
    message = '';
    
    constructor(private _modalService: ModalService){
        this.message = this._modalService.errorMessage;
    }
    
    close(){
        this._modalService.toggleErrorModal();
    }
    
}