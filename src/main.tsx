import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from 'components/app/App';
import { resetToCurrentMonth } from 'src/store/common/commonSlice';
import { createStore } from 'src/store/rootStore';

const store = createStore();
store.dispatch(resetToCurrentMonth());

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
