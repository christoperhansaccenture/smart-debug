import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {MainLoginComponent} from './login/components/main-login.component';
import {OverviewComponent} from './my-smart/components/overview.component';
import {PlanComponent} from './my-smart/components/plan.component';
import {BalanceComponent} from './my-smart/components/balance.component';
import {ManageNumberComponent} from './my-smart/components/manage-number.component';
import {HeaderComponent} from './shared/components/header.component';
import {FooterComponent} from './shared/components/footer.component';
import {SmartIntegrationService} from './shared/services/smart-integration.service';
import {MatchMediaService} from './shared/services/match-media.service';
import {LayoutService} from './shared/services/layout.service';
import {PageNavigationService} from './shared/services/page-navigation.service';
import {AccountService} from './shared/services/account.service';
import {AuthService} from './shared/services/auth.service';
import {FastClickStatic} from './shared/fastclick/fastclick.d';
import {HeaderService} from './shared/services/header.service';
import {ModalService} from './shared/services/modal.service';
import {ModalComponent} from './shared/components/modal.component';
declare var FastClick: FastClickStatic;

@Component({
    selector: 'pltn-app',
    template: `
        <pltn-header></pltn-header>
        <my-modal></my-modal>
        <router-outlet id="maincontainer"
        (window:resize)="OnResize()"
        (window:scroll)="OnScroll()"></router-outlet>
        <pltn-footer></pltn-footer>
    `,
    directives: [
        HeaderComponent,
        ModalComponent,
        FooterComponent,
        ROUTER_DIRECTIVES
    ],
    providers: [
        ROUTER_PROVIDERS,
		MatchMediaService,
		LayoutService,
		PageNavigationService,
        AccountService,
		AuthService,
        HeaderService,
        ModalService,
        SmartIntegrationService
    ]
})

@RouteConfig([
    {
        path: '/main/...',
        name: 'Starter',
        component: MainLoginComponent,
		useAsDefault: true
    },
    {
        path: '/mysmart',
        name: 'MySmart',
        component: OverviewComponent
    },
    {
        path: '/plan',
        name: 'Plan',
        component: PlanComponent
	},
    {
        path: '/balance',
        name: 'Balance',
        component: BalanceComponent
	},
    {
        path: '/managenumber',
        name: 'ManageNumber',
        component: ManageNumberComponent
	}
	
])
export class AppComponent implements OnInit {

	constructor ( private _matchMediaService: MatchMediaService,
    private _headerService: HeaderService) {
        new FastClick(document.body);
    }

    ngOnInit(){
        this.OnResize();
        //this.OnScroll();
        //FastClick1.attach(document.all);
        
        //var options:  FastClickOptions;
        
        //FastClick.attach(document.body);
        
    }
    
    OnResize(){
        this._matchMediaService.OnResize();
        
    }
    
    OnScroll(){
        this._headerService.headerOnScroll();
    }

}

