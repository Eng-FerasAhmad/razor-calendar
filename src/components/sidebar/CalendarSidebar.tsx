import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { SidebarProps } from 'types/sidebarConfig';

export function RazorCalendarSidebar({
    currentDate,
    onChangeDate,
    weekStartOn,
    showWeekNumber,
}: SidebarProps): ReactElement {
    const locale = weekStartOn === 'sunday' ? 'en-US' : 'en-GB';

    return (
        <LocalizationProvider
            localeText={{
                calendarWeekNumberHeaderText: '#',
                calendarWeekNumberText: (weekNumber) => `${weekNumber}.`,
            }}
            dateAdapter={AdapterLuxon}
            adapterLocale={locale} // Set the locale for week start
        >
            <DateCalendar
                displayWeekNumber={showWeekNumber}
                value={currentDate}
                onChange={(newValue) => {
                    if (newValue) {
                        onChangeDate(DateTime.fromJSDate(newValue.toJSDate()));
                    }
                }}
            />
        </LocalizationProvider>
    );
}
