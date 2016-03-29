import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';

@Component({
    selector: 'new-pass',
    templateUrl: './app/login/components/new-pass.component.html'
})
export class NewPassComponent {
    
    newPassword: string;
    confirmPassword: string;
    checkErrorStatus=false;
    errorMessageText: string;
	
	constructor (private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _layoutService: LayoutService) {
		
		this._layoutService.setCurrentPage('NewPass');
		
	}
    
    getErrorMessageText(){
        return this.errorMessageText;
    }
    
    sendNewPass(){
        
       if(this.validatePass(this.newPassword,this.confirmPassword)==0) 
         {
             this.errorMessageText="Please fill in the password field";
             this.getErrorMessageText();
             this.checkErrorStatus=true;
         }
         else if(this.validatePass(this.newPassword,this.confirmPassword)==1)
         {
             this.errorMessageText="new password did not match";
             this.getErrorMessageText();
             this.checkErrorStatus=true;
         } 
         else if(this.validatePass(this.newPassword,this.confirmPassword)==2)
         {
             let link = ['Login'];
             this._router.navigate(link); 
         } 
    }
    
    validatePass(newPassword,confirmPassword){
        if(newPassword==null || newPassword=="" || confirmPassword==null || confirmPassword=="")
        {
            return 0;       
        }
        else if (newPassword != confirmPassword) {
           return 1;
        }
        else{
           return 2;
        }
    }
	
}