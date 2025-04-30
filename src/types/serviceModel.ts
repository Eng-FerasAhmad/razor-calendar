export interface ServiceViewModel {
    id: string;
    serviceName: string;
    description: string;
    duration: number;
    categoryId: number;
    categoryName: string;
    price: {
        amount: number;
        currency: number;
    };
    shopId: string;
}

export enum CurrencyTypes {
    EUR = 1,
    USD = 2,
    GBP = 3,
}
