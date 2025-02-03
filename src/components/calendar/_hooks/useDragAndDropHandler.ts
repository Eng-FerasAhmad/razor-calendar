import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';

interface UseDragAndDropHandler {
    handleDragEnd: (event: DragEndEvent) => void;
    handleDragStart: (event: DragStartEvent) => void;
    activeDrag: Appointment | null;
}

export default function useDragAndDropHandler(): UseDragAndDropHandler {
    const { appointments, onChangeAppointments } = useCalendarContext();
    const [activeDrag, setActiveDrag] = useState<Appointment | null>(null);

    const handleDragEnd = (event: DragEndEvent): void => {
        const { active, over } = event;

        if (!over || !activeDrag) return;
        if (typeof over.id !== 'string') return;

        const lastDashIndex = over.id.lastIndexOf('-');
        const targetDayISO = over.id.slice(0, lastDashIndex);
        const time = over.id.slice(lastDashIndex + 1);
        const [hour, minute] = time.split(':').map(Number);

        if (!targetDayISO || Number.isNaN(hour) || Number.isNaN(minute)) return;

        const targetDay = DateTime.fromISO(targetDayISO);

        const updatedAppointments =
            appointments &&
            appointments.map((appointment) => {
                if (appointment.id === active.id) {
                    const oldStart = DateTime.fromISO(appointment.start);
                    const oldEnd = DateTime.fromISO(appointment.end);

                    // Calculate duration in minutes
                    const durationInMinutes = oldEnd.diff(
                        oldStart,
                        'minutes'
                    ).minutes;

                    // Compute new start and end times based on target date
                    const newStart = targetDay.set({
                        hour,
                        minute,
                        second: 0,
                        millisecond: 0,
                    });

                    const newEnd = newStart.plus({
                        minutes: durationInMinutes,
                    });

                    if (!newStart.isValid || !newEnd.isValid)
                        return appointment;

                    return {
                        ...appointment,
                        start: newStart.toISO(),
                        end: newEnd.toISO(),
                    };
                }
                return appointment;
            });

        onChangeAppointments(updatedAppointments!);
        setActiveDrag(null);
    };

    const handleDragStart = (event: DragStartEvent): void => {
        const draggedAppointment =
            appointments &&
            appointments.find(
                (appointment) => appointment.id === String(event.active.id)
            );
        setActiveDrag(draggedAppointment || null);
    };

    return {
        handleDragEnd,
        handleDragStart,
        activeDrag,
    };
}
