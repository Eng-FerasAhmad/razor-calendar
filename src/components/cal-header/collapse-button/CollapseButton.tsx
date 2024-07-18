import { ReactElement } from 'react';
import { IoMenuSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { CollapseButtonContainer } from 'components/cal-header/collapse-button/styles';
import { commonState, setSidebarCollapsed } from 'src/store/common/commonSlice';

export default function CollapseButton(): ReactElement {
    const dispatch = useDispatch();
    const { sidebarCollapsed } = useSelector(commonState);

    const toggleSidebar = (): void => {
        dispatch(setSidebarCollapsed(!sidebarCollapsed));
    };

    return (
        <CollapseButtonContainer onClick={toggleSidebar}>
            <IoMenuSharp size={24} />
        </CollapseButtonContainer>
    );
}
