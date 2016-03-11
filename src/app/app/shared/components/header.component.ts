import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {LayoutService} from '../services/layout.service';
import { Layout } from '../models/layout';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {AccountService} from '../../shared/services/account.service';
import {MyNumberComponent} from '../../my-smart/components/my-number.component';

@Component({
    selector: 'pltn-header',
    templateUrl: 'app/shared/components/header.component.html',
    directives: [
        MyNumberComponent
    ]
})
export class HeaderComponent {
    scrollY = 0;
    menu;
    subMenu;
    hideSubMenu: boolean = true;

    constructor (
		private _layoutService : LayoutService,
        private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _pageNavigationService: PageNavigationService,
        private _accountService: AccountService) {

    		
    	}
    
    selectedPhoneNumber(){
        return this._accountService.getSelectedPhoneNumber();
    }
    
    getCurrentPage(){
        if(this._layoutService.getCurrentPage() !== 'MySmart' && !this._matchMediaService.getmm().mediumUp){
            return true;
        }else{
            return false;
        }
    }
    
    getCurrentPageMedium(){
        if(this._layoutService.getCurrentPage() !== 'MySmart' && this._matchMediaService.getmm().mediumUp){
            return true;
        }else{
            return false;
        }
    }
	
	getLayout(){
		return this._layoutService.getLayout();
	}
	
	goToPreviousPage(){
		
		this._pageNavigationService.gotoPreviousPage();
        
	}
    
    openNumberSelection(){
        this._layoutService.setNumberSelectionState();
    }
	
    gotoHome(){
        this._router.navigate(['MySmart']);
    }
    
    gotoPlan(){
        this._router.navigate(['Plan']);
    }
    
    gotoBalance(){
        this._router.navigate(['Balance']);
    }
	
/* only used if web app is present*/
	
	getResize(){
        return this._matchMediaService.getmm();
        
    }
    
    gotoLogin() {
        let link = ['Login'];
        this._router.navigate(link);
    }
    
    gotoHomepage() {
        let link = ['Home'];
        this._router.navigate(link);
    }

    isScrollOver() {
        return this.scrollY > 45;
    }

    onScroll(event) {
        this.scrollY = window.pageYOffset || document.documentElement.scrollTop;
    }

    openSubMenu(index) {
        this.subMenu = this.menu[index].subheader;
        this.toggleSubMenu();
    }

    toggleSubMenu() {
        this.hideSubMenu = !this.hideSubMenu;
    }
    
    
}
