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
    type: string = "catalog";

    // only for pay bill
    merchantIdentifier;
    pin;
    ref;

    isBill() {
        return this.type === 'bill';
    }

    getTotalPoints(): number {
        if (!this.isBill())
            return this.catalog.points * this.amount;
        else   
            return this.amount;
    }

    getSendTo() {
        if (this.numberSelection.myNumber.checked) {
            return this.numberSelection.myNumber.number;
        }
        else if (this.numberSelection.gift.checked) {
            return this.numberSelection.gift.number;
        }
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
