import {Injectable} from 'angular2/core';
import { Layout } from '../models/layout';
import {PageNavigationService} from './page-navigation.service';

@Injectable()
export class LayoutService {

	currentPage: string;
    numberSelection = false;

	layoutState : Layout = {
		appHeader: true,
		loginHeader: false,
        appFooter: true,
        leftMenu: false
	};
    
    footerState = {
        home: false,
        perks: false,
        catalog: false,
        paybill: false,
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
        
        //scroll to top page
        window.scrollTo(0,0);
		
		if(current == 'GetStarted' ||
        current == 'Verification'){
		
			this.layoutState = {
				appHeader: false,
				loginHeader: false,
                appFooter: false,
                leftMenu: false
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
                appFooter: false,
                leftMenu: false
			};
			
		}
		else if(current == 'MyRewards'){
            
            this._pageNavigationService.setRewardDetailNavigation(current);

			this.layoutState = {
				appHeader: true,
				loginHeader: false,
                appFooter: true,
                leftMenu: false
			};
            
            this.footerState.home = true;
            this.footerState.perks = false;
            this.footerState.catalog = false;
            this.footerState.paybill = false;
            this.footerState.transfer = false;
			
		}
        else if(current == 'Perks'){
            
            this._pageNavigationService.setRewardDetailNavigation(current);

			this.layoutState = {
				appHeader: true,
				loginHeader: false,
                appFooter: true,
                leftMenu: false
			};
            
            this.footerState.home = false;
            this.footerState.perks = true;
            this.footerState.catalog = false;
            this.footerState.paybill = false;
            this.footerState.transfer = false;
			
		}
        else if(current == 'Catalog'){
            
            this._pageNavigationService.setRewardDetailNavigation(current);

			this.layoutState = {
				appHeader: true,
				loginHeader: false,
                appFooter: true,
                leftMenu: false
			};
            
            this.footerState.home = false;
            this.footerState.perks = false;
            this.footerState.catalog = true;
            this.footerState.paybill = false;
            this.footerState.transfer = false;
			
		}
        else if(current == 'RewardDetail' ||
                current == 'MobileReward' ||
               current == 'CatalogList'){
            
            this._pageNavigationService.setRewardDetailNavigation(current);
            
            this.layoutState = {
				appHeader: true,
				loginHeader: false,
                appFooter: true,
                leftMenu: false
			};

            this.footerState.home = false;
            this.footerState.perks = false;
            this.footerState.catalog = true;
            this.footerState.paybill = false;
            this.footerState.transfer = false;
        }
        else if(current == 'Transfer'){
           
            this.layoutState = {
				appHeader: true,
				loginHeader: false,
                appFooter: true,
                leftMenu: false
			};
            
            this.footerState.home = false;
            this.footerState.perks = false;
            this.footerState.catalog = false;
            this.footerState.paybill = false;
            this.footerState.transfer = true;
            
        }
        else if(current == 'PayBill'){
            
            this.layoutState = {
				appHeader: true,
				loginHeader: false,
                appFooter: true,
                leftMenu: false
			};
            
            this.footerState.home = false;
            this.footerState.perks = false;
            this.footerState.catalog = false;
            this.footerState.paybill = true;
            this.footerState.transfer = false;
            
        }
        else if(current == 'AccountOverview'){
            
            this._pageNavigationService.setAccountOverviewNavigation();
            
            this.layoutState = {
				appHeader: true,
				loginHeader: false,
                appFooter: true,
                leftMenu: false
			};
            
            this.footerState.home = false;
            this.footerState.perks = false;
            this.footerState.catalog = false;
            this.footerState.paybill = false;
            this.footerState.transfer = false;
            
        }
        else if(current == 'Profile'){
            
            this.layoutState = {
				appHeader: true,
				loginHeader: false,
                appFooter: true,
                leftMenu: false
			};
            
            this.footerState.home = false;
            this.footerState.perks = false;
            this.footerState.catalog = false;
            this.footerState.paybill = false;
            this.footerState.transfer = false;
            
        }
        else if(current == 'AddNumber' ||
                current == 'AddNumberConfirm' ||
                current == 'EditNumber'){
            
            this.layoutState = {
				appHeader: true,
				loginHeader: false,
                appFooter: true,
                leftMenu: false
			};
            
            if(current == 'AddNumber'){
                this._pageNavigationService.setManageNumberNavigation('ManageNumber');
            }
            else if(current == 'EditNumber'){
                this._pageNavigationService.setManageNumberNavigation('ManageNumber');
            }
            else{
                this._pageNavigationService.setManageNumberNavigation('AddNumber');
            }
            
            
            this.footerState.home = false;
            this.footerState.perks = false;
            this.footerState.catalog = false;
            this.footerState.paybill = false;
            this.footerState.transfer = false;
            
        }
        else{
			
			this.layoutState = {
				appHeader: true,
				loginHeader: false,
                appFooter: true,
                leftMenu: false
			};
            
            this.footerState.home = false;
            this.footerState.perks = false;
            this.footerState.catalog = false;
            this.footerState.paybill = false;
            this.footerState.transfer = false;

		}
	
	}
    
    toggleLeftMenu(){
        this.layoutState.leftMenu = !this.layoutState.leftMenu;
    }
    
    getLeftMenuState(){
        return this.layoutState.leftMenu;
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
