import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import DraggableAppointment from 'calendar/_atomic/drag-and-drop/DraggableAppointment';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';

interface Props {
    day: DateTime;
    appointments: Appointment[];
    fullDayAppointments: Appointment[];
    calculatePosition: (
        start: DateTime,
        end: DateTime,
        overlapIndex: number,
        totalOverlaps: number
    ) => { top: string; height: string; width: string; left: string };
    userId?: string;
}

export default function DisplayAppointment({
    day,
    appointments,
    calculatePosition,
    fullDayAppointments,
    userId,
}: Props): ReactElement {
    const { config } = useCalendarContext();

    // Filter out full-day appointments
    const filteredAppointments = appointments.filter((item) => {
        return !fullDayAppointments.some((fullDay) => fullDay.id === item.id);
    });

    // Group and calculate overlaps
    const groupedAppointments = filteredAppointments.map(
        (appointment, _index, arr) => {
            const start = DateTime.fromISO(appointment.start);
            const end = DateTime.fromISO(appointment.end);

            // Find overlapping appointments
            const overlappingAppointments = arr.filter(
                (other) =>
                    DateTime.fromISO(other.start) < end &&
                    DateTime.fromISO(other.end) > start
            );

            // Get the overlap index of the current appointment
            const overlapIndex = overlappingAppointments.findIndex(
                (a) => a.id === appointment.id
            );

            const position = calculatePosition(
                start,
                end,
                overlapIndex,
                overlappingAppointments.length
            );

            return {
                ...appointment,
                position,
            };
        }
    );

    const getColor = (appointment: Appointment): string => {
        if (userId) {
            const assignedUser = appointment.assign?.find(
                (user) => user.id === userId
            );

            return assignedUser?.color || config.style.primaryColor;
        }

        if (appointment.assign?.length === 1) {
            return appointment.assign[0].color;
        }

        return config.style.primaryColor;
    };

    return (
        <>
            {groupedAppointments.map((appointment) => {
                const start = DateTime.fromISO(appointment.start);
                if (!start.hasSame(day, 'day')) return null;

                return (
                    <DraggableAppointment
                        key={appointment.id}
                        id={appointment.id}
                        style={appointment.position}
                        from={start.toString()}
                        to={DateTime.fromISO(appointment.end).toString()}
                        color={getColor(appointment)}
                        appointment={appointment}
                    />
                );
            })}
        </>
    );
}
