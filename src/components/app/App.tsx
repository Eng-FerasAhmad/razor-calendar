import { ReactElement } from 'react';
import { StyleSheetManager } from 'styled-components';
import { AppContainer } from 'components/app/styles';
import Calendar from 'components/calendar/Calendar';
import { GlobalStyle } from 'style/global';
import { shouldForwardProp } from 'utils/common';

export default function App(): ReactElement {
    return (
        <StyleSheetManager shouldForwardProp={shouldForwardProp}>
            <AppContainer data-testid="app">
                <GlobalStyle />
                <Calendar />
            </AppContainer>
        </StyleSheetManager>
    );
}
