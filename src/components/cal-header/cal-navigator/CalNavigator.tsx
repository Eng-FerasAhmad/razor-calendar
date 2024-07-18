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
import { commonState, setSelectedMonth } from 'src/store/common/commonSlice';

export default function CalNavigator(): ReactElement {
    const { selectedMonth, dateMetaData, selectedYear } =
        useSelector(commonState);
    const dispatch = useDispatch();

    const nextMonth = (): void => {
        dispatch(setSelectedMonth(selectedMonth < 2 ? 1 : selectedMonth - 1));
    };

    const previousMonth = (): void => {
        dispatch(setSelectedMonth(selectedMonth > 11 ? 12 : selectedMonth + 1));
    };

    return (
        <CalNavigatorContainer>
            <TodayButtonWrapper>Heute</TodayButtonWrapper>
            <LeftButtonWrapper>
                <IoChevronBackSharp onClick={previousMonth} size={18} />
            </LeftButtonWrapper>
            <RightButtonWrapper>
                <IoChevronForwardSharp onClick={nextMonth} size={18} />
            </RightButtonWrapper>
            <CurrentDateWrapper>
                {dateMetaData && dateMetaData.month} {selectedYear}
            </CurrentDateWrapper>
        </CalNavigatorContainer>
    );
}
