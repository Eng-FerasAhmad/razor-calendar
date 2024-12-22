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
} from './styles';
import { useCalendarContext } from 'calendar/CalendarContext';
import DayColumn from 'components/calendar/week/days-columns/DaysColumns';
import TimeColumn from 'components/calendar/week/time-column/TimeColumn';
import { Appointment } from 'types/calendar';
import { getDateRange, formatDate } from 'utils/dates';

interface Props {
    startWorkHour: number;
    endWorkHour: number;
    appointments: Appointment[];
    selectedDate: DateTime;
    intervalIndex: number;
    is24HourFormat: boolean;
    primaryColor: string;
}

export default function Week({
    startWorkHour,
    endWorkHour,
    appointments,
    selectedDate,
    intervalIndex,
    is24HourFormat,
    primaryColor,
}: Props): ReactElement {
    const { onDateChange, onViewChange } = useCalendarContext();

    // Interval options
    const intervalOptions = [60, 30, 15, 10, 5];
    const interval = intervalOptions[intervalIndex];

    // Days of the week
    const days = getDateRange(
        selectedDate.startOf('week'),
        selectedDate.endOf('week')
    );

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
                                {formatDate(day, 'ccc')}
                            </DayShortNameWrapper>
                            <DayNumberWrapper>
                                {formatDate(day, 'dd')}
                            </DayNumberWrapper>
                        </WeekDayHeaderWrapper>
                    ))}
                </WeekHeaderDaysRow>
                <WeekHeaderFullDaysRow>
                    <GmtWrapper>GMT +{DateTime.now().offset / 60}</GmtWrapper>
                </WeekHeaderFullDaysRow>
            </WeekHeaderRow>

            <TimeDayWrapper data-testid="time-day-wrapper">
                <TimeColumn
                    interval={interval}
                    is24HourFormat={is24HourFormat}
                    startWorkHour={startWorkHour}
                    endWorkHour={endWorkHour}
                    intervalIndex={intervalIndex}
                />

                {days.map((day) => (
                    <DayColumn
                        key={day.toISO()}
                        day={day}
                        appointments={appointments!}
                        interval={interval}
                        intervalIndex={intervalIndex}
                        startWorkHour={startWorkHour}
                        endWorkHour={endWorkHour}
                        primaryColor={primaryColor}
                    />
                ))}
            </TimeDayWrapper>
        </WeekContainer>
    );
}
