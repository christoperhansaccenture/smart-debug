import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {AccountService} from '../../shared/services/account.service';
import {PhoneNumber} from '../../shared/models/phone-number';

@Component({
    selector: 'my-number',
    templateUrl: 'app/my-smart/components/my-number.component.html'
})
export class MyNumberComponent {
	
    allPhoneNumbers: PhoneNumber[];
    
    constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _accountService: AccountService) {
       
	}
    
    getAllAvalaiblePhoneNumber(){
        this.allPhoneNumbers= this._accountService.getAllAvalaiblePhoneNumber();
        return this.allPhoneNumbers;
    }
    
    selectPhoneNumber(number: PhoneNumber){
        
        this._accountService.setSelectedPhoneNumber(number);
        this._layoutService.setNumberSelectionState();
        
    }
	
	getResize(){
        return this._matchMediaService.getmm();
    }
    
    gotoManageNumber(){
        this._router.navigate(['ManageNumber']);
    }
}