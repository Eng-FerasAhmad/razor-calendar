import { DateTime } from 'luxon';
import { Event } from 'types/calendar';

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
