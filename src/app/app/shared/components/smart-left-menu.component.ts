import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {LayoutService} from '../services/layout.service';
import {AuthService} from '../services/auth.service';
import {AccountService} from '../../shared/services/account.service';
import {DesktopLeftMenuService} from '../../shared/services/desktop-left-menu.service';
import {CircularSpinnerComponent} from './spinners/circular-spinner.component';

@Component({
    selector: 'smart-left-menu',
    templateUrl: 'app/shared/components/smart-left-menu.component.html',
    directives: [
        CircularSpinnerComponent
    ]
})
export class SmartLeftMenuComponent {
    
    constructor(private _layoutService : LayoutService,
    private _router: Router,
    private _accountService: AccountService,
    private _authService: AuthService,
    private _desktopLeftMenuService: DesktopLeftMenuService){
        
    }
    
    goToCatalog(){
        this._router.navigate(['Catalog']);
    }
    
    goToDeals(){
        this._router.navigate(['Perks']);
    }
    
    goToActivityHistory(){
        this._router.navigate(['ActivityHistory']);
    }
    
    goToPayBill(){
        this._router.navigate(['PayBill']);
    }
    
    goToTransfer(){
        this._router.navigate(['Transfer']);
    }
        
    isSmartApp(){
        return false;
    }
    
    isRewardApp(){
        return true;
    }
    
    toggleRedeemPoints(){
        this._desktopLeftMenuService.toggleRedeemPoints();
    }
    
    getRewardApp(){
        return this._desktopLeftMenuService.getRewardAppStatus();
    }
    
}
