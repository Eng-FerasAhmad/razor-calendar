import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Event {
    id: string;
    title: string;
    start: string; // ISO string
    end: string; // ISO string
}

interface EventsState {
    events: Event[];
}

const initialState: EventsState = {
    events: [
        {
            id: '1',
            title: 'Meeting with John',
            start: '2024-12-04T09:00:00',
            end: '2024-12-04T10:00:00',
        },
        {
            id: '2',
            title: 'Lunch Break',
            start: '2024-12-04T12:00:00',
            end: '2024-12-04T13:00:00',
        },
        {
            id: '3',
            title: 'Project Presentation',
            start: '2024-03-21T14:00:00',
            end: '2024-03-21T15:30:00',
        },
    ],
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        addEvent: (state, action: PayloadAction<Event>) => {
            state.events.push(action.payload);
        },
    },
});

export const { addEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
