import {Component} from 'angular2/core';
import {ModalService} from '../../services/modal.service';

@Component({
    selector: 'login-modal',
    templateUrl: 'app/shared/components/modal-includes/login-modal.component.html'
})
export class LoginModalComponent {
    
    constructor(private _modalService: ModalService){
    }
    
    close() {
        this._modalService.toggleLoginModal();
    }

}
