import { DateTime } from 'luxon';
import { ReactElement, useEffect, useMemo } from 'react';
import { FullDaysEventHeaderContainer } from './styles';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';
import FullDaysRow from 'week/display-appointment/full-days-appointment/full-days-row/FullDaysRow';

interface Props {
    days: DateTime<boolean>[];
    fullDayAppointments: Appointment[];
}

export default function FullDaysAppointment({
    fullDayAppointments,
    days,
}: Props): ReactElement {
    const { config, onUpdateFullDaysCount, showAllFullDays } =
        useCalendarContext();
    const fullWidth = 100; // Full width in percentage
    const dayWidth = fullWidth / (config.week.showWeekend ? 7 : 5);

    // Calculate rows of appointments by iterating through days in the current week
    const rows = useMemo(() => {
        const rowsInside: Appointment[][] = [];

        const weekStart = days[0];
        const weekEnd = days[days.length - 1];

        fullDayAppointments.forEach((appointment) => {
            const appointmentStart = DateTime.fromISO(
                appointment.start
            ).startOf('day');
            const appointmentEnd = DateTime.fromISO(appointment.end).startOf(
                'day'
            );

            // Determine the visible range of the appointment within the current week
            const visibleStart =
                appointmentStart < weekStart ? weekStart : appointmentStart;
            const visibleEnd =
                appointmentEnd > weekEnd ? weekEnd : appointmentEnd;

            if (visibleStart <= visibleEnd) {
                const fittingRow = rowsInside.find((row) =>
                    row.every((item) => {
                        const itemStart = DateTime.fromISO(item.start).startOf(
                            'day'
                        );
                        const itemEnd = DateTime.fromISO(item.end).startOf(
                            'day'
                        );
                        return visibleEnd < itemStart || visibleStart > itemEnd;
                    })
                );

                const partialAppointment: Appointment = {
                    ...appointment,
                    start: visibleStart.toISO()!,
                    end: visibleEnd.toISO()!,
                };

                if (fittingRow) {
                    fittingRow.push(partialAppointment);
                } else {
                    rowsInside.push([partialAppointment]);
                }
            }
        });

        return rowsInside;
    }, [fullDayAppointments, days]);

    // Update the count of rows
    useEffect(() => {
        onUpdateFullDaysCount(rows.length);
    }, [rows, onUpdateFullDaysCount]);

    // Limit rows based on showAllFullDays
    const visibleRows = showAllFullDays ? rows : rows.slice(0, 2);

    return (
        <FullDaysEventHeaderContainer data-testid="full-days-event-header-container">
            {visibleRows.map((row, index) => (
                <FullDaysRow
                    key={index}
                    appointments={row}
                    dayWidth={dayWidth}
                    days={days.map((day) => day.toJSDate())}
                />
            ))}
        </FullDaysEventHeaderContainer>
    );
}
