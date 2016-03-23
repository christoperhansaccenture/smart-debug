'use strict';
export module ErrorHandlingService {
    
    export interface errorHandlingInterface {
        
    }
    
    export class ErrorHandlingService implements errorHandlingInterface {

        constructor() {
            var vm = this;       
        }
        
        transferRequestErrorHandling(res:string,result:string){
            
            var resJson = JSON.parse(result);
            
            var errorJson = {
                messsage : ''
            }
            
            var checkGeneric = res;
            
            checkGeneric = this.genericErrorHandling(res,result);
            
            if(checkGeneric !== null){
                return checkGeneric;
            }
            
            if(resJson.errorcode === 'ERR_NO_DATA_FOUND'){
                res.sendStatus(400);
                errorJson.message = 'Transfer target is not found';
                res.json(errorJson);
            }
            else if(resJson.errorcode === 'ERR_PARTY_NOT_ACTIVE'){
                res.sendStatus(400);
                errorJson.message = 'Transfer target is unregistered';
                res.json(errorJson);
            }
            else if(resJson.errorcode === 'ERR_TRANSFER_REQUEST_TIER_NOT_VALID'){
                res.sendStatus(400);
                errorJson.message = 'Transfer target tier not valid for transfer points';
                res.json(errorJson);
            }
            else if(resJson.errorcode === 'ERR_MAX_TRANSFER_POINT_COUNT_EXCEEDED'){
                res.sendStatus(400);
                errorJson.message = 'Transfer source exceeded the frequency of transferring points per day';
                res.json(errorJson);
            }
            else if(resJson.errorcode === 'ERR_TRANSFER_PARTIES_LINKED'){
                res.sendStatus(400);
                errorJson.message = 'Transfer source and trasfer target are linked account';
                res.json(errorJson);
            }
            else if(resJson.errorcode === 'ERR_TRANSFER_REQUEST_WAITING'){
                res.sendStatus(400);
                errorJson.message = 'You transfered points as child account. Waiting parent account confirmation';
                res.json(errorJson);
            }
            else if(resJson.errorcode === 'ERR_TRANSFER_REQUEST'){
                res.sendStatus(400);
                errorJson.message = 'Failed to transfer points';
                res.json(errorJson);
            }
            else if(resJson.errorcode === 'ERR_DUPLICATE_TRANSFER_REQUEST'){
                res.sendStatus(400);
                errorJson.message = 'There is a transfer request on process. Wait until it is finished';
                res.json(errorJson);
            }
            else{
                return null;
            }
            
            return res;
            
        }
        
        genericErrorHandling(res:string,result:string){
            
            var resJson = JSON.parse(result);
            
            var errorJson = {
                messsage : ''
            }
            
            if(resJson.errorcode === 'ERR_LAST_NAME_IS_MANDATORY' ||
               resJson.errorcode === 'ERR_FIRST_NAME_IS_MANDATORY' ||
               resJson.errorcode === 'ERR_MIDDLE_NAME_IS_MANDATORY' ||
               resJson.errorcode === 'ERR_ADDRESS_IS_MANDATORY' ||
               resJson.errorcode === 'ERR_PROVINCE_IS_MANDATORY' ||
               resJson.errorcode === 'ERR_CITY_IS_MANDATORY'
               ){
                res.sendStatus(400);
                errorJson.message = 'Please complete your profile first before proceeding with any transaction';
                res.json(errorJson);
            }
            else if(resJson.errorcode === 'ERR_OPERATION_NOT_ALLOWED'){
                res.sendStatus(400);
                errorJson.message = 'You are not allowed to do the requested transaction';
                res.json(errorJson);
            }
            else if(resJson.errorcode === 'ERR_OPERATION_FAILED'){
                res.sendStatus(400);
                errorJson.message = 'operation failed. Please try again';
                res.json(errorJson);
            }
            else{
                return null;
            }
            
            return res;
            
        }
        
    }
}
