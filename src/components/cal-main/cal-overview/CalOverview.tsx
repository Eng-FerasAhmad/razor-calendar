import { ReactElement } from 'react';
import { CalOverviewContainer } from 'components/cal-main/cal-overview/styles';

export default function CalOverview(): ReactElement {
    return (
        <CalOverviewContainer data-testid="cal-main">
            <>cal overview</>
        </CalOverviewContainer>
    );
}
