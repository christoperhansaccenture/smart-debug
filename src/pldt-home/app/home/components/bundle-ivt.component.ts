import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { LayoutService } from '../../shared/services/layout.service';
import {MultiSliderComponent} from '../../shared/components/multi-slider.component';
import {BundlePlanComponent} from './bundle-plan.component';

@Component({
    selector: 'bundle-plan',
    templateUrl: 'app/home/components/bundle-ivt.component.html',
    directives: [
        MultiSliderComponent,
        BundlePlanComponent
    ]
})
export class BundleIvtComponent implements OnInit{
    
    itemShow = false;

    constructor(private _router:Router,
    private _layoutService:LayoutService) {
        this._layoutService.setCurrentPage('Bundle');
    }
    
    ngOnInit(){
        //var mapCanvas = document.getElementById("googleMap");
	    //var googleMap = new Mapping.GoogleMap(mapCanvas);
    }
    
    goToUltera(){
        this._router.navigate(["Ultera"]);
    }
    
    goToFibr(){
        this._router.navigate(["Fibr"]);
    }
    
    goToDSL(){
        this._router.navigate(["DSL"]);
    }
    
    openItem(){
        this.itemShow = true;
    }

}
