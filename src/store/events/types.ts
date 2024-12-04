export interface Event {
    id: string;
    title: string;
    start: string; // ISO string
    end: string; // ISO string
}

export interface EventsState {
    events: Event[];
}
