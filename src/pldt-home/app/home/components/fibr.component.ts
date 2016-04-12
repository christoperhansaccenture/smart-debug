import { Component } from 'angular2/core';
import { Router } from 'angular2/router';
import { LayoutService } from '../../shared/services/layout.service';
import {MultiSliderComponent} from '../../shared/components/multi-slider.component';
import {PldtPlanComponent} from './pldt-plan.component';

@Component({
    selector: 'fibr',
    templateUrl: 'app/home/components/fibr.component.html',
    directives: [
        MultiSliderComponent,
        PldtPlanComponent
    ],
})
export class FibrComponent{
    
    itemShow = false;

    constructor(private _router:Router,
    private _layoutService:LayoutService) {
        this._layoutService.setCurrentPage('Fibr');
        console.log(this._layoutService.currentPage);
    }
    
    ngOnInit(){
        //var mapCanvas = document.getElementById("googleMap");
	    //var googleMap = new Mapping.GoogleMap(mapCanvas);
    }
    
    goToDSL(){
        this._router.navigate(["DSL"]);
    }
    
    goToCompare(){
        this._router.navigate(["Compare"]);
    }
    
    goToUltera(){
        this._router.navigate(["Ultera"]);
    }
    
    openItem(){
        this.itemShow = true;
    }

}
