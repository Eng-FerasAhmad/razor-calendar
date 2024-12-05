import { DateTime } from 'luxon';

export interface UIState {
    view: string;
    date: DateTime;
    language: string;
    firstDayOfWeek: number;
}
