import { ReactElement } from 'react';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { CalTaskViewContainer } from 'components/cal-header/cal-task-view/styles';
import { commonState, setCalenderTask } from 'src/store/common/commonSlice';
import { CalenderTask } from 'src/store/common/types';

export default function CalTaskView(): ReactElement {
    const dispatch = useDispatch();
    const { calenderTask } = useSelector(commonState);

    const clickHandler = () => {
        dispatch(setCalenderTask(CalenderTask.Task));
    };

    return (
        <CalTaskViewContainer
            onClick={clickHandler}
            isTask={calenderTask === CalenderTask.Task}
        >
            <IoCheckmarkCircleOutline size={24} />
        </CalTaskViewContainer>
    );
}
