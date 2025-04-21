import { DateTime } from 'luxon';
import React from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import CalendarToolbar from 'calendar/_toolbar/CalendarToolbar';
import MonthGrid from 'components/calendar/month/month-grid/MonthGrid';
import MonthHeader from 'components/calendar/month/month-header/MonthHeader';
import { MonthContainer } from 'month/styles';
import { getMonthWeekNames, getMonthWeeksRow } from 'month/utils';
import { getDateRange } from 'utils/dates';

interface Props {
    selectedDate: DateTime;
}

export default function Month({ selectedDate }: Props): React.ReactElement {
    const { config } = useCalendarContext();

    const monthWeekNames = getMonthWeekNames(config.common.locale);
    const startOfMonth = selectedDate.startOf('month');
    const endOfMonth = selectedDate.endOf('month');

    const days = getDateRange(
        startOfMonth.startOf('week'),
        endOfMonth.endOf('week')
    );

    return (
        <MonthContainer data-testid="month-container">
            <CalendarToolbar>
                <MonthHeader monthWeekNames={monthWeekNames} />
            </CalendarToolbar>
            <MonthGrid weeksRow={getMonthWeeksRow(days)} />
        </MonthContainer>
    );
}
