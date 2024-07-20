export enum WeekStartDay {
    Sunday = 0,
    Monday = 1,
}

export interface Days {
    day: CalDay;
    month: CalMonth;
    year: CalYear;
    date: CalDate;
    isCurrentMonth: boolean;
}

export interface CalDay {
    number: number;
    name: string;
    shortName: string;
    oneLetter: string;
}

export interface CalMonth {
    number: number;
    name: string;
    shortName: string;
}

export interface CalYear {
    number: number;
}

export interface CalDate {
    short: string;
    long: string;
    utc: string;
}

export type Week = Days[];
