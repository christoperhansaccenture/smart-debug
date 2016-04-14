import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { LayoutService } from '../../shared/services/layout.service';
import {MultiSliderComponent} from '../../shared/components/multi-slider.component';
import {PldtPlanComponent} from './pldt-plan.component';
import {MatchMediaService} from '../../shared/services/match-media.service';

@Component({
    selector: 'compare',
    templateUrl: 'app/home/components/compare.component.html',
    directives: [
        MultiSliderComponent,
        PldtPlanComponent
    ]
})
export class CompareComponent implements OnInit{
    
    itemShow = false;

    constructor(private _router:Router,
    private _layoutService:LayoutService,
    private _matchMediaService:MatchMediaService) {
        this._layoutService.setCurrentPage('Compare');
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
    
    getLayout(){
		return this._layoutService.getLayout();
	}
    
    getResize(){
        return this._matchMediaService.getmm();
        
    }

}
