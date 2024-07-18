import { ReactElement } from 'react';
import CalNavigator from 'components/cal-header/cal-navigator/CalNavigator';
import CollapseButton from 'components/cal-header/collapse-button/CollapseButton';
import {
    CalHeaderContainer,
    NavigatorWrapper,
} from 'components/cal-header/styles';

export default function CalHeader(): ReactElement {
    return (
        <CalHeaderContainer data-testid="cal-header">
            <NavigatorWrapper>
                <CollapseButton />
                <CalNavigator />
            </NavigatorWrapper>
            <div></div>
        </CalHeaderContainer>
    );
}
