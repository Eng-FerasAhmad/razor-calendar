import { createSlice } from '@reduxjs/toolkit';

import { CommonState } from 'src/store/common/types';
import { RootState, SliceName } from 'src/store/types';
import { CalendarType } from 'types/calendar';
import { getMonthAndWeeks } from 'utils/dateGenerator';

const initialState: CommonState = {
    appName: undefined,
    calendarType: CalendarType.MONTH,
    selectedMonth: new Date().getMonth() + 1,
    selectedYear: new Date().getFullYear(),
    selectedStartDay: 1,
    dateMetaData: undefined,
    sidebarCollapsed: true,
};

const commonSlice = createSlice({
    name: SliceName.COMMON,
    initialState,
    reducers: {
        setAppName(state, action) {
            return { ...state, appName: action.payload };
        },
        setCalendarType(state, action) {
            return { ...state, calendarType: action.payload };
        },
        setSelectedMonth(state, action) {
            const meta = getMonthAndWeeks(
                state.selectedYear,
                state.selectedStartDay
            );

            return {
                ...state,
                selectedMonth: action.payload,
                dateMetaData: meta[action.payload - 1],
            };
        },
        setSelectedYear(state, action) {
            return { ...state, selectedYear: action.payload };
        },
        setSelectedStartDay(state, action) {
            return { ...state, selectedStartDay: action.payload };
        },
        setDateMetaData(state) {
            const meta = getMonthAndWeeks(
                state.selectedYear,
                state.selectedStartDay
            );
            return { ...state, dateMetaData: meta[state.selectedMonth - 1] };
        },
        setSidebarCollapsed(state, action) {
            return { ...state, sidebarCollapsed: action.payload };
        },
    },
});

export const commonState = (state: RootState): CommonState => state.common;

export const {
    setAppName,
    setCalendarType,
    setSelectedMonth,
    setSelectedYear,
    setSelectedStartDay,
    setDateMetaData,
    setSidebarCollapsed,
} = commonSlice.actions;

export default commonSlice.reducer;
