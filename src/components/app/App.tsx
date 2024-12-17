import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { AppContainer } from 'components/app/styles';
import { CalendarIndex } from 'components/calendar';
import { GlobalStyle } from 'style/global';

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
    const handleViewChange = (view: string): void => {
        console.log('View changed to:', view);
    };

    const handleDateChange = (date: DateTime): void => {
        console.log('Date changed to:', date.toISO());
    };

    const handleLanguageChange = (): void => {
        console.log('lang changed to:');
    };

    return (
        <AppContainer data-testid="app">
            <GlobalStyle />
            <CalendarIndex
                events={events}
                handleDateChange={handleDateChange}
                handleLanguageChange={handleLanguageChange}
                handleViewChange={handleViewChange}
            />
        </AppContainer>
    );
}
