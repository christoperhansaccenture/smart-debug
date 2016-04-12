import {Component} from 'angular2/core';
import {ModalService} from '../services/modal.service';
import {LoginModalComponent} from './modal-includes/login-modal.component';


@Component({
    selector: 'my-modal',
    templateUrl: 'app/shared/components/modal.component.html',
    directives: [
        LoginModalComponent
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