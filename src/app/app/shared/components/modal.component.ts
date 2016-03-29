import {Component} from 'angular2/core';
import {InformationModalComponent} from './modal-includes/information-modal.component';
import {ErrorModalComponent} from './modal-includes/error-modal.component';
import {ProfileModalComponent} from './modal-includes/profile-modal.component';
import {ModalService} from '../services/modal.service';

@Component({
    selector: 'my-modal',
    templateUrl: 'app/shared/components/modal.component.html',
    directives: [
        InformationModalComponent,
        ErrorModalComponent,
        ProfileModalComponent
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