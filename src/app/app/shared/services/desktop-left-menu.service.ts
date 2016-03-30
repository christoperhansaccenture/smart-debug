import {Injectable} from 'angular2/core';
import { Router } from 'angular2/router';

@Injectable()
export class DesktopLeftMenuService {
    
    rewardApp = {
        redeemPoint : false,
        payBill : false,
        transfer : false,
        activityHistory : false
    }
    
    redeemPoint = {
        deals : false,
        catalog : false,
        filter : false
    }
    
    constructor (private _router:Router) {}
    
    toggleRedeemPoints(){
        this.rewardApp.redeemPoint = !this.rewardApp.redeemPoint;
    }
    
    getRewardAppStatus(){
        return this.rewardApp;
    }
    
    isCatalog(){
        this.rewardRefresh();
        this.rewardApp.redeemPoint = true;
        this.redeemPoint.catalog = true;
    }
    
    isDeals(){
        this.rewardRefresh();
        this.rewardApp.redeemPoint = true;
        this.redeemPoint.deals = true;
    }
    
    rewardRefresh(){
        this.rewardApp.redeemPoint = false;
        this.rewardApp.transfer = false;
        this.rewardApp.payBill = false;
        this.rewardApp.activityHistory = false;
        
        this.redeemPoint.deals = false;
        this.redeemPoint.catalog = false;
        this.redeemPoint.filter = false;
    }
    
}
