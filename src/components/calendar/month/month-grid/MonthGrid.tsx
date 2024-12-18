import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import DaysInTheWeek from 'components/calendar/month/month-days-in-week/MonthDaysInWeek';
import WeekNumber from 'components/calendar/month/month-week-number/MonthWeekNumber';
import { Event } from 'types/calendar';

interface Props {
    weeks: DateTime[][];
    events: Event[];
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
