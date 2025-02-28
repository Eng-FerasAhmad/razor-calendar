import { DateTime } from 'luxon';
import { ReactElement, useMemo } from 'react';
import DayCell from './DayCell';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { DaysGrid, MonthContainer, MonthTitle } from 'calendar/year/styles';

interface Props {
    month: DateTime;
}

export default function MonthView({ month }: Props): ReactElement {
    const { config } = useCalendarContext();
    const lang = config.common.locale;

    const weekdays = useMemo(() => {
        return Array.from({ length: 7 }, (_, i) =>
            DateTime.local()
                .set({ weekday: (i + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 })
                .setLocale(lang)
                .toFormat('ccc')
        );
    }, [lang]);

    const firstDay = month.startOf('month');
    const firstDayWeekday = firstDay.weekday;
    const emptySlots = (firstDayWeekday + 6) % 7;

    return (
        <MonthContainer data-testid="year-month-container">
            <MonthTitle>{month.setLocale(lang).toFormat('MMMM')}</MonthTitle>

            <DaysGrid>
                {weekdays.map((day, i) => (
                    <DayCell key={`day-${i}`} label={day[0]} isHeader />
                ))}
            </DaysGrid>

            <DaysGrid>
                {Array.from({ length: emptySlots }).map((_, i) => (
                    <DayCell key={`empty-${i}`} isPlaceholder />
                ))}

                {Array.from({ length: month.daysInMonth! }, (_, i) => (
                    <DayCell key={i} date={month.set({ day: i + 1 })} />
                ))}
            </DaysGrid>
        </MonthContainer>
    );
}
