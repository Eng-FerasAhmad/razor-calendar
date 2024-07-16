import { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppContainer } from 'components/app/styles';
import Template from 'components/template/Template';
import { setDateMetaData } from 'src/store/common/commonSlice';
import { GlobalStyle } from 'style/global';

export default function App(): ReactElement {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setDateMetaData());
    }, []);

    return (
        <AppContainer data-testid="app">
            <GlobalStyle />
            <Template />
        </AppContainer>
    );
}
