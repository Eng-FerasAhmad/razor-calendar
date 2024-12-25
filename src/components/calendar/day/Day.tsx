import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { Appointment } from 'types/appointment';
import { formatDate } from 'utils/dates';

interface Props {
    appointments: Appointment[];
    selectedDate: DateTime;
}

export default function Day({
    selectedDate,
    appointments,
}: Props): ReactElement {
    // Filter events for the selected day
    const filteredEvents = appointments!.filter((appointment) => {
        const start = DateTime.fromISO(appointment.start);
        const end = DateTime.fromISO(appointment.end);
        return (
            start.hasSame(selectedDate, 'day') ||
            end.hasSame(selectedDate, 'day')
        );
    });

    return (
        <div>
            {/* Display the selected date */}
            <h3>{formatDate(selectedDate, 'EEEE, MMMM dd yyyy')}</h3>

            {/* Render events for the day */}
            <div>
                {filteredEvents.length > 0 ? (
                    <ul>
                        {filteredEvents.map((event) => (
                            <li key={event.id}>
                                <strong>{event.title}</strong> (
                                {DateTime.fromISO(event.start).toFormat(
                                    'hh:mm a'
                                )}{' '}
                                -{' '}
                                {DateTime.fromISO(event.end).toFormat(
                                    'hh:mm a'
                                )}
                                )
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No events for this day.</p>
                )}
            </div>
        </div>
    );
}
