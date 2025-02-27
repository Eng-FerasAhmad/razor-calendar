import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';

interface UseDragAndDrops {
    updatedAppointments: Appointment[];
    activeDrag: Appointment | null;
    handleDragStart: (event: DragStartEvent) => void;
    handleDragEnd: (event: DragEndEvent) => void;
}

export const useDragAndDrop = (): UseDragAndDrops => {
    const { appointments, onChangeAppointments } = useCalendarContext();

    const [updatedAppointments, setUpdatedAppointments] = useState<
        Appointment[]
    >(appointments!);
    const [activeDrag, setActiveDrag] = useState<Appointment | null>(null);

    const handleDragStart = (event: DragStartEvent): void => {
        const draggedAppointment = updatedAppointments.find(
            (appointment) => String(appointment.id) === String(event.active.id)
        );
        setActiveDrag(draggedAppointment || null);
    };

    const handleDragEnd = (event: DragEndEvent): void => {
        const { active, over } = event;
        if (!over || !activeDrag) return;

        const targetDayISO = String(over.id);
        if (!targetDayISO) return;

        const targetDay = DateTime.fromISO(targetDayISO);

        const updatedList: Appointment[] = updatedAppointments.map(
            (appointment) =>
                String(appointment.id) === String(active.id)
                    ? {
                          ...appointment,
                          start:
                              targetDay
                                  .set({
                                      hour: DateTime.fromISO(appointment.start)
                                          .hour,
                                      minute: DateTime.fromISO(
                                          appointment.start
                                      ).minute,
                                      second: DateTime.fromISO(
                                          appointment.start
                                      ).second,
                                  })
                                  .toISO() ??
                              targetDay.toFormat("yyyy-MM-dd'T'HH:mm:ss"),
                          end:
                              targetDay
                                  .plus({
                                      days: DateTime.fromISO(
                                          appointment.end
                                      ).diff(
                                          DateTime.fromISO(appointment.start),
                                          'days'
                                      ).days,
                                  })
                                  .set({
                                      hour: DateTime.fromISO(appointment.end)
                                          .hour,
                                      minute: DateTime.fromISO(appointment.end)
                                          .minute,
                                      second: DateTime.fromISO(appointment.end)
                                          .second,
                                  })
                                  .toISO() ??
                              targetDay.toFormat("yyyy-MM-dd'T'HH:mm:ss"),
                      }
                    : appointment
        );

        setUpdatedAppointments(updatedList);
        onChangeAppointments(updatedList);

        setActiveDrag(null); // Reset drag state
    };

    return {
        updatedAppointments,
        activeDrag,
        handleDragStart,
        handleDragEnd,
    };
};
