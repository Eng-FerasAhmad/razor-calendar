import { DateTime } from 'luxon';
import React from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import MonthGrid from 'components/calendar/month/month-grid/MonthGrid';
import MonthHeader from 'components/calendar/month/month-header/MonthHeader';
import { MonthContainer } from 'month/styles';
import { getMonthWeekNames, getMonthWeeksRow } from 'month/utils';
import { Appointment } from 'types/appointment';
import { getDateRange } from 'utils/dates';

interface Props {
    selectedDate: DateTime;
    handleChangeAppointment: (appointment: Appointment) => void;
}

export default function Month({
    selectedDate,
    handleChangeAppointment,
}: Props): React.ReactElement {
    const { config, appointments } = useCalendarContext();

    const monthWeekNames = getMonthWeekNames(config.common.locale);
    const startOfMonth = selectedDate.startOf('month');
    const endOfMonth = selectedDate.endOf('month');

    const days = getDateRange(
        startOfMonth.startOf('week'),
        endOfMonth.endOf('week')
    );

    return (
        <MonthContainer data-testid="month-container">
            <MonthHeader monthWeekNames={monthWeekNames} />
            <MonthGrid
                weeksRow={getMonthWeeksRow(days)}
                appointments={appointments!}
                handleChangeAppointment={handleChangeAppointment}
            />
        </MonthContainer>
    );
}
