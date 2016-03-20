import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {LayoutService} from '../services/layout.service';
import {AuthService} from '../services/auth.service';
import {AccountService} from '../../shared/services/account.service';

@Component({
    selector: 'left-menu',
    templateUrl: 'app/shared/components/left-menu.component.html'
})
export class LeftMenuComponent {
    
    constructor(private _layoutService : LayoutService,
    private _router: Router,
    private _accountService: AccountService,
    private _authService: AuthService){
        
    }
    
    getUserData(){
        return this._accountService.selectedUserPhone;
    }
    getListOfPhone(){
        return this._accountService.mobileNoList;
    }
    
    toggleLeftMenu(){
        this._layoutService.toggleLeftMenu();
    }
    
    getLeftMenuState(){
        return this._layoutService.getLeftMenuState();
    }
    
    gotoProfile(){
        this._router.navigate(['Profile']);
    }
    
    gotoAccountOverview(){
        this._layoutService.accountFromHome = false;
        this._router.navigate(['AccountOverview']);
    }
    
    gotoManageNumber(){
        this._router.navigate(['ManageNumber']);
    }
    
    gotoActivityHistory(){
        this._layoutService.historyFromAccount = false;
        this._router.navigate(['ActivityHistory']);
    }
    
    logout(){
         this._authService.logOut();
    }
    
    closeLeftMenu(){
        
    }
    
}