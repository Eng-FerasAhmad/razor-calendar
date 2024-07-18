import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import CalMonth from 'components/cal-main/cal-month/CalMonth';
import { CalMainContainer } from 'components/cal-main/styles';
import { commonState } from 'src/store/common/commonSlice';

export default function CalMain(): ReactElement {
    const { sidebarCollapsed } = useSelector(commonState);

    return (
        <CalMainContainer data-testid="cal-main" collapsed={sidebarCollapsed}>
            <CalMonth />
        </CalMainContainer>
    );
}
