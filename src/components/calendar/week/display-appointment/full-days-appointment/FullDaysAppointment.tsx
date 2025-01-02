// FullDaysAppointment.tsx
import { DateTime } from 'luxon';
import { ReactElement, useEffect } from 'react';
import {
    EventTitleWrapper,
    FullDaysEventHeaderContainer,
    FullDaysEventHeaderWrapper,
    FullDayTitleWrapper,
    PointWrapper,
} from './styles';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';

interface Props {
    days: DateTime<boolean>[];
    fullDayAppointments: Appointment[];
}

export default function FullDaysAppointment({
    fullDayAppointments,
    days,
}: Props): ReactElement {
    const { config, onUpdateFullDaysCount } = useCalendarContext();
    const fullWidth = 100; // Full width in percentage
    const dayWidth = fullWidth / (config.week.showWeekend ? 7 : 5);
    // Tracks the current top offset for each day to stack appointments
    const dayOffsetTracker: Record<number, number> = {};

    useEffect(() => {
        // Calculate and log the maximum offset
        const maxCount = Math.max(...Object.values(dayOffsetTracker));

        if (maxCount > 0) {
            onUpdateFullDaysCount(maxCount / 23);
        } else if (Object.keys(dayOffsetTracker).length === 0) {
            onUpdateFullDaysCount(0);
        }
    }, [dayOffsetTracker, onUpdateFullDaysCount]);

    return (
        <FullDaysEventHeaderContainer data-testid="full-days-event-header-container">
            {fullDayAppointments.map((appointment) => {
                const start = DateTime.fromISO(appointment.start).startOf(
                    'day'
                );
                const end = DateTime.fromISO(appointment.end).startOf('day');

                // Calculate the range of days the appointment spans
                const startIndex = days.findIndex((day) =>
                    day.hasSame(start, 'day')
                );
                const endIndex = days.findIndex((day) =>
                    day.hasSame(end, 'day')
                );

                console.log('appointment', appointment);

                // Logic for splitting appointments into visible spans
                if (startIndex !== -1 && endIndex !== -1) {
                    const visibleStartIndex = Math.max(startIndex, 0);
                    const visibleEndIndex = Math.min(endIndex, days.length - 1);

                    const top = dayOffsetTracker[visibleStartIndex] || 0;
                    dayOffsetTracker[visibleStartIndex] =
                        (dayOffsetTracker[visibleStartIndex] || 0) + 23;

                    const width =
                        dayWidth * (visibleEndIndex - visibleStartIndex + 1);
                    const left = dayWidth * visibleStartIndex;

                    return (
                        <FullDaysEventHeaderWrapper
                            key={appointment.id}
                            style={{
                                width: `calc(${width}% - 0px)`,
                                left: `${left}%`,
                                position: 'absolute',
                                top: `${top}px`, // Use calculated top offset
                            }}
                        >
                            <FullDayTitleWrapper
                                color={config.style.primaryColor}
                                style={{
                                    width: '100%',
                                }}
                            >
                                <PointWrapper
                                    color={
                                        appointment.color ||
                                        config.style.primaryColor
                                    }
                                    data-testid="full-day-appointment-point"
                                />
                                <EventTitleWrapper>
                                    {appointment.title}{' '}
                                </EventTitleWrapper>
                            </FullDayTitleWrapper>
                        </FullDaysEventHeaderWrapper>
                    );
                }

                // Handle split case for appointments partially outside the week
                if (startIndex !== -1) {
                    const visibleEndIndex = days.length - 1;
                    const width = dayWidth * (visibleEndIndex - startIndex + 1);
                    const left = dayWidth * startIndex;
                    const top = dayOffsetTracker[startIndex] || 0;
                    dayOffsetTracker[startIndex] =
                        (dayOffsetTracker[startIndex] || 0) + 23;

                    return (
                        <FullDaysEventHeaderWrapper
                            key={`${appointment.id}-start`}
                            style={{
                                width: `calc(${width}% - 2px)`,
                                left: `${left}%`,
                                position: 'absolute',
                                top: `${top}px`,
                            }}
                        >
                            <FullDayTitleWrapper
                                color={config.style.primaryColor}
                                style={{
                                    width: '100%',
                                }}
                            >
                                <PointWrapper
                                    color={
                                        appointment.color ||
                                        config.style.primaryColor
                                    }
                                    data-testid="full-day-appointment-point"
                                />
                                <EventTitleWrapper>
                                    {appointment.title}{' '}
                                </EventTitleWrapper>
                            </FullDayTitleWrapper>
                        </FullDaysEventHeaderWrapper>
                    );
                }

                if (endIndex !== -1) {
                    const visibleStartIndex = 0;
                    const width = dayWidth * (endIndex - visibleStartIndex + 1);
                    const left = dayWidth * visibleStartIndex;
                    const top = dayOffsetTracker[endIndex] || 0;
                    dayOffsetTracker[endIndex] =
                        (dayOffsetTracker[endIndex] || 0) + 23;

                    return (
                        <FullDaysEventHeaderWrapper
                            key={`${appointment.id}-end`}
                            style={{
                                width: `calc(${width}% - 2px)`,
                                left: `${left}%`,
                                position: 'absolute',
                                top: `${top}px`,
                            }}
                        >
                            <FullDayTitleWrapper
                                color={config.style.primaryColor}
                                style={{
                                    width: '100%',
                                }}
                            >
                                <PointWrapper
                                    color={
                                        appointment.color ||
                                        config.style.primaryColor
                                    }
                                    data-testid="full-day-appointment-point"
                                />
                                <EventTitleWrapper>
                                    {appointment.title}{' '}
                                </EventTitleWrapper>
                            </FullDayTitleWrapper>
                        </FullDaysEventHeaderWrapper>
                    );
                }

                return null;
            })}
        </FullDaysEventHeaderContainer>
    );
}
