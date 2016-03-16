import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {RewardTypeService} from '../services/reward-type.service';
import {CatalogService} from '../services/catalog.service';
import {ItemBeltComponent} from './item-belt.component';
//import { Layout } from '../../model/layout';

@Component({
    selector: 'overview',
    templateUrl: 'app/my-rewards/components/overview.component.html',
    directives: [
        ItemBeltComponent
    ]
})
export class OverviewComponent  {
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _rewardTypeService: RewardTypeService,
        private _catalogService: CatalogService) {
		
		this._layoutService.setCurrentPage('MyRewards');
        this._catalogService.loadAllCatalogs();
		
	}
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    numberSelectionState(){
        return this._layoutService.getNumberSelectionState();
    }
    
    openDetailPage(type:string){
        this._rewardTypeService.setSelectedType(type);
    }
    
    gotoAccountOverview(){
        this._router.navigate(['AccountOverview']);
    }
	
}
