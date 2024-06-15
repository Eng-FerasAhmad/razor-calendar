import { createSlice } from '@reduxjs/toolkit';

import { RootState, SliceName } from '../types';
import { CommonState } from './types';

const initialState: CommonState = {
    appName: undefined,
};

const commonSlice = createSlice({
    name: SliceName.COMMON,
    initialState,
    reducers: {
        setAppName(state, action) {
            return { ...state, appName: action.payload };
        },
    },
});

export const commonState = (state: RootState): CommonState => state.common;

export const { setAppName } = commonSlice.actions;

export default commonSlice.reducer;
