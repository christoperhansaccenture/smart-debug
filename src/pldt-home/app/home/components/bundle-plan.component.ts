import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { LayoutService } from '../../shared/services/layout.service';
import {MultiSliderComponent} from '../../shared/components/multi-slider.component';

@Component({
    selector: 'bundle-plan',
    templateUrl: 'app/home/components/bundle-plan.component.html',
    directives: [
        MultiSliderComponent
    ]
})
export class BundlePlanComponent{
    
    filter = {
        price : [999,5000],
        speed : [1,1000],
        quota : [80,1000]    
    };

    constructor(private _router:Router) {
        
    }
    
    getFilter(){
        return this.filter;
    }

}
