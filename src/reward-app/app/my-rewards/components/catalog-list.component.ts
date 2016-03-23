import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ItemBeltComponent} from './item-belt.component';
import {CatalogService} from '../services/catalog.service';
import {ModalService} from '../../shared/services/modal.service';
import {Catalog} from '../../shared/models/catalog';

@Component({
    selector: 'catalog-list',
    templateUrl: 'app/my-rewards/components/catalog-list.component.html'
})
export class CatalogListComponent {

    constructor(private _router: Router,
        private _matchMediaService: MatchMediaService,
        private _layoutService: LayoutService,
        private _catalogService: CatalogService,
        private _modalService: ModalService) {

        this._catalogService.loadAllCatalogs();
        this._layoutService.setCurrentPage('CatalogList');

    }

    getResize() {
        return this._matchMediaService.getmm();
    }

    getCatalogListTitle() {
        let categories = this._catalogService.filter.getCategoryArray();
        /*
        if (categories.length == 1)
            return categories[0];
        */
        if (this.getCatalogs())
            return "We found " + this.getCatalogs().length + " item(s)";
        else
            return "We found 0 item(s)";
    }

    getCatalogs() {
        if (this._catalogService.catalogs) {
            return this._catalogService.catalogs
                .filter(e => {
                    let filter = this._catalogService.filter;
                    let result = false;
                    let categoryArray = filter.getCategoryArray();
                    // filter category
                    for (let i = 0 ; i < e.categories.length ; i++) {
                        if (filter.isAll() 
                            || (filter.categories.myFavorites && e.favorite) 
                            || categoryArray.indexOf(e.categories[i]) > -1) {
                            // filter points 
                            if (e.points >= filter.points[0] && e.points <= filter.points[1]) {
                                result = true;
                                break;
                            }
                        }
                    }
                    // filter name
                    if (result) {
                        result = e.name.toLowerCase().indexOf(filter.name.toLowerCase()) > -1;
                    }
                    return result;
                }).sort((a, b) => a.points - b.points);
        }
        else
            return null;
    }

    openCatalogDisplay(catalog) {
        this._catalogService.selectedCatalog = catalog;
        this._modalService.toggleCatalogDisplayModal();
    }

    getOverlayText(catalog: Catalog) {
        if (catalog.isOnlyPrepaid()) {
            return 'Prepaid';
        }
        else if (catalog.isOnlyPostpaid()) {
            return 'Postpaid';
        }
        else if (catalog.isOnlyBroPrepaid()) {
            return 'Bro Prepaid';
        }
        else if (catalog.isOnlyBroPostpaid()) {
            return 'Bro Postpaid';
        }
    }

    toggleFavorite(catalog: Catalog, event) {
        catalog.favorite = !catalog.favorite;
        this._catalogService.updateFavorite(catalog);
        event.stopPropagation();
    }

}
