import {Component} from 'angular2/core';
import {InformationModalComponent} from './modal-includes/information-modal.component';
import {ErrorModalComponent} from './modal-includes/error-modal.component';
import {ProfileModalComponent} from './modal-includes/profile-modal.component';
import {CatalogDisplayModalComponent} from './modal-includes/catalog-display-modal.component';
import {BuyAddOnsModalComponent} from './modal-includes/buyaddons-modal.component';
import {BillSettingModalComponent} from './modal-includes/billsetting-modal.component';
import {ModalService} from '../services/modal.service';

@Component({
    selector: 'my-modal',
    templateUrl: 'app/shared/components/modal.component.html',
    directives: [
        InformationModalComponent,
        ErrorModalComponent,
        ProfileModalComponent,
        CatalogDisplayModalComponent,
        BuyAddOnsModalComponent,
        BillSettingModalComponent
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