import { ReactElement } from 'react';
import { AppContainer } from 'components/app/styles';
import Template from 'components/template/Template';
import { GlobalStyle } from 'style/global';

export default function App(): ReactElement {
    return (
        <AppContainer data-testid="app">
            <GlobalStyle />
            <Template />
        </AppContainer>
    );
}
