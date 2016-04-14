import {Component, OnInit} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {MainPageComponent} from './shared/components/main-page.component';
import {MainLoginComponent} from './login/components/main-login.component';
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
import {RewardTypeService} from './my-rewards/services/reward-type.service';
import {CatalogService} from './my-rewards/services/catalog.service';
import {ActivityHistoryService} from './account/services/activity-history.service';
import {ModalComponent} from './shared/components/modal.component';
import {CartService} from './shared/services/cart.service';
import {DesktopLeftMenuService} from './shared/services/desktop-left-menu.service';
declare var FastClick: FastClickStatic;
declare var configChannel: any;

@Component({
    selector: 'smart-app',
    template: `
        <smart-header></smart-header>
        <my-modal></my-modal>
        <left-menu></left-menu>
        <div id="content"
            [class.login]="isFullScreen()"
            [class.small]="!isFullScreen() && isSmallScreen()"
            [class.large]="!isFullScreen() && !isSmallScreen()"
            (window:resize)="OnResize()"
                (window:scroll)="OnScroll()">
            <router-outlet>
            </router-outlet>
        </div>
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
        RewardTypeService,
        SmartIntegrationService,
        ActivityHistoryService,
        CartService,
        CatalogService,
        DesktopLeftMenuService
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
        path: 'main/...',
        name: 'MainPage',
        component: MainPageComponent
    }
	
])
export class AppComponent implements OnInit {

	constructor ( private _matchMediaService: MatchMediaService,
    private _headerService: HeaderService,
    private _router: Router,
    private _layoutService: LayoutService) {
        new FastClick(document.body);
    }

    ngOnInit(){
        this.OnResize();
        
        if(configChannel === 'app'){
            this._router.navigate(['Starter', 'Login']);
        }

    }
    
    
    OnResize(){
        this._matchMediaService.OnResize();
        
    }
    
    OnScroll(){
        this._headerService.headerOnScroll();
    }
    
     isFullScreen() {
         let currentPage: string = this._layoutService.getCurrentPage();
         return !currentPage || currentPage === 'GetStarted' || currentPage === 'Login' ||
         currentPage === 'Register';
     }
 
     isSmallScreen() {
         return !this._matchMediaService.getmm().largeUp;
     }

}

