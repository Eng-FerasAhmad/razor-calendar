import { DateTime } from 'luxon';
import { ViewType } from 'types/appointment';
import { CalendarConfig, RazorCalendarConfig } from 'types/calendarConfig';

export interface ToolbarProps {
    currentView: ViewType;
    onViewChange: (view: ViewType) => void;
    currentDate: DateTime;
    onNavigate: (newDate: DateTime) => void;
    config: RazorCalendarConfig<CalendarConfig>;
}
