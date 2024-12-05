import { DateTime } from 'luxon';
import React from 'react';
import DaysInTheWeek from 'components/calendar/month/month-days-in-week/MonthDaysInWeek';
import WeekNumber from 'components/calendar/month/month-week-number/MonthWeekNumber';

interface MonthGridProps {
    weeks: DateTime[][];
    events: any[]; // Replace `any` with the appropriate event type
}

const MonthGrid: React.FC<MonthGridProps> = ({ weeks, events }) => (
    <>
        {weeks.map((week, weekIndex) => (
            <div
                key={weekIndex}
                style={{ display: 'flex', marginBottom: '5px' }}
            >
                <WeekNumber weekStart={week[0]} />
                <DaysInTheWeek week={week} events={events} />
            </div>
        ))}
    </>
);

export default MonthGrid;
