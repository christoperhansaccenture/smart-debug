import {Component, OnInit} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {MainRewardsComponent} from './my-rewards/components/main-rewards.component';
import {OverviewComponent} from './my-rewards/components/overview.component';
import {RewardDetailComponent} from './my-rewards/components/reward-detail.component';
import {CatalogComponent} from './my-rewards/components/catalog.component';
import {CatalogListComponent} from './my-rewards/components/catalog-list.component';
import {ShoppingCartComponent} from './my-rewards/components/shopping-cart.component';
import {PayBillComponent} from './my-rewards/components/pay-bill.component';
import {TransferComponent} from './my-rewards/components/transfer.component';
import {PerksComponent} from './my-rewards/components/perks.component';
import {ConfirmOrderComponent} from './my-rewards/components/confirm-order.component';
import {MainLoginComponent} from './login/components/main-login.component';
import {SmartOverviewComponent} from './my-smart/components/smart-overview.component';
import {ChangePasswordComponent} from './account/components/change-password.component';
import {NewsletterComponent} from './account/components/newsletter.component';
import {SmartMyplanComponent} from './my-smart/components/smart-myplan.component';
import {SmartBuyAddOnsComponent} from './my-smart/components/smart-buyaddons.component';
import {SmartBuyAddOnsDetailComponent} from './my-smart/components/smart-buyaddons-detail.component';
import {InitializePukComponent} from './my-smart/components/initialize-puk.component';
import {ViewPukComponent} from './my-smart/components/view-puk.component';
import {SmartActiveInterRoamComponent} from './my-smart/components/smart-activeinterroam.component';
import {PastBillComponent} from './my-smart/components/past-bill.component';
import {SmartActivityComponent} from './my-smart/components/activity.component';
import {SmartBillBalanceComponent} from './my-smart/components/smart-billbalance.component';
import {SmartBillSettingComponent} from './my-smart/components/smart-billsetting.component';
import {SmartPasaLoadComponent} from './my-smart/components/smart-pasaload.component';
import {SmartMessageComponent} from './my-smart/components/smart-message.component';
import {SmartMessageDetailComponent} from './my-smart/components/smart-message-detail.component';
import {SmartEPinComponent} from './my-smart/components/smart-epin.component';
import {SmartEPinVerifyComponent} from './my-smart/components/smart-epin-verify.component';
import {SmartEPinViewComponent} from './my-smart/components/smart-epin-view.component';
import {AccountOverviewComponent} from './account/components/account-overview.component';
import {ProfileComponent} from './account/components/profile.component';
import {EditNumberComponent} from './account/components/edit-number.component';
import {ActivityHistoryComponent} from './account/components/activity-history.component';
import {ManageNumberComponent} from './account/components/manage-number.component';
import {AddNumberComponent} from './account/components/add-number.component';
import {AddNumberConfirmComponent} from './account/components/add-number-confirm.component';
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

@Component({
    selector: 'smart-app',
    template: `
        <smart-header></smart-header>
        <my-modal></my-modal>
        <left-menu></left-menu>
        <div id="content"
            [class.login]="isFullScreen()"
            [class.small]="!isFullScreen() && isSmallScreen()"
            [class.large]="!isFullScreen() && !isSmallScreen()">
            <router-outlet
                (window:resize)="OnResize()"
                (window:scroll)="OnScroll()">
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
        path: '/rewards/...',
        name: 'Rewards',
        component: MainRewardsComponent
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
        path: '/cart',
        name: 'ShoppingCart',
        component: ShoppingCartComponent
    },
    {
        path: '/confirmOrder',
        name: 'ConfirmOrder',
        component: ConfirmOrderComponent
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
    },
    {
        path: '/perks',
        name: 'Perks',
        component: PerksComponent
    },
    {
        path: '/accountOverview',
        name: 'AccountOverview',
        component: AccountOverviewComponent
    },
    {
        path: '/profile',
        name: 'Profile',
        component: ProfileComponent
    },
    {
        path: '/manageNumber',
        name: 'ManageNumber',
        component: ManageNumberComponent
    },
    {
        path: '/manageNumber/addNumber',
        name: 'AddNumber',
        component: AddNumberComponent
    },
    {
        path: '/manageNumber/addNumberConfirm',
        name: 'AddNumberConfirm',
        component: AddNumberConfirmComponent
    },
    {
        path: '/manageNumber/editNumber',
        name: 'EditNumber',
        component: EditNumberComponent
    },
    {
        path: '/activityHistory',
        name: 'ActivityHistory',
        component: ActivityHistoryComponent
    },
    {
        path: '/mysmart',
        name: 'MySmart',
        component: SmartOverviewComponent
    },
    {
        path: '/changePassword',
        name: 'ChangePassword',
        component: ChangePasswordComponent
    },
    {
        path: '/newsletter',
        name: 'Newsletter',
        component: NewsletterComponent
    },
    {
        path: '/myplan',
        name: 'MyPlan',
        component: SmartMyplanComponent
    },
    {
        path: '/buyaddons',
        name: 'BuyAddOns',
        component: SmartBuyAddOnsComponent
    },
    {
        path: '/buyaddonsDetail',
        name: 'BuyAddOnsDetail',
        component: SmartBuyAddOnsDetailComponent
    },
    {
        path: '/initializePuk',
        name: 'InitializePuk',
        component: InitializePukComponent
    },
    {
        path: '/viewPuk',
        name: 'ViewPuk',
        component: ViewPukComponent
    },
    {
        path: '/activeInterRoam',
        name: 'ActiveInterRoam',
        component: SmartActiveInterRoamComponent
    },
    {
        path: '/smartActivity',
        name: 'SmartActivity',
        component: SmartActivityComponent
    },
    {
        path: '/pastBill',
        name: 'PastBill',
        component: PastBillComponent
    },
    {
        path: '/billbalance',
        name: 'BillBalance',
        component: SmartBillBalanceComponent
    },
    {
        path: '/billsetting',
        name: 'BillSetting',
        component: SmartBillSettingComponent
    },
    {
        path: '/pasaload',
        name: 'PasaLoad',
        component: SmartPasaLoadComponent
    },
    {
        path: '/smartMessage',
        name: 'SmartMessage',
        component: SmartMessageComponent
    },
    {
        path: '/smartMessageDetail',
        name: 'SmartMessageDetail',
        component: SmartMessageDetailComponent
    },
    {
        path: '/smartEPin',
        name: 'SmartEPin',
        component: SmartEPinComponent
    },
    {
        path: '/smartEPinVerify',
        name: 'SmartEPinVerify',
        component: SmartEPinVerifyComponent
    },
    {
        path: '/smartEPinView',
        name: 'SmartEPinView',
        component: SmartEPinViewComponent
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

