import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ModalService} from '../../shared/services/modal.service';
import {AccountService} from '../../shared/services/account.service';
import {SmartLeftMenuComponent} from '../../shared/components/smart-left-menu.component';

@Component({
    selector: 'smart-buyaddons',
    templateUrl: './app/my-smart/components/smart-buyaddons.component.html',
    directives: [
        SmartLeftMenuComponent
    ]
})
export class SmartBuyAddOnsComponent {

    list: Object[] = [];

    constructor(private _router: Router,
        private _matchMediaService: MatchMediaService,
        private _layoutService: LayoutService,
        private _accountService: AccountService,
        private _modalService: ModalService) {

        this._layoutService.setCurrentPage('BuyAddOns');

        this.list.splice(0, 0, {
            'title': 'Always On 10',
            'number': '10',
            'smallText': '10MB + Spinnr Streaming for 1 day',
            'value': 'P10'
        }, {
            'title': 'Always On 99',
            'number': '99',
            'smallText': '100 MB + Spinnr Streaming + Opera Max for 30 days',
            'value': 'P99'
        }, {
            'title': 'Always On 199',
            'number': '199',
            'smallText': '250 MB + Spinnr Streaming + Opera Max for 15 days',
            'value': 'P199'
        }, {
            'title': 'Always On 299',
            'number': '299',
            'smallText': '700 MB + Spinnr Streaming for 30 days',
            'value': 'P299'
        }, {
            'title': 'Always On 499',
            'number': '499',
            'smallText': '1.5 GB + Spinnr Streaming + Opera Max for 30 days',
            'value': 'P499'
        }, {
            'title': 'Always On 995',
            'number': '995',
            'smallText': '5 GB + Spinnr Streaming + Opera Max for 30 days',
            'value': 'P995'
        });

    }

    getSpinnerStatus() {
        return this._accountService.spinnerAccount;
    }

    getResize() {
        return this._matchMediaService.getmm();
    }

    toggleBuyAddOnsDetail(){
        this._router.navigate(['BuyAddOnsDetail']);
    }

    toggleBuyAddOnsModal(){
        this._modalService.toggleBuyAddOnsModal();
    }

}