import React from 'react';
import { useCalendarContext } from 'calendar/context/CalendarContext';
import MonthGrid from 'components/calendar/month/month-grid/MonthGrid';
import MonthHeader from 'components/calendar/month/month-header/MonthHeader';
import {
    getDateRange,
    getLocalizedWeekdays,
    getLocalizedMonths,
} from 'utils/dates';

export default function Month(): React.ReactElement {
    const { selectedDate, events } = useCalendarContext();

    // Localized weekdays and months
    const localizedWeekdays = getLocalizedWeekdays('en', 1); // Start on Monday
    const localizedMonths = getLocalizedMonths('en');

    const startOfMonth = selectedDate.startOf('month');
    const endOfMonth = selectedDate.endOf('month');

    const days = getDateRange(
        startOfMonth.startOf('week'),
        endOfMonth.endOf('week')
    );
    const weeks = Array.from({ length: Math.ceil(days.length / 7) }, (_, i) =>
        days.slice(i * 7, i * 7 + 7)
    );

    return (
        <div style={{ padding: '10px' }}>
            <MonthHeader
                selectedDate={selectedDate}
                localizedMonths={localizedMonths}
                localizedWeekdays={localizedWeekdays}
            />
            <MonthGrid weeks={weeks} events={events!} />
        </div>
    );
}
