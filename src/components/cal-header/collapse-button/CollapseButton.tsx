import { ReactElement } from 'react';
import { IoMenuSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import {
    CollapseButtonContainer,
    CollapseButtonIcon,
    CollapseButtonTitle,
} from 'components/cal-header/collapse-button/styles';
import { commonState, setSidebarCollapsed } from 'src/store/common/commonSlice';

export default function CollapseButton(): ReactElement {
    const dispatch = useDispatch();
    const { sidebarCollapsed } = useSelector(commonState);

    const toggleSidebar = (): void => {
        dispatch(setSidebarCollapsed(!sidebarCollapsed));
    };

    return (
        <CollapseButtonContainer onClick={toggleSidebar}>
            <CollapseButtonIcon>
                <IoMenuSharp size={24} />
            </CollapseButtonIcon>
            <CollapseButtonTitle>Razor Calender</CollapseButtonTitle>
        </CollapseButtonContainer>
    );
}
