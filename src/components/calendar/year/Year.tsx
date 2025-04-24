import { DateTime } from 'luxon';
import { ReactElement, useMemo } from 'react';
import MonthView from './MonthView';
import HeaderTemplate from 'calendar/_header-template/HeaderTemplate';
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
            <HeaderTemplate></HeaderTemplate>
            <YearContentContainer>
                {months.map((month) => (
                    <MonthView key={month.month} month={month} />
                ))}
            </YearContentContainer>
        </YearContainer>
    );
}
