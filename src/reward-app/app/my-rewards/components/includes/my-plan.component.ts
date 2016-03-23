import {Component} from 'angular2/core';
import {AccountService} from '../../../shared/services/account.service';

@Component({
    selector: 'my-plan',
    templateUrl: 'app/my-smart/components/includes/my-plan.component.html'
})
export class MyPlanComponent {
    
    constructor (private _accountService: AccountService) {}
    
    selectedPhoneNumber(){
        //return this._accountService.getSelectedPhoneNumber();
        return "";
    }
    
    getPlanName(){
        //return this._accountService.getPlanName();
        return "";
    }
    
}
