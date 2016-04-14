import { Injectable } from 'angular2/core';
import { Layout } from '../models/layout';

@Injectable()
export class LayoutService {

    currentPage: string = '';
    
    layoutState : Layout = {
		appHeader: false,
		loginHeader: false,
        appFooter: false,
        leftMenu: false
	};
    
    layout ={
        compare : false
    }

    constructor() {}
    
    setCurrentPage(page : string){
        this.currentPage = page;
        this.layoutState.appHeader = true;
        this.layoutState.loginHeader = false;
        this.layoutState.appFooter = false;
        this.layoutState.leftMenu = false;
    }
    
    getCurrentPage(){
        return this.currentPage;
    }
    
    getLayout(){
		return this.layoutState;
	}
    
    toggleLeftMenu(){
        this.layoutState.leftMenu = !this.layoutState.leftMenu;
    }
    
    getLeftMenuState(){
        return this.layoutState.leftMenu;
    }

}
