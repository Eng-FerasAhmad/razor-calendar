import { useDroppable } from '@dnd-kit/core';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import DisplayEvents from 'components/calendar/month/month-day-events/MonthDayEvents';
import {
    DayNumberContainer,
    MonthDayWrapper,
} from 'month/month-days-in-week/styles';

import { Appointment } from 'types/appointment';

interface DayCellProps {
    day: DateTime;
    dailyEvents: Appointment[];
    isToday: boolean;
    primaryColor: string;
}

export default function DayCell({
    day,
    dailyEvents,
    isToday,
    primaryColor,
}: DayCellProps): ReactElement {
    const { setNodeRef } = useDroppable({
        id: day.toISODate() || '', // Ensure no null values
    });

    return (
        <MonthDayWrapper ref={setNodeRef} data-testid="month-day-wrapper">
            <DayNumberContainer isToday={isToday} color={primaryColor}>
                {day.day}
            </DayNumberContainer>
            <DisplayEvents
                appointments={dailyEvents}
                primaryColor={primaryColor}
            />
        </MonthDayWrapper>
    );
}
