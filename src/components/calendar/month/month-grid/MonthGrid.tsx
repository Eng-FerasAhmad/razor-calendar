import { DateTime } from 'luxon';
import React, { ReactElement } from 'react';
import DaysInTheWeek from 'components/calendar/month/month-days-in-week/MonthDaysInWeek';
import WeekNumber from 'components/calendar/month/month-week-number/MonthWeekNumber';

interface Props {
    weeks: DateTime[][];
    events: any[]; // Replace `any` with the appropriate event type
}

export default function MonthGrid({ weeks, events }: Props): ReactElement {
    return (
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
}
