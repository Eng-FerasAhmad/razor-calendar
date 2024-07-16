export interface DateMetaData {
    month: string;
    weeks: Array<WeekMetaData>;
}

export interface DaysMetaData {
    day: string;
    date: string;
    fullDate: string;
    dayNumber: string;
    monthNumber: number;
    currentMonth: boolean;
}

function getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear =
        (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export interface WeekMetaData {
    weekNumber: number;
    days: Array<DaysMetaData>;
}

export function getMonthAndWeeks(
    year: number,
    weekStartDay: number
): Array<DateMetaData> {
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const result: DateMetaData[] = [];

    for (let month = 0; month < 12; month += 1) {
        const weeks: WeekMetaData[] = [];
        const currentDate = new Date(year, month, 1);

        while (currentDate.getDay() !== weekStartDay) {
            currentDate.setDate(currentDate.getDate() - 1);
        }

        let weekNumber = getWeekNumber(new Date(year, month, 1));

        while (true) {
            const days: DaysMetaData[] = [];
            for (let i = 0; i < 7; i += 1) {
                days.push({
                    day: dayNames[(weekStartDay + i) % 7],
                    date: currentDate.toISOString().split('T')[0], // Adjusted to use Date object
                    fullDate: currentDate.toISOString(),
                    dayNumber: currentDate
                        .getDate()
                        .toString()
                        .padStart(2, '0'),
                    monthNumber: currentDate.getMonth(),
                    currentMonth: currentDate.getMonth() === month,
                });
                currentDate.setDate(currentDate.getDate() + 1);
            }
            weeks.push({ weekNumber: (weekNumber += 1), days });

            if (currentDate.getMonth() !== month) break;
        }

        result.push({ month: monthNames[month], weeks });
    }

    return result;
}
