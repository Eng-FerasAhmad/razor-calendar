import i18n from 'i18next';
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
    if (isFullDay) {
        return i18n.t('labels.fullDay', { ns: 'common' });
    }

    const diffInMinutes = Math.abs(
        DateTime.fromISO(start).diff(DateTime.fromISO(end), 'minutes').minutes
    );

    if (diffInMinutes >= 60) {
        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;

        const hourLabel =
            hours > 1
                ? i18n.t('labels.hours', { ns: 'common' })
                : i18n.t('labels.hour', { ns: 'common' });

        return minutes > 0
            ? `${hours}:${String(minutes).padStart(2, '0')} ${hourLabel}`
            : `${hours} ${hourLabel}`;
    }

    if (diffInMinutes > 0) {
        const minuteLabel =
            diffInMinutes > 1
                ? i18n.t('labels.minutes', { ns: 'common' })
                : i18n.t('labels.minute', { ns: 'common' });

        return `${diffInMinutes} ${minuteLabel}`;
    }

    return i18n.t('labels.noTimeDifference', { ns: 'common' });
}
