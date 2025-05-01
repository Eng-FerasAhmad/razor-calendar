import { CurrencyTypes } from 'types/serviceModel';

export const currencySymbol = (currency: number): string => {
    switch (currency) {
        case CurrencyTypes.EUR:
            return '€';
        case CurrencyTypes.USD:
            return '$';
        case CurrencyTypes.GBP:
            return '£';
        default:
            return '';
    }
};
