export enum CalendarType {
    OVERVIEW = 'overview',
    WEEK = 'week',
    YEAR = 'year',
    MONTH = 'month',
    DAY = 'day',
}

export interface Event {
    id: string;
    title: string;
    start: string; // ISO string
    end: string; // ISO string
}
