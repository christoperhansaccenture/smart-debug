import {Injectable} from 'angular2/core';
import { Layout } from '../models/layout';
import {LayoutService} from './layout.service';

@Injectable()
export class ModalService {

	currentPage: string;
    numberSelection = false;
    
    mainModalState = false;

	modalState = {
		renewPlan: false,
        info: false,
        updateCredit: false,
        balance: false,
        catalogDisplay: false
	}
    
    infoModalState = {
        transfer : false
    }
    
    transferData: any = {
        point: '',
        phone: ''
    }
	
	constructor (private _layoutService: LayoutService) {}
	
	getModalState(){
        return this.modalState;
    }
    
    getMainModalState(){
        return this.mainModalState;
    }
    
    getInfoModalState(){
        return this.infoModalState;
    }

    toggleCatalogDisplayModal() {
        this.mainModalState = !this.mainModalState;
        this.modalState.catalogDisplay = !this.modalState.catalogDisplay;
    }
    
    toggleTransferModal(){
        this.mainModalState = !this.mainModalState;
        this.modalState.info = !this.modalState.info;
        this.infoModalState.transfer = !this.infoModalState.transfer; 
    }
    
    setTransferData(point,phone){
        this.transferData.point = point;
        this.transferData.phone = phone;
    }
    
    getTransferData(){
        return this.transferData;
    }
    
}
