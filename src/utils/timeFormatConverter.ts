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
