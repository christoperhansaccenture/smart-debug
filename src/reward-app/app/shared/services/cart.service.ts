import {Injectable} from 'angular2/core';
import {PhoneNumber} from '../models/phone-number';
import {Catalog} from '../models/catalog';
import {CartItem} from '../models/cart-item';
import {SmartIntegrationService} from './smart-integration.service';

@Injectable()
export class CartService {

    items: { [id: number] : CartItem; } = {};

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
    }

    getTotalItems(): number {
        let result: number = 0;
        for (let key in this.items) 
            result += this.items[key].amount;
        return result;
    }
    
}
