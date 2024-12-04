import { createSlice } from '@reduxjs/toolkit';

import { CommonState } from 'src/store/common/types';
import { RootState, SliceName } from 'src/store/types';
import { CalendarType } from 'types/calendar';

const initialState: CommonState = {
    calendarType: CalendarType.MONTH,
};

const commonSlice = createSlice({
    name: SliceName.COMMON,
    initialState,
    reducers: {
        setCalendarType(state, action) {
            return { ...state, calendarType: action.payload };
        },
    },
});

export const commonState = (state: RootState): CommonState => state.common;

export const { setCalendarType } = commonSlice.actions;

export default commonSlice.reducer;
