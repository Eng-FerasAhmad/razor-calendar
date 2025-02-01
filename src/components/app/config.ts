import { CalendarConfig, RazorCalendarConfig } from 'types/calendarConfig';

export const config: RazorCalendarConfig<CalendarConfig> = {
    hour: {
        is24HourFormat: true,
        hourIntervalIndex: 1,
        workHoursStart: 8,
        workHoursEnd: 18,
    },
    month: {
        showWeekNumbers: true,
    },
    week: {
        showWeekend: true,
        showWeekNumbers: true,
    },
    common: {
        locale: 'de-DE',
        dateFormat: 'dd.MM.yyyy',
    },
    style: {
        primaryColor: '#33b679',
        topStartFrom: 74,
    },
};
