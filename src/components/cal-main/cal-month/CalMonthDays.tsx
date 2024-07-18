import { ReactElement } from 'react';
import {
    DayContentContentWrapper,
    DayContentHeadWrapper,
    DaysRowContainer,
    DayWrapper,
} from 'components/cal-main/cal-month/styles';
import { DaysMetaData } from 'utils/dateGenerator';

interface Props {
    days: Array<DaysMetaData>;
}
export default function CalMonthDays({ days }: Props): ReactElement {
    return (
        <>
            {days.map((day, idx) => {
                return (
                    <DaysRowContainer key={idx} data-testid="days-row">
                        <DayWrapper data-testid="day-wrapper">
                            <DayContentHeadWrapper
                                isCurrentMonth={day.currentMonth}
                            >
                                {day.dayNumber}
                            </DayContentHeadWrapper>
                            <DayContentContentWrapper
                                isCurrentMonth={day.currentMonth}
                            >
                                Termin
                            </DayContentContentWrapper>
                        </DayWrapper>
                    </DaysRowContainer>
                );
            })}
        </>
    );
}
