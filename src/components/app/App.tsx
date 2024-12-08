import { ReactElement } from 'react';
import { AppContainer } from 'components/app/styles';
import { CalendarIndex } from 'components/calendar';
import { GlobalStyle } from 'style/global';

export default function App(): ReactElement {
    return (
        <AppContainer data-testid="app">
            <GlobalStyle />
            <CalendarIndex />
        </AppContainer>
    );
}
