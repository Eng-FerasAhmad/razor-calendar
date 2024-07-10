import { ReactElement } from 'react';
import { CalWeekContainer } from 'components/cal-main/cal-week/styles';

export default function CalWeek(): ReactElement {
    return (
        <CalWeekContainer data-testid="cal-main">
            <>cal week</>
        </CalWeekContainer>
    );
}
