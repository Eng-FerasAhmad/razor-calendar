import { DateTime } from 'luxon';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/types';
import { formatDate } from 'utils/dates';

const Agenda: React.FC = () => {
    // Get the selected date and events from Redux
    const selectedDate = useSelector((state: RootState) => state.ui.date);
    const events = useSelector((state: RootState) => state.events.events);

    // Calculate the first and last day of the month for the current selected date
    const startOfMonth = selectedDate.startOf('month');
    const endOfMonth = selectedDate.endOf('month');

    // Filter events that fall within the current month
    const monthEvents = events.filter((event) => {
        const eventStart = DateTime.fromISO(event.start);
        const eventEnd = DateTime.fromISO(event.end);
        return eventStart >= startOfMonth && eventEnd <= endOfMonth;
    });

    // Group events by day
    const eventsByDay = monthEvents.reduce<Record<string, any[]>>(
        (acc, event) => {
            const eventDate = DateTime.fromISO(event.start).toISODate(); // Returns ISO string (e.g., "2024-12-04")
            if (eventDate) {
                if (!acc[eventDate]) {
                    acc[eventDate] = [];
                }
                acc[eventDate].push(event);
            }
            return acc;
        },
        {}
    );

    return (
        <div>
            {/* Display the current month */}
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
                Agenda: {formatDate(startOfMonth, 'MMMM yyyy')}
            </h3>

            {/* Render events grouped by day */}
            <div>
                {Object.keys(eventsByDay).length > 0 ? (
                    Object.entries(eventsByDay).map(([date, dayEvents]) => (
                        <div key={date} style={{ marginBottom: '1rem' }}>
                            <h4>
                                {formatDate(
                                    DateTime.fromISO(date),
                                    'EEEE, MMMM dd'
                                )}
                            </h4>
                            <ul>
                                {dayEvents.map((event) => (
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
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', marginTop: '20px' }}>
                        No appointments for this month.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Agenda;
