import {Component} from 'angular2/core';
import {LayoutService} from '../services/layout.service';

@Component({
    selector: 'left-menu',
    templateUrl: 'app/shared/components/left-menu.component.html'
})
export class LeftMenuComponent {
    
    constructor(private _layoutService : LayoutService){
        
    }
    
    toggleLeftMenu(){
        this._layoutService.toggleLeftMenu();
    }
    
    getLeftMenuState(){
        return this._layoutService.getLeftMenuState();
    }
    
    closeLeftMenu(){
        
    }
    
}