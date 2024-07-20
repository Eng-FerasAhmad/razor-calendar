import { ReactElement } from 'react';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { CalTaskViewContainer } from 'components/cal-header/cal-task-view/styles';

export default function CalTaskView(): ReactElement {
    return (
        <CalTaskViewContainer>
            <IoCheckmarkCircleOutline size={24} />
        </CalTaskViewContainer>
    );
}
