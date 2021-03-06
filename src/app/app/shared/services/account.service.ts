import {Injectable} from 'angular2/core';
import {PhoneNumber} from '../models/phone-number';
import {SmartIntegrationService} from './smart-integration.service';
import { Router } from 'angular2/router';
import {ModalService} from './modal.service';

@Injectable()
export class AccountService {
    
    //TODO move these parameter to better implementation
    spinnerAccount = false;
    spinnerLoading = false;
    spinnerProfile = false;
    
    selectedUserPhone:any = {
        phoneNo: "",
        name: "",
        primary: ""
    };
    
    rewardsData:any = {
        rewards: 0,
        expPoints: '',
        expDate: ''
    }
    
    mobileNoList = [];
    userProfile = {};
    
    
    constructor (private _smartIntegrationService: SmartIntegrationService,
        private _router:Router,
        private _modalService:ModalService) {}
    
    setSelectedUserPhoneByPhoneNo(phoneNo){
        localStorage.setItem('mobileNo',phoneNo);
        this.selectedUserPhone = this.mobileNoList.filter(e => e.phoneNo === phoneNo)[0];
        sessionStorage.setItem('SelectedPhone',JSON.stringify(this.selectedUserPhone));
    }
    
    setSelectedUserPhone(userPhone){
        localStorage.setItem('mobileNo',userPhone.phoneNo);
        this.selectedUserPhone = userPhone;
        sessionStorage.setItem('SelectedPhone',JSON.stringify(userPhone));
    }
    
    getSelectedUserPhone(){
        
        var selectedPhone = sessionStorage.getItem('SelectedPhone');
        
        if(selectedPhone === null || selectedPhone === undefined ){
            //this.getMobileNumberlistFromBackEnd(true);
        }else{
            this.selectedUserPhone = JSON.parse(selectedPhone);
        }
        return this.selectedUserPhone;
        
    }
    
    getMobileNumberlist(){
        
        var mobileInStorage = localStorage.getItem('mobileNoList');
        //console.log(mobileInStorage);
        if(mobileInStorage === null || mobileInStorage === undefined ){
            //this.getMobileNumberlistFromBackEnd(true);
        }else{
            this.mobileNoList = JSON.parse(mobileInStorage);
            //this.selectedUserPhone = this.mobileNoList[0];
        }
        
        //return this.mobileNoList;
        
    }
    
    getRewardsBalance(){
        
        var rewardsInStorage = sessionStorage.getItem('rewardsData');
        
        if(rewardsInStorage === null || rewardsInStorage === undefined ){
            //this.getMobileNumberlistFromBackEnd(true);
        }else{
            this.rewardsData = JSON.parse(rewardsInStorage);
        }
        
        return this.rewardsData;
        
    }
    
    getUserProfile(){
        
        if(this.userProfile !== null && this.userProfile !== undefined){
            return this.userProfile;
        }
        
        var userProfileInStorage = sessionStorage.getItem('userProfile');
        
        if(userProfileInStorage === null || userProfileInStorage === undefined ){
        }else{
            this.userProfile = JSON.parse(userProfileInStorage);
        }
        
        return this.userProfile;
        
    }
    
    initializeForgotPassword(type:string,account:string){
        
        let link = ['VerificationForm'];
        this._router.navigate(link); 
        
        //var promise = this._smartIntegrationService.initializeForgotPassword(type,account);
            
        // promise.subscribe(
        //     response => {
                
                
                
        //     },
        //     error =>{
        //         console.log('not authorize?');
        //         this.spinnerForgotPassword = false;
        //     }
        // );
        
    }
    
    getMobileNumberlistFromBackEnd(refresh:boolean){
        
        var mobileInStorage = localStorage.getItem('mobileNoList');
        
        if(refresh === true || mobileInStorage === null || mobileInStorage === undefined){
            
            this.spinnerAccount = true;
            
            var promise = this._smartIntegrationService.getMobileListNumber();
            
            promise.subscribe(
                response => {
                    
                    this.mobileNoList = response.json().phoneData;
                    
                    this.rewardsData.rewards = response.json().rewards;
                    this.rewardsData.expPoints = response.json().expPoints;
                    
                    this.rewardsData.expDate = response.json().expDate;
                    var arrayDate = this.rewardsData.expDate.split('-');
                    var month = '';
                    
                    if(arrayDate[1] === '01'){
                        month = 'Jan';
                    }else if(arrayDate[1] === '02'){
                        month = 'Feb';
                    }else if(arrayDate[1] === '03'){
                        month = 'Mar';
                    }else if(arrayDate[1] === '04'){
                        month = 'Apr';
                    }else if(arrayDate[1] === '05'){
                        month = 'May';
                    }else if(arrayDate[1] === '06'){
                        month = 'Jun';
                    }else if(arrayDate[1] === '07'){
                        month = 'Jul';
                    }else if(arrayDate[1] === '08'){
                        month = 'Aug';
                    }else if(arrayDate[1] === '09'){
                        month = 'Sep';
                    }else if(arrayDate[1] === '10'){
                        month = 'Oct';
                    }else if(arrayDate[1] === '11'){
                        month = 'Nov';
                    }else if(arrayDate[1] === '12'){
                        month = 'Dec';
                    }
                    
                    this.rewardsData.expDate = month + ' ' + arrayDate[2] + ', ' + arrayDate[0];
                    
                    sessionStorage.setItem('rewardsData',JSON.stringify(this.rewardsData));
                    
                    console.log('mobile no list: ' + JSON.stringify(this.mobileNoList));
                    localStorage.setItem('mobileNoList',JSON.stringify(response.json().phoneData));
                    let min = localStorage.getItem('mobileNo');
                    this.selectedUserPhone = this.mobileNoList.filter(e => e.phoneNo === min)[0];
                    sessionStorage.setItem('SelectedPhone',JSON.stringify(this.selectedUserPhone));
                    let brands = this.mobileNoList.filter(e => e.ssoBrand != null).map(phone => phone.ssoBrand);
                    localStorage.setItem('brands', JSON.stringify(brands));
                    this.spinnerAccount = false;
                    
                },
                error =>{
                    console.log('not authorize?');
                    this.spinnerAccount = false;
                }
            );
        }else{
            
           this.getRewardsBalance();
           this.getMobileNumberlist();
            
        };
        
    }
    
    //call from login with resolve and reject
    getMobileNumberlistFromBackEndPromise(refresh:boolean){
        
        var mobileInStorage = localStorage.getItem('mobileNoList');
        
        if(refresh === true || mobileInStorage === null || mobileInStorage === undefined){
            
            this.spinnerAccount = true;
            
            var promise = this._smartIntegrationService.getMobileListNumber();
            
            let p = new Promise((resolve, reject) => {
                promise.subscribe(
                    response => {

                        this.mobileNoList = response.json().phoneData;

                        this.rewardsData.rewards = response.json().rewards;
                        this.rewardsData.expPoints = response.json().expPoints;

                        this.rewardsData.expDate = response.json().expDate;
                        var arrayDate = this.rewardsData.expDate.split('-');
                        var month = '';

                        if(arrayDate[1] === '01'){
                            month = 'Jan';
                        }else if(arrayDate[1] === '02'){
                            month = 'Feb';
                        }else if(arrayDate[1] === '03'){
                            month = 'Mar';
                        }else if(arrayDate[1] === '04'){
                            month = 'Apr';
                        }else if(arrayDate[1] === '05'){
                            month = 'May';
                        }else if(arrayDate[1] === '06'){
                            month = 'Jun';
                        }else if(arrayDate[1] === '07'){
                            month = 'Jul';
                        }else if(arrayDate[1] === '08'){
                            month = 'Aug';
                        }else if(arrayDate[1] === '09'){
                            month = 'Sep';
                        }else if(arrayDate[1] === '10'){
                            month = 'Oct';
                        }else if(arrayDate[1] === '11'){
                            month = 'Nov';
                        }else if(arrayDate[1] === '12'){
                            month = 'Dec';
                        }

                        this.rewardsData.expDate = month + ' ' + arrayDate[2] + ', ' + arrayDate[0];

                        sessionStorage.setItem('rewardsData',JSON.stringify(this.rewardsData));

                        console.log('mobile no list: ' + JSON.stringify(this.mobileNoList));
                        localStorage.setItem('mobileNoList',JSON.stringify(response.json().phoneData));
                        let min = localStorage.getItem('mobileNo');
                        this.selectedUserPhone = this.mobileNoList.filter(e => e.phoneNo === min)[0];
                        sessionStorage.setItem('SelectedPhone',JSON.stringify(this.selectedUserPhone));
                        let brands = this.mobileNoList.map(phone => phone.ssoBrand);
                        localStorage.setItem('brands', JSON.stringify(brands));
                        this.spinnerAccount = false;

                        resolve();
                    },
                    error =>{
                        console.log('not authorize?');
                        this.spinnerAccount = false;
                        reject(error);
                    }
                );
            });
            return p;
        }
        
    }
    
    getUserProfileFromBackEnd(refresh:boolean){
        
        var userProfileInStorage = sessionStorage.getItem('userProfile');
        
        if(refresh === true || userProfileInStorage === null || userProfileInStorage === undefined){
            this.spinnerProfile = true;
            var promise = this._smartIntegrationService.getProfileInformation();
            
            promise.subscribe(
                response => {
                    
                    this.userProfile = response.json();
                    sessionStorage.setItem('userProfile',JSON.stringify(response.json()));
                    this.spinnerProfile = false;
                },
                error =>{
                    console.log('not authorize?');
                    this.spinnerProfile = false;
                }
            );
        }
        
    }
    
    updateUserProfileToBackEnd(){
        
        
        var promise = this._smartIntegrationService.updateProfileInformation(JSON.stringify(this.userProfile));
        
        promise.subscribe(
            response => {
                
                //open modal successfully updated
                this._modalService.toggleProfileModal();
            },
            error =>{
                console.log('not authorize?');
                
                //open modal failed to update
                this._modalService.setErrorMessage('Failed to update profile');
                this._modalService.toggleErrorModal();
            }
        );
    }
    
    transferPoints(transferData){
        
        
        var promise = this._smartIntegrationService.transferPoints(JSON.stringify(transferData));
        
        promise.subscribe(
            response => {
                console.log(response.json());
                //open modal successfully transfer
                this._modalService.toggleTransferModal();
                this._modalService.setTransferData(transferData.amount,transferData.to);
                
                //need new call for this
                this.getMobileNumberlistFromBackEnd(true);
            },
            error =>{
                //open modal failed transfer
                this._modalService.setErrorMessage(error.json().message);
                this._modalService.toggleErrorModal();
            }
        );
    }

    // TODO: To be cleaned up
    selectedPhoneNumber: PhoneNumber ={
        type: '', isBroadband:false, name: '', number: ''
    };

    allPhoneNumber: any = [];

    getAllAvalaiblePhoneNumber(){

        if(this.allPhoneNumber == undefined || this.allPhoneNumber == null || this.allPhoneNumber.length === 0){

            //TODO find how to get all phone number list
            var phoneNumber:string = localStorage.getItem('phoneNumber');
            //var name = JSON.parse(sessionStorage.getItem('loginData')).result.name;
            var name = 'Dummy Name'

            this.allPhoneNumber.push({type: 'postpaid', isBroadband: false, name: name, number: phoneNumber});
            this.allPhoneNumber.push({type: 'postpaid', isBroadband: true, name: '', number: '09293424235'});
            this.allPhoneNumber.push({type: 'prepaid', isBroadband: false, name: '', number: '09293424236'});

            this.selectedPhoneNumber = this.allPhoneNumber[0];

        }

        return this.allPhoneNumber;
    }

    getSelectedPhoneNumber(){

        if(this.allPhoneNumber == undefined || this.allPhoneNumber == null || this.allPhoneNumber.length === 0){
            this.getAllAvalaiblePhoneNumber();
        }

        return this.selectedPhoneNumber;
    }

    userPhoneNumber: any = [
        {number:'092898874081',name:'Tiffany',primary:true,type:'Postpaid'},
        {number:'092898874081',name:'Tamara',primary:false,type:'Prepaid'},
        {number:'092898874081',name:'Jessica',primary:false,type:'Bro Postpaid'},
        {number:'092898874081',name:'',primary:false,type:'Bro prepaid'}
    ];

    getUserPhoneNumber(){
        return this.userPhoneNumber;
    }
    
    linkAccount(min:string):boolean{
        var promise = this._smartIntegrationService.linkAccount(min);
        var res;
        promise.subscribe(
            response => {
                console.log(response.json());
                //open modal successfully transfer
                res = true;
            },
            error =>{
                //open modal failed transfer
                this._modalService.setErrorMessage(error.json().message);
                this._modalService.toggleErrorModal();
                res = false;
            }
        );
        return res;
    }
    
    unlinkAccount(min:string):boolean{
        var promise = this._smartIntegrationService.unlinkAccount(min);
        var res;
        promise.subscribe(
            response => {
                console.log(response.json());
                //open modal successfully transfer
                res = true;
            },
            error =>{
                //open modal failed transfer
                this._modalService.setErrorMessage(error.json().message);
                this._modalService.toggleErrorModal();
                res = false;
            }
        );
        return res;
    }
}
