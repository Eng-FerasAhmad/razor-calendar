import { ReactElement } from 'react';
import { CalDayContainer } from 'components/cal-main/cal-day/styles';

export default function CalDay(): ReactElement {
    return (
        <CalDayContainer data-testid="cal-day">
            <>cal day</>
        </CalDayContainer>
    );
}
