import { ReactElement } from 'react';
import { CalMonthContainer } from 'components/cal-main/cal-month/styles';

export default function CalMonth(): ReactElement {
    return (
        <CalMonthContainer data-testid="cal-main">
            <>cal month</>
        </CalMonthContainer>
    );
}
