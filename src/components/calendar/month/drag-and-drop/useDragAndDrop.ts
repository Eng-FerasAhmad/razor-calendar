import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { Appointment } from 'types/appointment';

interface UseDragAndDropParams {
    appointments: Appointment[];
    handleChangeAppointment: (appointment: Appointment) => void;
}

interface UseDragAndDrops {
    updatedAppointments: Appointment[];
    activeDrag: Appointment | null;
    handleDragStart: (event: DragStartEvent) => void;
    handleDragEnd: (event: DragEndEvent) => void;
}
export const useDragAndDrop = ({
    appointments,
    handleChangeAppointment,
}: UseDragAndDropParams): UseDragAndDrops => {
    const [updatedAppointments, setUpdatedAppointments] =
        useState(appointments);
    const [activeDrag, setActiveDrag] = useState<Appointment | null>(null);

    const handleDragStart = (event: DragStartEvent): void => {
        const draggedAppointment = updatedAppointments.find(
            (appointment) => appointment.id === String(event.active.id)
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

    return {
        updatedAppointments,
        activeDrag,
        handleDragStart,
        handleDragEnd,
    };
};
