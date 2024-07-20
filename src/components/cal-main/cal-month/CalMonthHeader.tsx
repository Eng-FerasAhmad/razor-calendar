import { ReactElement } from 'react';
import {
    CalMonthHeaderContainer,
    DayHeaderWrapper,
    DaysRowContainer,
} from 'components/cal-main/cal-month/styles';

interface Props {
    days: Array<string>;
}
export default function CalMonthHeader({ days }: Props): ReactElement {
    return (
        <CalMonthHeaderContainer data-testid="cal-month-header">
            {days.map((day, idx) => {
                return (
                    <DaysRowContainer key={idx} data-testid="days-header-row">
                        <DayHeaderWrapper data-testid="day-header-wrapper">
                            {day.slice(0, 2).toUpperCase()}
                        </DayHeaderWrapper>
                    </DaysRowContainer>
                );
            })}
        </CalMonthHeaderContainer>
    );
}
