import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { Appointment } from 'types/appointment';

interface UseDragAndDropHandler {
    handleDragEnd: (event: DragEndEvent) => void;
    handleDragStart: (event: DragStartEvent) => void;
    updatedAppointments: Appointment[];
    activeDrag: Appointment | null;
}

export default function useDragAndDropHandler(
    appointments: Appointment[],
    handleChangeAppointment: (appointment: Appointment) => void
): UseDragAndDropHandler {
    const [updatedAppointments, setUpdatedAppointments] =
        useState(appointments);
    const [activeDrag, setActiveDrag] = useState<Appointment | null>(null);

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

    return {
        handleDragEnd,
        handleDragStart,
        updatedAppointments,
        activeDrag,
    };
}
