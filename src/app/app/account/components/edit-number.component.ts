import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {AccountService} from '../../shared/services/account.service';
import {SmartLeftMenuComponent} from '../../shared/components/smart-left-menu.component';

@Component({
    selector: 'manage-number',
    templateUrl: './app/account/components/edit-number.component.html',
    directives: [
        SmartLeftMenuComponent
    ]
})
export class EditNumberComponent  {
    
    editNumber:any= {
        page: false,
        edit: false
    };
    modalSuccess = false;
    
    selectedPhoneNumber:any = {};
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _accountService: AccountService) {
		
		this._layoutService.setCurrentPage('EditNumber');
		this.selectedPhoneNumber = this._accountService.getSelectedUserPhone();
        
	}
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    editable(){
        this.editNumber.edit = true;
    }
    
    doEditNumber(){
        if(this.editNumber.edit){
            this.modalSuccess = true;    
        }
    }
    
    close(){
        this.modalSuccess = false;
        this._router.navigate(['ManageNumber']);
    }
	
}