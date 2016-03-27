import {Component, OnInit} from 'angular2/core';
import {CatalogService} from '../services/catalog.service';
import {ModalService} from '../../shared/services/modal.service';
import {StringTruncatePipe} from '../../shared/pipes/string-truncate.pipe';

@Component({
    selector: 'all-category-item-belt',
    templateUrl: './app/my-rewards/components/all-category-item-belt.component.html',
    pipes: [
        StringTruncatePipe
    ]
})
export class AllCategoryItemBeltComponent implements OnInit {

	constructor (private _catalogService: CatalogService,
        private _modalService: ModalService) {}

    ngOnInit() {
        this._catalogService.loadAllCatalogs();
    }

    getCategories() {
        if (this._catalogService.catalogs) {
            return this._catalogService.catalogs.
            sort((a, b) => {
                if (a > b) {
                    return 1;
                }

                if (a < b) {
                    return -1;
                }
            }).sort((a, b) => a.points - b.points).slice(0, 11);
        }
        else
            return null;
    }

    openCatalogDisplay(catalog) {
        this._catalogService.selectedCatalog = catalog;
        this._modalService.toggleCatalogDisplayModal();
    }
    
}
