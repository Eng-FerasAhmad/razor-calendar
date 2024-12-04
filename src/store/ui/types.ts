import { DateTime } from 'luxon';

export interface UIState {
    view: 'month' | 'week' | 'day' | 'agenda';
    date: DateTime;
}
