import {Injectable} from 'angular2/core';
import { Router } from 'angular2/router';
import {Http} from 'angular2/http';

@Injectable()
export class RewardTypeService {

    selectedType: string;
    rewards;

	constructor(private _http: Http,
    private _router: Router){
    }
    
    initialRewards(){
        this._http.get('services/rewards.json')
        .subscribe(
                response => {
                    
                    this.rewards = response.json();
                    
                },
                error =>{
                    console.log('error retrieve static files');
                }
            );
    }
    
    getRewards(){
        return this.rewards;
    }
    
    getSelectedType(){
        return this.selectedType;
    }
    
    setSelectedType(type:string){
        this.selectedType=type;
        
        if(type==="Mobile"){
            this._router.navigate(['MobileReward']);
        }else{
            this._router.navigate(['RewardDetail']);
        }
        
    }
    
}
