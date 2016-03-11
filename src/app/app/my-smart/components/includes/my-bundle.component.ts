import {Component} from 'angular2/core';
import {MatchMediaService} from '../../../shared/services/match-media.service';

@Component({
    selector: 'my-bundle',
    templateUrl: 'app/my-smart/components/includes/my-bundle.component.html'
})
export class MyBundleComponent {
    
    constructor (private _matchMediaService: MatchMediaService) {}
    
    getResize(){
        return this._matchMediaService.getmm();  
    }
    
}
