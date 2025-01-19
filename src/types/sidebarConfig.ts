import { DateTime } from 'luxon';
import { CalendarConfig, RazorCalendarConfig } from 'types/calendarConfig';

export interface SidebarProps {
    currentDate: DateTime;
    onChangeDate: (newDate: DateTime) => void;
    weekStartOn: 'sunday' | 'monday';
    showWeekNumber: boolean;
    config: RazorCalendarConfig<CalendarConfig>;
}
