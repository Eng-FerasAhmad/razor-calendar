import { useDroppable } from '@dnd-kit/core';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import DisplayEvents from 'components/calendar/month/month-day-events/MonthDayEvents';
import {
    DayNumberButtonContainer,
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
    const { onDateChange, onViewChange } = useCalendarContext();
    const { setNodeRef } = useDroppable({
        id: day.toISODate() || '', // Ensure no null values
    });

    // Navigate to Day View
    const navigateToDay = (newDay: DateTime): void => {
        onDateChange(newDay);
        onViewChange('day');
    };

    return (
        <MonthDayWrapper ref={setNodeRef} data-testid="month-day-wrapper">
            <DayNumberContainer isToday={isToday} color={primaryColor}>
                <DayNumberButtonContainer
                    isToday={isToday}
                    color={primaryColor}
                    onClick={() => navigateToDay(day)}
                >
                    {day.day}
                </DayNumberButtonContainer>
            </DayNumberContainer>
            <DisplayEvents appointments={dailyEvents} />
        </MonthDayWrapper>
    );
}
