import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { LayoutService } from '../services/layout.service';
import { ModalService } from '../services/modal.service';
import { MatchMediaService } from '../services/match-media.service';

@Component({
    selector: 'pldt-header-pltn',
    templateUrl: 'app/shared/components/header-pltn.component.html'
})
export class HeaderPltnComponent {
    
    isShowSub = false;
    subMenu = '';

    constructor(private _router:Router,
    private _layoutService: LayoutService,
    private _modalService: ModalService,
    private _matchMediaService:MatchMediaService) {
        this._layoutService.setCurrentPage("home");
    }
    
    click(){
        console.log(this._layoutService.currentPage);
    }

    goToHome(){
        this._router.navigate(['Home']);
    }
    
    goToFibr(){
        this._router.navigate(["Fibr"]);
    }
    
    goToDSL(){
        this._router.navigate(["DSL"]);
    }
    
    goToUltera(){
        this._router.navigate(["Ultera"]);
    }
    
    goToBasicPhone(){
        this._router.navigate(["BasicPhone"]);
    }
    
    goToCompare(){
        this._router.navigate(["Compare"]);
    }
    
    goToBundleIvt(){
        this._router.navigate(["BundleIvt"]);
    }
    
    showSubMenu(menu){
        this.subMenu = menu;
        this.isShowSub = true;   
    }
    
    hideSubMenu(){
        this.isShowSub = false;
    }
    keepSubMenu(){
        this.isShowSub = true;
    }
    
    openLoginModal(){
        this._modalService.toggleLoginModal();
    }
    
    getLayout(){
		return this._layoutService.getLayout();
	}
    
    getResize(){
        return this._matchMediaService.getmm();
        
    }
    
    toogleLeftMenu(){
        this._layoutService.toggleLeftMenu();
    }
    
    toogleSubMenu(menu:string){
        this.subMenu = menu;
        this.isShowSub = !this.isShowSub; 
    }

}
