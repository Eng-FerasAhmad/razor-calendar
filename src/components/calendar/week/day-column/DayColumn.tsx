import { DateTime } from 'luxon';
import React from 'react';
import { DayColumnContainer, DayHeader, HourSlot, EventSlot } from './styles';

interface DayColumnProps {
    day: DateTime;
    events: any[];
    interval: number;
    startWorkHour: number;
    endWorkHour: number;
    dayLabel: string; // Pass localized day label
}

const DayColumn: React.FC<DayColumnProps> = ({
    day,
    events,
    interval,
    startWorkHour,
    endWorkHour,
    dayLabel,
}) => {
    const calculateEventStyle = (start: DateTime, end: DateTime) => {
        const totalMinutes = end.diff(start, 'minutes').minutes;
        const height = (totalMinutes / interval) * 30; // Scaled by interval
        const offsetMinutes = start.diff(
            start.startOf('day'),
            'minutes'
        ).minutes;
        const top = (offsetMinutes / interval) * 30;

        return { top: `${top}px`, height: `${height}px` };
    };

    return (
        <DayColumnContainer>
            {/* Use localized day label */}
            <DayHeader>
                {dayLabel}, {day.toFormat('MMM d')}
            </DayHeader>
            <div>
                {Array.from({ length: 24 * (60 / interval) }).map((_, i) => (
                    <HourSlot
                        key={i}
                        isWorkingHour={i < endWorkHour && i >= startWorkHour}
                    />
                ))}
                {events
                    .filter((event) =>
                        DateTime.fromISO(event.start).hasSame(day, 'day')
                    )
                    .map((event) => {
                        const eventStart = DateTime.fromISO(event.start);
                        const eventEnd = DateTime.fromISO(event.end);
                        return (
                            <EventSlot
                                key={event.id}
                                style={calculateEventStyle(
                                    eventStart,
                                    eventEnd
                                )}
                            >
                                {event.title}
                            </EventSlot>
                        );
                    })}
            </div>
        </DayColumnContainer>
    );
};

export default DayColumn;
