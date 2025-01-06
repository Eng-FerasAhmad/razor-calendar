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
import { WeekContainer, TimeDayWrapper } from './styles';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import TimeColumn from 'components/calendar/week/time-column/TimeColumn';
import { Appointment } from 'types/appointment';
import { getDateRange } from 'utils/dates';
import DayColumns from 'week/day-columns/DayColumns';
import DraggableAppointment from 'week/drag-and-drop/DraggableAppointment';
import WeekHeaderRow from 'week/header-row/WeekHeaderRow';
import useWeek from 'week/useWeeks';

interface Props {
    appointments: Appointment[];
    selectedDate: DateTime;
    handleChangeAppointment: (appointment: Appointment) => void;
}

export default function Week({
    appointments,
    selectedDate,
    handleChangeAppointment,
}: Props): ReactElement {
    const { config } = useCalendarContext();
    const { fullDayAppointments } = useWeek(appointments, selectedDate);

    // Interval options
    const intervalOptions = [60, 30, 15, 10, 5];
    const interval = intervalOptions[config.hour.hourIntervalIndex];

    // Days of the week
    const days = getDateRange(
        selectedDate.startOf('week'),
        selectedDate.endOf('week'),
        config.week.showWeekend
    );

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
        <WeekContainer data-testid="week-container">
            <WeekHeaderRow
                days={days}
                fullDayAppointments={fullDayAppointments}
            />

            <TimeDayWrapper data-testid="time-day-wrapper">
                <TimeColumn interval={interval} />

                <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToWindowEdges]}
                >
                    {days.map((day) => (
                        <DayColumns
                            key={day.toISO()}
                            day={day}
                            interval={interval}
                            appointments={updatedAppointments}
                            fullDayAppointments={fullDayAppointments}
                        />
                    ))}
                    <DragOverlay dropAnimation={null}>
                        {activeDrag && (
                            <DraggableAppointment
                                id={activeDrag.id}
                                title={activeDrag.title}
                                from={activeDrag.start}
                                to={activeDrag.end}
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
        </WeekContainer>
    );
}
