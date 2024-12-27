import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';
import { formatDate } from 'utils/dates';
import FullDaysAppointment from 'week/display-appointment/full-days-appointment/FullDaysAppointment';
import {
    WeekHeaderRowContainer,
    DayNumberWrapper,
    DayShortNameWrapper,
    GmtWrapper,
    WeekDayHeaderWrapper,
    WidthSpaceWrapper,
    WeekHeaderDaysRowWrapper,
    WeekHeaderFullDaysRowWrapper,
} from 'week/header-row/styles';

interface Props {
    days: DateTime<boolean>[];
    fullDayAppointments: Appointment[];
}

export default function WeekHeaderRow({
    days,
    fullDayAppointments,
}: Props): ReactElement {
    const { config, onDateChange, onViewChange } = useCalendarContext();

    // Navigate to Day View
    const navigateToDay = (day: DateTime): void => {
        onDateChange(day);
        onViewChange('day');
    };

    return (
        <WeekHeaderRowContainer data-testid="week-header-row">
            <WeekHeaderDaysRowWrapper data-testid="week-header-days-row">
                <WidthSpaceWrapper data-testid="width-space-wrapper" />
                {days.map((day) => (
                    <WeekDayHeaderWrapper
                        data-testid="week-day-header-wrapper"
                        key={day.toISO()}
                        onClick={() => navigateToDay(day)}
                    >
                        <DayShortNameWrapper data-testid="day-short-name-wrapper">
                            {day.setLocale(config.common.lang).toFormat('ccc')}
                        </DayShortNameWrapper>
                        <DayNumberWrapper
                            data-testid="day-number-wrapper"
                            color={config.style.primaryColor!}
                            isToday={day.hasSame(DateTime.now(), 'day')}
                        >
                            {formatDate(day, 'dd')}
                        </DayNumberWrapper>
                    </WeekDayHeaderWrapper>
                ))}
            </WeekHeaderDaysRowWrapper>
            <WeekHeaderFullDaysRowWrapper>
                <GmtWrapper data-testid="gmt-wrapper">
                    GMT +{DateTime.now().offset / 60}
                </GmtWrapper>
                <FullDaysAppointment
                    fullDayAppointments={fullDayAppointments}
                    days={days}
                />
            </WeekHeaderFullDaysRowWrapper>
        </WeekHeaderRowContainer>
    );
}
