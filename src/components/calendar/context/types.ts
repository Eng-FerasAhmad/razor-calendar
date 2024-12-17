import { DateTime } from 'luxon';

export interface CalendarContextProps {
    view: string;
    selectedDate: DateTime;
    firstDayOfWeek: number | undefined;
    events: Event[] | undefined;
    language: string;
    onViewChange: (view: string) => void;
    onDateChange: (date: DateTime) => void;
    onChangeLanguage: (lang: string) => void;
}

export interface Event {
    id: string;
    title: string;
    start: string; // ISO string
    end: string; // ISO string
}
