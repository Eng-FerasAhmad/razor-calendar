import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import DisplayEvents from 'components/calendar/month/month-day-events/MonthDayEvents';
import { Appointment } from 'types/calendar';

interface Props {
    week: DateTime[];
    appointments: Appointment[]; // Replace `any` with the appropriate event type
}

export default function DaysInTheWeek({
    week,
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
}
