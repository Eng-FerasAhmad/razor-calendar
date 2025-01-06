import { DateTime } from 'luxon';
import { Appointment, ViewType } from 'types/appointment';
import { CalendarConfig } from 'types/calendarConfig';

export interface CalendarContextProps {
    view: ViewType;
    config: CalendarConfig;
    selectedDate: DateTime;
    appointments: Appointment[] | undefined;
    language: string;
    onViewChange: (view: ViewType) => void;
    onDateChange: (date: DateTime) => void;
    onChangeLanguage: (lang: string) => void;
    onChangeAppointments: (appointment: Appointment[]) => void;
    onShowAllFullDays: () => void;
    showAllFullDays: boolean;
    fullDaysCount: number;
    onUpdateFullDaysCount: (count: number) => void;
    dialogAppointmentDetails: DialogAppointmentDetails | undefined;
    onDialogAppointmentDetails: (
        appointmentDetails: DialogAppointmentDetails | undefined
    ) => void;
}

export interface DialogAppointmentDetails {
    open: boolean;
    id: string;
    anchorEl: HTMLElement | null;
}
