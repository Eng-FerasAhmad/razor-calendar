import { DndContext } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import DaysInTheWeek from 'components/calendar/month/month-days-in-week/MonthDaysInWeek';
import WeekNumber from 'components/calendar/month/month-week-number/MonthWeekNumber';
import { useDragAndDrop } from 'month/drag-and-drop/useDragAndDrop';
import {
    MonthGridContainer,
    MonthGridContentWrapper,
} from 'month/month-grid/styles';
import { Appointment } from 'types/appointment';

interface Props {
    weeksRow: DateTime[][];
    appointments: Appointment[];
    handleChangeAppointment: (appointment: Appointment) => void;
}

export default function MonthGrid({
    weeksRow,
    appointments,
    handleChangeAppointment,
}: Props): ReactElement {
    const { config } = useCalendarContext();

    const { updatedAppointments, handleDragStart, handleDragEnd } =
        useDragAndDrop({
            appointments,
            handleChangeAppointment,
        });

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToWindowEdges]}
        >
            <MonthGridContainer data-testid="month-grid-container">
                {weeksRow.map((week, weekIndex) => (
                    <MonthGridContentWrapper
                        data-testid="month-grid-content-container"
                        key={weekIndex}
                    >
                        {config.month.showWeekNumbers && (
                            <WeekNumber weekStart={week[0]} />
                        )}
                        <DaysInTheWeek
                            week={week}
                            appointments={updatedAppointments}
                        />
                    </MonthGridContentWrapper>
                ))}
            </MonthGridContainer>
        </DndContext>
    );
}
