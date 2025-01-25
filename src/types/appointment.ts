export type ViewType = 'team' | 'day' | 'week' | 'month' | 'year' | 'agenda';

export interface Appointment {
    id: string;
    title: string;
    start: string; // ISO string
    end: string; // ISO string
    assign?: string[];
    duration?: string;
    status?: string;
    notes?: string;
    service?: string;
    isFullDay?: boolean;
    color?: string;
    canceled?: boolean;
    draggable?: boolean;
    editable?: boolean;
    deletable?: boolean;
    available?: boolean;
    visibility?: boolean;
    location?: string;
}
