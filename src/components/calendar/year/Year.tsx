import { DateTime } from 'luxon';
import { ReactElement, useMemo } from 'react';
import MonthView from './MonthView';
import { YearContainer } from 'calendar/year/styles';

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
            {months.map((month) => (
                <MonthView key={month.month} month={month} />
            ))}
        </YearContainer>
    );
}
