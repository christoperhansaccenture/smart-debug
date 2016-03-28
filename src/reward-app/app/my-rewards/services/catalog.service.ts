import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {SmartIntegrationService} from '../../shared/services/smart-integration.service';
import {Catalog} from '../../shared/models/catalog';

@Injectable()
export class CatalogService {

    selectedCatalog: Catalog;
    catalogs: Catalog[];
    filter = {
        name: "",
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
            this.name = "";
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
        clearNonFilter() {
            this.categories.mostPopular = false;
        },
        all() {
            this.name = "";
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
            if (this.categories.perks)
                result.push('Deals');
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

    isCatalogsLoaded() {
        var catalogInStorage = sessionStorage.getItem('catalog');
        
        return !(catalogInStorage === null || catalogInStorage === undefined);
    }

    loadAllCatalogs(refresh: boolean = false) {
        
        if(!this.isCatalogsLoaded()){
            if (refresh || !this.catalogs) {
                this._smartIntegrationService
                .getCatalogs()
                .subscribe(
                    response => {
                        this.catalogs = response.json().data.map(e => {
                            let c = new Catalog();
                            c.id = e.id;
                            c.code = e.code;
                            c.name = e.name;
                            c.description = e.description;
                            c.imageUrl = this._smartIntegrationService.imageUrlBase + '/' + e.imageUrl;
                            c.categories = e.categories;
                            c.points = +e.points;
                            c.stock = e.stock;
                            c.favorite = e.favorite;
                            c.giftable = e.giftable;
                            c.expiry = new Date(e.expiry);
                            return c;
                        });
                        
                        sessionStorage.setItem('catalog',JSON.stringify(response.json().data));
                        
                    },
                    error =>{
                        console.log('not authorized?');
                    }
                );
                
            }    
        }else{
            
            this.catalogs = JSON.parse(sessionStorage.getItem('catalog')).map(e => {
                            let c = new Catalog();
                            c.id = e.id;
                            c.code = e.code;
                            c.name = e.name;
                            c.description = e.description;
                            c.imageUrl = this._smartIntegrationService.imageUrlBase + '/' + e.imageUrl;
                            c.categories = e.categories;
                            c.points = e.points;
                            c.stock = e.stock;
                            c.favorite = e.favorite;
                            c.giftable = e.giftable;
                            c.expiry = new Date(e.expiry);
                            return c;
                        });
         }
        
    }

    updateFavorite(catalog: Catalog) {
        this._smartIntegrationService.updateFavorite(catalog)
            .subscribe(
                response => {
                    let c: Catalog = this.catalogs.filter(e => e.id == catalog.id)[0];
                    c.favorite = catalog.favorite;
                    sessionStorage.setItem('catalog',JSON.stringify(this.catalogs));
                }
            );
    }
    
}
