import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import {
    CalSidebarContainer,
    SidebarContent,
} from 'components/cal-sidebar/styles';
import { commonState } from 'src/store/common/commonSlice';

export default function CalSidebar(): ReactElement {
    const { sidebarCollapsed } = useSelector(commonState);

    return (
        <CalSidebarContainer
            collapsed={sidebarCollapsed}
            data-testid="cal-sidebar"
        >
            <SidebarContent collapsed={sidebarCollapsed}>
                some side bar content
            </SidebarContent>
        </CalSidebarContainer>
    );
}
