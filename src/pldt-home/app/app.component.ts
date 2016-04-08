import { Component, OnInit } from 'angular2/core';
import { Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import { LayoutService } from './shared/services/layout.service';
import { HomeComponent } from './home/components/home.component';
import { HomePltnComponent } from './home/components/home-pltn.component';
import { HeaderComponent } from './shared/components/header.component';
import { HeaderPltnComponent } from './shared/components/header-pltn.component';
import { FooterComponent } from './shared/components/footer.component';
import { FastClickStatic } from './shared/fastclick/fastclick.d';

declare var FastClick: FastClickStatic;

@Component({
    selector: 'pldt-app',
    template: `
        <div class="bodyDesign" *ngIf="!getLayout().pltn">
            <pldt-header></pldt-header>
            <div id="content">
                <router-outlet>
                </router-outlet>
            </div>
            <pldt-footer></pldt-footer>
        </div>
        <div class="bodyDesignPltn" *ngIf="getLayout().pltn">
            <pldt-header-pltn></pldt-header-pltn>
            <div id="maincontainer">
                <router-outlet>
                </router-outlet>
            </div>
        </div>
    `,
    directives: [
        ROUTER_DIRECTIVES,
        HeaderPltnComponent,
        HeaderComponent,
        FooterComponent
    ],
    providers: [
        ROUTER_PROVIDERS,
        LayoutService
    ]
})

@RouteConfig([{
    path: '/home',
    name: 'Home',
    component: HomeComponent,
    useAsDefault: true
}, {
    path: '/home-pltn',
    name: 'HomePLTN',
    component: HomePltnComponent
}])

export class AppComponent implements OnInit {

    constructor(private _router: Router,
        private _layoutService: LayoutService) {
        new FastClick(document.body);
    }

    ngOnInit() {
        console.log(this._router);
        if (this._router.lastNavigationAttempt == '/home') {
            this._layoutService.setLayout('pltn', false);
        } else if (this._router.lastNavigationAttempt == '/home-pltn') {
            this._layoutService.setLayout('pltn', true);
        }
    }

    getLayout() {
        return this._layoutService.getLayout();
    }

}
