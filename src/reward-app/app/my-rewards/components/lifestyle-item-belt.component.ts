import {Component, OnInit} from 'angular2/core';
import {CatalogService} from '../services/catalog.service';
import {ModalService} from '../../shared/services/modal.service';

@Component({
    selector: 'lifestyle-item-belt',
    templateUrl: 'app/my-rewards/components/lifestyle-item-belt.component.html',
})
export class LifestyleItemBeltComponent implements OnInit {

	constructor (private _catalogService: CatalogService,
        private _modalService: ModalService) {}

    ngOnInit() {
        this._catalogService.loadAllCatalogs();
    }

    getCategories() {
        if (this._catalogService.catalogs) {
            return this._catalogService.catalogs
                .filter(e => e.categories.indexOf('Lifestyle') > -1)
                .slice(0, 11);
        }
        else
            return null;
    }

    openCatalogDisplay(catalog) {
        this._catalogService.selectedCatalog = catalog;
        this._modalService.toggleCatalogDisplayModal();
    }
    
}
