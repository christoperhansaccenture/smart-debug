import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ItemBeltComponent} from './item-belt.component';
import {RewardTypeService} from '../services/reward-type.service';
//import { Layout } from '../../model/layout';

@Component({
    selector: 'perks',
    templateUrl: 'app/my-rewards/components/perks.component.html'
})
export class PerksComponent  {
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _rewardTypeService: RewardTypeService) {
		
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
	
}