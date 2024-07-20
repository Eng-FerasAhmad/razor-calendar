import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import CalMonthDays from 'components/cal-main/cal-month/CalMonthDays';
import CalMonthHeader from 'components/cal-main/cal-month/CalMonthHeader';
import {
    CalMonthContainer,
    WeekRowContainer,
} from 'components/cal-main/cal-month/styles';
import { dayNames } from 'src/date-service/dayNames';
import { commonState } from 'src/store/common/commonSlice';

export default function CalMonth(): ReactElement {
    const { selectedWeeks } = useSelector(commonState);

    return (
        <CalMonthContainer data-testid="cal-main">
            {selectedWeeks && (
                <>
                    <CalMonthHeader days={dayNames('de')} />
                    {selectedWeeks.map((week, index) => {
                        return (
                            <WeekRowContainer
                                key={index}
                                data-testid="week-row"
                            >
                                <CalMonthDays days={week} />
                            </WeekRowContainer>
                        );
                    })}
                </>
            )}
        </CalMonthContainer>
    );
}
