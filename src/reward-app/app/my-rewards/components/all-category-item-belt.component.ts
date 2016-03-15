import {Component, OnInit} from 'angular2/core';
import {CatalogService} from '../services/catalog.service';

@Component({
    selector: 'all-category-item-belt',
    templateUrl: 'app/my-rewards/components/all-category-item-belt.component.html',
})
export class AllCategoryItemBeltComponent implements OnInit {

	constructor (private _catalogService: CatalogService) {}

    ngOnInit() {
        this._catalogService.loadAllCatalogs();
    }

    getCategories() {
        if (this._catalogService.catalogs) {
            return this._catalogService.catalogs.slice(0, 11);
        }
        else
            return null;
    }
    
}
