import { DateTime } from 'luxon';
import { Appointment } from 'types/calendar';

export interface CalendarContextProps {
    view: string;
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
