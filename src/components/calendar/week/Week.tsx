import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import {
    WeekContainer,
    WeekHeaderRow,
    TimeDayWrapper,
    WeekDayHeaderWrapper,
    WidthSpaceWrapper,
    DayShortNameWrapper,
    DayNumberWrapper,
    WeekHeaderDaysRow,
    WeekHeaderFullDaysRow,
    GmtWrapper,
    FullDaysEventHeaderWrapper,
    FullDaysEventHeaderContainer,
    FullDayTitleWrapper,
} from './styles';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import DayColumn from 'components/calendar/week/days-columns/DaysColumns';
import TimeColumn from 'components/calendar/week/time-column/TimeColumn';
import { Appointment } from 'types/appointment';
import { getDateRange, formatDate } from 'utils/dates';

interface Props {
    appointments: Appointment[];
    selectedDate: DateTime;
}

export default function Week({
    appointments,
    selectedDate,
}: Props): ReactElement {
    const { onDateChange, onViewChange, config } = useCalendarContext();

    // Interval options
    const intervalOptions = [60, 30, 15, 10, 5];
    const interval = intervalOptions[config.hour.hourIntervalIndex];

    // Days of the week
    const days = getDateRange(
        selectedDate.startOf('week'),
        selectedDate.endOf('week'),
        config.week.showWeekend
    );

    // Filter all-day or multi-day appointments
    const fullDayAppointments = appointments.filter((appointment) => {
        const start = DateTime.fromISO(appointment.start).startOf('day');
        const end = DateTime.fromISO(appointment.end).startOf('day');
        const weekStart = selectedDate.startOf('week'); // Start of the current week
        const weekEnd = selectedDate.endOf('week'); // End of the current week

        // Check if the appointment spans multiple days or is marked as full-day
        const isFullDay = start < end || appointment.isFullDay;

        // Ensure the appointment is within the range of the current week
        const isInWeekRange =
            (start >= weekStart && start <= weekEnd) ||
            (end >= weekStart && end <= weekEnd) ||
            (start < weekStart && end > weekEnd);

        return isFullDay && isInWeekRange;
    });

    // Navigate to Day View
    const navigateToDay = (day: DateTime): void => {
        onDateChange(day);
        onViewChange('day');
    };

    return (
        <WeekContainer data-testid="week-container">
            <WeekHeaderRow data-testid="week-header-row">
                <WeekHeaderDaysRow>
                    <WidthSpaceWrapper data-testid="width-space-wrapper" />
                    {days.map((day) => (
                        <WeekDayHeaderWrapper
                            data-testid="week-day-header-wrapper"
                            key={day.toISO()}
                            onClick={() => navigateToDay(day)}
                        >
                            <DayShortNameWrapper>
                                {day
                                    .setLocale(config.common.lang)
                                    .toFormat('ccc')}
                            </DayShortNameWrapper>
                            <DayNumberWrapper
                                color={config.style.primaryColor!}
                                isToday={day.hasSame(DateTime.now(), 'day')}
                            >
                                {formatDate(day, 'dd')}
                            </DayNumberWrapper>
                        </WeekDayHeaderWrapper>
                    ))}
                </WeekHeaderDaysRow>
                <WeekHeaderFullDaysRow>
                    <GmtWrapper>GMT +{DateTime.now().offset / 60}</GmtWrapper>
                    <FullDaysEventHeaderContainer data-testid="full-days-event-header-container">
                        {days.map((day) => (
                            <WeekDayHeaderWrapper key={day.toISO()}>
                                {fullDayAppointments.map((appointment) => {
                                    const start = DateTime.fromISO(
                                        appointment.start
                                    ).startOf('day');
                                    const end = DateTime.fromISO(
                                        appointment.end
                                    ).startOf('day');

                                    // Check if the appointment spans the current day
                                    const isOnDay = day >= start && day <= end;

                                    if (!isOnDay) {
                                        return null;
                                    }

                                    return (
                                        <FullDaysEventHeaderWrapper
                                            key={appointment.id}
                                        >
                                            <FullDayTitleWrapper
                                                color={
                                                    config.style.primaryColor
                                                }
                                            >
                                                {appointment.title}
                                            </FullDayTitleWrapper>
                                        </FullDaysEventHeaderWrapper>
                                    );
                                })}
                            </WeekDayHeaderWrapper>
                        ))}
                    </FullDaysEventHeaderContainer>
                </WeekHeaderFullDaysRow>
            </WeekHeaderRow>

            <TimeDayWrapper data-testid="time-day-wrapper">
                <TimeColumn interval={interval} />

                {days.map((day) => (
                    <DayColumn
                        key={day.toISO()}
                        day={day}
                        interval={interval}
                        appointments={appointments!}
                        fullDayAppointments={fullDayAppointments}
                    />
                ))}
            </TimeDayWrapper>
        </WeekContainer>
    );
}
