import { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheetManager } from 'styled-components';
import { AppContainer } from 'components/app/styles';
import Template from 'components/template/Template';
import { setDateMetaData } from 'src/store/common/commonSlice';
import { GlobalStyle } from 'style/global';
import { shouldForwardProp } from 'utils/common';

export default function App(): ReactElement {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setDateMetaData());
    }, [dispatch]);

    return (
        <StyleSheetManager shouldForwardProp={shouldForwardProp}>
            <AppContainer data-testid="app">
                <GlobalStyle />
                <Template />
            </AppContainer>
        </StyleSheetManager>
    );
}
