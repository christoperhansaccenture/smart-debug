import { Component } from 'angular2/core';
import { Router } from 'angular2/router';
import { LayoutService } from '../../shared/services/layout.service';

@Component({
    selector: 'pldt-home-pltn',
    templateUrl: 'app/home/components/home-pltn.component.html'
})
export class HomePltnComponent{
    
    option = {
        explore: false,
        link: false,
        help: false
    }

    constructor(private _router:Router,
    private _layoutService:LayoutService) {
        this._layoutService.setCurrentPage('Home');
    }
    
    exploreText(){
        if(this.option.explore){
            return 'See Less';
        }
        else{
            return 'See More';
        }
    }
    
    linkText(){
        if(this.option.link){
            return 'See Less';
        }
        else{
            return 'See More';
        }
    }
    
    helpText(){
        if(this.option.help){
            return 'See Less';
        }
        else{
            return 'See More';
        }
    }
    
    toggleExplore(){
        this.option.explore = !this.option.explore;
    }
    
    toggleLink(){
        this.option.link = !this.option.link;
    }
    
    toggleHelp(){
        this.option.help = !this.option.help;
    }
    
    goToCompare(){
        this._router.navigate(['Compare']);
    }

}
