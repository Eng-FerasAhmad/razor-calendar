import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { WeekContainer, TimeDayWrapper } from './styles';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import DayColumn from 'components/calendar/week/days-columns/DaysColumns';
import TimeColumn from 'components/calendar/week/time-column/TimeColumn';
import { Appointment } from 'types/appointment';
import { getDateRange } from 'utils/dates';
import WeekHeaderRow from 'week/header-row/WeekHeaderRow';
import useWeek from 'week/useWeeks';

interface Props {
    appointments: Appointment[];
    selectedDate: DateTime;
}

export default function Week({
    appointments,
    selectedDate,
}: Props): ReactElement {
    const { config } = useCalendarContext();
    const { fullDayAppointments } = useWeek(appointments, selectedDate);

    // Interval options
    const intervalOptions = [60, 30, 15, 10, 5];
    const interval = intervalOptions[config.hour.hourIntervalIndex];

    // Days of the week
    const days = getDateRange(
        selectedDate.startOf('week'),
        selectedDate.endOf('week'),
        config.week.showWeekend
    );

    return (
        <WeekContainer data-testid="week-container">
            <WeekHeaderRow
                days={days}
                fullDayAppointments={fullDayAppointments}
            />

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
