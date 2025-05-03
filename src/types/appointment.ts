import { ReminderValue } from 'components/shared/reminder-select/types';
import { CustomerViewModel } from 'types/customer';
import { ServiceViewModel } from 'types/serviceModel';
import { Staffer } from 'types/staffer';
import { TeamMember } from 'types/teamModel';

export type ViewType = 'team' | 'day' | 'week' | 'month' | 'year' | 'agenda';

export interface Appointment {
    id: string;
    title: string;
    start: string; // ISO string
    end: string; // ISO string
    reminder?: ReminderValue;
    teamMember?: TeamMember[];
    duration?: string;
    status?: string;
    notes?: string;
    services?: ServiceViewModel[];
    customer?: CustomerViewModel;
    staffer?: Staffer;
    isFullDay?: boolean;
    color?: string;
    canceled?: boolean;
    draggable?: boolean;
    editable?: boolean;
    deletable?: boolean;
    available?: boolean;
    visibility?: boolean;
    location?: string;
    created?: string;
    updated?: string;
}
