import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import DisplayEvents from 'components/calendar/month/month-day-events/MonthDayEvents';
import {
    DayNumberContainer,
    MonthDayWrapper,
} from 'month/month-days-in-week/styles';
import { Appointment } from 'types/calendar';

interface Props {
    week: DateTime[];
    primaryColor: string;
    appointments: Appointment[]; // Replace `any` with the appropriate event type
}

export default function DaysInTheWeek({
    week,
    primaryColor,
    appointments,
}: Props): ReactElement {
    const currentDay = DateTime.now();

    const getEventsForDay = (day: DateTime) =>
        appointments.filter((appointment) =>
            DateTime.fromISO(appointment.start).hasSame(day, 'day')
        );

    return (
        <>
            {week.map((day) => {
                const dailyEvents = getEventsForDay(day);
                const isToday = day.hasSame(currentDay, 'day');

                return (
                    <MonthDayWrapper
                        data-testid="month-day-wrapper"
                        key={day.toISO()}
                    >
                        <DayNumberContainer
                            isToday={isToday}
                            color={primaryColor}
                        >
                            {day.day}
                        </DayNumberContainer>
                        <DisplayEvents
                            appointments={dailyEvents}
                            primaryColor={primaryColor}
                        />
                    </MonthDayWrapper>
                );
            })}
        </>
    );
}
