import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
//import { Layout } from '../../model/layout';
import {AccountService} from '../../shared/services/account.service';
import {PhoneNumber} from '../../shared/models/phone-number';

@Component({
    selector: 'managanumber',
    templateUrl: 'app/my-smart/components/manage-number.component.html',
})
export class ManageNumberComponent  {
    
    allPhoneNumbers: PhoneNumber[];
    PackageType: string;
    
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService,
        private _accountService: AccountService) {
		
		this._layoutService.setCurrentPage('ManageNumber');
		this.allPhoneNumbers= _accountService.getAllAvalaiblePhoneNumber();
	}
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    getType(){
       if(this._accountService.selectedPhoneNumber.type=="postpaid")  {
          return ("Mobile Postpaid");}
       else if(this._accountService.selectedPhoneNumber.type=="broadband")  {
          return ("Smart Bro Postpaid");}
       else if(this._accountService.selectedPhoneNumber.type=="postpaid")  {
          return ("Mobile Prepaid"); }  
       } 
	
}