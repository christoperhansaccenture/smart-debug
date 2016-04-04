import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ModalService} from '../../shared/services/modal.service';
import {AccountService} from '../../shared/services/account.service';
import {SmartLeftMenuComponent} from '../../shared/components/smart-left-menu.component';

@Component({
    selector: 'smart-myplan',
    templateUrl: './app/my-smart/components/smart-myplan.component.html',
    directives: [
        SmartLeftMenuComponent
    ]
})
export class SmartMyplanComponent {

    constructor(private _router: Router,
        private _matchMediaService: MatchMediaService,
        private _layoutService: LayoutService,
        private _accountService: AccountService,
        private _modalService: ModalService) {

        this._layoutService.setCurrentPage('MyPlan');

    }

    getSpinnerStatus() {
        return this._accountService.spinnerAccount;
    }

    getResize() {
        return this._matchMediaService.getmm();
    }

}