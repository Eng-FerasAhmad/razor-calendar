export type ViewType = 'month' | 'week' | 'day' | 'agenda';

export interface Appointment {
    id: string;
    title: string;
    start: string; // ISO string
    end: string; // ISO string
    isFullDay: boolean;
}
