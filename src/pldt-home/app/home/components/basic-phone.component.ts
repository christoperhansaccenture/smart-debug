import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { LayoutService } from '../../shared/services/layout.service';
import {MultiSliderComponent} from '../../shared/components/multi-slider.component';
import {PldtPlanComponent} from './pldt-plan.component';

@Component({
    selector: 'BasicPhone',
    templateUrl: 'app/home/components/basic-phone.component.html',
    directives: [
        MultiSliderComponent,
        PldtPlanComponent
    ]
})
export class BasicPhoneComponent implements OnInit{
    
    itemShow = false;

    constructor(private _router:Router,
    private _layoutService:LayoutService) {
        this._layoutService.setCurrentPage('Phone');
    }
    
    ngOnInit(){
        //var mapCanvas = document.getElementById("googleMap");
	    //var googleMap = new Mapping.GoogleMap(mapCanvas);
    }
    
    goToUltera(){
        //this._router.navigate(["Ultera"]);
    }
    
    goToFibr(){
        //this._router.navigate(["Fibr"]);
    }
    
    goToDSL(){
        //this._router.navigate(["DSL"]);
    }

}
