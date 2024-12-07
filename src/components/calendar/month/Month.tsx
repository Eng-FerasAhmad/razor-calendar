import React from 'react';
import { useSelector } from 'react-redux';
import MonthGrid from 'components/calendar/month/month-grid/MonthGrid';
import MonthHeader from 'components/calendar/month/month-header/MonthHeader';
import { RootState } from 'src/store/types';
import {
    getDateRange,
    getLocalizedWeekdays,
    getLocalizedMonths,
} from 'utils/dates';

export default function Month(): React.ReactElement {
    const { date: selectedDate, language } = useSelector(
        (state: RootState) => state.ui
    );
    const events = useSelector((state: RootState) => state.events.events);

    // Localized weekdays and months
    const localizedWeekdays = getLocalizedWeekdays(language, 1); // Start on Monday
    const localizedMonths = getLocalizedMonths(language);

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
            <MonthGrid weeks={weeks} events={events} />
        </div>
    );
}
