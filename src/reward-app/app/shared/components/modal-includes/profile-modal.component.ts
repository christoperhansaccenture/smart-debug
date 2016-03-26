import {Component} from 'angular2/core';
import {ModalService} from '../../services/modal.service';

@Component({
    selector: 'profile-modal',
    templateUrl: 'app/shared/components/modal-includes/profile-modal.component.html'
})
export class ProfileModalComponent {
    
    message = '';
    
    constructor(private _modalService: ModalService){
        
        this.message = 'Profile Successfuly updated';
        
    }
    
    close(){
        this._modalService.toggleProfileModal();
    }
    
}