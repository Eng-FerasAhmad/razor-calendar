import { DateTime } from 'luxon';
import React from 'react';
import DisplayEvents from 'components/calendar/month/month-day-events/MonthDayEvents';

interface DaysInTheWeekProps {
    week: DateTime[];
    events: any[]; // Replace `any` with the appropriate event type
}

const DaysInTheWeek: React.FC<DaysInTheWeekProps> = ({ week, events }) => {
    const currentDay = DateTime.now();

    const getEventsForDay = (day: DateTime) =>
        events.filter((event) =>
            DateTime.fromISO(event.start).hasSame(day, 'day')
        );

    return (
        <>
            {week.map((day) => {
                const dailyEvents = getEventsForDay(day);
                const isToday = day.hasSame(currentDay, 'day');

                return (
                    <div
                        key={day.toISO()}
                        style={{
                            flex: 1,
                            minHeight: '100px',
                            padding: '5px',
                            border: '1px solid #ccc',
                            backgroundColor: isToday ? '#d4edda' : '#ffffff',
                        }}
                    >
                        <span
                            style={{
                                fontWeight: 'bold',
                                marginBottom: '5px',
                            }}
                        >
                            {day.day}
                        </span>
                        <DisplayEvents events={dailyEvents} />
                    </div>
                );
            })}
        </>
    );
};

export default DaysInTheWeek;