import {Component} from 'angular2/core';
import {AccountService} from '../../../shared/services/account.service';

@Component({
    selector: 'my-balance',
    templateUrl: 'app/my-smart/components/includes/my-balance.component.html'
})
export class MyBalanceComponent {
    
    constructor (private _accountService: AccountService) {
       // this._accountService.getBalanceFromBackEnd(false);
    }
    
    selectedPhoneNumber(){
        //return this._accountService.getSelectedPhoneNumber();
    }
    
    getBalance(){
       // return this._accountService.getBalance();
    }
    
}