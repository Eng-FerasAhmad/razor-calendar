import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import ArrowDownSymbol from 'components/shared/arrow-down/ArrowDownSymbole';
import Tooltip from 'components/shared/tooltip/Tooltip';
import { color } from 'style/color';
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
                        <Tooltip text={'Day view'}>
                            <DayNumberWrapper
                                data-testid="day-number-wrapper"
                                color={config.style.primaryColor!}
                                isToday={day.hasSame(DateTime.now(), 'day')}
                            >
                                {formatDate(day, 'dd')}
                            </DayNumberWrapper>
                        </Tooltip>
                    </WeekDayHeaderWrapper>
                ))}
            </WeekHeaderDaysRowWrapper>
            <WeekHeaderFullDaysRowWrapper data-testid="week-header-full-days-row-wrapper">
                <GmtWrapper data-testid="gmt-wrapper">
                    <div>GMT +{DateTime.now().offset / 60}</div>
                    {fullDaysCount > 2 && (
                        <Tooltip
                            text={`${showAllFullDays ? 'hide' : 'show'} all full days`}
                        >
                            <IconDownWrapper
                                isOpen={showAllFullDays}
                                onClick={handleToggle}
                            >
                                <ArrowDownSymbol
                                    size={16}
                                    color={color.fontPrimaryLight}
                                />
                            </IconDownWrapper>
                        </Tooltip>
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
