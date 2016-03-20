import {Injectable} from 'angular2/core';
import {PhoneNumber} from '../models/phone-number';
import {Catalog} from '../models/catalog';
import {CartItem} from '../models/cart-item';
import {SmartIntegrationService} from './smart-integration.service';

@Injectable()
export class CartService {

    numberSelection = {
        oneNumber: false,
        myNumber: {
            checked: false,
            number: ""
        },
        gift: {
            checked: false,
            number: ""
        },
        clear() {
            this.myNumber.checked = false;
            this.myNumber.number = "";
            this.gift.checked = false;
            this.gift.number = "";
        }
    };
    items: { [id: number] : CartItem; } = {};

    constructor(private _smartIntegrationService: SmartIntegrationService) {
        this.loadFromStorage();
    }

    addItemToCart(catalog: Catalog) {
        if (this.items[catalog.id]) {
            this.items[catalog.id].amount = this.items[catalog.id].amount + 1;
        }
        else {
            let item: CartItem = new CartItem();
            item.catalog = catalog;
            item.amount = 1;
            this.items[catalog.id] = item;
        }
        this.saveToStorage();
    }

    removeItem(catalog: Catalog) {
        delete this.items[catalog.id];
        this.saveToStorage();
    }

    saveToStorage() {
        sessionStorage.setItem('cart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        let result = sessionStorage.getItem('cart');
        if (result) {
            this.items = {};
            let temp = JSON.parse(result);
            for (let key in temp) {
                let tempItem = temp[key];
                let item: CartItem = new CartItem();
                item.amount = tempItem.amount;
                item.numberSelection = tempItem.numberSelection;

                console.log(JSON.stringify(temp));
                let c = new Catalog();
                c.id = tempItem.catalog.id;
                c.code = tempItem.catalog.code;
                c.name = tempItem.catalog.name;
                c.description = tempItem.catalog.description;
                c.imageUrl = this._smartIntegrationService.imageUrlBase + '/' + tempItem.catalog.imageUrl;
                c.categories = tempItem.catalog.categories;
                c.points = tempItem.catalog.points;
                c.stock = tempItem.catalog.stock;
                c.favorite = tempItem.catalog.favorite;
                c.giftable = tempItem.catalog.giftable;
                c.expiry = new Date(tempItem.catalog.expiry);
                item.catalog = c;
                this.items[c.id] = item;
            }
        }
    }

    getTotalItems(): number {
        let result: number = 0;
        for (let key in this.items) 
            result += this.items[key].amount;
        return result;
    }
    
}
