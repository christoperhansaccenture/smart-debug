import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {AccountService} from '../../shared/services/account.service';
import {SmartLeftMenuComponent} from '../../shared/components/smart-left-menu.component';

@Component({
    selector: 'smart-epin-view',
    templateUrl: './app/my-smart/components/smart-epin-view.component.html',
    directives: [
        SmartLeftMenuComponent
    ]
})
export class SmartEPinViewComponent {

    constructor(private _router: Router,
        private _matchMediaService: MatchMediaService,
        private _layoutService: LayoutService,
        private _accountService: AccountService) {

        this._layoutService.setCurrentPage('SmartEPinView');

    }

    getResize() {
        return this._matchMediaService.getmm();
    }

}