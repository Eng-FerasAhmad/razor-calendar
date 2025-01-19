import { DateTime } from 'luxon';
import { CalendarConfig, RazorCalendarConfig } from 'types/calendarConfig';

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
        sidebar: { ...config.sidebar, ...userConfig.sidebar },
        common: { ...config.common, ...userConfig.common },
    };
}

export function formatTimeDifference(
    start: string,
    end: string,
    isFullDay: boolean
): string {
    if (isFullDay) return 'Full Day';
    const diffInMinutes = Math.abs(
        DateTime.fromISO(start).diff(DateTime.fromISO(end), 'minutes').minutes
    );

    if (diffInMinutes >= 60) {
        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;
        return minutes > 0
            ? `${hours}:${String(minutes).padStart(2, '0')} Hours`
            : `${hours} Hours`;
    }

    if (diffInMinutes > 0) {
        return `${diffInMinutes} Minute${diffInMinutes > 1 ? 's' : ''}`;
    }

    return 'No Time Difference';
}
