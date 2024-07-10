import { ReactElement } from 'react';
import { CalSidebarContainer } from 'components/cal-sidebar/styles';

export default function CalSidebar(): ReactElement {
    return (
        <CalSidebarContainer data-testid="cal-sidebar">
            <>cal sidebar</>
        </CalSidebarContainer>
    );
}
