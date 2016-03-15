import {Component, OnInit} from 'angular2/core';
import {CatalogService} from '../services/catalog.service';

@Component({
    selector: 'most-popular-item-belt',
    templateUrl: 'app/my-rewards/components/most-popular-item-belt.component.html',
})
export class MostPopularItemBeltComponent implements OnInit {

	constructor (private _catalogService: CatalogService) {}

    ngOnInit() {
        this._catalogService.loadAllCatalogs();
    }

    getCategories() {
        if (this._catalogService.catalogs) {
            return this._catalogService.catalogs
                .filter(e => e.categories.indexOf('Most Popular') > -1)
                .slice(0, 11);
        }
        else
            return null;
    }
    
}
