import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { Appointment } from 'types/appointment';
import DraggableAppointment from 'week/drag-and-drop/DraggableAppointment';

interface Props {
    day: DateTime;
    appointments: Appointment[];
    calculatePosition: (
        start: DateTime,
        end: DateTime
    ) => { top: string; height: string };
}

export default function DisplayAppointment({
    day,
    appointments,
    calculatePosition,
}: Props): ReactElement {
    return (
        <>
            {appointments.map((appointment) => {
                const start = DateTime.fromISO(appointment.start);
                const end = DateTime.fromISO(appointment.end);
                if (!start.hasSame(day, 'day')) return null;
                const position = calculatePosition(start, end);

                return (
                    <DraggableAppointment
                        key={appointment.id}
                        id={appointment.id}
                        title={appointment.title}
                        style={position}
                        from={start.toString()}
                        to={end.toString()}
                    />
                );
            })}
        </>
    );
}
