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
    action: NavigateAction,
    newDate?: DateTime
): DateTime => {
    switch (action) {
        case 'TODAY':
            return DateTime.now();
        case 'PREV':
            return view === 'month'
                ? currentDate.minus({ months: 1 })
                : view === 'week'
                  ? currentDate.minus({ weeks: 1 })
                  : currentDate.minus({ days: 1 });
        case 'NEXT':
            return view === 'month'
                ? currentDate.plus({ months: 1 })
                : view === 'week'
                  ? currentDate.plus({ weeks: 1 })
                  : currentDate.plus({ days: 1 });
        case 'DATE':
            return newDate || currentDate;
        default:
            return currentDate;
    }
};
