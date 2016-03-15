import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {SmartIntegrationService} from '../../shared/services/smart-integration.service';

@Injectable()
export class CatalogService {

    catalogs;
    filter = {
        categories: {
            myFavorites: false,
            perks: false,
            lifestyle: false,
            mobile: false,
            prepaid: false,
            postpaid: false,
            broPrepaid: false,
            broPostpaid: false,
            mostPopular: false
        },
        points: [0,5000],
        reset() {
            this.categories.myFavorites = false;
            this.categories.perks = false;
            this.categories.lifestyle = false;
            this.categories.mobile = false;
            this.categories.prepaid = false;
            this.categories.postpaid = false;
            this.categories.broPrepaid = false;
            this.categories.broPostpaid = false;
            this.categories.mostPopular = false;
            this.points = [0, 5000];
        },
        all() {
            this.categories.myFavorites = true;
            this.categories.perks = true;
            this.categories.lifestyle = true;
            this.categories.mobile = true;
            this.categories.prepaid = true;
            this.categories.postpaid = true;
            this.categories.broPrepaid = true;
            this.categories.broPostpaid = true;
            this.categories.mostPopular = false;
            this.points = [0, 5000];
        },
        isAll() {
            return this.categories.myFavorites && this.categories.perks &&
                this.categories.lifestyle && this.categories.mobile &&
                this.categories.prepaid && this.categories.postpaid &&
                this.categories.broPrepaid && this.categories.broPostpaid;
        },
        getCategoryArray() {
            let result = [];
            if (this.categories.myFavorites)
                result.push('My Favorites');
            if (this.categories.perks)
                result.push('Perks');
            if (this.categories.lifestyle)
                result.push('Lifestyle');
            if (this.categories.mobile)
                result.push('Mobile');
            if (this.categories.prepaid)
                result.push('Prepaid');
            if (this.categories.postpaid)
                result.push('Postpaid');
            if (this.categories.broPrepaid)
                result.push('Bro Prepaid');
            if (this.categories.broPostpaid)
                result.push('Bro Postpaid');
            if (this.categories.mostPopular)
                result.push('Most Popular');
            return result;
        }
    };

	constructor(private _http: Http,
               private _smartIntegrationService: SmartIntegrationService) {}

    loadAllCatalogs(refresh: boolean = false) {
        console.log('catalogs: ' + this.catalogs);
        if (refresh || !this.catalogs) {
            this._smartIntegrationService
            .getCatalogs()
            .subscribe(
                response => {
                    this.catalogs = response.json().catalogs;
                    console.log(this.catalogs);
                },
                error =>{
                    console.log('not authorized?');
                }
            );
        }
    }
    
}
