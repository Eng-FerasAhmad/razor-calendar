import { DateTime } from 'luxon';
import { ChangeEvent, ReactElement } from 'react';

import { useCalendarContext } from 'calendar/context/CalendarContext';
import { navigate, NavigateAction } from 'utils/constants';

type ViewType = 'month' | 'week' | 'day' | 'agenda';

export default function Toolbar(): ReactElement {
    const {
        view,
        selectedDate: date,
        language,
        firstDayOfWeek,
        onViewChange,
        onDateChange,
        onChangeLanguage,
    } = useCalendarContext();

    // Views and labels
    const label = date.toFormat('MMMM yyyy');
    const views: ViewType[] = ['month', 'week', 'day', 'agenda'];

    // Localized messages
    const messages: Record<string, string> = {
        today: language === 'de' ? 'Heute' : 'Today',
        previous: language === 'de' ? 'Zurück' : 'Previous',
        next: language === 'de' ? 'Weiter' : 'Next',
        month: language === 'de' ? 'Monat' : 'Month',
        week: language === 'de' ? 'Woche' : 'Week',
        day: language === 'de' ? 'Tag' : 'Day',
        agenda: language === 'de' ? 'Agenda' : 'Agenda',
    };

    const handleNavigate = (
        action: NavigateAction,
        newDate?: DateTime
    ): void => {
        const updatedDate = navigate(
            view,
            date,
            action,
            newDate || DateTime.now()
        );
        onDateChange(updatedDate);
    };

    const handleViewChange = (newView: string): void => {
        onViewChange(newView);
    };

    const handleLanguageChange = (
        event: ChangeEvent<HTMLSelectElement>
    ): void => {
        const selectedLanguage = event.target.value;
        onChangeLanguage(selectedLanguage);
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
                className={view === name ? 'rbc-active' : ''}
            >
                {messages[name]}
            </button>
        ));
    };

    return (
        <div className="rbc-toolbar">
            <div className="rbc-toolbar-controls">
                {/* Language Selector */}
                <select value={language} onChange={handleLanguageChange}>
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                </select>

                {/* First Day of Week Selector */}
                <select value={firstDayOfWeek} onChange={handleFirstDayChange}>
                    <option value={0}>
                        {language === 'de' ? 'Sonntag' : 'Sunday'}
                    </option>
                    <option value={1}>
                        {language === 'de' ? 'Montag' : 'Monday'}
                    </option>
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
        </div>
    );
}
