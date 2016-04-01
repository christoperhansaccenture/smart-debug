import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {AccountService} from '../../shared/services/account.service';
import {SmartLeftMenuComponent} from '../../shared/components/smart-left-menu.component';

@Component({
    selector: 'add-number',
    templateUrl: './app/account/components/add-number.component.html',
    directives: [
        SmartLeftMenuComponent
    ]
})
export class AddNumberComponent  {
    
    addNumber:any= {
        page: false,
        first: false,
        second: false,
    };
    

    modalSuccess = false;
    
    mobileNumber = '';
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _accountService: AccountService) {
		
		this._layoutService.setCurrentPage('AddNumber');
        
	}
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    goTonextPageOfAddNumber(){
        this._router.navigate(['AddNumberConfirm']);
    }
    
    close(){
        this.modalSuccess = false;
        this.addNumber.page = false;
        this.addNumber.first = false;
        this.addNumber.second = false;
    }
	
}