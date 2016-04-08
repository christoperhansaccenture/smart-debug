import {Component, OnInit} from 'angular2/core';
import { Router } from 'angular2/router';
import {LayoutService} from '../services/layout.service';
import {AuthService} from '../services/auth.service';
import {AccountService} from '../../shared/services/account.service';
import {CatalogService} from '../../my-rewards/services/catalog.service';
import {CircularSpinnerComponent} from './spinners/circular-spinner.component';
declare var ga:any;

declare var configChannel: any;

@Component({
    selector: 'left-menu',
    templateUrl: 'app/shared/components/left-menu.component.html',
    directives: [
        CircularSpinnerComponent
    ]
})
export class LeftMenuComponent implements OnInit  {
    
    selectedPhone;
    
    constructor(private _layoutService : LayoutService,
    private _router: Router,
    private _accountService: AccountService,
    private _authService: AuthService,
    private _catalogService: CatalogService){
        this._accountService.getMobileNumberlistFromBackEnd(false);
        let min = localStorage.getItem('mobileNo');
        this.selectedPhone = min;
        console.log("constructor " + min);
    }
    
    phoneChange() {
         console.log('phone is changed');
         //localStorage.setItem('phoneNumber',this.selectedPhone);
         console.log("constructor " + this.selectedPhone);
         localStorage.setItem('mobileNo',this.selectedPhone);
         this._accountService.setSelectedUserPhoneByPhoneNo(this.selectedPhone);
         this._catalogService.loadAllCatalogs(false);
     }
 
     ngOnInit() {
         let min = localStorage.getItem('mobileNo');
         this.selectedPhone = min;
      }
    
    isOnApp(){
        if(configChannel === 'app'){
            //console.log("run on app");
            return false;
        }else{
            return true;
        }
    }
    
    goToMyReward(){
        this._router.navigate(['MyRewards']);
        ga('send','event','Button clicked','MyRewards','');
    }
    
    goToMySmart(){
        this._router.navigate(['MySmart']);
        ga('send','event','Button clicked','MySmart','');
    }
    
    getAppLayout(){
       return this._layoutService.getAppLayout(); 
    }
    
    getSpinnerStatus(){
        return this._accountService.spinnerAccount;
    }
    
    getRewardsBalance(){
        return this._accountService.getRewardsBalance();
    }
    
    getUserData(){
        return this._accountService.selectedUserPhone;
    }
    getListOfPhone(){
        return this._accountService.mobileNoList;
    }
    
    toggleLeftMenu(){
        this._layoutService.toggleLeftMenu();
        ga('send','event','Button clicked','toggleLeftMenu','');
    }
    
    getLeftMenuState(){
        return this._layoutService.getLeftMenuState();
    }
    
    gotoProfile(){
        this._router.navigate(['Profile']);
        ga('send','event','Button clicked','Profile','');
    }
    
    gotoAccountOverview(){
        this._layoutService.accountFromHome = false;
        this._router.navigate(['AccountOverview']);
        ga('send','event','Button clicked','AccountOverview','');
    }
    
    gotoManageNumber(){
        this._router.navigate(['ManageNumber']);
        ga('send','event','Button clicked','ManageNumber','');
    }
    
    gotoActivityHistory(){
        this._layoutService.historyFromAccount = false;
        this._router.navigate(['ActivityHistory']);
        ga('send','event','Button clicked','ActivityHistory','');
    }
    
    logout(){
         this._authService.logOut();
         ga('send','event','Button clicked','logOut','');
    }
    
    closeLeftMenu(){
        
    }
    
}
