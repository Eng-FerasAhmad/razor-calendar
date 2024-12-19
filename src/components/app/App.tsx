import { ReactElement } from 'react';
import { AppContainer } from 'components/app/styles';
import { GlobalStyle } from 'style/global';
import Toolbar from 'toolbar/Toolbar';

export default function App(): ReactElement {
    return (
        <AppContainer data-testid="app">
            <GlobalStyle />
            <Toolbar />
        </AppContainer>
    );
}
