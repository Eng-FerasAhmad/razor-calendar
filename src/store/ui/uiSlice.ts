import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';
import { RootState } from 'src/store/types';
import { UIState } from 'src/store/ui/types';

const initialState: UIState = {
    view: 'month',
    date: DateTime.now(),
    language: 'en',
    firstDayOfWeek: 0, // Default to Sunday
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setView(state, action: PayloadAction<string>) {
            state.view = action.payload;
        },
        setDate(state, action: PayloadAction<DateTime>) {
            state.date = action.payload;
        },
        setLanguage(state, action: PayloadAction<string>) {
            state.language = action.payload;
        },
        setFirstDayOfWeek(state, action: PayloadAction<number>) {
            state.firstDayOfWeek = action.payload;
        },
    },
});

export const uiState = (state: RootState): UIState => state.ui;

export const { setView, setDate, setLanguage, setFirstDayOfWeek } =
    uiSlice.actions;

export default uiSlice.reducer;
