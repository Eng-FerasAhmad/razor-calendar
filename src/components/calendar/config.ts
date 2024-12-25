import { CalendarConfig } from 'types/calendar';

export const calendarConfig = {
    headerHeight: 73,
    toolbarHeight: 45,
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
    },
    month: {
        showWeekNumbers: true,
        showEvents: true,
        startWithWeekday: true, // e.g., true for starting with Monday
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
        primaryColor: '#2ba172',
        secondaryColor: '#2ba172',
        backgroundColor: '#fff',
        fontFamily: 'Roboto',
    },
    common: {
        lang: 'en',
        timeZone: 'UTC',
        dateFormat: 'YYYY-MM-DD',
    },
};
