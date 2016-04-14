import {Component, OnInit} from 'angular2/core';
import { Router } from 'angular2/router';
import {LayoutService} from '../services/layout.service';
declare var ga:any;

declare var configChannel: any;

@Component({
    selector: 'left-menu',
    templateUrl: 'app/shared/components/left-menu.component.html'
})
export class LeftMenuComponent implements OnInit  {
    
    selectedPhone;
    
    constructor(private _layoutService : LayoutService,
    private _router: Router){
        //this._accountService.getMobileNumberlistFromBackEnd(false);
        let min = localStorage.getItem('mobileNo');
        this.selectedPhone = min;
        console.log("constructor " + min);
    }
    
    
     ngOnInit() {
         let min = localStorage.getItem('mobileNo');
         this.selectedPhone = min;
      }
    
    isOnApp(){
        if(configChannel === 'app'){
            //console.log("run on app");
            return false;
        }else{
            return true;
        }
    }

    
    toggleLeftMenu(){
        this._layoutService.toggleLeftMenu();
    }
    
    getLeftMenuState(){
        return this._layoutService.getLeftMenuState();
    }
    
    closeLeftMenu(){
        
    }
    
    goToCompare(){
        this._router.navigate(['Compare']);
    }
    
}
