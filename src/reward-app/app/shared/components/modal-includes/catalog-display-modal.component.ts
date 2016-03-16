import {Component} from 'angular2/core';
import {ModalService} from '../../services/modal.service';
import {CatalogService} from '../../../my-rewards/services/catalog.service';

@Component({
    selector: 'catalog-display-modal',
    templateUrl: 'app/shared/components/modal-includes/catalog-display-modal.component.html'
})
export class CatalogDisplayModalComponent {
    
    constructor(private _modalService: ModalService,
               private _catalogService: CatalogService){
    }
    
    getCatalog(){
        return this._catalogService.selectedCatalog;
    }
    
    close(){
        this._modalService.toggleCatalogDisplayModal();
    }

}
