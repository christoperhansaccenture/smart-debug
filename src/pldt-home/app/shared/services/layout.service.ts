import { Injectable } from 'angular2/core';

@Injectable()
export class LayoutService {

    currentPage: string = '';
    
    layout ={
        compare : false
    }

    constructor() {}
    
    setCurrentPage(page : string){
        this.currentPage = page;
    }
    
    getCurrentPage(){
        return this.currentPage;
    }

}
