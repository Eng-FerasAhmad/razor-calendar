import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';
import { DaysColumnsContainer } from 'week/day-columns/styles';
import DisplayAppointment from 'week/display-appointment/DisplayAppointment';
import { TimeSlots } from 'week/time-slots/TimeSlots';

interface DayCellProps {
    day: DateTime;
    appointments: Appointment[];
    interval: number;
    fullDayAppointments: Appointment[];
}

export default function DayColumns({
    day,
    appointments,
    interval,
    fullDayAppointments,
}: DayCellProps): React.ReactElement {
    const { config } = useCalendarContext();

    const [updatedAppointments, setUpdatedAppointments] =
        useState(appointments);

    useEffect(() => {
        setUpdatedAppointments(appointments);
    }, [appointments]);

    const timeSlots = Array.from(
        { length: (24 * 60) / interval },
        (_, i) => i * interval
    );

    const calculatePosition = (
        start: DateTime,
        end: DateTime
    ): { top: string; height: string } => {
        const minutesFromStart = start.diff(
            day.startOf('day'),
            'minutes'
        ).minutes;
        const durationInMinutes = end.diff(start, 'minutes').minutes;

        const totalMinutesInDay = 1440; // 24 hours * 60 minutes
        const slotHeightPercentage = 100 / ((24 * 60) / interval);

        const top = (minutesFromStart / totalMinutesInDay) * 100; // As a percentage of the day
        const height = (durationInMinutes / interval) * slotHeightPercentage;

        return {
            top: `calc(${top}% + 2px)`, // 2px to keep the appointment inside the slot
            height: `calc(${height}% - 3px)`, // 2 px to keep the appointment inside the slot
        };
    };

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
            />
            <DisplayAppointment
                day={day}
                appointments={updatedAppointments}
                calculatePosition={calculatePosition}
                fullDayAppointments={fullDayAppointments}
            />
        </DaysColumnsContainer>
    );
}
