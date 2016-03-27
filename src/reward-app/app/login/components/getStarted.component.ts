import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';

@Component({
    selector: 'getStarted',
    templateUrl: './app/login/components/getStarted.html'
})
export class GetStartedComponent {
	
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService) {
		
		this._layoutService.setCurrentPage('GetStarted');
		
	}
    
    gotoLogin() {
        let link = ['Login'];
        this._router.navigate(link);
    }
	
	getResize(){
        return this._matchMediaService.getmm();
        
    }
	
}