import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {SmartIntegrationService} from '../../shared/services/smart-integration.service';
import {ActivityHistory} from '../../shared/models/activity-history';

@Injectable()
export class ActivityHistoryService {

    activities:ActivityHistory[];

    filter = {
        categories: {
            allTransaction: true,
            earning: false,
            redemption: false,
            transfer: false,
            registration: false,
            inquiry: false,
            linking: false
        },
        reset() {
            this.categories.allTransaction = true;
            this.categories.earning = false;
            this.categories.redemption = false;
            this.categories.transfer = false;
            this.categories.registration = false;
            this.categories.inquiry = false;
            this.categories.linking = false;
        },
        clearNonFilter() {
            this.categories.allTransaction = false;
        },
        all() {
            this.categories.allTransaction = true;
            this.categories.earning = false;
            this.categories.redemption = false;
            this.categories.transfer = false;
            this.categories.registration = false;
            this.categories.postpaid = false;
            this.categories.broPrepaid = false;
            this.categories.broPostpaid = false;
            this.categories.mostPopular = false;
        },
        getCategoryArray() {
            let result = [];
            if (this.categories.earning){
                result.push('Earning');
            }
            if (this.categories.redemption){
                result.push('Redemption');
            }
                
            if (this.categories.transfer){
                result.push('Transfer Points');
            }
                
            if (this.categories.registration){
                result.push('Activation');
            }
                
            if (this.categories.inquiry){
                result.push('Points Inquiry');
            }
                
            if (this.categories.linking){
                result.push('Account Linking/Unlinking');
            }
                
            return result;
        }
    };

	constructor(private _http: Http,
               private _smartIntegrationService: SmartIntegrationService) {}

    loadAllActivity(refresh: boolean = false) {
        if (refresh || !this.activities) {
            
            this._smartIntegrationService
            .getActivityHistory()
            .subscribe(
                response => {
                    this.activities = response.json();
                    
                    for (let i = 0 ; i < this.activities.length ; i++) {
                        if(this.activities[i].type==="redemption"){
                           this.activities[i].type = "Redemption";
                        }else if(this.activities[i].type==="earning"){
                            this.activities[i].type = "Earning";
                        }else if(this.activities[i].type==="transfer"){
                            this.activities[i].type = "Transfer Points";
                        }else if(this.activities[i].type==="registration"){
                            this.activities[i].type = "Activation";
                        }else if(this.activities[i].type==="linking"){
                            this.activities[i].type = "Account Linking/Unlinking";
                        }else if(this.activities[i].type==="inquiry"){
                            this.activities[i].type = "Points Inquiry";
                        }
                    }
                    
                    //console.log(this.activities);
                    
                },
                error =>{
                    console.log('not authorized?!');
                }
            );
        }
    }
    
}
