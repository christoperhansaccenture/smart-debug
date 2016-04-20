'use strict';
var ErrorHandlingService;
(function (ErrorHandlingService_1) {
    class ErrorHandlingService {
        constructor() {
            var vm = this;
        }
        transferRequestErrorHandling(res, result) {
            var resJson = JSON.parse(result);
            console.log(resJson);
            var errorJson = {
                message: ''
            };
            var error = res;
            error = this.genericErrorHandling(res, result);
            if (error !== null) {
                return error;
            }
            if (resJson.errorcode === 'ERR_NO_DATA_FOUND') {
                errorJson.message = 'Transfer target is not found';
                res.status(400).json(errorJson);
            }
            else if (resJson.errorcode === 'ERR_PARTY_NOT_ACTIVE') {
                errorJson.message = 'Transfer target is unregistered';
                res.status(400).json(errorJson);
            }
            else if (resJson.errorcode === 'ERR_TRANSFER_REQUEST_TIER_NOT_VALID') {
                errorJson.message = 'Transfer target tier not valid for transfer points';
                res.status(400).json(errorJson);
            }
            else if (resJson.errorcode === 'ERR_MAX_TRANSFER_POINT_COUNT_EXCEEDED') {
                errorJson.message = 'Transfer source exceeded the frequency of transferring points per day';
                res.status(400).json(errorJson);
            }
            else if (resJson.errorcode === 'ERR_TRANSFER_PARTIES_LINKED') {
                errorJson.message = 'Transfer source and trasfer target are linked account';
                res.status(400).json(errorJson);
            }
            else if (resJson.errorcode === 'ERR_TRANSFER_REQUEST_WAITING') {
                errorJson.message = 'You transfered points as child account. Waiting parent account confirmation';
                res.status(400).json(errorJson);
            }
            else if (resJson.errorcode === 'ERR_TRANSFER_REQUEST') {
                errorJson.message = 'Failed to transfer points';
                res.status(400).json(errorJson);
            }
            else if (resJson.errorcode === 'ERR_DUPLICATE_TRANSFER_REQUEST') {
                errorJson.message = 'There is a transfer request on process. Wait until it is finished';
                res.status(400).json(errorJson);
            }
            else {
                return null;
            }
            return res;
        }
        genericErrorHandling(res, result) {
            var resJson = JSON.parse(result);
            var errorJson = {
                message: ''
            };
            if (resJson.errorcode === 'ERR_LAST_NAME_IS_MANDATORY' ||
                resJson.errorcode === 'ERR_FIRST_NAME_IS_MANDATORY' ||
                resJson.errorcode === 'ERR_MIDDLE_NAME_IS_MANDATORY' ||
                resJson.errorcode === 'ERR_ADDRESS_IS_MANDATORY' ||
                resJson.errorcode === 'ERR_PROVINCE_IS_MANDATORY' ||
                resJson.errorcode === 'ERR_CITY_IS_MANDATORY') {
                errorJson.message = 'Please complete your profile first before proceeding with any transaction';
                res.status(400).json(errorJson);
            }
            else if (resJson.errorcode === 'ERR_OPERATION_NOT_ALLOWED') {
                errorJson.message = 'You are not allowed to do the requested transaction';
                res.status(400).json(errorJson);
            }
            else if (resJson.errorcode === 'ERR_OPERATION_FAILED') {
                errorJson.message = 'operation failed. Please try again';
                res.status(400).json(errorJson);
            }
            else {
                return null;
            }
            return res;
        }
        genericErrorHandling(response) {
            /*
            var errorJson = {
                status: 0,
                message : ''
            }
           */
            let errors = {};
            errors['ERR_LAST_NAME_IS_MANDATORY'] = {
                status: 400,
                message: 'Please complete your profile first before proceeding with any transaction'
            };
            errors['ERR_FIRST_NAME_IS_MANDATORY'] = {
                status: 400,
                message: 'Please complete your profile first before proceeding with any transaction'
            };
            errors['ERR_MIDDLE_NAME_IS_MANDATORY'] = {
                status: 400,
                message: 'Please complete your profile first before proceeding with any transaction'
            };
            errors['ERR_ADDRESS_IS_MANDATORY'] = {
                status: 400,
                message: 'Please complete your profile first before proceeding with any transaction'
            };
            errors['ERR_PROVINCE_IS_MANDATORY'] = {
                status: 400,
                message: 'Please complete your profile first before proceeding with any transaction'
            };
            errors['ERR_CITY_IS_MANDATORY'] = {
                status: 400,
                message: 'Please complete your profile first before proceeding with any transaction'
            };
            errors['ERR_OPERATION_NOT_ALLOWED'] = {
                status: 400,
                message: 'You are not allowed to do the requested transaction'
            };
            errors['ERR_OPERATION_FAILED'] = {
                status: 400,
                message: 'You are not allowed to do the requested transaction'
            };
            errors['ERR_OPERATION_FAILED'] = {
                status: 400,
                message: 'You are not allowed to do the requested transaction'
            };
            return errors[response.errorcode];
        }
        genericErrorHandlingWithoutErrCode(response) {
            /*
            var errorJson = {
                status: 0,
                message : ''
            }
           */
            let errors = {};
            errors['ERR_LAST_NAME_IS_MANDATORY'] = {
                message: 'Please complete your profile first before proceeding with any transaction'
            };
            errors['ERR_FIRST_NAME_IS_MANDATORY'] = {
                message: 'Please complete your profile first before proceeding with any transaction'
            };
            errors['ERR_MIDDLE_NAME_IS_MANDATORY'] = {
                message: 'Please complete your profile first before proceeding with any transaction'
            };
            errors['ERR_ADDRESS_IS_MANDATORY'] = {
                message: 'Please complete your profile first before proceeding with any transaction'
            };
            errors['ERR_PROVINCE_IS_MANDATORY'] = {
                message: 'Please complete your profile first before proceeding with any transaction'
            };
            errors['ERR_CITY_IS_MANDATORY'] = {
                message: 'Please complete your profile first before proceeding with any transaction'
            };
            errors['ERR_OPERATION_NOT_ALLOWED'] = {
                message: 'You are not allowed to do the requested transaction'
            };
            errors['ERR_OPERATION_FAILED'] = {
                message: 'You are not allowed to do the requested transaction'
            };
            errors['ERR_OPERATION_FAILED'] = {
                message: 'You are not allowed to do the requested transaction'
            };
            return errors[response.errorcode];
        }
        linkAccountErrorHandling(response) {
            console.log(JSON.parse(response).errorcode);
            let result = this.genericErrorHandlingWithoutErrCode(JSON.parse(response));
            if (!result) {
                let errors = {};
                errors['ERR_NOT_AUTHORIZED'] = {
                    message: 'Not Authorized'
                };
                errors['ERR_NO_LOYALTY_ID'] = {
                    message: 'Source Min is not existing'
                };
                errors['ERR_DUPLICATE_LINK_REQUEST'] = {
                    message: 'Duplicate Link Request'
                };
                errors['ERR_NO_DATA_FOUND'] = {
                    message: 'Mobile Number is not found in DB'
                };
                errors['ERR_LINK_REQUEST_SECONDARY_ALREADY_PRIMARY'] = {
                    message: 'Mobile Number is already as primary'
                };
                errors['ERR_LINK_REQUEST_PRIMARY _ALREADY_SECONDARY'] = {
                    message: 'Mobile Number is already as child'
                };
                result = errors[JSON.parse(response).errorcode];
            }
            console.log('Link Account Result :' + result);
            return result;
        }
        unlinkAccountErrorHandling(response) {
            console.log(JSON.parse(response).errorcode);
            let result = this.genericErrorHandlingWithoutErrCode(JSON.parse(response));
            if (!result) {
                let errors = {};
                errors['ERR_NO_DATA_FOUND'] = {
                    message: 'Mobile Number is not found in DB'
                };
                result = errors[JSON.parse(response).errorcode];
            }
            console.log('Unlink Account Result :' + result);
            return result;
        }
        redeemAnItemErrorHandling(productCode, response) {
            console.log(JSON.stringify(response));
            let result = this.genericErrorHandling(response);
            if (!result) {
                let errors = {};
                errors['ERR_CATALOGUE_REDEMPTION_FAILED'] = {
                    status: 500,
                    message: 'Generic redemption error'
                };
                errors['ERR_INSUFFICIENT_POINT_BALANCE'] = {
                    status: 400,
                    message: 'Insufficient points'
                };
                errors['ERR_PRODUCT_NOT_FOUND'] = {
                    status: 400,
                    message: 'Item being redeemed does not exist'
                };
                errors['ERR_PASA_REWARDS_SOURCE_DESTINATION_SAME'] = {
                    status: 400,
                    message: 'Source and destination is the same'
                };
                errors['ERR_PASA_REWARDS_INVALID_MEGA_BRAND'] = {
                    status: 400,
                    message: 'Invalid mega brand'
                };
                errors['ERR_PASA_REWARDS_INVALID_SUBSCRIPTION'] = {
                    status: 400,
                    message: 'This item is not available for this number'
                };
                errors['ERR_PASA_REWARDS_INVALID_DESTINATION'] = {
                    status: 400,
                    message: 'Target number does not exist'
                };
                errors['ERR_CATALOGUE_ITEM_NOT_ALLOW_PASSA_REWARD'] = {
                    status: 400,
                    message: 'This item is not allowed to be sent as gift'
                };
                errors['ERR_NO_DATA_FOUND'] = {
                    status: 400,
                    message: 'Source number does not exist'
                };
                errors['ERR_REDEMPTION_WAITING_FOR_APPROVAL'] = {
                    status: 400,
                    message: 'Redemption waiting for approval'
                };
                result = errors[response.errorcode];
            }
            if (result) {
                result.productCode = productCode;
            }
            return result;
        }
        payBillErrorHandling(ref, response) {
            console.log(JSON.stringify(response));
            let result = this.genericErrorHandling(response);
            if (!result) {
                let errors = {};
                errors['ERR_INVALID_REDEMPTION_MERCHANT'] = {
                    status: 400,
                    message: 'Invalid merchant'
                };
                errors['ERR_REDEMPTION_MERCHANT_USER_NOT_VALID'] = {
                    status: 500,
                    message: 'Invalid merchant internal error'
                };
                errors['ERR_MERCHANT_SETTLEMENT_FAILED'] = {
                    status: 500,
                    message: 'Invalid merchant settlement internal error'
                };
                errors['ERR_REDEMPTION_MERCHANT_NO_MOBILE'] = {
                    status: 500,
                    message: 'Invalid merchant no mobile internal error'
                };
                errors['ERR_CASHBACK_FAILED_NO_MERCHANT_IDENTIFIER'] = {
                    status: 400,
                    message: 'Merchant does not exist'
                };
                errors['ERR_CASHBACK_FAILED_NO_LOYALTY_ID'] = {
                    status: 400,
                    message: 'Invalid customer number'
                };
                errors['ERR_CASHBACK_FAILED_NO_REFERENCE_FIELD'] = {
                    status: 400,
                    message: 'Missing account number'
                };
                errors['ERR_CASHBACK_DEBIT_FAILED'] = {
                    status: 500,
                    message: 'Invalid cashback debit internal error'
                };
                errors['ERR_LOAD_WALLET_FAILED'] = {
                    status: 500,
                    message: 'Invalid load wallet error'
                };
                errors['ERR_PIN_MANDATORY'] = {
                    status: 400,
                    message: 'Missing pin'
                };
                errors['ERR_CASHBACK_POST_CALL_FAILED'] = {
                    status: 500,
                    message: 'Invalid cashback post call internal error'
                };
                errors['ERR_CASHBACK_AMOUNT_INVALID'] = {
                    status: 400,
                    message: 'Invalid amount value'
                };
                errors['ERR_PIN_NOT_ENABLED'] = {
                    status: 500,
                    message: 'Invalid pin disabled internal error'
                };
                errors['ERR_CASHBACK_INVALID_CURRENCY'] = {
                    status: 500,
                    message: 'Invalid cashback disabled internal error'
                };
                errors['ERR_INCORRECT_PIN'] = {
                    status: 400,
                    message: 'Invalid pin value'
                };
                errors['ERR_INSUFFICIENT_POINT_BALANCE'] = {
                    status: 400,
                    message: 'Insufficient points'
                };
                errors['ERR_REDEMPTION_WAITING_FOR_APPROVAL'] = {
                    status: 400,
                    message: 'Waiting for approval'
                };
                errors['ERR_PIN_ENABLED_GLOBALLY'] = {
                    status: 400,
                    message: 'PIN is not yet set'
                };
                errors['ERR_CASHBACK_ACCOUNT_NO_INVALID'] = {
                    status: 400,
                    message: 'Invalid account number'
                };
                result = errors[response.errorcode];
            }
            if (result) {
                result.ref = ref;
            }
            return result;
        }
    }
    ErrorHandlingService_1.ErrorHandlingService = ErrorHandlingService;
})(ErrorHandlingService = exports.ErrorHandlingService || (exports.ErrorHandlingService = {}));
//# sourceMappingURL=error-handling.service.js.map