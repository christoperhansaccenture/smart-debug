import {Injectable} from 'angular2/core';
import { Router } from 'angular2/router';

@Injectable()
export class PageNavigationService {
	
	currentPage: string;
	previousPage: string;
	childNode: string;
    subChildNode: string;
	
	constructor (private _router: Router) {}
	
	setLoginNavigation(current : string){
	
		this.childNode = '';
        
        if(current == 'Login'){
			
			this.previousPage = 'GetStarted';
			this.childNode = 'login';
            this.currentPage = current;
		
		}
		else if(current == 'ForgotPassword' ||
			current == 'Register'){
			
			this.previousPage = 'Login';
			this.childNode = 'login';
            this.currentPage = current;
            
            //child node of forgot password or register
            this.subChildNode = current;
			
		}else if(current == 'VerificationForm'){
			
			this.childNode = 'login';            
            this.previousPage = this.subChildNode;
            this.currentPage = current;
			
		}else if(current == 'NewPass'){
            
            this.childNode = 'login';
            this.previousPage = 'VerificationForm';
            this.currentPage = current;
        }
		
	}
    
    setRewardDetailNavigation(current : string){
        this.childNode = '';
        this.previousPage = this.currentPage;
        this.currentPage = current;
    }
    
    setAccountOverviewNavigation(){
        this.childNode = '';
        this.previousPage = 'MyRewards';
    }
    
    setActivityHistoryNavigation(){
        this.childNode = '';
        this.previousPage = 'AccountOverview';
    }
    
    getPreviousPage(){
        return this.previousPage;
    }
    
    setManageNumberNavigation(previous){
        this.previousPage = previous;
    }

    setBuyAddOnsNavigation(previous) {
        this.previousPage = previous;
        this.currentPage = "BuyAddOnsDetail";
    }
	
	gotoPreviousPage(){
		
		if(this.childNode == 'login'){
			this._router.navigate(['Starter',this.previousPage]);
		}else{
			this._router.navigate([this.previousPage]);
		}
		
	}

}