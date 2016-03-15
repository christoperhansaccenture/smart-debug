import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {MainLoginComponent} from './login/components/main-login.component';
import {OverviewComponent} from './my-rewards/components/overview.component';
import {RewardDetailComponent} from './my-rewards/components/reward-detail.component';
import {MobileRewardComponent} from './my-rewards/components/mobile-reward.component';
import {CatalogComponent} from './my-rewards/components/catalog.component';
import {CatalogListComponent} from './my-rewards/components/catalog-list.component';
import {PayBillComponent} from './my-rewards/components/pay-bill.component';
import {TransferComponent} from './my-rewards/components/transfer.component';
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
import {RewardTypeService} from './my-rewards/services/reward-type.service';
import {CatalogService} from './my-rewards/services/catalog.service';
import {ModalComponent} from './shared/components/modal.component';
declare var FastClick: FastClickStatic;

@Component({
    selector: 'smart-app',
    template: `
        <smart-header></smart-header>
        <my-modal></my-modal>
        <div id="content"><router-outlet></router-outlet></div>
        <smart-footer></smart-footer>
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
        SmartIntegrationService,
        RewardTypeService,
        CatalogService
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
        path: '/myrewards',
        name: 'MyRewards',
        component: OverviewComponent
    },
    {
        path: '/rewardDetail',
        name: 'RewardDetail',
        component: RewardDetailComponent
    },
    {
        path: '/mobileReward',
        name: 'MobileReward',
        component: MobileRewardComponent
    },
    {
        path: '/catalog',
        name: 'Catalog',
        component: CatalogComponent
    },
    {
        path: '/catalogList',
        name: 'CatalogList',
        component: CatalogListComponent
    },
    {
        path: '/payBill',
        name: 'PayBill',
        component: PayBillComponent
    },
    {
        path: '/transfer',
        name: 'Transfer',
        component: TransferComponent
    }
    
	
])
export class AppComponent implements OnInit {

	constructor ( private _matchMediaService: MatchMediaService,
    private _headerService: HeaderService,
    private _rewardTypeService:RewardTypeService) {
        new FastClick(document.body);
    }

    ngOnInit(){
        this.OnResize();
        this._rewardTypeService.initialRewards();
        //this.OnScroll();
        //FastClick1.attach(document.all);
        
        //var options:  FastClickOptions;
        
        //FastClick.attach(document.body);
        
    }
    
    OnResize(){
        this._matchMediaService.OnResize();
        
    }
    
    OnScroll(){
        //this._headerService.headerOnScroll();
    }

}

