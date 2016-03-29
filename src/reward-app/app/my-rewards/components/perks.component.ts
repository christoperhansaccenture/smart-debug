import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ItemBeltComponent} from './item-belt.component';
import {RewardTypeService} from '../services/reward-type.service';
import {CatalogService} from '../services/catalog.service';
import {ModalService} from '../../shared/services/modal.service';
import {Catalog} from '../../shared/models/catalog';

//import { Layout } from '../../model/layout';

@Component({
    selector: 'perks',
    templateUrl: './app/my-rewards/components/perks.component.html'
})
export class PerksComponent  {
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _rewardTypeService: RewardTypeService,
        private _catalogService: CatalogService,
        private _modalService: ModalService) {
		
        this._catalogService.loadAllCatalogs();
		this._layoutService.setCurrentPage('Perks');
		
	}
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    numberSelectionState(){
        return this._layoutService.getNumberSelectionState();
    }
    
    getRewardTypeText(){
        return this. _rewardTypeService.getSelectedType();
    }
    
    getCatalogs() {
        if (this._catalogService.catalogs) {
            return this._catalogService.catalogs
                .filter(e => {
                    return e.points == 0 && e.categories.indexOf('Deals') > -1;
                });
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
