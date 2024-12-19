import { DateTime } from 'luxon';
import { ReactElement, useState } from 'react';

import { RazorCalendar } from 'calendar/index';
import { AppContainer } from 'components/app/styles';
import Toolbar from 'components/toolbar/Toolbar';
import { GlobalStyle } from 'style/global';
import { ViewType } from 'types/calendar';
import { navigate, NavigateAction } from 'utils/constants';

export default function App(): ReactElement {
    const events = [
        {
            id: '1',
            title: 'Meeting',
            start: '2024-12-04T09:00',
            end: '2024-12-04T10:00',
        },
        {
            id: '2',
            title: 'Lunch',
            start: '2024-12-04T12:00',
            end: '2024-12-04T13:00',
        },
    ];

    // State for Toolbar and Calendar
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

    return (
        <AppContainer data-testid="app">
            <GlobalStyle />
            {/* Pass handlers and state to Toolbar */}
            <Toolbar
                currentView={currentView}
                onViewChange={handleViewChange}
                currentLang={currentLang}
                onLanguageChange={handleLanguageChange}
                currentDate={currentDate}
                onNavigate={handleNavigate}
            />

            {/* Pass updated values to RazorCalendar */}
            <RazorCalendar
                events={events}
                view={currentView}
                language={currentLang}
                selectedDate={currentDate}
            />
        </AppContainer>
    );
}
