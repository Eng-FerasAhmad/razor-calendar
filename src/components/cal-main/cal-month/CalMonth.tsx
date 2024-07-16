import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import CalMonthDays from 'components/cal-main/cal-month/CalMonthDays';
import CalMonthHeader from 'components/cal-main/cal-month/CalMonthHeader';
import {
    CalMonthContainer,
    WeekRowContainer,
} from 'components/cal-main/cal-month/styles';
import { commonState } from 'src/store/common/commonSlice';

export default function CalMonth(): ReactElement {
    const { dateMetaData } = useSelector(commonState);

    console.log('dateMetaData-comp', dateMetaData);

    return (
        <CalMonthContainer data-testid="cal-main">
            {dateMetaData && (
                <CalMonthHeader days={dateMetaData.weeks[0].days} />
            )}
            {dateMetaData &&
                dateMetaData.weeks.map((week, index) => {
                    return (
                        <WeekRowContainer key={index} data-testid="week-row">
                            <CalMonthDays days={week.days} />
                        </WeekRowContainer>
                    );
                })}
        </CalMonthContainer>
    );
}
