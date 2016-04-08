import { Component } from 'angular2/core';
import { Router } from 'angular2/router';
import { LayoutService } from '../../shared/services/layout.service';

@Component({
    selector: 'pldt-home-pltn',
    templateUrl: 'app/home/components/home-pltn.component.html',
    providers: [LayoutService]
})
export class HomePltnComponent{

    items: Object[] = ["1", "2", "3"];

    constructor() {}

}
