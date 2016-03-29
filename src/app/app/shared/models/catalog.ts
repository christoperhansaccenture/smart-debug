export class Catalog {
    id: number;
    code: string;
    name: string;
    description: string;
    imageUrl: string;
    categories: string[];
    points: number;
    stock: number;
    favorite: boolean;
    giftable: boolean;
    expiry: Date;

    isOnlyPostpaid() {
        return this.categories.indexOf('Prepaid') == -1
            && this.categories.indexOf('Postpaid') > -1
            && this.categories.indexOf('Bro Prepaid') == -1
            && this.categories.indexOf('Bro Postpaid') == -1;
    }

    isOnlyPrepaid() {
        return this.categories.indexOf('Prepaid') > -1
            && this.categories.indexOf('Postpaid') == -1
            && this.categories.indexOf('Bro Prepaid') == -1
            && this.categories.indexOf('Bro Postpaid') == -1;
    }

    isOnlyBroPrepaid() {
        return this.categories.indexOf('Prepaid') == -1
            && this.categories.indexOf('Postpaid') == -1
            && this.categories.indexOf('Bro Prepaid') > -1
            && this.categories.indexOf('Bro Postpaid') == -1;
    }

    isOnlyBroPostpaid() {
        return this.categories.indexOf('Prepaid') == -1
            && this.categories.indexOf('Postpaid') == -1
            && this.categories.indexOf('Bro Prepaid') == -1
            && this.categories.indexOf('Bro Postpaid') > -1;
    }

    getExpiryString(): string {
        return this.expiry.getDate() + '-' + (this.expiry.getMonth() + 1);
    }
}
