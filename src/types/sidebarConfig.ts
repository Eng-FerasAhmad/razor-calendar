import { DateTime } from 'luxon';

export interface SidebarProps {
    currentDate: DateTime;
    onChangeDate: (newDate: DateTime) => void;
    weekStartOn: 'sunday' | 'monday';
}
