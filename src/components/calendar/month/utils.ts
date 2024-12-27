import { DateTime } from 'luxon';

export const getMonthWeeksRow = (days: DateTime[]): DateTime[][] =>
    Array.from({ length: Math.ceil(days.length / 7) }, (_, i) =>
        days.slice(i * 7, i * 7 + 7)
    );

export const getMonthWeekNames = (language: string): string[] => {
    // Generate the weekdays based on the default locale's first day of the week
    return Array.from({ length: 7 }, (_, i) => {
        const weekday = (i + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7; // Explicitly type as WeekdayNumbers
        return DateTime.fromObject({ weekday })
            .setLocale(language)
            .toFormat('ccc');
    });
};
