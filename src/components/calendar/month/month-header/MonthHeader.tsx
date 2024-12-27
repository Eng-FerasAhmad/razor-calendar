import { ReactElement } from 'react';
import {
    ContentWrapper,
    MonthHeaderContainer,
    MonthWeekDaysWrapper,
    SpaceWrapper,
} from 'month/month-header/styles';

interface Props {
    monthWeekNames: string[];
}

export default function MonthHeader({ monthWeekNames }: Props): ReactElement {
    return (
        <MonthHeaderContainer data-testid="month-header-container">
            <ContentWrapper data-testid="month-header-content-wrapper">
                <SpaceWrapper data-testid="month-header-space-wraper" />
                {monthWeekNames.map((day, index) => (
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
