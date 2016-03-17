import {Catalog} from './catalog';

export class CartItem {
    catalog: Catalog;
    amount: number;

    getTotalPoints(): number {
        return this.catalog.points * this.amount;
    }
}
