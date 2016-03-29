import {Component, OnInit} from 'angular2/core';
import {CatalogService} from '../services/catalog.service';
import {ModalService} from '../../shared/services/modal.service';
import {StringTruncatePipe} from '../../shared/pipes/string-truncate.pipe';
import {CircularSpinnerComponent} from '../../shared/components/spinners/circular-spinner.component';

@Component({
    selector: 'mobile-item-belt',
    templateUrl: './app/my-rewards/components/mobile-item-belt.component.html',
    pipes: [
        StringTruncatePipe
    ],
    directives: [
        CircularSpinnerComponent
    ]
})
export class MobileItemBeltComponent implements OnInit {

	constructor (private _catalogService: CatalogService,
        private _modalService: ModalService) {}

    ngOnInit() {
        this._catalogService.loadAllCatalogs();
    }

    isLoading() {
        return !this._catalogService.isCatalogsLoaded();
    }

    getCategories() {
        if (this._catalogService.catalogs) {
            return this._catalogService.catalogs
                .filter(e => e.categories.indexOf('Mobile') > -1)
                .sort((a, b) => a.points - b.points)
                .slice(0, 11)
                .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        }
        else
            return null;
    }

    openCatalogDisplay(catalog) {
        this._catalogService.selectedCatalog = catalog;
        this._modalService.toggleCatalogDisplayModal();
    }
    
}
