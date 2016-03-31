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
    
    constructor (private _router:Router) {}
    
    toggleRedeemPoints(){
        this.rewardApp.redeemPoint = !this.rewardApp.redeemPoint;
    }
    
    toggleFilter(){
        this.rewardApp.filter = !this.rewardApp.filter;
    }
    
    getRewardAppStatus(){
        return this.rewardApp;
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
    
    rewardRefresh(){
        this.rewardApp.redeemPoint = false;
        this.rewardApp.transfer = false;
        this.rewardApp.payBill = false;
        this.rewardApp.activityHistory = false;
        
        this.rewardApp.deals = false;
        this.rewardApp.catalog = false;
        this.rewardApp.filter = false;
    }
    
}
