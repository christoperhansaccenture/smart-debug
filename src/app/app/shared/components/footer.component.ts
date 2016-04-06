import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {LayoutService} from '../services/layout.service';
import { Layout } from '../models/layout';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {AuthService} from '../../shared/services/auth.service';
declare var ga:any;

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
    
    getAppLayout(){
        return this._layoutService.getAppLayout();
    }
	
	getLayout(){
		return this._layoutService.getLayout();
	}
    
    getFooterState(){
        return this._layoutService.getfooterState();
    }
    
    getResize(){return this._matchMediaService.getmm();}
    
    gotoHome(){
        this._router.navigate(['MyRewards']);
        this.addMenu = false;
        ga('send','event','Button clicked','MyRewards','');
    }
    
    gotoCatalog(){
        this._router.navigate(['Catalog']);
        this.addMenu = false;
        ga('send','event','Button clicked','Catalog','');
    }
    
    gotoPerks(){
        this._router.navigate(['Perks']);
        this.addMenu = false;
        ga('send','event','Button clicked','Perks','');
    }
    
    gotoTransfer(){
        this._router.navigate(['Transfer']);
        this.addMenu = false;
        ga('send','event','Button clicked','Transfer','');
    }
    
    gotoPayBill(){
        this._router.navigate(['PayBill']);
        this.addMenu = false;
        ga('send','event','Button clicked','PayBill','');
    }

    gotoSmartHome(){
        this._router.navigate(['MySmart']);
        this.addMenu = false;
        ga('send','event','Button clicked','MySmart','');
    }

    gotoAddOns() {
        this._router.navigate(['BuyAddOns']);
        this.addMenu = false;
        ga('send','event','Button clicked','BuyAddOns','');
    }

    gotoBillBalance() {
        this._router.navigate(['BillBalance']);
        this.addMenu = false;
        ga('send','event','Button clicked','BillBalance','');
    }

    gotoMessage() {
    }

    gotoPlan() {
        this._router.navigate(['MyPlan']);
        this.addMenu = false;
        ga('send','event','Button clicked','MyPlan','');
    }
    
    logOut(){
        this._authService.logOut();
        this.addMenu = false;
        ga('send','event','Button clicked','logOut','');
    }  

}
