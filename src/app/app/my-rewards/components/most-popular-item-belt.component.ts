import {Component, OnInit} from 'angular2/core';
import {CatalogService} from '../services/catalog.service';
import {ModalService} from '../../shared/services/modal.service';
import {StringTruncatePipe} from '../../shared/pipes/string-truncate.pipe';
import {CircularSpinnerComponent} from '../../shared/components/spinners/circular-spinner.component';
declare var ga:any;

@Component({
    selector: 'most-popular-item-belt',
    templateUrl: './app/my-rewards/components/most-popular-item-belt.component.html',
    pipes: [
        StringTruncatePipe
    ],
    directives: [
        CircularSpinnerComponent
    ]
})
export class MostPopularItemBeltComponent implements OnInit {

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
            return this._catalogService.getMostPopularCatalogs()
                .slice(0, 11);
        }
        else
            return null;
    }

    openCatalogDisplay(catalog) {
        this._catalogService.selectedCatalog = catalog;
        this._modalService.toggleCatalogDisplayModal();
        ga('send','event','Button Clicked','Open Catalog Display',catalog.name);
    }
    
}
