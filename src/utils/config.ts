import { CalendarConfig, RazorCalendarConfig } from 'types/calendar';

export function mergeConfig(
    config: CalendarConfig,
    userConfig: RazorCalendarConfig<CalendarConfig>
): CalendarConfig {
    return {
        ...config,
        ...userConfig,
        hour: { ...config.hour, ...userConfig.hour },
        day: { ...config.day, ...userConfig.day },
        week: { ...config.week, ...userConfig.week },
        month: { ...config.month, ...userConfig.month },
        year: { ...config.year, ...userConfig.year },
        agenda: { ...config.agenda, ...userConfig.agenda },
        style: { ...config.style, ...userConfig.style },
        common: { ...config.common, ...userConfig.common },
    };
}
