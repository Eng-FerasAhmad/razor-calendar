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

        const overId = String(over.id);

        if (!overId.includes('$')) {
            return;
        }

        const [targetDayISO, timeString] = overId.split('$');
        const [hour, minute] = timeString.split(':').map(Number);

        if (!targetDayISO || Number.isNaN(hour) || Number.isNaN(minute)) return;

        const targetDay = DateTime.fromISO(targetDayISO);

        // Compute updated appointments array
        const updatedAppointments: Appointment[] = appointments!.map(
            (appointment) =>
                String(appointment.id) === String(active.id)
                    ? {
                          ...appointment,
                          start:
                              targetDay
                                  .set({
                                      hour,
                                      minute,
                                      second: 0,
                                      millisecond: 0,
                                  })
                                  .toISO() ??
                              targetDay
                                  .set({
                                      hour,
                                      minute,
                                      second: 0,
                                      millisecond: 0,
                                  })
                                  .toFormat("yyyy-MM-dd'T'HH:mm:ss"),
                          end:
                              targetDay
                                  .set({
                                      hour,
                                      minute,
                                      second: 0,
                                      millisecond: 0,
                                  })
                                  .plus({
                                      minutes: DateTime.fromISO(
                                          appointment.end
                                      ).diff(
                                          DateTime.fromISO(appointment.start),
                                          'minutes'
                                      ).minutes,
                                  })
                                  .toISO() ??
                              targetDay
                                  .set({
                                      hour,
                                      minute,
                                      second: 0,
                                      millisecond: 0,
                                  })
                                  .plus({
                                      minutes: DateTime.fromISO(
                                          appointment.end
                                      ).diff(
                                          DateTime.fromISO(appointment.start),
                                          'minutes'
                                      ).minutes,
                                  })
                                  .toFormat("yyyy-MM-dd'T'HH:mm:ss"),
                      }
                    : appointment
        );

        onChangeAppointments(updatedAppointments);

        setActiveDrag(null);
    };

    const handleDragStart = (event: DragStartEvent): void => {
        const draggedAppointment = appointments?.find(
            (appointment) => String(appointment.id) === String(event.active.id)
        );
        console.log('draggedAppointment', draggedAppointment);
        setActiveDrag(draggedAppointment || null);
    };

    return {
        handleDragEnd,
        handleDragStart,
        activeDrag,
    };
}
