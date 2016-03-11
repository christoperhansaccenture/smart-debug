import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MyBundleComponent} from './includes/my-bundle.component';
import {MyBalanceComponent} from './includes/my-balance.component';
import {MyPlanComponent} from './includes/my-plan.component';
import {MyPointComponent} from './includes/my-point.component';
import {MyNumberComponent} from './my-number.component';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
//import { Layout } from '../../model/layout';

@Component({
    selector: 'overview',
    templateUrl: 'app/my-smart/components/overview.component.html',
    directives: [
		MyBundleComponent,
        MyBalanceComponent,
        MyPlanComponent,
        MyPointComponent,
        MyNumberComponent
    ]
})
export class OverviewComponent  {
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService) {
		
		this._layoutService.setCurrentPage('MySmart');
		
	}
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    numberSelectionState(){
        return this._layoutService.getNumberSelectionState();
    }
	
}