import i18n from 'i18next';
import { DateTime } from 'luxon';

export function timeConverter(time: string, is24HourFormat: boolean): string {
    const dateTime = DateTime.fromISO(time);

    if (is24HourFormat) {
        // Return 24-hour format (e.g., "13:00")
        return dateTime.toFormat('HH:mm');
    }

    // Return 12-hour format (e.g., "01:00 pm")
    return dateTime.toFormat('hh:mm a').toLowerCase();
}

export function formatReminderTime(minutes: number): string {
    if (minutes < 60) {
        // Less than an hour: display minutes
        return `${minutes} ${i18n.t('labels.minutesBefore', { ns: 'common' })}`;
    }
    if (minutes < 1440) {
        // Less than a day: display hours
        const hours = Math.floor(minutes / 60);
        return `${hours} ${i18n.t('labels.hoursBefore', { ns: 'common' })}`;
    }
    // More than or equal to a day: display days
    const days = Math.floor(minutes / 1440);
    return `${days} ${i18n.t('labels.daysBefore', { ns: 'common' })}`;
}
