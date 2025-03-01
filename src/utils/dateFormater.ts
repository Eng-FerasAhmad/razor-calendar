import { DateTime } from 'luxon';
import { timeConverter } from 'utils/timeFormatConverter';

export const formattedStart = (
    start: string,
    dateFormat: string,
    is24HourFormat: boolean
): string | null => {
    if (!start) return null;

    return `${DateTime.fromISO(start).toFormat(dateFormat)} - ${timeConverter(
        DateTime.fromISO(start).toString(),
        is24HourFormat
    )}`;
};

export const formattedEnd = (
    end: string,
    dateFormat: string,
    is24HourFormat: boolean
): string | null => {
    if (!end) return null;

    return `${DateTime.fromISO(end).toFormat(dateFormat)} - ${timeConverter(
        DateTime.fromISO(end).toString(),
        is24HourFormat
    )}`;
};
