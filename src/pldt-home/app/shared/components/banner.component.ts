import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import { LayoutService } from '../services/layout.service';

@Component({
    selector: 'banner',
    templateUrl: 'app/shared/components/banner.component.html'
})
export class BannerComponent {

    constructor(private _layoutService: LayoutService) { }
    
    isCompare(){
        if(this._layoutService.currentPage==='Compare'){
            return true;
        }
        else{
            return false;
        }
    }
    
    isFibr(){
        if(this._layoutService.currentPage==='Fibr'){
            return true;
        }
        else{
            return false;
        }
    }
    
    isPhone(){
        if(this._layoutService.currentPage==='Phone'){
            return true;
        }
        else{
            return false;
        }
    }
    
    isBundle(){
        if(this._layoutService.currentPage==='Bundle'){
            return true;
        }
        else{
            return false;
        }
    }
    
    adverTitleText(){
        
        if(this._layoutService.currentPage==='Fibr'){
            return 'Get 2x Speed with Plan 2899';
        }
        else if(this._layoutService.currentPage==='Bundle'){
            return 'All-in-1 Package';
        }
        else if(this._layoutService.currentPage==='Phone'){
            return 'With Sulit Talk';
        }else{
            return 'Get the speedster plan 1299';
        }
    }
    
    adverDescText(){
        
        if(this._layoutService.currentPage==='Fibr'){
            return 'Up to 100 Mbps for 6 months';
        }
        else if(this._layoutService.currentPage==='Bundle'){
            return 'Internet, TV channel, and Home Phone in our Best Value bundle';
        }
        else if(this._layoutService.currentPage==='Phone'){
            return 'No longer expensive monthly bills';
        }else{
            return 'With 50 GB monthly volume allowance';
        }
    }

}
