import {Injectable} from 'angular2/core';
import {PhoneNumber} from '../models/phone-number';
import {SmartIntegrationService} from './smart-integration.service';
import { Router } from 'angular2/router';

@Injectable()
export class AccountService {
    
    selectedPhoneNumber: PhoneNumber ={
        type: '', isBroadband:false, name: '', number: ''
    };
    
    allPhoneNumber: any = [];
    
    userPhoneNumber: any = [
        {number:'092898874081',name:'Tiffany',primary:true,type:'Postpaid'},
        {number:'092898874081',name:'Tamara',primary:false,type:'Prepaid'},
        {number:'092898874081',name:'Jessica',primary:false,type:'Bro Postpaid'},
        {number:'092898874081',name:'',primary:false,type:'Bro prepaid'}
    ];
    
    selectedUserPhone:any = {
        phoneNo: "",
        name: "",
        rewards: ""
    };
    
    balance: any = {
        accountNumber: '',
        outstandingBalance: 0,
        previousBalance: 0,
        currentBalance: 0,
        cutOff: '',
        dueDate: '',
        ratePlan: ''
    };
    
    avalaiblePoints:string = '-';
    
    mobileNoList = [];
    
    // accountOverView: any = {
    //     accountNumber
    //     Ada
    //     Billing Address
    //     Contract
    //     Contract Code
    //     Credit Limit
    //     Cutoff Day
    //     Effective Date
    //     Expiration Date
    //     Rate Plan

    // };
    
    constructor (private _smartIntegrationService: SmartIntegrationService,private _router:Router) {}
    
    getUserPhoneNumber(){
        return this.userPhoneNumber;
    }
    
    setSelectedUserPhone(userPhone){
        this.selectedUserPhone = userPhone;
        console.log(userPhone);
    }
    
    getSelectedUserPhone(){
        return this.selectedUserPhone
    }
    
    getPlanName(){
        return 'usual plan';//JSON.parse(sessionStorage.getItem('loginData')).result.planName;
    }

    
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
    
    setSelectedPhoneNumber(phoneNumber: PhoneNumber){
        this.selectedPhoneNumber = phoneNumber;
    }
    
    
    getBalance(){
        
        var balanceInStorage = sessionStorage.getItem('myBalance');
        
        if(balanceInStorage === null || balanceInStorage === undefined ){
            //this.getBalanceFromBackEnd();
        }else{
            this.balance = JSON.parse(balanceInStorage);
        }
        
        return this.balance;
        
    }
    
    getBalanceFromBackEnd(refresh:boolean){
        
        var balanceInStorage = sessionStorage.getItem('myBalance');
        
        if(refresh === true || balanceInStorage === null || balanceInStorage === undefined){
        
            //TODO should be change base on the phone number selected
            var phoneNumber = localStorage.getItem('phoneNumber');
            var promise = this._smartIntegrationService.getBalance(phoneNumber);
            
            promise.subscribe(
                response => {
                    
                    //save my balance data
                    this.balance = response.json();
                    console.log(this.balance);
                    sessionStorage.setItem('myBalance',JSON.stringify(this.balance));
                    
                },
                error =>{
                    console.log('not authorize?');
                }
            );
        }
        
    }
    
    getPoints(){
        
        var pointsInStorage = sessionStorage.getItem('myPoints');
        
        if(pointsInStorage === null || pointsInStorage === undefined ){
        }else{
            this.avalaiblePoints = JSON.parse(pointsInStorage).availablePoints;
        }
        
        return this.avalaiblePoints;
        
    }
    
    getMobileNumberlist(){
        
        var mobileInStorage = sessionStorage.getItem('mobileNo');
        
        if(mobileInStorage === null || mobileInStorage === undefined ){
        }else{
            this.mobileNoList = JSON.parse(mobileInStorage).availablePoints;
            this.selectedUserPhone = this.avalaiblePoints[0];
        }
        
        return this.mobileNoList;
        
    }
    
    getMobileNumberlistFromBackEnd(refresh:boolean){
        
        var mobileInStorage = sessionStorage.getItem('mobileNo');
        
        if(refresh === true || mobileInStorage === null || mobileInStorage === undefined){
        
            //TODO should be change base on the phone number selected
            var promise = this._smartIntegrationService.getMobileListNumber();
            
            promise.subscribe(
                response => {
                    
                    //save my balance data
                    this.mobileNoList = response.json();
                    sessionStorage.setItem('mobileNo',JSON.stringify(response.json()));
                    this.selectedUserPhone = this.mobileNoList[0];
                    console.log(this.selectedUserPhone);
                    
                },
                error =>{
                    console.log('not authorize?');
                }
            );
        }
        
    }
    
    getPointsFromBackEnd(refresh:boolean){
        
        var pointsInStorage = sessionStorage.getItem('myPoints');
        
        if(refresh === true || pointsInStorage === null || pointsInStorage === undefined){
        
            //TODO should be change base on the phone number selected
            var phoneNumber = localStorage.getItem('phoneNumber');
            var promise = this._smartIntegrationService.getAvalaiblePoints(phoneNumber);
            
            promise.subscribe(
                response => {
                    
                    //save my balance data
                    this.avalaiblePoints = response.json().availablePoints;
                    sessionStorage.setItem('myPoints',JSON.stringify(response.json()));
                    
                },
                error =>{
                    
                    if(error.status === 401 || error.status){
                        this._router.navigate(['Starter','Login']);
                    }
                    
                    console.log('not authorize?');
                }
            );
        }
        
    }
    
}
