import { CalendarType } from 'types/calendar';
import { DateMetaData } from 'utils/dateGenerator';

export interface CommonState {
    appName: string | undefined;
    calendarType: CalendarType;
    selectedYear: number;
    selectedMonth: number;
    selectedStartDay: number;
    dateMetaData: DateMetaData | undefined;
    sidebarCollapsed: boolean;
}
