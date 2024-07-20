import { Week } from 'src/date-service/types';
import { CalendarType } from 'types/calendar';

export enum CalenderTask {
    Calender,
    Task,
}

export interface CommonState {
    calendarType: CalendarType;
    selectedYear: number;
    selectedMonth: number;
    selectedStartDay: number;
    selectedWeeks: Week[] | undefined;
    sidebarCollapsed: boolean;
    calenderTask: CalenderTask;
}
