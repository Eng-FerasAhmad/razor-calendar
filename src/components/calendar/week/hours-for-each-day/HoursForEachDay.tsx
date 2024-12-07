import { DateTime } from 'luxon';
import React from 'react';
import DisplayEvents from 'components/calendar/week/display-events/DisplayEvents';

interface HoursForEachDayProps {
    day: DateTime;
    timeSlots: { hour: number; minute: number; label: string }[];
    events: any[]; // Replace `any` with the appropriate event type
    interval: number;
    startWorkHour: number;
    endWorkHour: number;
}

const HoursForEachDay: React.FC<HoursForEachDayProps> = ({
    day,
    timeSlots,
    events,
    interval,
    startWorkHour,
    endWorkHour,
}) => {
    const calculateEventStyle = (
        start: DateTime,
        end: DateTime
    ): React.CSSProperties => {
        const totalMinutes = end.diff(start, 'minutes').minutes;
        const slotHeight = 30; // Min height for a time slot
        const height = (totalMinutes / interval) * slotHeight;
        const offsetMinutes = start.diff(
            start.startOf('day'),
            'minutes'
        ).minutes;
        const top = (offsetMinutes / interval) * slotHeight;

        return {
            top, // `number` is acceptable for `CSSProperties`
            height, // `number` is acceptable
            position: 'absolute',
            left: 5, // Use `number` for pixel values
            right: 5, // Use `number` for pixel values
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '2px 5px',
            borderRadius: '4px',
            fontSize: '10px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        };
    };

    return (
        <>
            {timeSlots.map(({ hour, minute }) => (
                <div
                    key={`${day.toISO()}-${hour}:${minute}`}
                    style={{
                        minHeight: '30px',
                        position: 'relative',
                        backgroundColor:
                            hour >= startWorkHour && hour < endWorkHour
                                ? '#ffffff'
                                : '#f0f0f0',
                        borderBottom: '1px solid #ddd',
                    }}
                />
            ))}
            {events.map((event) => {
                const eventStart = DateTime.fromISO(event.start);
                const eventEnd = DateTime.fromISO(event.end);

                if (!eventStart.hasSame(day, 'day')) return null;

                return (
                    <DisplayEvents
                        key={event.id}
                        event={event}
                        style={calculateEventStyle(eventStart, eventEnd)}
                    />
                );
            })}
        </>
    );
};

export default HoursForEachDay;
