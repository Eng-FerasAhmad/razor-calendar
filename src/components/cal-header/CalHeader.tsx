import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CalHeaderContainer } from 'components/cal-header/styles';
import { commonState, setSelectedMonth } from 'src/store/common/commonSlice';

export default function CalHeader(): ReactElement {
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
        <CalHeaderContainer data-testid="cal-header">
            <button onClick={nextMonth}>{'<'}</button>
            <button onClick={previousMonth}>{'>'}</button>
            {dateMetaData && dateMetaData.month} {selectedYear}
        </CalHeaderContainer>
    );
}
