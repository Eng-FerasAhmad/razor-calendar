export type ViewType = 'month' | 'week' | 'day' | 'agenda';

export interface Appointment {
    id: string;
    title: string;
    start: string; // ISO string
    end: string; // ISO string
    isFullDay?: boolean;
    color?: string;
    canceled?: boolean;
    draggable?: boolean;
    editable?: boolean;
    available?: boolean;
    visibility?: boolean;
    location?: string;
}

export type RazorCalendarConfig<T> = {
    [P in keyof T]?: T[P] extends object ? RazorCalendarConfig<T[P]> : T[P];
};

export interface MonthConfig {
    showWeekNumbers: boolean;
    showEvents: boolean;
    startWithWeekday: boolean; // e.g., true for starting with Monday
    showHolidays: boolean;
}

export interface WeekConfig {
    showWeekend: boolean;
    showWeekNumbers: boolean;
}

export interface YearConfig {
    showHolidays: boolean;
    highlightCurrentMonth: boolean;
    showEventCounts: boolean; // Number of events per month
}

export interface DayConfig {
    showTasks: boolean;
    showNotes: boolean;
}

export interface HourConfig {
    is24HourFormat: boolean;
    workHoursStart: number;
    workHoursEnd: number;
    hourIntervalIndex: number;
    showJustWorkHours: boolean;
}

export interface AgendaConfig {
    showCompletedTasks: boolean;
    groupBy: 'day' | 'week' | 'month';
    showOverdueTasks: boolean;
}

export interface StyleConfig {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    fontFamily: string;
}

export interface CommonConfig {
    lang: string; // Language code, e.g., "en", "de"
    timeZone: string; // Timezone identifier, e.g., "UTC", "Europe/Berlin"
    dateFormat: string; // Custom date format, e.g., "YYYY-MM-DD"
}

export interface CalendarConfig {
    hour: HourConfig;
    day: DayConfig;
    week: WeekConfig;
    month: MonthConfig;
    year: YearConfig;
    agenda: AgendaConfig;
    style: StyleConfig;
    common: CommonConfig;
}
