import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {RewardTypeService} from '../services/reward-type.service';
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
        private _rewardTypeService: RewardTypeService) {
		
		this._layoutService.setCurrentPage('MyRewards');
		
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
	
}