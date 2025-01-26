import { DateTime } from 'luxon';
import { ReactElement, useEffect, useMemo } from 'react';
import { FullDaysEventHeaderContainer } from './styles';
import FullDaysRow from 'calendar/_atomic/display-appointment/full-days-appointment/full-days-row/FullDaysRow';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';

interface Props {
    days: DateTime<boolean>[];
    fullDayAppointments: Appointment[];
    userId?: string;
}

export default function FullDaysAppointment({
    fullDayAppointments,
    days,
    userId,
}: Props): ReactElement {
    const { config, onUpdateFullDaysCount, showAllFullDays, fullDaysCount } =
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
            let visibleStart =
                appointmentStart < weekStart ? weekStart : appointmentStart;
            let visibleEnd =
                appointmentEnd > weekEnd ? weekEnd : appointmentEnd;

            visibleStart = visibleStart.set({
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
            });
            visibleEnd = visibleEnd.set({
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
            });

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
        if (rows.length > fullDaysCount) {
            onUpdateFullDaysCount(rows.length);
        }
    }, [rows, onUpdateFullDaysCount, fullDaysCount]);

    // Limit rows based on showAllFullDays
    const visibleRows = showAllFullDays ? rows : rows.slice(0, 2);

    return (
        <FullDaysEventHeaderContainer data-testid="full-days-event-header-container">
            {visibleRows.map((row, index) => (
                <FullDaysRow
                    key={index}
                    appointments={row}
                    dayWidth={dayWidth}
                    userId={userId || ''}
                    days={days.map((day) => day.toJSDate())}
                />
            ))}
        </FullDaysEventHeaderContainer>
    );
}
