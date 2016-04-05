import {Injectable} from 'angular2/core';
import { Layout } from '../models/layout';
import {PageNavigationService} from './page-navigation.service';
import {MatchMediaService} from './match-media.service';

@Injectable()
export class LayoutService {

	currentPage: string;
    numberSelection = false;
    
    appLayout = {
        smart : false,
        reward : false
    };

	layoutState : Layout = {
		appHeader: false,
		loginHeader: false,
        appFooter: false,
        leftMenu: false
	};
    
    desktopMenu = {
        smart :false,
        reward: false,
        account: false
    };
    
    footerState = {
        home: false,
        perks: false,
        catalog: false,
        paybill: false,
        transfer: false,
        addon: false,
        billbalance: false,
        message: false,
        plan: false
    };
    
    headerItem = {
        hamburger: false,
        back: false,
        logo: false,
        point: false,
        filter: false,
        cart: false,
        refresh: false
    };
    
    accountFromHome = false;
    historyFromAccount = false;
	
	constructor (private _pageNavigationService: PageNavigationService,
    private _matchMediaService: MatchMediaService) {
        
        var layout = JSON.parse(sessionStorage.getItem('activeApp'));
        if(layout !== null){
            console.log(layout);
            this.appLayout = layout;
        }      
        
    }
    
    getAppLayout(){
        return this.appLayout;
    }
	
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
        
        //scroll to top page only for mobile apps
        if(!this._matchMediaService.getmm().largeUp){
            window.scrollTo(0,0);
        }

        this.headerItem.cart = true;
		
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
            
            this.desktopMenu.account = false;
            this.desktopMenu.reward = false;
            this.desktopMenu.smart = false;
			
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
            this.footerState.addon = false;
            this.footerState.billbalance = false;
            this.footerState.message = false;
            this.footerState.plan = false;            

            this.headerItem.hamburger = true;
            this.headerItem.back = false;
            this.headerItem.filter = false;
            this.headerItem.logo = true;
            this.headerItem.point = false;
            this.headerItem.cart = true;
            this.headerItem.refresh = false;
            
            this.desktopMenu.account = false;
            this.desktopMenu.reward = true;
            this.desktopMenu.smart = false;
            
            this.appLayout.smart = false;
            this.appLayout.reward = true;
            sessionStorage.setItem('activeApp',JSON.stringify(this.appLayout));
			
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
            this.footerState.addon = false;
            this.footerState.billbalance = false;
            this.footerState.message = false;
            this.footerState.plan = false;
            
            this.headerItem.hamburger = true;
            this.headerItem.back = false;
            this.headerItem.filter = true;
            this.headerItem.logo = false;
            this.headerItem.point = true;
            this.headerItem.cart = true;
            this.headerItem.refresh = false;
            
            this.desktopMenu.account = false;
            this.desktopMenu.reward = true;
            this.desktopMenu.smart = false;
            
            this.appLayout.smart = false;
            this.appLayout.reward = true;
            sessionStorage.setItem('activeApp',JSON.stringify(this.appLayout));
			
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
            this.footerState.addon = false;
            this.footerState.billbalance = false;
            this.footerState.message = false;
            this.footerState.plan = false;
            
            this.headerItem.hamburger = true;
            this.headerItem.back = false;
            this.headerItem.filter = true;
            this.headerItem.logo = false;
            this.headerItem.point = true;
            this.headerItem.cart = true;
            this.headerItem.refresh = false;
            
            this.desktopMenu.account = false;
            this.desktopMenu.reward = true;
            this.desktopMenu.smart = false;
            
            this.appLayout.smart = false;
            this.appLayout.reward = true;
            sessionStorage.setItem('activeApp',JSON.stringify(this.appLayout));
			
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
            this.footerState.addon = false;
            this.footerState.billbalance = false;
            this.footerState.message = false;
            this.footerState.plan = false;
            
            this.headerItem.hamburger = false;
            this.headerItem.back = true;
            this.headerItem.filter = true;
            this.headerItem.logo = false;
            this.headerItem.point = true;
            this.headerItem.cart = true;
            this.headerItem.refresh = false;
            
            this.desktopMenu.account = false;
            this.desktopMenu.reward = true;
            this.desktopMenu.smart = false;
            
            this.appLayout.smart = false;
            this.appLayout.reward = true;
            sessionStorage.setItem('activeApp',JSON.stringify(this.appLayout));
            
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
            this.footerState.addon = false;
            this.footerState.billbalance = false;
            this.footerState.message = false;
            this.footerState.plan = false;
            
            this.headerItem.hamburger = true;
            this.headerItem.back = false;
            this.headerItem.filter = false;
            this.headerItem.logo = false;
            this.headerItem.point = true;
            this.headerItem.cart = false;
            this.headerItem.refresh = false;
            
            this.desktopMenu.account = false;
            this.desktopMenu.reward = true;
            this.desktopMenu.smart = false;
            
            this.appLayout.smart = false;
            this.appLayout.reward = true;
            sessionStorage.setItem('activeApp',JSON.stringify(this.appLayout));
            
        }
        else if(current == 'ConfirmOrder') {
            
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
            this.footerState.addon = false;
            this.footerState.billbalance = false;
            this.footerState.message = false;
            this.footerState.plan = false;
            
            this.headerItem.hamburger = false;
            this.headerItem.back = true;
            this.headerItem.filter = false;
            this.headerItem.logo = false;
            this.headerItem.point = true;
            this.headerItem.cart = false;
            this.headerItem.refresh = false;
            
            this.desktopMenu.account = false;
            this.desktopMenu.reward = true;
            this.desktopMenu.smart = false;
            
            this.appLayout.smart = false;
            this.appLayout.reward = true;
            sessionStorage.setItem('activeApp',JSON.stringify(this.appLayout));
            
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
            this.headerItem.cart = true;
            this.headerItem.refresh = false;
            
            this.desktopMenu.account = false;
            this.desktopMenu.reward = true;
            this.desktopMenu.smart = false;
            
            this.appLayout.smart = false;
            this.appLayout.reward = true;
            sessionStorage.setItem('activeApp',JSON.stringify(this.appLayout));
            
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
            this.footerState.addon = false;
            this.footerState.billbalance = false;
            this.footerState.message = false;
            this.footerState.plan = false;
            
            this.headerItem.hamburger = true;
            this.headerItem.back = false;
            this.headerItem.filter = false;
            this.headerItem.logo = false;
            this.headerItem.point = true;
            this.headerItem.cart = true;
            this.headerItem.refresh = false;
            
            this.desktopMenu.account = false;
            this.desktopMenu.reward = true;
            this.desktopMenu.smart = false;
            
            this.appLayout.smart = false;
            this.appLayout.reward = true;
            sessionStorage.setItem('activeApp',JSON.stringify(this.appLayout));
            
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
            this.footerState.addon = false;
            this.footerState.billbalance = false;
            this.footerState.message = false;
            this.footerState.plan = false;
            
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
            this.headerItem.cart = true;
            this.headerItem.refresh = false;
            
            this.desktopMenu.account = false;
            this.desktopMenu.reward = true;
            this.desktopMenu.smart = false;
            
            this.appLayout.smart = false;
            this.appLayout.reward = true;
            sessionStorage.setItem('activeApp',JSON.stringify(this.appLayout));
            
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
            this.footerState.addon = false;
            this.footerState.billbalance = false;
            this.footerState.message = false;
            this.footerState.plan = false;
            
            this.headerItem.hamburger = true;
            this.headerItem.back = false;
            this.headerItem.filter = false;
            this.headerItem.logo = false;
            this.headerItem.point = true;
            
            this.desktopMenu.account = true;
            this.desktopMenu.reward = false;
            this.desktopMenu.smart = false;
            
            if(this.appLayout.reward){
                this.headerItem.cart = true;
                this.headerItem.refresh = false;
            }else{
                this.headerItem.cart = false;
                this.headerItem.refresh = true;
            }
            
            
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
            this.footerState.addon = false;
            this.footerState.billbalance = false;
            this.footerState.message = false;
            this.footerState.plan = false;
            
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
            this.headerItem.cart = true;
            this.headerItem.refresh = false;
            
            this.desktopMenu.account = false;
            this.desktopMenu.reward = true;
            this.desktopMenu.smart = false;
            
            this.appLayout.smart = false;
            this.appLayout.reward = true;
            sessionStorage.setItem('activeApp',JSON.stringify(this.appLayout));
            
        }
        else if(current == 'AddNumber' ||
                current == 'AddNumberConfirm' ||
                current == 'EditNumber' ||
                current == 'ManageNumber'){
            
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
            else if(current == 'AddNumberConfirm'){
                this._pageNavigationService.setManageNumberNavigation('AddNumber');
            }
            
            
            this.footerState.home = false;
            this.footerState.perks = false;
            this.footerState.catalog = false;
            this.footerState.paybill = false;
            this.footerState.transfer = false;
            this.footerState.addon = false;
            this.footerState.billbalance = false;
            this.footerState.message = false;
            this.footerState.plan = false;
            
            this.headerItem.hamburger = false;
            this.headerItem.back = true;
            this.headerItem.filter = false;
            this.headerItem.logo = false;
            this.headerItem.point = true;
            
            this.desktopMenu.account = true;
            this.desktopMenu.reward = false;
            this.desktopMenu.smart = false;
            
            if(this.appLayout.reward){
                this.headerItem.cart = true;
                this.headerItem.refresh = false;
            }else{
                this.headerItem.cart = false;
                this.headerItem.refresh = true;
            }
            
        }
        else if (current == "BuyAddOnsDetail") {

            this.layoutState = {
                appHeader: true,
                loginHeader: false,
                appFooter: true,
                leftMenu: false
            };

            this._pageNavigationService.setBuyAddOnsNavigation('BuyAddOns');

            this.footerState.home = false;
            this.footerState.perks = false;
            this.footerState.catalog = false;
            this.footerState.paybill = false;
            this.footerState.transfer = false;
            this.footerState.addon = true;
            this.footerState.billbalance = false;
            this.footerState.message = false;
            this.footerState.plan = false;

            this.headerItem.hamburger = false;
            this.headerItem.back = true;
            this.headerItem.filter = true;
            this.headerItem.logo = false;
            this.headerItem.point = false;
            this.headerItem.cart = false;

            this.desktopMenu.account = false;
            this.desktopMenu.reward = false;
            this.desktopMenu.smart = true;
            
            this.appLayout.smart = true;
            this.appLayout.reward = false;

        }
        else if(current == 'ChangePassword' ||
        current == 'Newsletter'){
            
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
            this.footerState.addon = false;
            this.footerState.billbalance = false;
            this.footerState.message = false;
            this.footerState.plan = false;
            
            this.headerItem.hamburger = true;
            this.headerItem.back = false;
            this.headerItem.filter = false;
            this.headerItem.logo = true;
            this.headerItem.point = false;
            this.headerItem.cart = false;
            this.headerItem.refresh = true;
            
            this.desktopMenu.account = true;
            this.desktopMenu.reward = false;
            this.desktopMenu.smart = false;
            
            this.appLayout.smart = true;
            this.appLayout.reward = false;
            sessionStorage.setItem('activeApp',JSON.stringify(this.appLayout));
            
        }
        else if(current == 'MySmart' ||
        current == 'MyPlan' ||
        current == "BuyAddOns" || 
        current == 'InitializePuk' ||
        current == 'ViewPuk' ||
        current == 'PastBill' ||
        current == 'SmartActivity' ||
        current == 'ActiveInterRoam' ||
        current == 'BillBalance' ||
        current == 'BillSetting' ||
        current == 'PasaLoad') {
            
            this.layoutState = {
				appHeader: true,
				loginHeader: false,
                appFooter: true,
                leftMenu: false
			}; 

            this.footerState.perks = false;
            this.footerState.catalog = false;
            this.footerState.paybill = false;
            this.footerState.transfer = false;
            this.footerState.message = false;
            if (current == 'MySmart') this.footerState.home = true;
            else this.footerState.home = false;
            if (current == "BuyAddOns") this.footerState.addon = true;
            else this.footerState.addon = false;
            if(current == 'BillBalance') this.footerState.billbalance = true;
            else this.footerState.billbalance = false;
            if (current == 'MyPlan') this.footerState.plan = true;
            else this.footerState.plan = false;
            
            this.headerItem.hamburger = true;
            this.headerItem.back = false;
            this.headerItem.filter = false;
            this.headerItem.logo = true;
            this.headerItem.point = false;
            this.headerItem.cart = false;
            this.headerItem.refresh = true;
            
            this.desktopMenu.account = false;
            this.desktopMenu.reward = false;
            this.desktopMenu.smart = true;
            
            this.appLayout.smart = true;
            this.appLayout.reward = false;
            sessionStorage.setItem('activeApp',JSON.stringify(this.appLayout));

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
            this.footerState.addon = false;
            this.footerState.billbalance = false;
            this.footerState.message = false;
            this.footerState.plan = false;
            
            this.headerItem.hamburger = true;
            this.headerItem.back = false;
            this.headerItem.filter = false;
            this.headerItem.logo = false;
            this.headerItem.point = true;
            this.headerItem.cart = false;
            this.headerItem.refresh = false;
            
            this.desktopMenu.account = false;
            this.desktopMenu.reward = false;
            this.desktopMenu.smart = false;
            
            this.appLayout.smart = true;
            this.appLayout.reward = false;
            sessionStorage.setItem('activeApp',JSON.stringify(this.appLayout));

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
