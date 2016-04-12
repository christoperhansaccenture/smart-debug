import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { LayoutService } from '../../shared/services/layout.service';
import {MultiSliderComponent} from '../../shared/components/multi-slider.component';

@Component({
    selector: 'dsl-plan',
    templateUrl: 'app/home/components/dsl-plan.component.html',
    directives: [
        MultiSliderComponent
    ]
})
export class DSLPlanComponent{
    
    filter = {
        price : [999,5000],
        speed : [1,100],
        quota : [80,200]    
    };

    constructor(private _router:Router) {
        
    }
    
    getFilter(){
        return this.filter;
    }

}
