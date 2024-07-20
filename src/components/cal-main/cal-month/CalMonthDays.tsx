import moment from 'moment';
import { ReactElement } from 'react';
import {
    DayContentContentWrapper,
    DayContentHeadWrapper,
    DaysRowContainer,
    DayWrapper,
} from 'components/cal-main/cal-month/styles';
import { Week } from 'src/date-service/types';

interface Props {
    days: Week;
}
export default function CalMonthDays({ days }: Props): ReactElement {
    const isToday = (dayShort: string): boolean => {
        return dayShort === moment().format('yyyy-MM-DD');
    };

    return (
        <>
            {days.map((day, idx) => {
                return (
                    <DaysRowContainer key={idx} data-testid="days-row">
                        <DayWrapper
                            data-testid="day-wrapper"
                            isLastItem={idx === 6}
                        >
                            <DayContentHeadWrapper
                                data-testid="day-head-wrapper"
                                isCurrentMonth={day.isCurrentMonth}
                                isToday={isToday(day.date.short)}
                            >
                                {day.day.number}
                            </DayContentHeadWrapper>
                            <DayContentContentWrapper
                                data-testid="day-content-wrapper"
                                isCurrentMonth={day.isCurrentMonth}
                            >
                                termin
                            </DayContentContentWrapper>
                        </DayWrapper>
                    </DaysRowContainer>
                );
            })}
        </>
    );
}
