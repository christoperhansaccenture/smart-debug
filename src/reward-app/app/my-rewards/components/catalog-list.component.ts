import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ItemBeltComponent} from './item-belt.component';
import {CatalogService} from '../services/catalog.service';

@Component({
    selector: 'overview',
    templateUrl: 'app/my-rewards/components/catalog-list.component.html'
})
export class CatalogListComponent {

    constructor(private _router: Router,
        private _matchMediaService: MatchMediaService,
        private _layoutService: LayoutService,
        private _catalogService: CatalogService) {

        this._catalogService.loadAllCatalogs();
        this._layoutService.setCurrentPage('CatalogList');

    }

    getResize() {
        return this._matchMediaService.getmm();
    }

    getCatalogListTitle() {
        let categories = this._catalogService.filter.getCategoryArray();
        if (categories.length == 1)
            return categories[0];
        else if (this.getCatalogs())
            return this.getCatalogs().length + " results";
        else
            return "0 results";
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
                        if (filter.isAll() || categoryArray.indexOf(e.categories[i]) > -1) {
                            // filter points 
                            if (e.points >= filter.points[0] && e.points <= filter.points[1]) {
                                result = true;
                                break;
                            }
                        }
                    }
                    return result;
                });
        }
        else
            return null;
    }

}
