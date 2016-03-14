import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ItemBeltComponent} from './item-belt.component';

@Component({
    selector: 'overview',
    templateUrl: 'app/my-rewards/components/transfer.component.html'
})
export class TransferComponent  {
    
    starting = 1010;
    transferred = 0;
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService) {
		
		this._layoutService.setCurrentPage('Transfer');
		
	}
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    numberSelectionState(){
        return this._layoutService.getNumberSelectionState();
    }
	
}