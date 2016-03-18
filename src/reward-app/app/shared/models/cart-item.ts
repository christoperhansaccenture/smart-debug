import {Catalog} from './catalog';

export class CartItem {
    catalog: Catalog;
    amount: number;
    numberSelection = {
        myNumber: {
            checked: false,
            number: ""
        },
        gift: {
            checked: false,
            number: ""
        }
    };

    getTotalPoints(): number {
        return this.catalog.points * this.amount;
    }

    clearNumberSelection() {
        this.numberSelection = {
            myNumber: {
                checked: false,
                number: ""
            },
            gift: {
                checked: false,
                number: ""
            }
        }
    }
}
