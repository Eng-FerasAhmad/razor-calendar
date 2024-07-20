import moment from 'moment/moment';
import {
    CalDate,
    CalDay,
    CalMonth,
    CalYear,
    Days,
    Week,
    WeekStartDay,
} from 'src/date-service/types';

const createDayObject = (dateProp: Date, isCurrentMonth: boolean): Days => {
    const day: CalDay = {
        number: parseInt(moment(dateProp).format('D'), 10),
        name: moment(dateProp).day().toString(),
        shortName: moment(dateProp).day().toString(),
        oneLetter: moment(dateProp).day().toString(),
    };

    const month: CalMonth = {
        number: parseInt(moment(dateProp).format('M'), 10),
        name: moment(dateProp).format('MMMM'),
        shortName: moment(dateProp)
            .format('MMMM')
            .slice(0, 2)
            .toLocaleUpperCase(),
    };

    const year: CalYear = {
        number: moment(dateProp).year(),
    };

    const date: CalDate = {
        short: moment(dateProp).format('yyyy-MM-DD'),
        long: moment(dateProp).format('yyyy-MM-DD'),
        utc: moment(dateProp).format('yyyy-MM-DD'),
    };

    return {
        day,
        month,
        year,
        date,
        isCurrentMonth,
    };
};

const generatePreviousWeek = (
    startDayOfWeek: number,
    year: number,
    month: number
): Week => {
    const currentWeek: Week = [];
    if (startDayOfWeek > 0) {
        const previousMonthLastDay = new Date(year, month, 0);
        for (let i = startDayOfWeek - 1; i >= 0; i -= 1) {
            const date = new Date(previousMonthLastDay);
            date.setDate(date.getDate() - i);
            currentWeek.push(createDayObject(date, false));
        }
    }

    return currentWeek;
};

const generateNextWeek = (
    year: number,
    month: number,
    firstDayOfMonth: Date,
    daysInMonth: number,
    weekStartDay: number
): Week => {
    const currentWeek: Week = [];
    const endDayOfWeek =
        (firstDayOfMonth.getDay() + daysInMonth - 1 - weekStartDay + 7) % 7;
    if (endDayOfWeek < 6) {
        for (let i = 1; i <= 6 - endDayOfWeek; i += 1) {
            const date = new Date(year, month + 1, i);
            currentWeek.push(createDayObject(date, false));
        }
    }
    return currentWeek;
};

export const weekAdapter = (
    year: number,
    monthIndex: number,
    weekStartDay: WeekStartDay
): Week[] => {
    const month = monthIndex - 1;
    const weeks: Week[] = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDayOfWeek = (firstDayOfMonth.getDay() - weekStartDay + 7) % 7;
    const daysInMonth = lastDayOfMonth.getDate();

    let currentWeek: Week;
    let dayOfMonth = 1;

    // Add days from the previous month
    currentWeek = [...generatePreviousWeek(startDayOfWeek, year, month)];

    // Add days of the current month
    while (dayOfMonth <= daysInMonth) {
        const date = new Date(year, month, dayOfMonth);
        currentWeek.push(createDayObject(date, true));
        dayOfMonth += 1;

        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    }

    // Add days from the next month to complete the last week
    currentWeek = [
        ...currentWeek,
        ...generateNextWeek(
            year,
            month,
            firstDayOfMonth,
            daysInMonth,
            weekStartDay
        ),
    ];

    // Push the last week if it contains any days
    if (currentWeek.length > 0) {
        weeks.push(currentWeek);
    }

    return weeks;
};
