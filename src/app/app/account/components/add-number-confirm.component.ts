import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {AccountService} from '../../shared/services/account.service';
import {SmartLeftMenuComponent} from '../../shared/components/smart-left-menu.component';
declare var ga:any;

@Component({
    selector: 'add-number-konfirmasi',
    templateUrl: './app/account/components/add-number-confirm.component.html',
    directives: [
        SmartLeftMenuComponent
    ]
})
export class AddNumberConfirmComponent  {
    
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
		
		this._layoutService.setCurrentPage('AddNumberConfirm');
        
	}
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    toggleAddNumber(){
        this.addNumber.page = !this.addNumber.page;
        this.addNumber.first = !this.addNumber.first;
        ga('send','event','Button Clicked','toggleAddNumber','');
    }
    
    AddNumber(){
        this.modalSuccess = true;
    }
    
    close(){
        this.modalSuccess = false;
        this._router.navigate(['ManageNumber']);
        ga('send','event','Button Clicked','ManageNumber','');
    }
	
}