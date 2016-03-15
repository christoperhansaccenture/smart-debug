import {Injectable} from 'angular2/core';
import { Layout } from '../models/layout';
import {PageNavigationService} from './page-navigation.service';

@Injectable()
export class LayoutService {

	currentPage: string;
    numberSelection = false;

	layoutState : Layout = {
		appHeader: false,
		loginHeader: false,
        appFooter: true
	};
    
    footerState = {
        home: false,
        perks: false,
        catalog: false,
        transfer: false
    };
	
	constructor (private _pageNavigationService: PageNavigationService) {}
	
	getCurrentPage(){
		return this.currentPage;
	}
    
    getfooterState(){
        return this.footerState;
    }
	
	setCurrentPage(current : string){
	
		this.currentPage = current;
		this._pageNavigationService.setLoginNavigation(current);
		
		if(current == 'GetStarted' ||
        current == 'Verification'){
		
			this.layoutState = {
				appHeader: false,
				loginHeader: false,
                appFooter: false
			};
		}
		
		else if (current == 'Register' ||
			current == 'ForgotPassword' ||
			current == 'Login' ||
			current == 'VerificationForm' ||
            current == 'NewPass'){

			this.layoutState = {
				appHeader: false,
				loginHeader: true,
                appFooter: false
			};
			
		}
		else if(current == 'MyRewards'){
            
            this._pageNavigationService.setRewardDetailNavigation(current);

			this.layoutState = {
				appHeader: true,
				loginHeader: false,
                appFooter: true
			};
            
            this.footerState.home = true;
            this.footerState.perks = false;
            this.footerState.catalog = false;
            this.footerState.transfer = false;
			
		}
        else if(current == 'Catalog'){
            
            this._pageNavigationService.setRewardDetailNavigation(current);

			this.layoutState = {
				appHeader: true,
				loginHeader: false,
                appFooter: true
			};
            
            this.footerState.home = false;
            this.footerState.perks = false;
            this.footerState.catalog = true;
            this.footerState.transfer = false;
			
		}
        else if(current == 'RewardDetail' ||
                current == 'MobileReward' ||
               current == 'CatalogList'){
            
            this._pageNavigationService.setRewardDetailNavigation(current);
            
            this.layoutState = {
				appHeader: true,
				loginHeader: false,
                appFooter: true
			};

            this.footerState.home = false;
            this.footerState.perks = false;
            this.footerState.catalog = true;
            this.footerState.transfer = false;
        }
        else if(current == 'Transfer'){
           
            this.layoutState = {
				appHeader: true,
				loginHeader: false,
                appFooter: true
			};
            
            this.footerState.home = false;
            this.footerState.perks = false;
            this.footerState.catalog = false;
            this.footerState.transfer = true;
            
        }
        else if(current == 'PayBill'){
            
            this.layoutState = {
				appHeader: true,
				loginHeader: false,
                appFooter: true
			};
        }
        else{
			
			this.layoutState = {
				appHeader: true,
				loginHeader: false,
                appFooter: false
			};

		}
	
	}
	
	getLayout(){
		return this.layoutState;
	}
    
    setNumberSelectionState(){
        this.numberSelection = !this.numberSelection;
    }
    
    getNumberSelectionState(){
        return this.numberSelection;
    }

}
