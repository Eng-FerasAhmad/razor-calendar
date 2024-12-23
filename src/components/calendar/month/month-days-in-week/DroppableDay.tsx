import { useDroppable } from '@dnd-kit/core';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import DisplayEvents from 'components/calendar/month/month-day-events/MonthDayEvents';
import {
    DayNumberContainer,
    MonthDayWrapper,
} from 'month/month-days-in-week/styles';
import { Appointment } from 'types/calendar';

interface DroppableDayProps {
    day: DateTime;
    dailyEvents: Appointment[];
    primaryColor: string;
    isToday?: boolean;
}

export default function DroppableDay({
    day,
    dailyEvents,
    primaryColor,
    isToday = false,
}: DroppableDayProps): ReactElement {
    const { setNodeRef } = useDroppable({
        id: day.toISODate() || '', // Ensure no null values
    });

    return (
        <MonthDayWrapper
            ref={setNodeRef}
            data-testid="month-day-wrapper"
            style={{ border: isToday ? `2px solid ${primaryColor}` : 'none' }}
        >
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
