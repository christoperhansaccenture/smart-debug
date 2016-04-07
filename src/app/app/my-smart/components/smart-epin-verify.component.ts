import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {AccountService} from '../../shared/services/account.service';
import {SmartLeftMenuComponent} from '../../shared/components/smart-left-menu.component';

@Component({
    selector: 'smart-epin-verify',
    templateUrl: './app/my-smart/components/smart-epin-verify.component.html',
    directives: [
        SmartLeftMenuComponent
    ]
})
export class SmartEPinVerifyComponent {

    constructor(private _router: Router,
        private _matchMediaService: MatchMediaService,
        private _layoutService: LayoutService,
        private _accountService: AccountService) {

        this._layoutService.setCurrentPage('SmartEPinVerify');

    }

    getResize() {
        return this._matchMediaService.getmm();
    }

    goToView(){
        this._router.navigate(['SmartEPinView']);
    }

}