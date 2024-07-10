import { ReactElement } from 'react';
import { CalTabListContainer } from 'components/cal-tab-list/styles';

export default function CalTabList(): ReactElement {
    return (
        <CalTabListContainer data-testid="cal-tab-list">
            <>cal tab list</>
        </CalTabListContainer>
    );
}
