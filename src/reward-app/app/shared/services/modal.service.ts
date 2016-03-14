import {Injectable} from 'angular2/core';
import { Layout } from '../models/layout';
import {LayoutService} from './layout.service';

@Injectable()
export class ModalService {

	currentPage: string;
    numberSelection = false;
    
    mainModalState = false;

	modalState = {
		renewPlan: false,
        info: false,
        updateCredit: false,
        balance: false,
	}
    
    balanceModalState={
        updateCredit: false,
        PrevBillDesc: false,
        CurrBillDesc: false,
        AmountDueDesc: false,
        PaymentDueDesc: false,
        MinDueDesc: false,
        UnbilledUsageDesc: false,
        LoadBalDesc: false,
        CurBillChargeDesc: false
    }
    
    infoModalState = {
        renewPlan : false,
        updateCredit : false
    }
	
	constructor (private _layoutService: LayoutService) {}
	
	getModalState(){
        return this.modalState;
    }
    
    getMainModalState(){
        return this.mainModalState;
    }
    
    getInfoModalState(){
        return this.infoModalState;
    }
    
    getBalanceModalState(){
        return this.balanceModalState;
    }
    
    openCloseRenewPlan(){
        this.mainModalState = !this.mainModalState;
        this.modalState.renewPlan = !this.modalState.renewPlan;
    }
    
    openCloseRenewPlanConf(){
        this.mainModalState = !this.mainModalState;
        this.modalState.info = !this.modalState.info;
        this.infoModalState.renewPlan = !this.infoModalState.renewPlan;
    }
    
    openCloseUpdateCredit(){
        this.mainModalState = !this.mainModalState;
        this.modalState.updateCredit = !this.modalState.updateCredit;
    }
    
    openCloseUpdateCreditConf(){
        this.mainModalState = !this.mainModalState;
        this.modalState.info = !this.modalState.info;
        this.infoModalState.updateCredit = !this.infoModalState.updateCredit;       
    }
 
  //Balance Pop Up 
    openClosePrevBillDesc(){
        this.mainModalState = !this.mainModalState;
        this.modalState.balance = !this.modalState.balance;
        this.balanceModalState.PrevBillDesc = !this.balanceModalState.PrevBillDesc;
    }
  
    openCloseCurrBillDesc(){
        this.mainModalState = !this.mainModalState;
        this.modalState.balance = !this.modalState.balance;
        this.balanceModalState.CurrBillDesc = !this.balanceModalState.CurrBillDesc;
    }
    
    openCloseAmountDueDesc(){
        this.mainModalState = !this.mainModalState;
        this.modalState.balance = !this.modalState.balance;
        this.balanceModalState.AmountDueDesc = !this.balanceModalState.AmountDueDesc;
    }
    
    openClosePaymentDueDesc(){
        this.mainModalState = !this.mainModalState;
        this.modalState.balance = !this.modalState.balance;
        this.balanceModalState.PaymentDueDesc = !this.balanceModalState.PaymentDueDesc;
    }
    
    openCloseMinDueDesc(){
        this.mainModalState = !this.mainModalState;
        this.modalState.balance = !this.modalState.balance;
        this.balanceModalState.MinDueDesc = !this.balanceModalState.MinDueDesc;
    }
    
    openCloseUnbilledUsageDesc(){
        this.mainModalState = !this.mainModalState;
        this.modalState.balance = !this.modalState.balance;
        this.balanceModalState.UnbilledUsageDesc = !this.balanceModalState.UnbilledUsageDesc;
    }
    
    openCloseLoadBalDesc(){
        this.mainModalState = !this.mainModalState;
        this.modalState.balance = !this.modalState.balance;
        this.balanceModalState.LoadBalDesc = !this.balanceModalState.LoadBalDesc;
    }
    
    openCloseCurBillChargeDesc(){
        this.mainModalState = !this.mainModalState;
        this.modalState.balance = !this.modalState.balance;
        this.balanceModalState.CurBillChargeDesc = !this.balanceModalState.CurBillChargeDesc;
    }
    
}
