import { DateTime } from 'luxon';
import { ReactElement, useState } from 'react';

import { RazorCalendar } from 'calendar/index';
import { AppContainer } from 'components/app/styles';
import RazorCalendarToolbar from 'components/toolbar';
import { GlobalStyle } from 'style/global';
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
            start: '2024-12-16T07:00',
            end: '2024-12-16T07:35',
            isFullDay: false,
        },
        {
            id: '2',
            title: 'Lunch but also long long text',
            start: '2024-12-18T05:00',
            end: '2024-12-18T10:00',
            isFullDay: false,
        },
        {
            id: '3',
            title: 'Meeting',
            start: '2024-12-29T05:00',
            end: '2024-12-29T09:00',
            isFullDay: false,
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
            start: '2024-12-16T09:00',
            end: '2024-12-16T09:05',
            isFullDay: false,
        },
        {
            id: '6',
            title: 'View 2',
            start: '2024-12-16T10:00',
            end: '2024-12-16T10:10',
            isFullDay: false,
            color: '#3385ff',
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
            start: '2024-12-16T11:00',
            end: '2024-12-16T11:15',
            isFullDay: false,
            color: '#ff9933',
        },
        {
            id: '8',
            title: 'View 4',
            start: '2024-12-25T12:00',
            end: '2024-12-25T13:00',
            isFullDay: false,
            color: '#8e56f5',
        },
        {
            id: '9',
            title: 'View 5',
            start: '2025-01-01T13:00',
            end: '2025-01-01T13:30',
            isFullDay: true,
        },
        {
            id: '10',
            title: 'View 5 aber also long long text aber also long long text ',
            start: '2024-12-21T11:00',
            end: '2024-12-21T13:00',
            isFullDay: false,
        },
        {
            id: '11',
            title: 'View 2 days',
            start: '2024-12-21T13:00',
            end: '2024-12-22T14:30',
            isFullDay: false,
        },
        {
            id: '12',
            title: 'View full day with long long text',
            start: '2024-12-16T14:10',
            end: '2024-12-16T16:30',
            isFullDay: true,
        },
    ];

    const config: RazorCalendarConfig<CalendarConfig> = {
        hour: {
            is24HourFormat: false,
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
            <GlobalStyle />
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
