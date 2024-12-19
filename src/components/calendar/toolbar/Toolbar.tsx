import { DateTime } from 'luxon';
import { ChangeEvent, ReactElement, useState } from 'react';

import { RazorCalendar } from 'calendar/index';
import { ViewType } from 'types/calendar';
import { navigate, NavigateAction } from 'utils/constants';

export default function Toolbar(): ReactElement {
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
    const [currentView, setCurrentView] = useState<ViewType>('week');
    const [currentLang, setCurrentLang] = useState<string>('en');
    const [currentDate, setCurrentDate] = useState<DateTime>(DateTime.now);

    const handleViewChange = (view: ViewType): void => {
        console.log(view);
        setCurrentView(view);
    };

    const handleLanguageChange = (): void => {
        setCurrentLang('en');
    };

    // Views and labels
    const label = 'date label'; // date.toFormat('MMMM yyyy');
    const views: ViewType[] = ['month', 'week', 'day', 'agenda'];

    // Localized messages
    const messages: Record<string, string> = {
        today: 'Today',
        previous: 'Previous',
        next: 'Next',
        month: 'Month',
        week: 'Week',
        day: 'Day',
        agenda: 'Agenda',
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

    const handleFirstDayChange = (
        event: ChangeEvent<HTMLSelectElement>
    ): void => {
        const selectedFirstDay = Number(event.target.value);
        console.log('selectedFirstDay', selectedFirstDay);
    };

    const renderViewNames = () => {
        return views.map((name) => (
            <button
                key={name}
                type="button"
                onClick={() => handleViewChange(name)}
                className={'rbc-active'}
            >
                {messages[name]}
            </button>
        ));
    };

    return (
        <div className="rbc-toolbar">
            <div className="rbc-toolbar-controls">
                {/* Language Selector */}
                <select value={'en'} onChange={handleLanguageChange}>
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                </select>

                {/* First Day of Week Selector */}
                <select value={0} onChange={handleFirstDayChange}>
                    <option value={0}>{'Sunday'}</option>
                    <option value={1}>{'Monday'}</option>
                </select>
            </div>

            {/* Navigation Buttons */}
            <span className="rbc-btn-group">
                <button type="button" onClick={() => handleNavigate('TODAY')}>
                    {messages.today}
                </button>
                <button type="button" onClick={() => handleNavigate('PREV')}>
                    {messages.previous}
                </button>
                <button type="button" onClick={() => handleNavigate('NEXT')}>
                    {messages.next}
                </button>
            </span>

            {/* Current View Label */}
            <span className="rbc-toolbar-label">{label}</span>

            {/* View Buttons */}
            <span className="rbc-btn-group">{renderViewNames()}</span>

            <RazorCalendar
                events={events}
                view={currentView}
                language={currentLang}
                selectedDate={currentDate}
            />
        </div>
    );
}
