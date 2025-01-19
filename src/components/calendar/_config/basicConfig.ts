import { CalendarConfig } from 'types/calendarConfig';

export const commonSize = {
    headerHeight: 73,
    timeSlotHeight: 40,
};

export const basicConfig: CalendarConfig = {
    hour: {
        workHoursStart: 8,
        workHoursEnd: 18,
        hourIntervalIndex: 1,
        showJustWorkHours: false,
        is24HourFormat: true,
    },
    day: {
        showTasks: true,
        showNotes: true,
    },
    week: {
        showWeekNumbers: true,
        showWeekend: true,
        weekStartOn: 'monday',
    },
    month: {
        showWeekNumbers: true,
        showEvents: true,
        showHolidays: true,
    },
    year: {
        showHolidays: true,
        highlightCurrentMonth: true,
        showEventCounts: true,
    },
    agenda: {
        showCompletedTasks: true,
        groupBy: 'day',
        showOverdueTasks: true,
    },
    style: {
        primaryColor: '#33b679',
        secondaryColor: '#33b679',
        backgroundColor: '#fff',
        fontFamily: 'Roboto',
        topStartFrom: 35,
    },
    sidebar: {
        showWeekNumber: false,
    },
    common: {
        locale: 'en',
        timeZone: 'UTC',
        dateFormat: 'YYYY-MM-DD',
    },
};
