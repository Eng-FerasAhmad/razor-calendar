import styled from '@emotion/styled';
import { DateTime } from 'luxon';
import { ReactElement, useMemo } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';

const YearContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding: 16px;
`;

const MonthContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 8px;
    background: #fff;
`;

const MonthTitle = styled.h3`
    font-size: 1.2rem;
    margin-bottom: 8px;
`;

const DaysGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    width: 100%;
`;

const DayBox = styled.div<{ isToday: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
    background: ${({ isToday }) => (isToday ? '#ffcc00' : 'transparent')};
    border-radius: 4px;
`;

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
            {months.map((month) => (
                <MonthContainer key={month.month}>
                    <MonthTitle>{month.toFormat('MMMM')}</MonthTitle>
                    <DaysGrid>
                        {Array.from({ length: month.daysInMonth }, (_, i) => {
                            const day = month.set({ day: i + 1 });
                            return (
                                <DayBox
                                    key={i}
                                    isToday={day.hasSame(DateTime.now(), 'day')}
                                >
                                    {day.day}
                                </DayBox>
                            );
                        })}
                    </DaysGrid>
                </MonthContainer>
            ))}
        </YearContainer>
    );
}
