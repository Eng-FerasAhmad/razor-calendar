export type RazorCalendarConfig<T> = {
    [P in keyof T]?: T[P] extends object ? RazorCalendarConfig<T[P]> : T[P];
};

export interface MonthConfig {
    showWeekNumbers: boolean;
    showEvents: boolean;
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
    topStartFrom: number; // position where start the toolbar to avoid 2 scrollbar
}

export interface CommonConfig {
    locale: string; // Language code, e.g., "en", "de"
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
