import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {LayoutService} from '../services/layout.service';
import {AuthService} from '../services/auth.service';
import {AccountService} from '../../shared/services/account.service';
import {DesktopLeftMenuService} from '../../shared/services/desktop-left-menu.service';
import {CircularSpinnerComponent} from './spinners/circular-spinner.component';
import {MultiSliderComponent} from '../../shared/components/multi-slider.component';
import {CatalogService} from '../../my-rewards/services/catalog.service';
declare var ga:any;

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
        if(phone.phoneNo === this._accountService.selectedUserPhone.phoneNo){
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
        return this._accountService.mobileNoList;
    }
    
    toggleMyFavorites() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.myFavorites = !this.getFilter().categories.myFavorites;
        ga('send','event','Button clicked','toggleMyFavorites','');
    }

    toggleLifestyle() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.lifestyle = !this.getFilter().categories.lifestyle;
        ga('send','event','Button clicked','toggleLifestyle','');
    }

    toggleMobile() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.mobile = !this.getFilter().categories.mobile;
        this.getFilter().categories.prepaid = this.getFilter().categories.mobile;
        this.getFilter().categories.postpaid = this.getFilter().categories.mobile;
        this.getFilter().categories.broPrepaid = this.getFilter().categories.mobile;
        this.getFilter().categories.broPostpaid = this.getFilter().categories.mobile;
        ga('send','event','Button clicked','toggleMobile','');
    }

    togglePrepaid() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.prepaid = !this.getFilter().categories.prepaid;
        ga('send','event','Button clicked','togglePrepaid','');
    }

    togglePostpaid() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.postpaid = !this.getFilter().categories.postpaid;
        ga('send','event','Button clicked','togglePostpaid','');
    }

    toggleBroPrepaid() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.broPrepaid = !this.getFilter().categories.broPrepaid;
        ga('send','event','Button clicked','toggleBroPrepaid','');
    }

    toggleBroPostpaid() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.broPostpaid = !this.getFilter().categories.broPostpaid;
        ga('send','event','Button clicked','toggleBroPostpaid','');
    }
    
    getFilter() {
        return this._catalogService.filter;
    }
    
    goToCatalog(){
        this._desktopLeftMenuService.isCatalog();
        this._router.navigate(['Catalog']);
        ga('send','event','Button clicked','Catalog','');
    }
    
    goToDeals(){
        this._desktopLeftMenuService.isDeals();
        this._router.navigate(['Perks']);
        ga('send','event','Button clicked','Perks','');
    }
    
    goToActivityHistory(){
        this._desktopLeftMenuService.isActivityHistory();
        this._router.navigate(['ActivityHistory']);
        ga('send','event','Button clicked','ActivityHistory','');
    }
    
    goToPayBill(){
        this._desktopLeftMenuService.isPayBill();
        this._router.navigate(['PayBill']);
        ga('send','event','Button clicked','PayBill','');
    }
    
    goToTransfer(){
        this._desktopLeftMenuService.isTransfer();
        this._router.navigate(['Transfer']);
        ga('send','event','Button clicked','Transfer','');
    }
    
    goToManageNumber(){
        this._desktopLeftMenuService.isManageNumber();
        this._router.navigate(['ManageNumber']);
        ga('send','event','Button clicked','ManageNumber','');
    }
    
    goToProfile(){
        this._desktopLeftMenuService.isProfile();
        this._router.navigate(['Profile']);
        ga('send','event','Button clicked','Profile','');
    }
    
    goToChangePassword(){
        this._desktopLeftMenuService.isChangePassword();
        this._router.navigate(['ChangePassword']);
        ga('send','event','Button clicked','ChangePassword','');
    }
    
    goToNewsletter(){
        this._desktopLeftMenuService.isNewsletter();
        this._router.navigate(['Newsletter']);
        ga('send','event','Button clicked','Newsletter','');
    }
    
    goToPlan(){
        this._desktopLeftMenuService.isPlan();
        this._router.navigate(['MyPlan']);
        ga('send','event','Button clicked','MyPlan','');
    }
    
    goToAddOn(){
        this._desktopLeftMenuService.isAddon();
        this._router.navigate(['BuyAddOns']);
        ga('send','event','Button clicked','BuyAddOns','');
    }
    
    goToPuk(){
        this._desktopLeftMenuService.isPuk();
        this._router.navigate(['InitializePuk']);
        ga('send','event','Button clicked','InitializePuk','');
    }
    
    goToPastBill(){
        this._desktopLeftMenuService.isPastBill();
        this._router.navigate(['PastBill']);
        ga('send','event','Button clicked','PastBill','');
    }
    
    goToPastActivity(){
        this._desktopLeftMenuService.isPastActivity();
        this._router.navigate(['SmartActivity']);
        ga('send','event','Button clicked','SmartActivity','');
    }
    
    goToInternationalRoaming(){
        this._desktopLeftMenuService.isRoaming();
        this._router.navigate(['ActiveInterRoam']);
        ga('send','event','Button clicked','ActiveInterRoam','');
    }
    
    goToBillBalance(){
        this._desktopLeftMenuService.isBalance();
        this._router.navigate(['BillBalance']);
        ga('send','event','Button clicked','BillBalance','');
    }
    
    goToBillSetting(){
        this._desktopLeftMenuService.isBillSetting();
        this._router.navigate(['BillSetting']);
        ga('send','event','Button clicked','BillSetting','');
    }

    goToPasaLoad() {
        this._desktopLeftMenuService.isPasaload();
        this._router.navigate(['PasaLoad']);
        ga('send','event','Button clicked','PasaLoad','');
    }

    goToMessage() {
        this._desktopLeftMenuService.isMessage();
        this._router.navigate(['SmartMessage']);
    }

    goToEPin() {
        this._desktopLeftMenuService.isEpin();
        this._router.navigate(['SmartEPin']);
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
        ga('send','event','Button clicked','toggleRedeemPoints','');
    }
    
    toggleFilter(){
        this._desktopLeftMenuService.toggleFilter();
        ga('send','event','Button clicked','toggleFilter','');
    }
    
    /*toggleNumberDetail(){
        this._desktopLeftMenuService.toggleNumberDetail();
    }*/

    toggleService(){
        this._desktopLeftMenuService.toggleService();
        ga('send','event','Button clicked','toggleService','');
    }
    
    toggleBillingDetail(){
        this._desktopLeftMenuService.toggleBillingDetail();
        ga('send','event','Button clicked','toggleBillingDetail','');
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
