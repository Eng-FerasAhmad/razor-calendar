import { DateTime } from 'luxon';

export const today = (): DateTime => {
    return DateTime.now();
};

// Format a date
export const formatDate = (date: DateTime, format: string): string => {
    return date.toFormat(format);
};

export const getDateRange = (start: DateTime, end: DateTime): DateTime[] => {
    const days: DateTime[] = [];
    let current = start;
    while (current <= end) {
        days.push(current);
        current = current.plus({ days: 1 });
    }
    return days;
};
