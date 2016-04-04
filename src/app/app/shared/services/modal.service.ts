import {Injectable} from 'angular2/core';
import { Layout } from '../models/layout';
import {LayoutService} from './layout.service';

@Injectable()
export class ModalService {

	currentPage: string;
    numberSelection = false;
    
    mainModalState = false;

	modalState = {
        info: false,
        error: false,
        catalogDisplay: false,
        profile: false,
        buyaddons: false
	}
    
    infoModalState = {
        transfer : false
    }
    
    transferData: any = {
        point: '',
        phone: ''
    }
    
    errorMessage = '';
	
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
    
    toggleErrorModal(){
        this.mainModalState = !this.mainModalState;
        this.modalState.error = !this.modalState.error;
    }
    
    toggleProfileModal(){
        this.mainModalState = !this.mainModalState;
        this.modalState.profile = !this.modalState.profile;
    }

    toggleBuyAddOnsModal() {
        this.mainModalState = !this.mainModalState;
        this.modalState.buyaddons = !this.modalState.buyaddons;
    }
    
    setTransferData(point,phone){
        this.transferData.point = point;
        this.transferData.phone = phone;
    }
    
    setErrorMessage(message:string){
        this.errorMessage = message;
        console.log(this.errorMessage);
    }
    
    getTransferData(){
        return this.transferData;
    }
    
}
