import {Component} from 'angular2/core';
import {ModalService} from '../../services/modal.service';
import {CatalogService} from '../../../my-rewards/services/catalog.service';
import {CartService} from '../../services/cart.service';

@Component({
    selector: 'catalog-display-modal',
    templateUrl: 'app/shared/components/modal-includes/catalog-display-modal.component.html'
})
export class CatalogDisplayModalComponent {
    
    constructor(private _modalService: ModalService,
               private _catalogService: CatalogService,
               private _cartService: CartService){
    }
    
    getCatalog() {
        return this._catalogService.selectedCatalog;
    }

    addToCart() {
        this._cartService.addItemToCart(this.getCatalog());
        this.close();
    }
    
    close(){
        this._modalService.toggleCatalogDisplayModal();
    }

}
