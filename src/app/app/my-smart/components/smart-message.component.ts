import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ModalService} from '../../shared/services/modal.service';
import {AccountService} from '../../shared/services/account.service';
import {SmartLeftMenuComponent} from '../../shared/components/smart-left-menu.component';

@Component({
    selector: 'smart-message',
    templateUrl: './app/my-smart/components/smart-message.component.html',
    directives: [
        SmartLeftMenuComponent
    ]
})
export class SmartMessageComponent {

    constructor(private _router: Router,
        private _matchMediaService: MatchMediaService,
        private _layoutService: LayoutService,
        private _accountService: AccountService,
        private _modalService: ModalService) {

        this._layoutService.setCurrentPage('SmartMessage');

    }

    getSpinnerStatus() {
        return this._accountService.spinnerAccount;
    }

    getResize() {
        return this._matchMediaService.getmm();
    }

    goToMessageDetail() {
        this._router.navigate(['SmartMessageDetail']);
    }

    getListMessage(){ 
        return [
            {
                'title':'Answer our Survey',
                'text': 'Answer our Survey',
                'date':'12:09 PM',
                'status':'unread'
            }, 
            {
                'title': 'Subscribe to Newsletter',
                'text': 'Receive Smart Prepaid product and promo updates via email.',
                'date': '11:27 PM',
                'status': 'unread'
            }, 
            {
                'title': 'Follow Us',
                'text': 'Connect with us. Let’s talk through our social media channels.',
                'date': 'Yesterday',
                'status': 'read'
            },
            {
                'title': 'Welcome to My Smart',
                'text': 'Welcome to My Smart, Tiffany!, You have successfully registered to My Smart.',
                'date': '18-03',
                'status': 'read'
            },
            {
                'title': 'My Smart Registration',
                'text': 'Dear Tiffany, Welcome to My SMART. Please validate your account.',
                'date': '18-03',
                'status': 'unread'
            }
        ];
    }

}