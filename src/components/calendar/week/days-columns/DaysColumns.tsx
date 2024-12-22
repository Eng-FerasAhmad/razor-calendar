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
    primaryColor: string;
    fullDayAppointments: Appointment[];
}

export default function DayColumn({
    day,
    appointments,
    interval,
    startWorkHour,
    endWorkHour,
    intervalIndex,
    primaryColor,
    fullDayAppointments,
}: Props): ReactElement {
    // Generate time slots
    const timeSlots = Array.from(
        { length: (24 * 60) / interval },
        (_, i) => i * interval
    );

    // Get fullDayAppointment IDs for exclusion
    const fullDayAppointmentIds = fullDayAppointments.map(
        (appointment) => appointment.id
    );

    // Filter events for the current day, excluding full-day appointments
    const dayEvents =
        appointments &&
        appointments.filter(
            (appointment) =>
                DateTime.fromISO(appointment.start).hasSame(day, 'day') &&
                !fullDayAppointmentIds.includes(appointment.id)
        );

    const calcMinHeight = (height: number): number => {
        switch (intervalIndex) {
            case 0:
                return height < 1.5 ? 1.7 : height;
            case 1:
                return height < 1.3 ? 1 : height;
            case 2:
                return height < 0.7 ? 0.9 : height;
            case 3:
                return height < 0.4 ? 0.6 : height;
            default:
                return height;
        }
    };

    // Helper to calculate event position
    const calculateEventStyle = (event: { start: string; end: string }) => {
        const eventStart = DateTime.fromISO(event.start);
        const eventEnd = DateTime.fromISO(event.end);

        const totalMinutes = (24 * 60) / interval;
        const startMinutes =
            (eventStart.hour * 60 + eventStart.minute) / interval;
        const duration =
            eventEnd.diff(eventStart, 'minutes').minutes / interval;

        const height = (duration / totalMinutes) * 100;
        return {
            top: `calc(${(startMinutes / totalMinutes) * 100}% + 1px)`,
            height: `calc(${calcMinHeight(height)}% - 3px)`,
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
                return (
                    <TimeSlotWrapper
                        data-testid="time-slot-wrapper"
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
                    primaryColor={primaryColor}
                    intervalIndex={intervalIndex}
                    style={calculateEventStyle(event)}
                />
            ))}
        </DaysColumnsContainer>
    );
}
