import {
    DndContext,
    DragOverlay,
    DragEndEvent,
    DragStartEvent,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { DateTime } from 'luxon';
import { ReactElement, useState } from 'react';
import { calendarConfig } from 'calendar/config';
import DaysInTheWeek from 'components/calendar/month/month-days-in-week/MonthDaysInWeek';
import WeekNumber from 'components/calendar/month/month-week-number/MonthWeekNumber';
import DraggableEvent from 'month/drag-and-drop/DraggableEvent';
import {
    MonthGridContainer,
    MonthGridContentContainer,
} from 'month/month-grid/styles';
import { Appointment } from 'types/calendar';

interface Props {
    weeks: DateTime[][];
    appointments: Appointment[];
    primaryColor: string;
    handleChangeAppointment: (appointment: Appointment) => void;
}

export default function MonthGrid({
    weeks,
    appointments,
    primaryColor,
    handleChangeAppointment,
}: Props): ReactElement {
    const [updatedAppointments, setUpdatedAppointments] =
        useState(appointments);
    const [activeDrag, setActiveDrag] = useState<Appointment | null>(null);

    const handleDragStart = (event: DragStartEvent): void => {
        const draggedAppointment = updatedAppointments.find(
            (appointment) => appointment.id === String(event.active.id) // Convert to string
        );
        setActiveDrag(draggedAppointment || null);
    };

    const handleDragEnd = (event: DragEndEvent): void => {
        const { active, over } = event;

        if (!over || !activeDrag) return;

        const targetDayISO = over.id as string; // The target day in ISO format (date only)
        const targetDay = DateTime.fromISO(targetDayISO); // Convert to DateTime

        setUpdatedAppointments((prev) =>
            prev.map((appointment) => {
                if (appointment.id === active.id) {
                    const oldStart = DateTime.fromISO(appointment.start);
                    const oldEnd = DateTime.fromISO(appointment.end);

                    // Calculate the number of days between start and end
                    const daysDifference = oldEnd.diff(oldStart, 'days').days;

                    // Set the new start and end dates
                    const newStart = targetDay
                        .set({
                            hour: oldStart.hour,
                            minute: oldStart.minute,
                            second: oldStart.second,
                        })
                        .toISO() as string;

                    const newEnd = targetDay
                        .plus({ days: daysDifference })
                        .set({
                            hour: oldEnd.hour,
                            minute: oldEnd.minute,
                            second: oldEnd.second,
                        })
                        .toISO() as string;

                    const newAppointment = {
                        ...appointment,
                        start: newStart,
                        end: newEnd,
                    };
                    handleChangeAppointment(newAppointment);
                    return newAppointment;
                }
                return appointment; // Keep other appointments unchanged
            })
        );

        setActiveDrag(null); // Reset the active drag state
    };

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToWindowEdges]}
        >
            <MonthGridContainer data-testid="month-grid-container">
                {weeks.map((week, weekIndex) => (
                    <MonthGridContentContainer
                        data-testid="month-grid-content-container"
                        key={weekIndex}
                    >
                        {calendarConfig.showWeekNumbers && (
                            <WeekNumber weekStart={week[0]} />
                        )}
                        <DaysInTheWeek
                            week={week}
                            appointments={updatedAppointments}
                            primaryColor={primaryColor}
                        />
                    </MonthGridContentContainer>
                ))}
            </MonthGridContainer>

            {/* DragOverlay for animations */}
            <DragOverlay>
                {activeDrag && (
                    <DraggableEvent
                        id={activeDrag.id}
                        title={activeDrag.title}
                        primaryColor={primaryColor}
                    />
                )}
            </DragOverlay>
        </DndContext>
    );
}
