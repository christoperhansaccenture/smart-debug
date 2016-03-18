import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {LayoutService} from '../services/layout.service';

@Component({
    selector: 'left-menu',
    templateUrl: 'app/shared/components/left-menu.component.html'
})
export class LeftMenuComponent {
    
    constructor(private _layoutService : LayoutService,
    private _router: Router){
        
    }
    
    toggleLeftMenu(){
        this._layoutService.toggleLeftMenu();
    }
    
    getLeftMenuState(){
        return this._layoutService.getLeftMenuState();
    }
    
    gotoProfile(){
        this._router.navigate(['Profile']);
    }
    
    gotoAccountOverview(){
        this._router.navigate(['AccountOverview']);
    }
    
    gotoManageNumber(){
        this._router.navigate(['ManageNumber']);
    }
    
    gotoActivityHistory(){
        this._router.navigate(['ActivityHistory']);
    }
    
    closeLeftMenu(){
        
    }
    
}