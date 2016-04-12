import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { LayoutService } from '../services/layout.service';
import { ModalService } from '../services/modal.service';

@Component({
    selector: 'pldt-header-pltn',
    templateUrl: 'app/shared/components/header-pltn.component.html'
})
export class HeaderPltnComponent {
    
    isShowSub = false;
    subMenu = '';

    constructor(private _router:Router,
    private _layoutService: LayoutService,
    private _modalService: ModalService) {

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

}
