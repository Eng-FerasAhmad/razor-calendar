import { DateTime } from 'luxon';
import { ReactElement, useContext } from 'react';
import { CalendarContext } from 'calendar/context/CalendarContext';
import { formatDate } from 'utils/dates';

export default function Day(): ReactElement {
    const { selectedDate, events } = useContext(CalendarContext);

    // Filter events for the selected day
    const filteredEvents = events!.filter((event) => {
        const start = DateTime.fromISO(event.start);
        const end = DateTime.fromISO(event.end);
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
