import {Injectable} from 'angular2/core';
import { Router } from 'angular2/router';

@Injectable()
export class DesktopLeftMenuService {
    
    rewardApp = {
        redeemPoint : false,
        payBill : false,
        deals : false,
        catalog : false,
        filter : false,
        transfer : false,
        activityHistory : false
    }
    
    accountApp = {
        manageNumber : false,
        profile : false,
        changePass : false,
        newsletter : false,
        smartLife : false
    };
    
    smartApp = {
        numberDetail : false,
        plan : false,
        addon : false,
        roaming : false,
        puk : false,
        message : false,
        billingDetail : false,
        balance : false,
        billSetting : false,
        pastActivity : false,
        usage : false,
        pastBill : false,
        pasaload : false,
        epin : false,
        moreSmart : false
    }
    
    constructor (private _router:Router) {}
    
    toggleRedeemPoints(){
        this.rewardApp.redeemPoint = !this.rewardApp.redeemPoint;
    }
    
    toggleFilter(){
        this.rewardApp.filter = !this.rewardApp.filter;
    }
    
    toggleNumberDetail(){
        this.smartApp.numberDetail = !this.smartApp.numberDetail;
    }
    
    toggleBillingDetail(){
        this.smartApp.billingDetail = !this.smartApp.billingDetail;
    }
    
    getRewardAppStatus(){
        return this.rewardApp;
    }
    
    getAccountAppStatus(){
        return this.accountApp;
    }
    
    getSmartAppStatus(){
        return this.smartApp;
    }
    
    isCatalog(){
        this.rewardRefresh();
        this.rewardApp.redeemPoint = true;
        this.rewardApp.catalog = true;
    }
    
    isDeals(){
        this.rewardRefresh();
        this.rewardApp.redeemPoint = true;
        this.rewardApp.deals = true;
    }
    
    isPayBill(){
        this.rewardRefresh();
        this.rewardApp.payBill = true;
    }
    
    isTransfer(){
        this.rewardRefresh();
        this.rewardApp.transfer = true;
    }
    
    isActivityHistory(){
        this.rewardRefresh();
        this.rewardApp.activityHistory = true;
    }
    
    isManageNumber(){
        this.accountRefresh();
        this.accountApp.manageNumber = true;
    }
    
    isProfile(){
        this.accountRefresh();
        this.accountApp.profile = true;
    }
    
    isChangePassword(){
        this.accountRefresh();
        this.accountApp.changePass = true;
    }
    
    isNewsletter(){
        this.accountRefresh();
        this.accountApp.newsletter = true;
    }
    
    isPlan(){
        this.smartRefresh();
        this.smartApp.numberDetail = true;
        this.smartApp.plan = true;
    }
    
    isAddon(){
        this.smartRefresh();
        this.smartApp.numberDetail = true;
        this.smartApp.addon = true;
    }
    
    isRoaming(){
        this.smartRefresh();
        this.smartApp.numberDetail = true;
        this.smartApp.roaming = true;
    }
    
    isPuk(){
        this.smartRefresh();
        this.smartApp.numberDetail = true;
        this.smartApp.puk = true;
    }
    
    isMessage(){
        this.smartRefresh();
        this.smartApp.message = true;
    }
    
    isBalance(){
        this.smartRefresh();
        this.smartApp.billingDetail = true;
        this.smartApp.balance = true;
    }
    
    isBillSetting(){
        this.smartRefresh();
        this.smartApp.billingDetail = true;
        this.smartApp.billSetting = true;
    }
    
    isPastActivity(){
        this.smartRefresh();
        this.smartApp.billingDetail = true;
        this.smartApp.pastActivity = true;
    }
    
    isUsage(){
        this.smartRefresh();
        this.smartApp.billingDetail = true;
        this.smartApp.usage = true;
    }
    
    isPastBill(){
        this.smartRefresh();
        this.smartApp.billingDetail = true;
        this.smartApp.pastBill = true;
    }
    
    isPasaload(){
        this.smartRefresh();
        this.smartApp.pasaload = true;
    }
    
    isEpin(){
        this.smartRefresh();
        this.smartApp.epin = true;
    }
    
    rewardRefresh(){
        this.rewardApp.redeemPoint = false;
        this.rewardApp.transfer = false;
        this.rewardApp.payBill = false;
        this.rewardApp.activityHistory = false;
        this.rewardApp.deals = false;
        this.rewardApp.catalog = false;
        this.rewardApp.filter = false;
        
    }
    
    smartRefresh(){
        this.smartApp.numberDetail = false;
        this.smartApp.plan = false;
        this.smartApp.addon = false;
        this.smartApp.roaming = false;
        this.smartApp.puk = false;
        this.smartApp.message = false;
        this.smartApp.billingDetail = false;
        this.smartApp.balance = false;
        this.smartApp.billSetting = false;
        this.smartApp.pastActivity = false;
        this.smartApp.usage = false;
        this.smartApp.pastBill = false;
        this.smartApp.pasaload = false;
        this.smartApp.epin = false;
    }
    
    accountRefresh(){
        this.accountApp.manageNumber = false;
        this.accountApp.profile = false;
        this.accountApp.changePass = false;
        this.accountApp.newsletter = false;
        this.accountApp.smartLife = false;
    }
    
}
