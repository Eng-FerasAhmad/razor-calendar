import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    MouseSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { DateTime } from 'luxon';
import { ReactElement, useState } from 'react';
import DayColumns from 'calendar/_atomic/day-columns/DayColumns';
import DraggableAppointment from 'calendar/_atomic/drag-and-drop/DraggableAppointment';
import TimeColumn from 'calendar/_atomic/time-column/TimeColumn';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import useAppointment from 'calendar/_hooks/useAppointment';
import DayHeaderRow from 'day/header-row/DayHeaderRow';
import { DayContainer, TimeDayWrapper } from 'day/styles';
import { Appointment } from 'types/appointment';

interface Props {
    appointments: Appointment[];
    selectedDate: DateTime;
    handleChangeAppointment: (appointment: Appointment) => void;
}

export default function Day({
    appointments,
    selectedDate,
    handleChangeAppointment,
}: Props): ReactElement {
    const { config } = useCalendarContext();
    const { fullDayAppointments } = useAppointment(appointments, selectedDate);

    // Interval options
    const intervalOptions = [60, 30, 15, 10, 5];
    const interval = intervalOptions[config.hour.hourIntervalIndex];

    const [activeDrag, setActiveDrag] = useState<Appointment | null>(null);
    const [updatedAppointments, setUpdatedAppointments] =
        useState(appointments);

    const handleDragEnd = (event: DragEndEvent): void => {
        const { active, over } = event;

        if (!over || !activeDrag) return;

        if (typeof over.id !== 'string') return;

        // Parse `over.id` into target day and time
        const lastDashIndex = over.id.lastIndexOf('-');
        const targetDayISO = over.id.slice(0, lastDashIndex);
        const time = over.id.slice(lastDashIndex + 1);
        const [hour, minute] = time.split(':').map(Number);

        if (!targetDayISO || Number.isNaN(hour) || Number.isNaN(minute)) return;

        const targetDay = DateTime.fromISO(targetDayISO);

        setUpdatedAppointments((prev) =>
            prev.map((appointment) => {
                if (appointment.id === active.id) {
                    const oldStart = DateTime.fromISO(appointment.start);
                    const oldEnd = DateTime.fromISO(appointment.end);

                    // Calculate the duration in minutes between start and end
                    const durationInMinutes = oldEnd.diff(
                        oldStart,
                        'minutes'
                    ).minutes;

                    // Compute new start and end times based on the target day and time
                    const newStart = targetDay.set({
                        hour,
                        minute,
                        second: 0,
                        millisecond: 0,
                    });

                    const newEnd = newStart.plus({
                        minutes: durationInMinutes,
                    });

                    // Ensure valid times
                    if (!newStart.isValid || !newEnd.isValid)
                        return appointment;

                    // Update the appointment
                    const newAppointment = {
                        ...appointment,
                        start: newStart.toISO(),
                        end: newEnd.toISO(),
                    };

                    handleChangeAppointment(newAppointment);
                    return newAppointment;
                }
                return appointment; // Keep other appointments unchanged
            })
        );

        setActiveDrag(null); // Reset the active drag state
    };

    const handleDragStart = (event: DragStartEvent): void => {
        const draggedAppointment = appointments.find(
            (appointment) => appointment.id === String(event.active.id)
        );
        setActiveDrag(draggedAppointment || null);
    };

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            delay: 100, // Drag starts after 200ms
            tolerance: 5, // Drag starts only if moved 5px
        },
    });

    const sensors = useSensors(mouseSensor);

    return (
        <DayContainer data-testid="day-container">
            <DayHeaderRow
                selectedDate={selectedDate}
                fullDayAppointments={fullDayAppointments}
            />

            <TimeDayWrapper
                id="time-day-wrapper"
                data-testid="time-day-wrapper"
            >
                <TimeColumn interval={interval} />

                <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToWindowEdges]}
                >
                    <DayColumns
                        key={selectedDate.toISO()}
                        day={selectedDate}
                        interval={interval}
                        appointments={updatedAppointments}
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
