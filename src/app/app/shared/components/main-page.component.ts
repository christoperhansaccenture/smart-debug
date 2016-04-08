import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {OverviewComponent} from '../../my-rewards/components/overview.component';
import {CatalogComponent} from '../../my-rewards/components/catalog.component';
import {CatalogListComponent} from '../../my-rewards/components/catalog-list.component';
import {ShoppingCartComponent} from '../../my-rewards/components/shopping-cart.component';
import {PayBillComponent} from '../../my-rewards/components/pay-bill.component';
import {TransferComponent} from '../../my-rewards/components/transfer.component';
import {PerksComponent} from '../../my-rewards/components/perks.component';
import {ConfirmOrderComponent} from '../../my-rewards/components/confirm-order.component';
import {AccountOverviewComponent} from '../../account/components/account-overview.component';
import {ProfileComponent} from '../../account/components/profile.component';
import {EditNumberComponent} from '../../account/components/edit-number.component';
import {ActivityHistoryComponent} from '../../account/components/activity-history.component';
import {ManageNumberComponent} from '../../account/components/manage-number.component';
import {AddNumberComponent} from '../../account/components/add-number.component';
import {AddNumberConfirmComponent} from '../../account/components/add-number-confirm.component';
import {SmartLeftMenuComponent} from './smart-left-menu.component';
import {SmartOverviewComponent} from '../../my-smart/components/smart-overview.component';
import {ChangePasswordComponent} from '../../account/components/change-password.component';
import {NewsletterComponent} from '../../account/components/newsletter.component';
import {SmartMyplanComponent} from '../../my-smart/components/smart-myplan.component';
import {SmartBuyAddOnsComponent} from '../../my-smart/components/smart-buyaddons.component';
import {SmartBuyAddOnsDetailComponent} from '../../my-smart/components/smart-buyaddons-detail.component';
import {InitializePukComponent} from '../../my-smart/components/initialize-puk.component';
import {ViewPukComponent} from '../../my-smart/components/view-puk.component';
import {SmartActiveInterRoamComponent} from '../../my-smart/components/smart-activeinterroam.component';
import {PastBillComponent} from '../../my-smart/components/past-bill.component';
import {SmartActivityComponent} from '../../my-smart/components/activity.component';
import {SmartBillBalanceComponent} from '../../my-smart/components/smart-billbalance.component';
import {SmartBillSettingComponent} from '../../my-smart/components/smart-billsetting.component';
import {SmartPasaLoadComponent} from '../../my-smart/components/smart-pasaload.component';
import {SmartMessageComponent} from '../../my-smart/components/smart-message.component';
import {SmartMessageDetailComponent} from '../../my-smart/components/smart-message-detail.component';
import {SmartEPinComponent} from '../../my-smart/components/smart-epin.component';
import {SmartEPinVerifyComponent} from '../../my-smart/components/smart-epin-verify.component';
import {SmartEPinViewComponent} from '../../my-smart/components/smart-epin-view.component';

@Component({
    templateUrl: './app/shared/components/main-page.component.html',
	directives: [
        SmartLeftMenuComponent,
		ROUTER_DIRECTIVES
    ]
})
@RouteConfig([
    {
        path: '/myrewards',
        name: 'MyRewards',
        component: OverviewComponent
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
export class MainPageComponent {

	constructor (private _layoutService: LayoutService,
    private _matchMediaService: MatchMediaService) {}
	
	getResize(){
        return this._matchMediaService.getmm();  
    }

}