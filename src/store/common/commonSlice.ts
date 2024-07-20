import { createSlice } from '@reduxjs/toolkit';

import moment from 'moment';
import { weekAdapter } from 'src/date-service/dateService';
import { WeekStartDay } from 'src/date-service/types';
import { CommonState } from 'src/store/common/types';
import { RootState, SliceName } from 'src/store/types';
import { CalendarType } from 'types/calendar';

const initialState: CommonState = {
    calendarType: CalendarType.MONTH,
    selectedMonth: new Date().getMonth() + 1,
    selectedYear: new Date().getFullYear(),
    selectedStartDay: WeekStartDay.Monday,
    selectedWeeks: undefined,
    sidebarCollapsed: false,
};

const commonSlice = createSlice({
    name: SliceName.COMMON,
    initialState,
    reducers: {
        setCalendarType(state, action) {
            return { ...state, calendarType: action.payload };
        },
        setSelectedMonth(state, action) {
            let month = action.payload;
            let year = state.selectedYear;

            if (month < 1) {
                month = 12;
                year -= 1;
            }

            if (month > 12) {
                month = 1;
                year += 1;
            }
            const weeks = weekAdapter(year, month, state.selectedStartDay);
            return {
                ...state,
                selectedMonth: month,
                selectedYear: year,
                selectedWeeks: weeks,
            };
        },
        setSelectedStartDay(state, action) {
            const weeks = weekAdapter(
                state.selectedYear,
                state.selectedStartDay,
                state.selectedStartDay
            );

            return {
                ...state,
                selectedStartDay: action.payload,
                selectedWeeks: weeks,
            };
        },
        setSidebarCollapsed(state, action) {
            return { ...state, sidebarCollapsed: action.payload };
        },
        resetToCurrentMonth(state) {
            const year = moment().year();
            const month = moment().month() + 1;

            const weeks = weekAdapter(year, month, state.selectedStartDay);

            return {
                ...state,
                selectedYear: year,
                selectedMonth: month,
                selectedWeeks: weeks,
            };
        },
    },
});

export const commonState = (state: RootState): CommonState => state.common;

export const {
    setCalendarType,
    setSelectedMonth,
    setSelectedStartDay,
    setSidebarCollapsed,
    resetToCurrentMonth,
} = commonSlice.actions;

export default commonSlice.reducer;
