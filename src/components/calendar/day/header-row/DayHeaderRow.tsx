import { useTheme } from '@mui/material/styles';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import {
    DayHeaderRowContainer,
    DayNumberWrapper,
    DayShortNameWrapper,
    DayGmtWrapper,
    DayHeaderWrapper,
    DayWidthSpaceWrapper,
    DayHeaderDaysRowWrapper,
    DayHeaderFullDaysRowWrapper,
    DayIconDownWrapper,
} from './styles';
import FullDaysAppointment from 'calendar/_atomic/display-appointment/full-days-appointment/FullDaysAppointment';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import ArrowDownSymbol from 'components/shared/icons/arrow-down/ArrowDownSymbol';
import { Appointment } from 'types/appointment';
import { formatDate } from 'utils/dates';

interface Props {
    fullDayAppointments: Appointment[];
    selectedDate: DateTime;
}

export default function DayHeaderRow({
    fullDayAppointments,
    selectedDate,
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
        <DayHeaderRowContainer data-testid="week-header-row">
            <DayHeaderDaysRowWrapper data-testid="week-header-days-row">
                <DayWidthSpaceWrapper data-testid="width-space-wrapper" />

                <DayHeaderWrapper
                    data-testid="week-day-header-wrapper"
                    key={selectedDate.toISO()}
                    onClick={() => navigateToDay(selectedDate)}
                >
                    <DayShortNameWrapper data-testid="day-short-name-wrapper">
                        {selectedDate
                            .setLocale(config.common.locale)
                            .toFormat('ccc')}
                    </DayShortNameWrapper>
                    <DayNumberWrapper
                        data-testid="day-number-wrapper"
                        color={theme.palette.primary.main}
                        isToday={selectedDate.hasSame(DateTime.now(), 'day')}
                    >
                        {formatDate(selectedDate, 'dd')}
                    </DayNumberWrapper>
                </DayHeaderWrapper>
            </DayHeaderDaysRowWrapper>
            <DayHeaderFullDaysRowWrapper data-testid="week-header-full-days-row-wrapper">
                <DayGmtWrapper data-testid="gmt-wrapper">
                    <div>GMT +{DateTime.now().offset / 60}</div>
                    {fullDaysCount > 2 && (
                        <DayIconDownWrapper
                            isOpen={showAllFullDays}
                            onClick={handleToggle}
                        >
                            <ArrowDownSymbol
                                size={16}
                                color={theme.palette.text.primary}
                            />
                        </DayIconDownWrapper>
                    )}
                </DayGmtWrapper>

                <FullDaysAppointment
                    fullDayAppointments={fullDayAppointments}
                    days={[selectedDate]}
                />
            </DayHeaderFullDaysRowWrapper>
        </DayHeaderRowContainer>
    );
}
