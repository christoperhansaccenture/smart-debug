import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {AccountService} from '../../shared/services/account.service';
import {SmartLeftMenuComponent} from '../../shared/components/smart-left-menu.component';
import {CircularSpinnerComponent} from '../../shared/components/spinners/circular-spinner.component';

@Component({
    selector: 'manage-number',
    templateUrl: './app/account/components/manage-number.component.html',
    directives: [
        SmartLeftMenuComponent,
        CircularSpinnerComponent
    ]
})
export class ManageNumberComponent  {
    
    addNumber:any= {
        page: false,
        first: false,
        second: false,
    };
    
    editNumber:any= {
        page: false,
        edit: false
    };
    modalSuccess = false;
    
    mobileNumber = '';
    
    userPhoneNumber: any = [];
    
    selectedPhoneNumber:any = {};
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _accountService: AccountService) {
		
        this._accountService.getMobileNumberlistFromBackEnd(false);
		this._layoutService.setCurrentPage('ManageNumber');
		this.userPhoneNumber = this._accountService.mobileNoList;
        
	}
    
    getSpinnerStatus(){
        return this._accountService.spinnerAccount;
    }
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    toggleAddNumber(){
        this._router.navigate(['AddNumber']);
        //this.addNumber.page = !this.addNumber.page;
        //this.addNumber.first = !this.addNumber.first;
    }
    
    toggleEditNumber(phoneNumber){
        this._accountService.setSelectedUserPhone(phoneNumber);
        this._router.navigate(['EditNumber']);
    }
	
}