import { DndContext, DragOverlay } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { ReactElement } from 'react';
import { WeekContainer, TimeDayWrapper } from './styles';
import DayColumns from 'calendar/_atomic/day-columns/DayColumns';
import DraggableAppointment from 'calendar/_atomic/drag-and-drop/DraggableAppointment';
import TimeColumn from 'calendar/_atomic/time-column/TimeColumn';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import HeaderTemplate from 'calendar/_header-template/HeaderTemplate';
import useAppointment from 'calendar/_hooks/useAppointment';
import useDragAndDropHandler from 'calendar/_hooks/useDragAndDropHandler';
import { getDateRange } from 'utils/dates';
import WeekHeaderRow from 'week/header-row/WeekHeaderRow';

export default function Week(): ReactElement {
    const { config, appointments, selectedDate } = useCalendarContext();
    const { fullDayAppointments } = useAppointment(appointments!, selectedDate);
    const { handleDragStart, handleDragEnd, activeDrag } =
        useDragAndDropHandler();

    // Interval options
    const intervalOptions = [60, 30, 15, 10, 5];
    const interval = intervalOptions[config.hour.hourIntervalIndex];

    // Days of the week
    const days = getDateRange(
        selectedDate.startOf('week'),
        selectedDate.endOf('week'),
        config.week.showWeekend
    );

    return (
        <WeekContainer data-testid="week-container">
            <HeaderTemplate>
                <WeekHeaderRow
                    days={days}
                    fullDayAppointments={fullDayAppointments}
                />
            </HeaderTemplate>

            <TimeDayWrapper
                id="time-day-wrapper"
                data-testid="time-day-wrapper"
            >
                <TimeColumn interval={interval} />

                <DndContext
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToWindowEdges]}
                    autoScroll={false}
                >
                    {days.map((day) => (
                        <DayColumns
                            key={day.toISO()}
                            day={day}
                            interval={interval}
                            appointments={appointments!}
                            fullDayAppointments={fullDayAppointments}
                        />
                    ))}
                    <DragOverlay dropAnimation={null}>
                        {activeDrag && (
                            <DraggableAppointment
                                id={activeDrag.id}
                                from={activeDrag.start}
                                to={activeDrag.end}
                                appointment={activeDrag}
                                color={activeDrag.color!}
                                style={{ top: '0', height: 'auto' }}
                                isOverlay={true}
                            />
                        )}
                    </DragOverlay>
                </DndContext>
            </TimeDayWrapper>
        </WeekContainer>
    );
}
