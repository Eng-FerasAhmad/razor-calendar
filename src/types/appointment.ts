export type ViewType = 'day' | 'week' | 'month' | 'year' | 'agenda';

export interface Appointment {
    id: string;
    title: string;
    start: string; // ISO string
    end: string; // ISO string
    isFullDay?: boolean;
    color?: string;
    canceled?: boolean;
    draggable?: boolean;
    editable?: boolean;
    available?: boolean;
    visibility?: boolean;
    location?: string;
}
