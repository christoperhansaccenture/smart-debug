import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {LayoutService} from '../services/layout.service';
import { Layout } from '../models/layout';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {AccountService} from '../../shared/services/account.service';
import {MultiSliderComponent} from '../../shared/components/multi-slider.component';
import {CartService} from '../../shared/services/cart.service';
import {CatalogService} from '../../my-rewards/services/catalog.service';
import {DesktopLeftMenuService} from '../../shared/services/desktop-left-menu.service';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'smart-header',
    templateUrl: 'app/shared/components/header.component.html',
     directives: [
        MultiSliderComponent
    ]
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
        private _accountService: AccountService,
        private _catalogService: CatalogService,
        private _cartService: CartService,
        private _desktopLeftMenuService: DesktopLeftMenuService,
        private _authService: AuthService) {}
    
    
    getPointValue(){
        return ( this._accountService.rewardsData.rewards ? this._accountService.rewardsData.rewards : 0 );
    }
    
    toggleFilterFunction(){
        this.filterFunction = !this.filterFunction;
        
        if (this._layoutService.getCurrentPage() === 'Perks') {
            this._catalogService.filter.reset();
            this._catalogService.filter.categories.perks = true;
        }
        else if (this._layoutService.getCurrentPage() === 'Catalog') {
            this._catalogService.filter.all();
        }
        
        if(this.filterFunction){
            this._router.navigate(['CatalogList']);    
        }
        
    }

    closeFilter() {
        this.filterFunction = false;
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

    getFilter() {
        return this._catalogService.filter;
    }
	
	getLayout(){
		return this._layoutService.getLayout();
	}
	
	goToPreviousPage(){

        this.filterFunction = false;
		this._pageNavigationService.gotoPreviousPage();
        
	}    
    
        
    getHeaderLayout(){
        return this._layoutService.getHeaderLayout();
    }
    
    toggleLeftMenu(){
        this.filterFunction = false;
        this._layoutService.toggleLeftMenu();
    }
    
    openNumberSelection(){
        this._layoutService.setNumberSelectionState();
    }
    
    getResize(){
        return this._matchMediaService.getmm();
        
    }
    
    pointerLeftMove(event) {
        console.log('dragging');
        console.log('event: ' + event);
    }

    toggleMyFavorites() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.myFavorites = !this.getFilter().categories.myFavorites;
    }

    toggleLifestyle() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.lifestyle = !this.getFilter().categories.lifestyle;
    }

    toggleMobile() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.mobile = !this.getFilter().categories.mobile;
        this.getFilter().categories.prepaid = this.getFilter().categories.mobile;
        this.getFilter().categories.postpaid = this.getFilter().categories.mobile;
        this.getFilter().categories.broPrepaid = this.getFilter().categories.mobile;
        this.getFilter().categories.broPostpaid = this.getFilter().categories.mobile;
    }

    togglePrepaid() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.prepaid = !this.getFilter().categories.prepaid;
    }

    togglePostpaid() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.postpaid = !this.getFilter().categories.postpaid;
    }

    toggleBroPrepaid() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.broPrepaid = !this.getFilter().categories.broPrepaid;
    }

    toggleBroPostpaid() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.broPostpaid = !this.getFilter().categories.broPostpaid;
    }

    getTotalItems() {
        return this._cartService.getTotalItems();
    }

    goToCart() {
        this._router.navigate(['ShoppingCart']);
        this.filterFunction = false;
    }
    
    goToMySmart(){
        this._router.navigate(['MySmart']);
    }
    
    goToMyReward(){
        this._router.navigate(['MyRewards']);
    }
    
    goToAccount(){
        this._desktopLeftMenuService.isManageNumber();
        this._router.navigate(['ManageNumber']);
    }
    
    logout(){
         this._authService.logOut();
    }
    
}
