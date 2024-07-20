import moment from 'moment';
import { ReactElement } from 'react';
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import {
    CalNavigatorContainer,
    CurrentDateWrapper,
    LeftButtonWrapper,
    RightButtonWrapper,
    TodayButtonWrapper,
} from 'components/cal-header/cal-navigator/styles';
import {
    commonState,
    resetToCurrentMonth,
    setSelectedMonth,
} from 'src/store/common/commonSlice';

export default function CalNavigator(): ReactElement {
    const { selectedMonth, selectedYear } = useSelector(commonState);
    const dispatch = useDispatch();

    const nextMonth = (): void => {
        dispatch(setSelectedMonth(selectedMonth + 1));
    };

    const previousMonth = (): void => {
        dispatch(setSelectedMonth(selectedMonth - 1));
    };

    const todayHandler = (): void => {
        dispatch(resetToCurrentMonth());
    };

    const monthName = moment()
        .month(selectedMonth - 1)
        .format('MMMM');

    return (
        <CalNavigatorContainer>
            <TodayButtonWrapper onClick={todayHandler}>
                Heute
            </TodayButtonWrapper>
            <LeftButtonWrapper>
                <IoChevronBackSharp onClick={previousMonth} size={18} />
            </LeftButtonWrapper>
            <RightButtonWrapper>
                <IoChevronForwardSharp onClick={nextMonth} size={18} />
            </RightButtonWrapper>
            <CurrentDateWrapper>
                {monthName} {selectedYear}
            </CurrentDateWrapper>
        </CalNavigatorContainer>
    );
}
