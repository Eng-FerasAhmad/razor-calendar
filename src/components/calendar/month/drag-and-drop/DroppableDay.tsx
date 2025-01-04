import { useDroppable } from '@dnd-kit/core';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import DisplayMonthAppointments from 'month/display-month-appointment/DisplayMonthAppointment';

import {
    DayNumberButtonContainer,
    DayNumberContainer,
    DroppableDayContainer,
} from 'month/drag-and-drop/styles';
import { Appointment } from 'types/appointment';

interface DayCellProps {
    day: DateTime;
    dailyEvents: Appointment[];
    isToday: boolean;
}

export default function DroppableDay({
    day,
    dailyEvents,
    isToday,
}: DayCellProps): ReactElement {
    const { onDateChange, onViewChange, config } = useCalendarContext();
    const { setNodeRef } = useDroppable({
        id: day.toISODate() || '',
    });

    // Navigate to Day View
    const navigateToDay = (newDay: DateTime): void => {
        onDateChange(newDay);
        onViewChange('day');
    };

    return (
        <DroppableDayContainer
            ref={setNodeRef}
            data-testid="droppable-month-day-wrapper"
        >
            <DayNumberContainer color={config.style.primaryColor}>
                <DayNumberButtonContainer
                    isToday={isToday}
                    color={config.style.primaryColor}
                    onClick={() => navigateToDay(day)}
                >
                    {day.day}
                </DayNumberButtonContainer>
            </DayNumberContainer>
            <DisplayMonthAppointments appointments={dailyEvents} />
        </DroppableDayContainer>
    );
}
