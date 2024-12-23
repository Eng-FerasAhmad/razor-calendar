import { DateTime } from 'luxon';
import { ReactElement, useState } from 'react';

import { RazorCalendar } from 'calendar/index';
import { AppContainer } from 'components/app/styles';
import CalendarToolbar from 'components/toolbar/CalendarToolbar';
import { GlobalStyle } from 'style/global';
import { Appointment, ViewType } from 'types/calendar';
import { navigate, NavigateAction } from 'utils/constants';

export default function App(): ReactElement {
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
            start: '2024-12-21T09:00',
            end: '2024-12-21T10:00',
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
        },
        {
            id: '7',
            title: 'View 3',
            start: '2024-12-16T11:00',
            end: '2024-12-16T11:15',
            isFullDay: false,
        },
        {
            id: '8',
            title: 'View 4',
            start: '2024-12-16T12:00',
            end: '2024-12-16T12:30',
            isFullDay: false,
        },
        {
            id: '9',
            title: 'View 5',
            start: '2024-12-16T13:00',
            end: '2024-12-16T13:20',
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

    // State for CalendarToolbar and Calendar
    const [currentView, setCurrentView] = useState<ViewType>('week');
    const [currentLang, setCurrentLang] = useState<string>('en');
    const [currentDate, setCurrentDate] = useState<DateTime>(DateTime.now);

    // Handlers
    const handleViewChange = (view: ViewType): void => {
        setCurrentView(view);
    };

    const handleLanguageChange = (language: string): void => {
        setCurrentLang(language);
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

    const handleChangeAppointment = (appointment: Appointment): void => {
        console.log('Changed Appointment:', appointment);
    };

    return (
        <AppContainer data-testid="app">
            <GlobalStyle />
            {/* Pass handlers and state to CalendarToolbar */}
            <CalendarToolbar
                currentView={currentView}
                onViewChange={handleViewChange}
                currentLang={currentLang}
                onLanguageChange={handleLanguageChange}
                currentDate={currentDate}
                onNavigate={handleNavigate}
            />

            {/* Pass updated values to RazorCalendar */}
            <RazorCalendar
                appointments={appointments}
                view={currentView}
                language={currentLang}
                selectedDate={currentDate}
                primaryColor="#2ba172"
                handleChangeAppointment={handleChangeAppointment}
            />
        </AppContainer>
    );
}
