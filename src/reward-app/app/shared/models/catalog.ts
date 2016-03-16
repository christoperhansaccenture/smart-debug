export class Catalog {
    id: number;
    name: string;
    description: string;
    points: number;
    categories: string[];
    details: string[];
    favorite: boolean;
    giftable: boolean;

    isPostpaid() {
        return this.categories.indexOf('Postpaid') > -1;
    }

    isPrepaid() {
        return this.categories.indexOf('Prepaid') > -1;
    }

    isBroPrepaid() {
        return this.categories.indexOf('Bro Prepaid') > -1;
    }

    isBroPostpaid() {
        return this.categories.indexOf('Bro Postpaid') > -1;
    }
}
