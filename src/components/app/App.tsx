import { ReactElement } from 'react';
import { AppContainer } from 'components/app/styles';
import { GlobalStyle } from 'style/global';

export default function App(): ReactElement {
    return (
        <AppContainer data-testid="app">
            <GlobalStyle />
            <div>app</div>
        </AppContainer>
    );
}
