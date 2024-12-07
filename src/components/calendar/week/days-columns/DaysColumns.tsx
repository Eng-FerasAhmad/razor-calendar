import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import Event from 'components/calendar/week/display-events/DisplayEvents';

interface Props {
    day: DateTime;
    events: Array<{ id: string; title: string; start: string; end: string }>;
    interval: number; // Interval in minutes
    startWorkHour: number;
    endWorkHour: number;
}

export default function DayColumn({
    day,
    events,
    interval,
    startWorkHour,
    endWorkHour,
}: Props): ReactElement {
    // Generate time slots
    const timeSlots = Array.from(
        { length: (24 * 60) / interval },
        (_, i) => i * interval
    );

    // Filter events for the current day
    const dayEvents = events.filter((event) =>
        DateTime.fromISO(event.start).hasSame(day, 'day')
    );

    // Helper to calculate event position
    const calculateEventStyle = (event: { start: string; end: string }) => {
        const eventStart = DateTime.fromISO(event.start);
        const eventEnd = DateTime.fromISO(event.end);

        const totalMinutes = (24 * 60) / interval;
        const startMinutes =
            (eventStart.hour * 60 + eventStart.minute) / interval;
        const duration =
            eventEnd.diff(eventStart, 'minutes').minutes / interval;

        return {
            top: `${(startMinutes / totalMinutes) * 100}%`,
            height: `${(duration / totalMinutes) * 100}%`,
        };
    };

    return (
        <div
            style={{
                flex: 1,
                position: 'relative',
                borderLeft: '1px solid #ccc',
            }}
        >
            {/* Time Slots */}
            {timeSlots.map((_, index) => {
                const hour = Math.floor((index * interval) / 60);
                return (
                    <div
                        key={index}
                        style={{
                            height: '30px',
                            borderBottom: '1px solid #ddd',
                            backgroundColor:
                                hour >= startWorkHour && hour < endWorkHour
                                    ? '#fff'
                                    : '#f0f0f0',
                        }}
                    />
                );
            })}

            {/* Events */}
            {dayEvents.map((event) => (
                <Event
                    key={event.id}
                    title={event.title}
                    style={calculateEventStyle(event)}
                />
            ))}
        </div>
    );
}
