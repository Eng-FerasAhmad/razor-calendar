import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { Appointment } from 'types/calendar';
import { isWorkTime } from 'utils/dateTime';
import {
    DaysColumnsContainer,
    TimeSlotWrapper,
} from 'week/days-columns/styles';
import DisplayAppointment from 'week/display-appointment/DisplayAppointment';

interface Props {
    day: DateTime;
    appointments: Appointment[];
    interval: number; // Interval in minutes
    startWorkHour: number;
    endWorkHour: number;
    intervalIndex: number;
}

export default function DayColumn({
    day,
    appointments,
    interval,
    startWorkHour,
    endWorkHour,
    intervalIndex,
}: Props): ReactElement {
    // Generate time slots
    const timeSlots = Array.from(
        { length: (24 * 60) / interval },
        (_, i) => i * interval
    );

    // Filter events for the current day
    const dayEvents =
        appointments &&
        appointments.filter((appointment) =>
            DateTime.fromISO(appointment.start).hasSame(day, 'day')
        );

    // Helper to calculate event position
    const calculateEventStyle = (event: { start: string; end: string }) => {
        const eventStart = DateTime.fromISO(event.start);
        const eventEnd = DateTime.fromISO(event.end);

        const totalMinutes = (24 * 60) / interval;
        const startMinutes =
            (eventStart.hour * 60 + eventStart.minute) / interval;
        const duration =
            eventEnd.diff(eventStart, 'minutes').minutes / interval;

        return {
            top: `${(startMinutes / totalMinutes) * 100}%`,
            height: `${(duration / totalMinutes) * 100}%`,
        };
    };

    return (
        <DaysColumnsContainer
            data-testid="days-columns-container"
            timSlotsCount={timeSlots.length}
            intervalIndex={intervalIndex}
        >
            {timeSlots.map((_, index) => {
                const hour = Math.floor((index * interval) / 60);
                const minute = (index * interval) % 60;

                console.log('minute === 0', minute === 0);
                console.log('minute', minute);
                return (
                    <TimeSlotWrapper
                        data-testid="time-slot"
                        id={`${hour}:${minute}`}
                        key={index}
                        isFullHour={minute === 0}
                        isFirstRow={index === 0}
                        intervalIndex={intervalIndex}
                        isLastRow={index === timeSlots.length - 1}
                        workTime={isWorkTime(hour, startWorkHour, endWorkHour)}
                    />
                );
            })}

            {dayEvents.map((event) => (
                <DisplayAppointment
                    key={event.id}
                    title={event.title}
                    from={event.start}
                    to={event.end}
                    style={calculateEventStyle(event)}
                />
            ))}
        </DaysColumnsContainer>
    );
}
