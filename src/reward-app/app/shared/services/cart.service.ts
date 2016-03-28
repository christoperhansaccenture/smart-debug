import {Injectable} from 'angular2/core';
import {PhoneNumber} from '../models/phone-number';
import {Catalog} from '../models/catalog';
import {CartItem} from '../models/cart-item';
import {SmartIntegrationService} from './smart-integration.service';
import {AccountService} from './account.service';

@Injectable()
export class CartService {

    numberSelection = {
        currentNumber: true,
        oneNumber: false,
        decidePerItem: false,
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

    constructor(private _smartIntegrationService: SmartIntegrationService,
               private _accountService: AccountService) {
        this.loadFromStorage();
    }

    addItemToCart(catalog: Catalog) {
        if (this.items[catalog.id]) {
            this.items[catalog.id].amount = this.items[catalog.id].amount + 1;
        }
        else {
            let item: CartItem = new CartItem();
            item.catalog = catalog;
            item.type = 'catalog';
            item.amount = 1;
            this.items[catalog.id] = item;
        }
        this.saveToStorage();
    }

    removeItem(item: CartItem) {
        if (item.isBill())
            delete this.items[-1];
        else
            delete this.items[item.catalog.id];
        this.saveToStorage();
    }

    saveToStorage() {
        sessionStorage.setItem('cartSelection', JSON.stringify(this.numberSelection));
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
                item.type = tempItem.type;
                item.changedOnCart = tempItem.changedOnCart;

                if (!item.isBill()) {
                    let c = new Catalog();
                    c.id = tempItem.catalog.id;
                    c.code = tempItem.catalog.code;
                    c.name = tempItem.catalog.name;
                    c.description = tempItem.catalog.description;
                    c.imageUrl = tempItem.catalog.imageUrl;
                    c.categories = tempItem.catalog.categories;
                    c.points = tempItem.catalog.points;
                    c.stock = tempItem.catalog.stock;
                    c.favorite = tempItem.catalog.favorite;
                    c.giftable = tempItem.catalog.giftable;
                    c.expiry = new Date(tempItem.catalog.expiry);
                    item.catalog = c;
                }
                this.items[key] = item;
            }

            if (sessionStorage.getItem('cartSelection')) {
                let sel = JSON.parse(sessionStorage.getItem('cartSelection'));
                this.numberSelection = sel;
                this.numberSelection.clear = function() {
                    this.myNumber.checked = false;
                    this.myNumber.number = "";
                    this.gift.checked = false;
                    this.gift.number = "";
                };
            }
        }
    }

    getTotalItems(): number {
        let result: number = 0;
        for (let key in this.items) 
            result++;
        return result;
    }

    confirm() {
        let arr: CartItem[] = [];
        for (let key in this.items)
            arr.push(this.items[key]);
        this._smartIntegrationService.confirmOrder(arr)
            .subscribe(
                response => {
                    console.log('success response: ' + response);
                },
                error => {
                    console.log('success response: ' + error);
                }
            );
    }

    addBillToCart(selection, number, amount, pin) {
        let item: CartItem = new CartItem();
        item.type = 'bill';
        item.amount = amount;
        item.merchantIdentifier = selection;
        item.pin = pin;
        item.ref = ""; //?
        item.clearNumberSelection();
        // check main number
        if (number === this._accountService.selectedUserPhone.phoneNo) {
            item.numberSelection.currentNumber.checked = true;
            item.numberSelection.currentNumber.number = number;
        }
        // check own numbers
        let own = this._accountService.mobileNoList
            .map(e => e.phoneNo)
            .filter(e => e !== this._accountService.selectedUserPhone.phoneNo 
                        && e === number);
        if (own.length > 0) {
            item.numberSelection.myNumber.checked = true;
            item.numberSelection.myNumber.number = number;
        }
        // gift
        if (!item.numberSelection.currentNumber.checked &&
            !item.numberSelection.myNumber.checked) {
            item.numberSelection.gift.checked = true;
            item.numberSelection.gift.number = number;
        }
        this.items[-1] = item;
        this.saveToStorage();
    }

    updateBillAmount() {
    }
    
}
