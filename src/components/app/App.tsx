import { DateTime } from 'luxon';
import { ReactElement, useState } from 'react';

import { RazorCalendar } from 'calendar/index';
import { AppContainer } from 'components/app/styles';
import RazorCalendarToolbar from 'components/toolbar';
import { Appointment, ViewType } from 'types/appointment';
import { CalendarConfig, RazorCalendarConfig } from 'types/calendarConfig';
import { ToolbarConfig } from 'types/toolbarConfig';
import { navigate, NavigateAction } from 'utils/constants';

export default function App(): ReactElement {
    const locale = 'de';
    const appointments = [
        {
            id: '1',
            title: 'Meeting at these times are very important',
            start: '2024-12-22T13:00',
            end: '2024-12-23T13:00',
            isFullDay: true,
        },
        {
            id: '2',
            title: 'Lunch but also long long text',
            start: '2025-01-01T13:00',
            end: '2025-01-01T13:00',
            isFullDay: true,
        },
        {
            id: '3',
            title: 'Meeting',
            start: '2025-01-01T13:00',
            end: '2025-01-01T13:00',
            isFullDay: true,
        },
        {
            id: '4',
            title: 'Lunch: how about more longer text like this one hier, what you say',
            start: '2024-12-19T09:00',
            end: '2024-12-19T13:00',
            isFullDay: false,
        },
        {
            id: '5',
            title: 'View 1',
            start: '2024-12-24T14:30',
            end: '2024-12-24T15:30',
            isFullDay: false,
            color: '#ff9933',
        },
        {
            id: '6',
            title: 'View 2',
            start: '2024-12-16T10:00',
            end: '2024-12-16T12:10',
            isFullDay: false,
            color: '#039be5',
            canceled: false,
            draggable: true,
            editable: true,
            available: false,
            visibility: true,
            location: '',
        },
        {
            id: '7',
            title: 'View 3',
            start: '2024-12-16T13:00',
            end: '2024-12-16T14:30',
            isFullDay: false,
            color: '#ff9933',
        },
        {
            id: '8',
            title: 'View 4',
            start: '2024-12-12T12:00',
            end: '2024-12-12T13:00',
            isFullDay: true,
            color: '#8e56f5',
        },
        {
            id: '9',
            title: 'View 5',
            start: '2025-01-01T13:00',
            end: '2025-01-01T13:30',
            isFullDay: true,
            color: '#8e56f5',
        },
        {
            id: '10',
            title: 'View 5 aber also long long text aber also long long text ',
            start: '2024-12-27T11:00',
            end: '2024-12-27T13:00',
            isFullDay: true,
        },
        {
            id: '11',
            title: 'View 2 days',
            start: '2024-12-22T13:00',
            end: '2024-12-28T14:30',
            isFullDay: true,
            color: '#66a3ff',
        },
        {
            id: '12',
            title: 'View full day with long long text',
            start: '2025-01-01T13:00',
            end: '2025-01-01T14:00',
            isFullDay: false,
        },
    ];

    const config: RazorCalendarConfig<CalendarConfig> = {
        hour: {
            is24HourFormat: true,
            hourIntervalIndex: 1,
            workHoursStart: 8,
            workHoursEnd: 18,
        },
        month: {
            showWeekNumbers: true,
        },
        week: {
            showWeekend: true,
            showWeekNumbers: true,
        },
        common: {
            lang: locale,
            dateFormat: 'dd.MM.yyyy',
        },
    };

    const toolbarConfig: Partial<ToolbarConfig> = {
        fontColor: '#fff',
        lang: locale,
    };

    // State for CalendarToolbar and Calendar
    const [currentView, setCurrentView] = useState<ViewType>('week');
    const [currentDate, setCurrentDate] = useState<DateTime>(DateTime.now);

    // Handlers
    const handleViewChange = (view: ViewType): void => {
        setCurrentView(view);
    };

    const handleNavigate = (
        action: NavigateAction,
        newDate?: DateTime
    ): void => {
        const updatedDate = navigate(
            currentView,
            currentDate,
            action,
            newDate || DateTime.now()
        );

        setCurrentDate(updatedDate);
    };

    const onChangeDate = (newDate: DateTime): void => {
        setCurrentDate(newDate);
    };

    const handleChangeAppointment = (appointment: Appointment): void => {
        console.log('Changed Appointment:', appointment);
    };

    return (
        <AppContainer data-testid="app">
            {/* Pass handlers and state to CalendarToolbar */}
            <RazorCalendarToolbar
                currentView={currentView}
                onViewChange={handleViewChange}
                currentDate={currentDate}
                onNavigate={handleNavigate}
                toolbarConfig={toolbarConfig}
            />

            {/* Pass updated values to RazorCalendar */}
            <RazorCalendar
                appointments={appointments}
                handleChangeAppointment={handleChangeAppointment}
                view={currentView}
                onViewChange={handleViewChange}
                selectedDate={currentDate}
                onChangeDate={onChangeDate}
                config={config}
            />
        </AppContainer>
    );
}
