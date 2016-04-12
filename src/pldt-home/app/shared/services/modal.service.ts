import { Injectable } from 'angular2/core';
import { LayoutService } from './layout.service';

@Injectable()
export class ModalService {

    currentPage: string;
    numberSelection = false;

    mainModalState = false;

    modalState = {
       login : false
    }

    errorMessage = '';

    constructor(private _layoutService: LayoutService) {}

    getModalState() {
        return this.modalState;
    }

    getMainModalState() {
        return this.mainModalState;
    }
    
    toggleLoginModal(){
        this.mainModalState = !this.mainModalState;
        this.modalState.login = !this.modalState.login;
    }

}
