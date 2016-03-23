import {Component} from 'angular2/core';
import {AccountService} from '../../../shared/services/account.service';

@Component({
    selector: 'my-point',
    templateUrl: 'app/my-smart/components/includes/my-point.component.html'
})
export class MyPointComponent {
    
    constructor(private _accountService: AccountService){
        //this._accountService.getPointsFromBackEnd(false);
    }
    
    getPoints(){
        
        // if(this._accountService.getPoints() == '-' || this._accountService.getPoints() == ''){
        //     return '0';
        // }else{
        //     return this._accountService.getPoints();
        // }
        
    }
    
}
