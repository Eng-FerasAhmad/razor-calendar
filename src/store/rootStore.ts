import { Store, combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';

import commonReducer from './common/commonSlice';
import { RootState } from './types';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    devTools: process.env.NODE_ENV !== 'production',
    whitelist: [],
};

const appReducer = combineReducers({
    common: commonReducer,
});

const persistedReducer = persistReducer(persistConfig, appReducer);

export const createStore = (): Store<RootState> =>
    configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }).concat(thunk),
    });

export const store = createStore();
