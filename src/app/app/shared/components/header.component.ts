import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {LayoutService} from '../services/layout.service';
import { Layout } from '../models/layout';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {AccountService} from '../../shared/services/account.service';
import {MultiSliderComponent} from '../../shared/components/multi-slider.component';

@Component({
    selector: 'smart-header',
    templateUrl: 'app/shared/components/header.component.html'  
})
export class HeaderComponent {
    scrollY = 0;
    menu;   
    subMenu;
    hideSubMenu: boolean = true;
    filterFunction = false;

    constructor (
		private _layoutService : LayoutService,
        private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _pageNavigationService: PageNavigationService,
        private _accountService: AccountService) {}
    
        
    getHeaderLayout(){
        return this._layoutService.getHeaderLayout();
    }
    
    toggleLeftMenu(){
        this.filterFunction = false;
        this._layoutService.toggleLeftMenu();
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

        this.filterFunction = false;
		this._pageNavigationService.gotoPreviousPage();
        
	}
    
    openNumberSelection(){
        this._layoutService.setNumberSelectionState();
    }
    
    getResize(){
        return this._matchMediaService.getmm();
        
    }
    
}
