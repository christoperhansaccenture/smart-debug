import { Injectable } from 'angular2/core';

@Injectable()
export class LayoutService {

    layout = {
        pltn: false
    };

    constructor() {}

    setLayout(key, value) {
        this.layout[key] = value;
    }

    getLayout() {
        return this.layout;
    }

}
