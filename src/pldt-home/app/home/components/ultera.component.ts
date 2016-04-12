import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { LayoutService } from '../../shared/services/layout.service';
import {MultiSliderComponent} from '../../shared/components/multi-slider.component';
import {PldtPlanComponent} from './pldt-plan.component';

@Component({
    selector: 'ultera',
    templateUrl: 'app/home/components/ultera.component.html',
    directives: [
        MultiSliderComponent,
        PldtPlanComponent
    ]
})
export class UlteraComponent implements OnInit{
    
    itemShow = false;

    constructor(private _router:Router,
    private _layoutService:LayoutService) {
        this._layoutService.setCurrentPage('Ultera');
    }
    
    ngOnInit(){
        //var mapCanvas = document.getElementById("googleMap");
	    //var googleMap = new Mapping.GoogleMap(mapCanvas);
    }
    
    goToFibr(){
        this._router.navigate(["Fibr"]);
    }
    
    goToDSL(){
        this._router.navigate(["DSL"]);
    }
    
    goToCompare(){
        this._router.navigate(["Compare"]);
    }
    
    openItem(){
        this.itemShow = true;
    }

}
