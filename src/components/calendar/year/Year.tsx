import { DateTime } from 'luxon';
import { ReactElement, useMemo } from 'react';
import MonthView from './MonthView';
import CalendarToolbar from 'calendar/_toolbar/CalendarToolbar';
import { YearContainer, YearContentContainer } from 'calendar/year/styles';

interface Props {
    selectedDate: DateTime;
}

export default function YearView({ selectedDate }: Props): ReactElement {
    const months = useMemo(() => {
        const { year } = selectedDate;
        return Array.from({ length: 12 }, (_, i) =>
            DateTime.fromObject({ year, month: i + 1 })
        );
    }, [selectedDate]);

    return (
        <YearContainer>
            <CalendarToolbar></CalendarToolbar>
            <YearContentContainer>
                {months.map((month) => (
                    <MonthView key={month.month} month={month} />
                ))}
            </YearContentContainer>
        </YearContainer>
    );
}
