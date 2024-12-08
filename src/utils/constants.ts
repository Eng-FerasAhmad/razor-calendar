import { DateTime } from 'luxon';

export type NavigateAction = 'TODAY' | 'PREV' | 'NEXT' | 'DATE';

export const NAVIGATE = {
    TODAY: 'TODAY' as NavigateAction,
    PREV: 'PREV' as NavigateAction,
    NEXT: 'NEXT' as NavigateAction,
    DATE: 'DATE' as NavigateAction,
};

export const navigate = (
    view: string,
    currentDate: DateTime,
    action: string,
    newDate?: DateTime
): DateTime => {
    switch (action) {
        case 'TODAY':
            return DateTime.now();
        case 'PREV': {
            if (view === 'month') return currentDate.minus({ months: 1 });
            if (view === 'week') return currentDate.minus({ weeks: 1 });
            return currentDate.minus({ days: 1 });
        }
        case 'NEXT': {
            if (view === 'month') return currentDate.plus({ months: 1 });
            if (view === 'week') return currentDate.plus({ weeks: 1 });
            return currentDate.plus({ days: 1 });
        }
        case 'DATE':
            return newDate || currentDate;
        default:
            return currentDate;
    }
};
