import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import DaysInTheWeek from 'components/calendar/month/month-days-in-week/MonthDaysInWeek';
import WeekNumber from 'components/calendar/month/month-week-number/MonthWeekNumber';
import {
    MonthGridContainer,
    MonthGridContentContainer,
} from 'month/month-grid/styles';
import { Appointment } from 'types/calendar';

interface Props {
    weeks: DateTime[][];
    appointments: Appointment[];
    primaryColor: string;
}

export default function MonthGrid({
    weeks,
    appointments,
    primaryColor,
}: Props): ReactElement {
    return (
        <MonthGridContainer data-testid="month-grid-container">
            {weeks.map((week, weekIndex) => (
                <MonthGridContentContainer
                    data-testid="month-grid-content-container"
                    key={weekIndex}
                >
                    <WeekNumber weekStart={week[0]} />
                    <DaysInTheWeek
                        week={week}
                        appointments={appointments}
                        primaryColor={primaryColor}
                    />
                </MonthGridContentContainer>
            ))}
        </MonthGridContainer>
    );
}
