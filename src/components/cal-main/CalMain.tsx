import { ReactElement } from 'react';
import CalMonth from 'components/cal-main/cal-month/CalMonth';
import { CalMainContainer } from 'components/cal-main/styles';

export default function CalMain(): ReactElement {
    return (
        <CalMainContainer data-testid="cal-main">
            <CalMonth />
        </CalMainContainer>
    );
}
