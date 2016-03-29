import {Component, OnInit} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {MainLoginComponent} from './login/components/main-login.component';
import {OverviewComponent} from './my-smart/components/overview.component';
import {AccountOverviewComponent} from './account/components/account-overview.component';
import {ProfileComponent} from './account/components/profile.component';
import {EditNumberComponent} from './account/components/edit-number.component';
import {ActivityHistoryComponent} from './account/components/activity-history.component';
import {HeaderComponent} from './shared/components/header.component';
import {FooterComponent} from './shared/components/footer.component';
import {LeftMenuComponent} from './shared/components/left-menu.component';
import {SmartIntegrationService} from './shared/services/smart-integration.service';
import {MatchMediaService} from './shared/services/match-media.service';
import {LayoutService} from './shared/services/layout.service';
import {PageNavigationService} from './shared/services/page-navigation.service';
import {AccountService} from './shared/services/account.service';
import {AuthService} from './shared/services/auth.service';
import {FastClickStatic} from './shared/fastclick/fastclick.d';
import {HeaderService} from './shared/services/header.service';
import {ModalService} from './shared/services/modal.service';
import {ActivityHistoryService} from './account/services/activity-history.service';
import {ModalComponent} from './shared/components/modal.component';
declare var FastClick: FastClickStatic;

@Component({
    selector: 'smart-app',
    template: `
        <smart-header></smart-header>
        <my-modal></my-modal>
        <left-menu></left-menu>
        <div id="content"><router-outlet></router-outlet></div>
        <smart-footer></smart-footer>
    `,
    directives: [
        HeaderComponent,
        ModalComponent,
        FooterComponent,
        LeftMenuComponent,
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
        SmartIntegrationService,
        ActivityHistoryService,
    ]
})

@RouteConfig([
    {
        path: '/...',
        name: 'Starter',
        component: MainLoginComponent,
		useAsDefault: true
    },
    {
        path: '/mysmart',
        name: 'MySmart',
        component: OverviewComponent
    }
    
	
])
export class AppComponent implements OnInit {

	constructor ( private _matchMediaService: MatchMediaService,
    private _headerService: HeaderService,
    private _router: Router) {
        new FastClick(document.body);
    }

    ngOnInit(){
        this.OnResize();
        
    }
    
    OnResize(){
        this._matchMediaService.OnResize();
        
    }
    
    OnScroll(){
        //this._headerService.headerOnScroll();
    }

}

