import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ItemBeltComponent} from './item-belt.component';
//import { Layout } from '../../model/layout';

@Component({
    selector: 'overview',
    templateUrl: './app/my-rewards/components/mobile-reward.component.html'
})
export class MobileRewardComponent  {
    
    
    typeMenu: any = {
        postpaid: true,
        prepaid: false,
        broPostpaid: false,
        broPrepaid: false
    }
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService) {
		
		this._layoutService.setCurrentPage('MobileReward');
		
	}
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    numberSelectionState(){
        return this._layoutService.getNumberSelectionState();
    }
    
    activateType(type){
        
        if(type===0){
            this.typeMenu.postpaid = true;
            this.typeMenu.prepaid = false;
            this.typeMenu.broPostpaid = false;
            this.typeMenu.broPrepaid = false;
        }
        else if(type===1){
            this.typeMenu.postpaid = false;
            this.typeMenu.prepaid = true;
            this.typeMenu.broPostpaid = false;
            this.typeMenu.broPrepaid = false;
        }
        else if(type===2){
            this.typeMenu.postpaid = false;
            this.typeMenu.prepaid = false;
            this.typeMenu.broPostpaid = true;
            this.typeMenu.broPrepaid = false;
        }
        else if(type===3){
            this.typeMenu.postpaid = false;
            this.typeMenu.prepaid = false;
            this.typeMenu.broPostpaid = false;
            this.typeMenu.broPrepaid = true;
        }
    }
	
}