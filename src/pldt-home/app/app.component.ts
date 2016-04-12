import { Component, OnInit } from 'angular2/core';
import { Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import { LayoutService } from './shared/services/layout.service';
import { HomePltnComponent } from './home/components/home-pltn.component';
import { BasicPhoneComponent } from './home/components/basic-phone.component';
import { CompareComponent } from './home/components/compare.component';
import { FibrComponent } from './home/components/fibr.component';
import { DSLComponent } from './home/components/dsl.component';
import { UlteraComponent } from './home/components/ultera.component';
import { BundleIvtComponent } from './home/components/bundle-ivt.component';
import { HeaderPltnComponent } from './shared/components/header-pltn.component';
import { FooterComponent } from './shared/components/footer.component';
import { BannerComponent } from './shared/components/banner.component';
import { ModalComponent } from './shared/components/modal.component';
import {HeaderService} from './shared/services/header.service';
import {ModalService} from './shared/services/modal.service';
import { FastClickStatic } from './shared/fastclick/fastclick.d';

declare var FastClick: FastClickStatic;

@Component({
    selector: 'pldt-app',
    template: ` 
        <div class="bodyDesignPltn">
            <pldt-header-pltn></pldt-header-pltn>
            <my-modal></my-modal>
            <div id="maincontainer"
            (window:scroll)="OnScroll()">
            <banner></banner>
            <div class="bodyContainer" [ngClass]="{hideAdv : isAdvHidden()}">
                <router-outlet>
                </router-outlet>
            </div>
            </div>
        </div>
    `,
    directives: [
        ROUTER_DIRECTIVES,
        HeaderPltnComponent,
        BannerComponent,
        ModalComponent,
        FooterComponent
    ],
    providers: [
        ROUTER_PROVIDERS,
        HeaderService,
        LayoutService,
        ModalService
    ]
})

@RouteConfig([
    {
    path: '/home',
    name: 'Home',
    component: HomePltnComponent,
    useAsDefault: true
    },
    {
    path: '/compare',
    name: 'Compare',
    component: CompareComponent
    },
    {
    path: '/fibr',
    name: 'Fibr',
    component: FibrComponent
    },
    {
    path: '/dsl',
    name: 'DSL',
    component: DSLComponent
    },
    {
    path: '/ultera',
    name: 'Ultera',
    component: UlteraComponent
    },
    {
    path: '/basicPhone',
    name: 'BasicPhone',
    component: BasicPhoneComponent
    },
    {
    path: '/bundle',
    name: 'BundleIvt',
    component: BundleIvtComponent
    }
    
])

export class AppComponent implements OnInit {

    constructor(private _router: Router,        
        private _headerService: HeaderService,
        private _layoutService: LayoutService   ) {
        new FastClick(document.body);
    }

    ngOnInit() {
    }
    
    isAdvHidden(){
        return this._layoutService.currentPage==='Compare';
    }
    
    OnScroll(){
        this._headerService.headerOnScroll();
    }

}
