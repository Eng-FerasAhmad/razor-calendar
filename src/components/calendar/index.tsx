import CalendarLayout from 'calendar/layout/CalendarLayout';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { StyleSheetManager } from 'styled-components';
import { createStore } from 'src/store/rootStore';
import { shouldForwardProp } from 'utils/common';

export function CalendarIndex(): ReactElement {
    const store = createStore();

    return (
        <Provider store={store}>
            <StyleSheetManager shouldForwardProp={shouldForwardProp}>
                <CalendarLayout />
            </StyleSheetManager>
        </Provider>
    );
}
