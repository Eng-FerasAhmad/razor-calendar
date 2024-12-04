import { CalendarType } from 'types/calendar';

export enum CalenderTask {
    Calender,
    Task,
}

export interface CommonState {
    calendarType: CalendarType;
}
