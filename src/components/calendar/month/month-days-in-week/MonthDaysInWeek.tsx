import { DateTime } from 'luxon';
import { ReactElement } from 'react';

import DroppableDay from 'month/drag-and-drop/DroppableDay';
import { Appointment } from 'types/appointment';

interface Props {
    week: DateTime[];
    appointments: Appointment[];
}

export default function DaysInTheWeek({
    week,
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
                    <DroppableDay
                        key={day.toISO()}
                        day={day}
                        dailyEvents={dailyEvents}
                        isToday={isToday}
                    />
                );
            })}
        </>
    );
}
