import { DateTime } from 'luxon';
import { Appointment } from 'types/appointment';
import { CalendarConfig } from 'types/config';

export interface CalendarContextProps {
    view: string;
    config: CalendarConfig;
    selectedDate: DateTime;
    firstDayOfWeek: number | undefined;
    appointments: Appointment[] | undefined;
    language: string;
    onViewChange: (view: string) => void;
    onDateChange: (date: DateTime) => void;
    onChangeLanguage: (lang: string) => void;
    onChangeAppointments: (appointment: Appointment[]) => void;
    onChangeFirstDay: (firstDay: number) => void;
}
