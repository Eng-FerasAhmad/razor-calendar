import { DateTime } from 'luxon';

export const today = (): DateTime => {
    return DateTime.now();
};

// Format a date
export const formatDate = (date: DateTime, format: string): string => {
    return date.toFormat(format);
};

export const getDateRange = (
    start: DateTime,
    end: DateTime,
    showWeekend: boolean = true
): DateTime[] => {
    const days: DateTime[] = [];
    let current = start;

    while (current <= end) {
        if (showWeekend || (current.weekday !== 6 && current.weekday !== 7)) {
            days.push(current);
        }
        current = current.plus({ days: 1 });
    }

    return days;
};
