import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {LayoutService} from '../services/layout.service';
import {AuthService} from '../services/auth.service';
import {AccountService} from '../../shared/services/account.service';
import {DesktopLeftMenuService} from '../../shared/services/desktop-left-menu.service';
import {CircularSpinnerComponent} from './spinners/circular-spinner.component';
import {MultiSliderComponent} from '../../shared/components/multi-slider.component';
import {CatalogService} from '../../my-rewards/services/catalog.service';

@Component({
    selector: 'smart-left-menu',
    templateUrl: 'app/shared/components/smart-left-menu.component.html',
    directives: [
        CircularSpinnerComponent,
        MultiSliderComponent
    ]
})
export class SmartLeftMenuComponent {
    
    constructor(private _layoutService : LayoutService,
    private _router: Router,
    private _accountService: AccountService,
    private _authService: AuthService,
    private _desktopLeftMenuService: DesktopLeftMenuService,
    private _catalogService: CatalogService){
        
    }
    
    isSelected(phone){
        if(phone.phoneNo === this._accountService.getSelectedUserPhone().phoneNo){
            return true;
        }else{
            return false;
        }
    }
    
    setSelectedNumber(phone){
        console.log(phone);
        this._accountService.setSelectedUserPhone(phone);
    }
    
    listOfMobileNumber(){
        return this._accountService.getMobileNumberlist();
    }
    
    toggleMyFavorites() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.myFavorites = !this.getFilter().categories.myFavorites;
    }

    toggleLifestyle() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.lifestyle = !this.getFilter().categories.lifestyle;
    }

    toggleMobile() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.mobile = !this.getFilter().categories.mobile;
        this.getFilter().categories.prepaid = this.getFilter().categories.mobile;
        this.getFilter().categories.postpaid = this.getFilter().categories.mobile;
        this.getFilter().categories.broPrepaid = this.getFilter().categories.mobile;
        this.getFilter().categories.broPostpaid = this.getFilter().categories.mobile;
    }

    togglePrepaid() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.prepaid = !this.getFilter().categories.prepaid;
    }

    togglePostpaid() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.postpaid = !this.getFilter().categories.postpaid;
    }

    toggleBroPrepaid() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.broPrepaid = !this.getFilter().categories.broPrepaid;
    }

    toggleBroPostpaid() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.broPostpaid = !this.getFilter().categories.broPostpaid;
    }
    
    getFilter() {
        return this._catalogService.filter;
    }
    
    goToCatalog(){
        this._desktopLeftMenuService.isCatalog();
        this._router.navigate(['Catalog']);
    }
    
    goToDeals(){
        this._desktopLeftMenuService.isDeals();
        this._router.navigate(['Perks']);
    }
    
    goToActivityHistory(){
        this._desktopLeftMenuService.isActivityHistory();
        this._router.navigate(['ActivityHistory']);
    }
    
    goToPayBill(){
        this._desktopLeftMenuService.isPayBill();
        this._router.navigate(['PayBill']);
    }
    
    goToTransfer(){
        this._desktopLeftMenuService.isTransfer();
        this._router.navigate(['Transfer']);
    }
    
    goToManageNumber(){
        this._desktopLeftMenuService.isManageNumber();
        this._router.navigate(['ManageNumber']);
    }
    
    goToProfile(){
        this._desktopLeftMenuService.isProfile();
        this._router.navigate(['Profile']);
    }
    
    goToChangePassword(){
        this._desktopLeftMenuService.isChangePassword();
        this._router.navigate(['ChangePassword']);
    }
    
    goToNewsletter(){
        this._desktopLeftMenuService.isNewsletter();
        this._router.navigate(['Newsletter']);
    }
    
    goToPlan(){
        this._desktopLeftMenuService.isPlan();
        this._router.navigate(['MyPlan']);
    }
    
    goToAddOn(){
        this._desktopLeftMenuService.isAddon();
        this._router.navigate(['BuyAddOns']);
    }
    
    goToPuk(){
        this._desktopLeftMenuService.isPuk();
        this._router.navigate(['InitializePuk']);
    }
    
    goToPastBill(){
        this._desktopLeftMenuService.isPastBill();
        this._router.navigate(['PastBill']);
    }
    
    goToPastActivity(){
        this._desktopLeftMenuService.isPastActivity();
        this._router.navigate(['SmartActivity']);
    }
    
    goToInternationalRoaming(){
        this._desktopLeftMenuService.isRoaming();
        this._router.navigate(['ActiveInterRoam']);
    }
    
    goToBillBalance(){
        this._desktopLeftMenuService.isBalance();
        this._router.navigate(['BillBalance']);
    }
    
    goToBillSetting(){
        this._desktopLeftMenuService.isBillSetting();
        this._router.navigate(['BillSetting']);
    }
        
    isSmartApp(){
        return this._layoutService.desktopMenu.smart;
    }
    
    isRewardApp(){
        return this._layoutService.desktopMenu.reward;
    }
    
    isAccount(){
        return this._layoutService.desktopMenu.account;
    }
    
    toggleRedeemPoints(){
        this._desktopLeftMenuService.toggleRedeemPoints();
    }
    
    toggleFilter(){
        this._desktopLeftMenuService.toggleFilter();
    }
    
    toggleNumberDetail(){
        this._desktopLeftMenuService.toggleNumberDetail();
    }
    
    toggleBillingDetail(){
        this._desktopLeftMenuService.toggleBillingDetail();
    }
    
    getRewardApp(){
        return this._desktopLeftMenuService.getRewardAppStatus();
    }
    
    getAccountApp(){
        return this._desktopLeftMenuService.getAccountAppStatus();
    }
    
    getSmartApp(){
        return this._desktopLeftMenuService.getSmartAppStatus();
    }
    
}
