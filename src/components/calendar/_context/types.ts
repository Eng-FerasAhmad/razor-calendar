import { DateTime } from 'luxon';
import { Appointment, ViewType } from 'types/appointment';
import { CalendarConfig } from 'types/calendarConfig';

export interface CalendarContextProps {
    view: ViewType;
    config: CalendarConfig;
    selectedDate: DateTime;
    appointments: Appointment[] | undefined;
    savedAppointment: Appointment | undefined;
    language: string;
    onViewChange: (view: ViewType) => void;
    onDateChange: (date: DateTime) => void;
    onChangeLanguage: (locale: string) => void;
    onChangeAppointments: (appointment: Appointment[]) => void;
    onSaveAppointment: (appointment: Appointment | undefined) => void;
    onDeleteAppointment: (appointment: Appointment) => void;
    onShowAllFullDays: () => void;
    showAllFullDays: boolean;
    fullDaysCount: number;
    onUpdateFullDaysCount: (count: number) => void;
    dialogAppointment: DialogAppointment | undefined;
    onDialogAppointment: (appointment: DialogAppointment | undefined) => void;
    popperAppointment: PopperAppointment | undefined;
    onPopperAppointment: (appointment: PopperAppointment | undefined) => void;
}

// this dialog content the data that can be edited:
export interface DialogAppointment {
    slotId: string;
    open: boolean;
    appointment?: Appointment;
}

// this popper data show on click on an appointment:
export interface PopperAppointment {
    id: string;
    open: boolean;
    appointment: Appointment;
    anchorEl: HTMLElement | null;
}
