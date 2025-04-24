import { DndContext, DragOverlay } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import DayColumns from 'calendar/_atomic/day-columns/DayColumns';
import DraggableAppointment from 'calendar/_atomic/drag-and-drop/DraggableAppointment';
import TimeColumn from 'calendar/_atomic/time-column/TimeColumn';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import HeaderTemplate from 'calendar/_header-template/HeaderTemplate';
import useAppointment from 'calendar/_hooks/useAppointment';
import useDragAndDropHandler from 'calendar/_hooks/useDragAndDropHandler';
import DayHeaderRow from 'day/header-row/DayHeaderRow';
import { DayContainer, TimeDayWrapper } from 'day/styles';

interface Props {
    selectedDate: DateTime;
}

export default function Day({ selectedDate }: Props): ReactElement {
    const { config, appointments } = useCalendarContext();
    const { fullDayAppointments } = useAppointment(appointments!, selectedDate);
    const { handleDragStart, handleDragEnd, activeDrag } =
        useDragAndDropHandler();

    // Interval options
    const intervalOptions = [60, 30, 15, 10, 5];
    const interval = intervalOptions[config.hour.hourIntervalIndex];

    return (
        <DayContainer data-testid="day-container">
            <HeaderTemplate>
                <DayHeaderRow
                    selectedDate={selectedDate}
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
                >
                    <DayColumns
                        key={selectedDate.toISO()}
                        day={selectedDate}
                        interval={interval}
                        appointments={appointments!}
                        fullDayAppointments={fullDayAppointments}
                    />

                    <DragOverlay dropAnimation={null}>
                        {activeDrag && (
                            <DraggableAppointment
                                id={activeDrag.id}
                                from={activeDrag.start}
                                to={activeDrag.end}
                                appointment={activeDrag}
                                color={
                                    activeDrag.color ||
                                    config.style.primaryColor
                                }
                                style={{ top: '0', height: 'auto' }}
                                isOverlay={true}
                            />
                        )}
                    </DragOverlay>
                </DndContext>
            </TimeDayWrapper>
        </DayContainer>
    );
}
