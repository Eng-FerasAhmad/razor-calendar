import { ReactElement } from 'react';
import {
    ContentWrapper,
    MonthHeaderContainer,
    MonthWeekDaysWrapper,
    SpaceWrapper,
} from 'month/month-header/styles';

interface Props {
    localizedWeekdays: string[];
}

export default function MonthHeader({
    localizedWeekdays,
}: Props): ReactElement {
    return (
        <MonthHeaderContainer data-testid="month-header-container">
            <ContentWrapper data-testid="month-header-content-wrapper">
                <SpaceWrapper data-testid="month-header-space-wraper" />
                {localizedWeekdays.map((day, index) => (
                    <MonthWeekDaysWrapper
                        data-testid="month-week-days-warpper"
                        key={index}
                    >
                        {day}
                    </MonthWeekDaysWrapper>
                ))}
            </ContentWrapper>
        </MonthHeaderContainer>
    );
}
