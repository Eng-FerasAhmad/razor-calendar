import { ReactElement } from 'react';
import { CalHeaderContainer } from 'components/cal-header/styles';

export default function CalHeader(): ReactElement {
    return (
        <CalHeaderContainer data-testid="cal-header">
            <>cal header</>
        </CalHeaderContainer>
    );
}
