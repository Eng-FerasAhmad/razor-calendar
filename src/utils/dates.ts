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

export const getLocalizedWeekdays = (language: string, firstDay: number) => {
    // Generate the weekdays in order based on the locale
    const weekdays = Array.from({ length: 7 }, (_, i) => {
        const weekday = (((i + firstDay - 1) % 7) + 1) as
            | 1
            | 2
            | 3
            | 4
            | 5
            | 6
            | 7;
        return DateTime.fromObject({ weekday })
            .setLocale(language)
            .toFormat('EEEE');
    });

    return weekdays;
};

export const getLocalizedMonths = (language: string) => {
    return Array.from({ length: 12 }, (_, i) =>
        DateTime.fromObject({ month: i + 1 })
            .setLocale(language)
            .toFormat('MMMM')
    );
};
