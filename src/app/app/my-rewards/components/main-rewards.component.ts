import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {OverviewComponent} from './overview.component';
import {RewardDetailComponent} from './reward-detail.component';
import {CatalogComponent} from './catalog.component';
import {CatalogListComponent} from './catalog-list.component';
import {ShoppingCartComponent} from './shopping-cart.component';
import {PayBillComponent} from './pay-bill.component';
import {TransferComponent} from './transfer.component';
import {PerksComponent} from './perks.component';
import {ConfirmOrderComponent} from './confirm-order.component';
import {AccountOverviewComponent} from '../../account/components/account-overview.component';
import {ProfileComponent} from '../../account/components/profile.component';
import {EditNumberComponent} from '../../account/components/edit-number.component';
import {ActivityHistoryComponent} from '../../account/components/activity-history.component';
import {ManageNumberComponent} from '../../account/components/manage-number.component';
import {AddNumberComponent} from '../../account/components/add-number.component';
import {AddNumberConfirmComponent} from '../../account/components/add-number-confirm.component';

@Component({
    template: `
        <router-outlet></router-outlet>
    `,
	directives: [
		ROUTER_DIRECTIVES
    ]
})
@RouteConfig([
    {
        path: '/',
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
    }
	
])
export class MainRewardsComponent {

	constructor (private _layoutService: LayoutService) {}
	
	

}