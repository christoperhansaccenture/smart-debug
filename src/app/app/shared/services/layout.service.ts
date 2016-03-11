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
        appFooter: false
	};
    
    footerState = {
        home: false,
        plan: false,
        addon: false,
        balance: false
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
		else if(current == 'MySmart'){

			this.layoutState = {
				appHeader: true,
				loginHeader: false,
                appFooter: true
			};
            
            this.footerState.home = true;
            this.footerState.plan = false;
            this.footerState.addon = false;
            this.footerState.balance = false;
			
		}
        else if(current == 'Plan'){

			this.layoutState = {
				appHeader: true,
				loginHeader: false,
                appFooter: true
			};

            this.footerState.home = false;
            this.footerState.plan = true;
            this.footerState.addon = false;
            this.footerState.balance = false;
			
		}
        else if(current == 'Balance'){

			this.layoutState = {
				appHeader: true,
				loginHeader: false,
                appFooter: true
			};

            this.footerState.home = false;
            this.footerState.plan = false;
            this.footerState.addon = false;
            this.footerState.balance = true;
			
		}
        else if(current == 'ManageNumber'){

			this.layoutState = {
				appHeader: true,
				loginHeader: false,
                appFooter: true
			};

            this.footerState.home = false;
            this.footerState.plan = false;
            this.footerState.addon = false;
            this.footerState.balance = false;
			
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
