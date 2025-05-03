import { DateTime } from 'luxon';
import { ReactElement, useMemo } from 'react';
import MonthView from './MonthView';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import HeaderTemplate from 'calendar/_header-template/HeaderTemplate';
import { YearContainer, YearContentContainer } from 'calendar/year/styles';

export default function YearView(): ReactElement {
    const { selectedDate } = useCalendarContext();
    const months = useMemo(() => {
        const { year } = selectedDate;
        return Array.from({ length: 12 }, (_, i) =>
            DateTime.fromObject({ year, month: i + 1 })
        );
    }, [selectedDate]);

    return (
        <YearContainer>
            <HeaderTemplate></HeaderTemplate>
            <YearContentContainer>
                {months.map((month) => (
                    <MonthView key={month.month} month={month} />
                ))}
            </YearContentContainer>
        </YearContainer>
    );
}
