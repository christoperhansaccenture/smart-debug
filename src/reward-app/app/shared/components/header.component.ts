import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {LayoutService} from '../services/layout.service';
import { Layout } from '../models/layout';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {AccountService} from '../../shared/services/account.service';
import {CartService} from '../../shared/services/cart.service';
import {CatalogService} from '../../my-rewards/services/catalog.service';
import {MultiSliderComponent} from '../../shared/components/multi-slider.component';

@Component({
    selector: 'smart-header',
    templateUrl: 'app/shared/components/header.component.html',
    directives: [MultiSliderComponent]
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
        private _cartService: CartService) {}
    
    toggleLeftMenu(){
        this._layoutService.toggleLeftMenu();
    }
    
    toggleFilterFunction(){
        this.filterFunction = !this.filterFunction;
        console.log(this.filterFunction);
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
    
    showHamburger(){
        if(this._layoutService.getCurrentPage() === 'MyRewards' || 
        this._layoutService.getCurrentPage() === 'Perks' ||
        this._layoutService.getCurrentPage() === 'Catalog' ||
        this._layoutService.getCurrentPage() === 'PayBill' ||
        this._layoutService.getCurrentPage() === 'Transfer' ||
        this._layoutService.getCurrentPage() === 'Profile' ||
        this._layoutService.getCurrentPage() === 'ManageNumber' ||
        this._layoutService.getCurrentPage() === 'ActivityHistory' ||
        this._layoutService.getCurrentPage() === 'ShoppingCart' ||
        this._layoutService.getCurrentPage() === 'AccountOverview'){
            return true;
        }else{
            return false;
        }
    }

    showCart() {
        if (this._layoutService.getCurrentPage() === 'ShoppingCart') {
            return false;
        }
        else {
            return true;
        }
    }
    
    showBackButton(){
        if(this._layoutService.getCurrentPage() === 'RewardDetail' || 
        this._layoutService.getCurrentPage() === 'MobileReward' ||
        this._layoutService.getCurrentPage() === 'CatalogList' ||
        this._layoutService.getCurrentPage() === 'AddNumber' ||
        this._layoutService.getCurrentPage() === 'AddNumberConfirm' ||
        this._layoutService.getCurrentPage() === 'EditNumber'){
            return true;
        }else{
            return false;
        }
    }
    
    showLogo(){
        if(this._layoutService.getCurrentPage() === 'RewardDetail' || 
        this._layoutService.getCurrentPage() === 'MobileReward' ||
        this._layoutService.getCurrentPage() === 'CatalogList' ||
        this._layoutService.getCurrentPage() === 'PayBill' ||
        this._layoutService.getCurrentPage() === 'Catalog' ||
        this._layoutService.getCurrentPage() === 'Transfer' ||
        this._layoutService.getCurrentPage() === 'Perks' ||
        this._layoutService.getCurrentPage() === 'ManageNumber' ||
        this._layoutService.getCurrentPage() === 'AddNumber' ||
        this._layoutService.getCurrentPage() === 'AddNumberConfirm' ||
        this._layoutService.getCurrentPage() === 'EditNumber' ||
        this._layoutService.getCurrentPage() === 'ActivityHistory' ||
        this._layoutService.getCurrentPage() === 'ShoppingCart' ||
        this._layoutService.getCurrentPage() === 'Profile'){
            return false;
        }else{
            return true;
        }
    }
    
    showPoints(){
        if(this._layoutService.getCurrentPage() === 'RewardDetail' || 
        this._layoutService.getCurrentPage() === 'MobileReward' ||
        this._layoutService.getCurrentPage() === 'CatalogList' ||
        this._layoutService.getCurrentPage() === 'PayBill' ||
        this._layoutService.getCurrentPage() === 'Catalog' ||
        this._layoutService.getCurrentPage() === 'Transfer' ||
        this._layoutService.getCurrentPage() === 'Perks' ||
        this._layoutService.getCurrentPage() === 'Profile' ||
        this._layoutService.getCurrentPage() === 'ManageNumber' ||
        this._layoutService.getCurrentPage() === 'AddNumber' ||
        this._layoutService.getCurrentPage() === 'AddNumberConfirm' ||
        this._layoutService.getCurrentPage() === 'EditNumber' ||
        this._layoutService.getCurrentPage() === 'ActivityHistory'||
        this._layoutService.getCurrentPage() === 'ShoppingCart'){
            return true;
        }else{
            return false;
        }
    }
    
    showFilter(){
        if(this._layoutService.getCurrentPage() === 'RewardDetail' || 
        this._layoutService.getCurrentPage() === 'MobileReward' ||
        this._layoutService.getCurrentPage() === 'CatalogList' ||
        this._layoutService.getCurrentPage() === 'Catalog' ||
        this._layoutService.getCurrentPage() === 'Perks'){
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

    leftLastX = 30;

    pointerLeftMove(event) {
        console.log('dragging');
        console.log('event: ' + event);
    }

    toggleMyFavorites() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.myFavorites = !this.getFilter().categories.myFavorites;
    }

    togglePerks() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.perks = !this.getFilter().categories.perks;
    }

    toggleLifestyle() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.lifestyle = !this.getFilter().categories.lifestyle;
    }

    toggleMobile() {
        this.getFilter().clearNonFilter();
        this.getFilter().categories.mobile = !this.getFilter().categories.mobile;
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
    }
    
}
