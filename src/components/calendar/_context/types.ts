import { DateTime } from 'luxon';
import { Appointment, ViewType } from 'types/appointment';
import { CalendarConfig } from 'types/calendarConfig';

export interface CalendarContextProps {
    view: ViewType;
    config: CalendarConfig;
    selectedDate: DateTime;
    firstDayOfWeek: number | undefined;
    appointments: Appointment[] | undefined;
    language: string;
    onViewChange: (view: ViewType) => void;
    onDateChange: (date: DateTime) => void;
    onChangeLanguage: (lang: string) => void;
    onChangeAppointments: (appointment: Appointment[]) => void;
    onChangeFirstDay: (firstDay: number) => void;
}
