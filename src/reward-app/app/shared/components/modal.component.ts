import {Component} from 'angular2/core';
import {InformationModalComponent} from './modal-includes/information-modal.component';
import {CatalogDisplayModalComponent} from './modal-includes/catalog-display-modal.component';
import {ModalService} from '../services/modal.service';

@Component({
    selector: 'my-modal',
    templateUrl: 'app/shared/components/modal.component.html',
    directives: [
        InformationModalComponent,
        CatalogDisplayModalComponent
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