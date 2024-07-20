import { ReactElement } from 'react';
import { IoCalendarSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarContainer } from 'components/cal-header/calendar/styles';
import { commonState, setCalenderTask } from 'src/store/common/commonSlice';
import { CalenderTask } from 'src/store/common/types';

export default function Calendar(): ReactElement {
    const dispatch = useDispatch();
    const { calenderTask } = useSelector(commonState);

    const clickHandler = (): void => {
        dispatch(setCalenderTask(CalenderTask.Calender));
    };

    return (
        <CalendarContainer
            onClick={clickHandler}
            isCalender={calenderTask === CalenderTask.Calender}
        >
            <IoCalendarSharp size={18} />
        </CalendarContainer>
    );
}
