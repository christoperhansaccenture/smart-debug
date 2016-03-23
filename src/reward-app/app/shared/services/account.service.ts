import {Injectable} from 'angular2/core';
import {PhoneNumber} from '../models/phone-number';
import {SmartIntegrationService} from './smart-integration.service';
import { Router } from 'angular2/router';

@Injectable()
export class AccountService {
    
    selectedUserPhone:any = {
        phoneNo: "",
        name: "",
        rewards: ""
    };
    
    mobileNoList = [];
    userProfile = {};
    
    
    constructor (private _smartIntegrationService: SmartIntegrationService,private _router:Router) {}
    
    setSelectedUserPhone(userPhone){
        this.selectedUserPhone = userPhone;
    }
    
    getSelectedUserPhone(){
        return this.selectedUserPhone
    }
    
    getMobileNumberlist(){
        
        var mobileInStorage = sessionStorage.getItem('mobileNo');
        
        if(mobileInStorage === null || mobileInStorage === undefined ){
        }else{
            this.mobileNoList = JSON.parse(mobileInStorage);
            this.selectedUserPhone = this.mobileNoList[0];
        }
        
        return this.mobileNoList;
        
    }
    
    getUserProfile(){
        
        var userProfileInStorage = sessionStorage.getItem('userProfile');
        
        if(userProfileInStorage === null || userProfileInStorage === undefined ){
        }else{
            this.userProfile = JSON.parse(userProfileInStorage);
        }
        
        return this.userProfile;
        
    }
    
    getMobileNumberlistFromBackEnd(refresh:boolean){
        
        var mobileInStorage = sessionStorage.getItem('mobileNo');
        
        if(refresh === true || mobileInStorage === null || mobileInStorage === undefined){
        
            var promise = this._smartIntegrationService.getMobileListNumber();
            
            promise.subscribe(
                response => {
                    
                    this.mobileNoList = response.json();
                    console.log('mobile no list: ' + JSON.stringify(this.mobileNoList));
                    sessionStorage.setItem('mobileNo',JSON.stringify(response.json()));
                    let min = localStorage.getItem('phoneNumber');
                    this.selectedUserPhone = this.mobileNoList.filter(e => e.phoneNo === min)[0];
                    
                },
                error =>{
                    console.log('not authorize?');
                }
            );
        }
        
    }
    
    getUserProfileFromBackEnd(refresh:boolean){
        
        var userProfileInStorage = sessionStorage.getItem('userProfile');
        
        if(refresh === true || userProfileInStorage === null || userProfileInStorage === undefined){
        
            var promise = this._smartIntegrationService.getProfileInformation();
            
            promise.subscribe(
                response => {
                    
                    this.userProfile = response.json();
                    sessionStorage.setItem('userProfile',JSON.stringify(response.json()));
                    
                },
                error =>{
                    console.log('not authorize?');
                }
            );
        }
        
    }
    
    updateUserProfileToBackEnd(){
        
        
        var promise = this._smartIntegrationService.updateProfileInformation(JSON.stringify(this.userProfile));
        
        promise.subscribe(
            response => {
                
                //open modal successfully updated
                
            },
            error =>{
                console.log('not authorize?');
                
                //open modal failed to update
                
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
    
}
