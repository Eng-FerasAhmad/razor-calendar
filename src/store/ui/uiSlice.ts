import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

interface UIState {
    view: 'month' | 'week' | 'day' | 'agenda';
    date: DateTime;
}

const initialState: UIState = {
    view: 'month',
    date: DateTime.now(),
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setView: (
            state,
            action: PayloadAction<'month' | 'week' | 'day' | 'agenda'>
        ) => {
            state.view = action.payload;
        },
        setDate: (state, action: PayloadAction<DateTime>) => {
            state.date = action.payload;
        },
    },
});

export const { setView, setDate } = uiSlice.actions;
export default uiSlice.reducer;
