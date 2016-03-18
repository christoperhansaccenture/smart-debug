import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
//import { Layout } from '../../model/layout';

@Component({
    selector: 'account-overview',
    templateUrl: 'app/account/components/account-overview.component.html'
})
export class AccountOverviewComponent  {
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService) {
		
		this._layoutService.setCurrentPage('AccountOverview');
		
	}
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    gotoActivityHistory(){
        this._layoutService.historyFromAccount = true;
        this._router.navigate(['ActivityHistory']);
    }
	
}