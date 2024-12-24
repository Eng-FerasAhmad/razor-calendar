import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import DayCell from './DayCell';
import { Appointment } from 'types/calendar';

interface Props {
    week: DateTime[];
    primaryColor: string;
    appointments: Appointment[];
}

export default function DaysInTheWeek({
    week,
    primaryColor,
    appointments,
}: Props): ReactElement {
    const currentDay = DateTime.now();

    const getEventsForDay = (day: DateTime): Appointment[] =>
        appointments.filter((appointment) =>
            DateTime.fromISO(appointment.start).hasSame(day, 'day')
        );

    return (
        <>
            {week.map((day) => {
                const dailyEvents = getEventsForDay(day);
                const isToday = day.hasSame(currentDay, 'day');

                return (
                    <DayCell
                        key={day.toISO()}
                        day={day}
                        dailyEvents={dailyEvents}
                        isToday={isToday}
                        primaryColor={primaryColor}
                    />
                );
            })}
        </>
    );
}
