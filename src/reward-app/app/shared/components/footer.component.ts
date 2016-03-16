import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {LayoutService} from '../services/layout.service';
import { Layout } from '../models/layout';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
    selector: 'smart-footer',
    templateUrl: 'app/shared/components/footer.component.html'
})
export class FooterComponent {
    
    addMenu = false;

    constructor (
		private _layoutService : LayoutService, 
        private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _pageNavigationService: PageNavigationService,
        private _authService: AuthService) {
		
	}
	
	getLayout(){
		return this._layoutService.getLayout();
	}
    
    getFooterState(){
        return this._layoutService.getfooterState();
    }
	
    toggleAdditionalMenu(){
        
        this.addMenu = !this.addMenu;
        
    }
    
    getResize(){return this._matchMediaService.getmm();}
    
    additionalMenuStatus(){
        
        if((this._layoutService.getLayout().appFooter && this.addMenu) == true){
            return true;
        }else{
            return false;
        }

    } 
    
    gotoHome(){
        this._router.navigate(['MyRewards']);
        this.addMenu = false;
    }
    
    gotoCatalog(){
        this._router.navigate(['Catalog']);
        this.addMenu = false;
    }
    
    gotoPerks(){
        this.addMenu = false;
    }
    
    gotoTransfer(){
        this._router.navigate(['Transfer']);
        this.addMenu = false;
    }
    
    gotoPayBill(){
        this._router.navigate(['PayBill']);
        this.addMenu = false;
    }
    
    logOut(){
        this._authService.logOut();
        this.addMenu = false;
    }  

}
