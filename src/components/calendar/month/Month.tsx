import { DateTime } from 'luxon';
import React from 'react';
import MonthGrid from 'components/calendar/month/month-grid/MonthGrid';
import MonthHeader from 'components/calendar/month/month-header/MonthHeader';
import { MonthContainer } from 'month/styles';
import { Appointment } from 'types/calendar';
import { getDateRange, getLocalizedWeekdays } from 'utils/dates';

interface Props {
    appointments: Appointment[];
    selectedDate: DateTime;
    primaryColor: string;
}

export default function Month({
    selectedDate,
    appointments,
    primaryColor,
}: Props): React.ReactElement {
    // Localized weekdays and months
    const localizedWeekdays = getLocalizedWeekdays('en', 1); // Start on Monday

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
        <MonthContainer data-testid="month-container">
            <MonthHeader localizedWeekdays={localizedWeekdays} />
            <MonthGrid
                weeks={weeks}
                appointments={appointments!}
                primaryColor={primaryColor}
            />
        </MonthContainer>
    );
}
