import { DateTime } from 'luxon';
import React from 'react';
import { DaysColumnsContainer } from 'calendar/_atomic/day-columns/styles';
import DisplayAppointment from 'calendar/_atomic/display-appointment/DisplayAppointment';
import TimeSlots from 'calendar/_atomic/time-slots/TimeSlots';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';

interface DayCellProps {
    day: DateTime;
    appointments: Appointment[];
    interval: number;
    fullDayAppointments: Appointment[];
    userId?: string;
}

export default function DayColumns({
    day,
    appointments,
    interval,
    fullDayAppointments,
    userId,
}: DayCellProps): React.ReactElement {
    const { config } = useCalendarContext();

    const timeSlots = Array.from(
        { length: (24 * 60) / interval },
        (_, i) => i * interval
    );

    const calculatePosition = (
        start: DateTime,
        end: DateTime,
        overlapIndex: number,
        totalOverlaps: number
    ): { top: string; height: string; width: string; left: string } => {
        const minutesFromStart = start.diff(
            day.startOf('day'),
            'minutes'
        ).minutes;
        const durationInMinutes = end.diff(start, 'minutes').minutes;

        const totalMinutesInDay = 1440; // 24 hours * 60 minutes
        const slotHeightPercentage = 100 / ((24 * 60) / interval);

        const top = (minutesFromStart / totalMinutesInDay) * 100; // Percentage of the day
        let height = (durationInMinutes / interval) * slotHeightPercentage;

        height = height < 0.9 ? 1.3 : height;

        // Handle overlapping appointments
        const width = 100 / totalOverlaps; // Divide width by total overlaps
        const left = (overlapIndex / totalOverlaps) * 100; // Offset by index

        return {
            top: `calc(${top}% + 2px)`,
            height: `calc(${height}% - 3px)`,
            width: `calc(${width}% - 2px)`,
            left: `calc(${left}% + 1px)`,
        };
    };

    const groupOverlappingAppointments = (): Appointment[] => {
        const sortedAppointments = [...appointments].sort(
            (a, b) =>
                DateTime.fromISO(a.start).toMillis() -
                DateTime.fromISO(b.start).toMillis()
        );

        return sortedAppointments.map((appointment) => {
            const overlappingAppointments = sortedAppointments.filter(
                (other) =>
                    DateTime.fromISO(other.start) <
                        DateTime.fromISO(appointment.end) &&
                    DateTime.fromISO(other.end) >
                        DateTime.fromISO(appointment.start)
            );

            const overlapIndex = overlappingAppointments.findIndex(
                (a) => a.id === appointment.id
            );

            const position = calculatePosition(
                DateTime.fromISO(appointment.start),
                DateTime.fromISO(appointment.end),
                overlapIndex,
                overlappingAppointments.length
            );

            return {
                ...appointment,
                position,
            };
        });
    };

    const updatedAppointmentsWithPositions = groupOverlappingAppointments();

    return (
        <DaysColumnsContainer
            timSlotsCount={timeSlots.length}
            intervalIndex={config.hour.hourIntervalIndex}
            data-testid="days-columns-container"
        >
            <TimeSlots
                day={day}
                interval={interval}
                timeSlots={timeSlots}
                config={config}
                userId={userId}
            />
            <DisplayAppointment
                day={day}
                appointments={updatedAppointmentsWithPositions}
                calculatePosition={calculatePosition}
                fullDayAppointments={fullDayAppointments}
                userId={userId}
            />
        </DaysColumnsContainer>
    );
}
