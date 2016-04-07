import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ModalService} from '../../shared/services/modal.service';
import {AccountService} from '../../shared/services/account.service';
import {SmartLeftMenuComponent} from '../../shared/components/smart-left-menu.component';

@Component({
    selector: 'smart-message-detail',
    templateUrl: './app/my-smart/components/smart-message-detail.component.html',
    directives: [
        SmartLeftMenuComponent
    ]
})
export class SmartMessageDetailComponent {

    constructor(private _router: Router,
        private _matchMediaService: MatchMediaService,
        private _layoutService: LayoutService,
        private _accountService: AccountService,
        private _modalService: ModalService) {

        this._layoutService.setCurrentPage('SmartMessageDetail');

    }

    getSpinnerStatus() {
        return this._accountService.spinnerAccount;
    }

    getResize() {
        return this._matchMediaService.getmm();
    }

    getMessage(){ 
        return {
            'title': 'My Smart Registration',
            'text': 'Dear Tiffany,\n\nWelcome to My SMART.\nPlease validate your account and update your profile.\n\n\n\nThank you.\n\nSmart Communications, Inc.',
            'date': 'On November 21, 2016 at 10:00 AM'
        };
    }

    promptDelete(){
        this._modalService.setErrorMessage('Are you sure you want to delete the selected message?');
        this._modalService.toggleErrorModal();
    }

}