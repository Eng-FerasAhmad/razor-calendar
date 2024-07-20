import { ReactElement } from 'react';
import { StyleSheetManager } from 'styled-components';
import { AppContainer } from 'components/app/styles';
import Template from 'components/template/Template';
import { GlobalStyle } from 'style/global';
import { shouldForwardProp } from 'utils/common';

export default function App(): ReactElement {
    return (
        <StyleSheetManager shouldForwardProp={shouldForwardProp}>
            <AppContainer data-testid="app">
                <GlobalStyle />
                <Template />
            </AppContainer>
        </StyleSheetManager>
    );
}
