import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ModalService} from '../../shared/services/modal.service';
import {AccountService} from '../../shared/services/account.service';
import {SmartLeftMenuComponent} from '../../shared/components/smart-left-menu.component';

@Component({
    selector: 'smart-activeinterroam',
    templateUrl: './app/my-smart/components/smart-activeinterroam.component.html',
    directives: [
        SmartLeftMenuComponent
    ]
})
export class SmartActiveInterRoamComponent {

    constructor(private _router: Router,
        private _matchMediaService: MatchMediaService,
        private _layoutService: LayoutService,
        private _accountService: AccountService,
        private _modalService: ModalService) {

        this._layoutService.setCurrentPage('ActiveInterRoam');

    }

    getSpinnerStatus() {
        return this._accountService.spinnerAccount;
    }

    getResize() {
        return this._matchMediaService.getmm();
    }

    toggleAlertModal(){
        this._modalService.setErrorMessage('Please load new monthly amount of P50 to continue enjoying Roaming services and avoid temporary suspension of incoming texts');
        this._modalService.toggleErrorModal();
    }

}