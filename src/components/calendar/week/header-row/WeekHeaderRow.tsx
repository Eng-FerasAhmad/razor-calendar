import { useTheme } from '@mui/material/styles';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import ArrowDownSymbol from 'components/shared/icons/arrow-down/ArrowDownSymbole';
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
    IconDownWrapper,
} from 'week/header-row/styles';

interface Props {
    days: DateTime<boolean>[];
    fullDayAppointments: Appointment[];
}

export default function WeekHeaderRow({
    days,
    fullDayAppointments,
}: Props): ReactElement {
    const {
        config,
        onDateChange,
        onViewChange,
        fullDaysCount,
        showAllFullDays,
        onShowAllFullDays,
    } = useCalendarContext();

    // Use the theme object
    const theme = useTheme();

    // Navigate to Day View
    const navigateToDay = (day: DateTime): void => {
        onDateChange(day);
        onViewChange('day');
    };

    const handleToggle = (): void => onShowAllFullDays();

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
                            color={theme.palette.primary.main}
                            isToday={day.hasSame(DateTime.now(), 'day')}
                        >
                            {formatDate(day, 'dd')}
                        </DayNumberWrapper>
                    </WeekDayHeaderWrapper>
                ))}
            </WeekHeaderDaysRowWrapper>
            <WeekHeaderFullDaysRowWrapper data-testid="week-header-full-days-row-wrapper">
                <GmtWrapper data-testid="gmt-wrapper">
                    <div>GMT +{DateTime.now().offset / 60}</div>
                    {fullDaysCount > 2 && (
                        <IconDownWrapper
                            isOpen={showAllFullDays}
                            onClick={handleToggle}
                        >
                            <ArrowDownSymbol
                                size={16}
                                color={theme.palette.text.primary}
                            />
                        </IconDownWrapper>
                    )}
                </GmtWrapper>

                <FullDaysAppointment
                    fullDayAppointments={fullDayAppointments}
                    days={days}
                />
            </WeekHeaderFullDaysRowWrapper>
        </WeekHeaderRowContainer>
    );
}
