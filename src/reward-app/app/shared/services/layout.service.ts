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
    
    headerItem = {
        hamburger: false,
        back: false,
        logo: false,
        point: false,
        filter: false,
        cart: true
    }
    
    accountFromHome = false;
    historyFromAccount = false;
	
	constructor (private _pageNavigationService: PageNavigationService) {}
	
	getCurrentPage(){
		return this.currentPage;
	}
    
    getfooterState(){
        return this.footerState;
    }
    
    getHeaderLayout(){
        return this.headerItem;
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
            
            this.headerItem.hamburger = true;
            this.headerItem.back = false;
            this.headerItem.filter = false;
            this.headerItem.logo = true;
            this.headerItem.point = false;
			
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
            
            this.headerItem.hamburger = true;
            this.headerItem.back = false;
            this.headerItem.filter = true;
            this.headerItem.logo = false;
            this.headerItem.point = true;
			
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
            
            this.headerItem.hamburger = true;
            this.headerItem.back = false;
            this.headerItem.filter = true;
            this.headerItem.logo = false;
            this.headerItem.point = true;
			
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
            this.footerState.catalog = false;
            this.footerState.paybill = false;
            this.footerState.transfer = false;
            
            this.headerItem.hamburger = false;
            this.headerItem.back = true;
            this.headerItem.filter = true;
            this.headerItem.logo = false;
            this.headerItem.point = true;
            
        }
        else if(current == 'ShoppingCart') {
            
            this._pageNavigationService.setRewardDetailNavigation(current);
            
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
            
            this.headerItem.hamburger = false;
            this.headerItem.back = true;
            this.headerItem.filter = true;
            this.headerItem.logo = false;
            this.headerItem.point = true;
            
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
            
            this.headerItem.hamburger = true;
            this.headerItem.back = false;
            this.headerItem.filter = false;
            this.headerItem.logo = false;
            this.headerItem.point = true;
            
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
            
            this.headerItem.hamburger = true;
            this.headerItem.back = false;
            this.headerItem.filter = false;
            this.headerItem.logo = false;
            this.headerItem.point = true;
            
            
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
            
            if(this.accountFromHome){
                this.headerItem.back = true;
                this.headerItem.hamburger = false;
            }else{
                this.headerItem.back = false;
                this.headerItem.hamburger = true;
            }
            
            this.headerItem.filter = false;
            this.headerItem.logo = true;
            this.headerItem.point = false;
            
            
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
            
            this.headerItem.hamburger = true;
            this.headerItem.back = false;
            this.headerItem.filter = false;
            this.headerItem.logo = false;
            this.headerItem.point = true;
            
            
        }
        else if(current == 'ActivityHistory'){
            
            this._pageNavigationService.setActivityHistoryNavigation();
            
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
            
            if(this.historyFromAccount){
                this.headerItem.back = true;
                this.headerItem.hamburger = false;
            }else{
                this.headerItem.back = false;
                this.headerItem.hamburger = true;
            }
            
            this.headerItem.filter = false;
            this.headerItem.logo = false;
            this.headerItem.point = true;
            
            
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
            
            this.headerItem.hamburger = false;
            this.headerItem.back = true;
            this.headerItem.filter = false;
            this.headerItem.logo = false;
            this.headerItem.point = true;
            
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
            
            this.headerItem.hamburger = true;
            this.headerItem.back = false;
            this.headerItem.filter = false;
            this.headerItem.logo = false;
            this.headerItem.point = true;
            

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
