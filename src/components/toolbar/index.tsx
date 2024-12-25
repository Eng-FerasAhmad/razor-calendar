import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { ViewType } from 'types/appointment';
import { NavigateAction } from 'utils/constants';

interface ToolbarProps {
    currentView: ViewType;
    onViewChange: (view: ViewType) => void;
    currentDate: DateTime;
    onNavigate: (action: NavigateAction, newDate?: DateTime) => void;
}

export default function RazorCalendarToolbar({
    currentView,
    onViewChange,
    currentDate,
    onNavigate,
}: ToolbarProps): ReactElement {
    const views: ViewType[] = ['month', 'week', 'day', 'agenda'];

    const messages: Record<string, string> = {
        today: 'Today',
        previous: 'Previous',
        next: 'Next',
        month: 'Month',
        week: 'Week',
        day: 'Day',
        agenda: 'Agenda',
    };

    const renderViewNames = () => {
        return views.map((name) => (
            <button
                key={name}
                type="button"
                onClick={() => onViewChange(name)}
                className={currentView === name ? 'rbc-active' : ''}
            >
                {messages[name]}
            </button>
        ));
    };

    return (
        <div className="rbc-toolbar">
            {/* Navigation Buttons */}
            <span className="rbc-btn-group">
                <button type="button" onClick={() => onNavigate('TODAY')}>
                    {messages.today}
                </button>
                <button type="button" onClick={() => onNavigate('PREV')}>
                    {messages.previous}
                </button>
                <button type="button" onClick={() => onNavigate('NEXT')}>
                    {messages.next}
                </button>
            </span>

            {/* Current Date Label */}
            <span className="rbc-toolbar-label">
                {currentDate.toFormat('MMMM dd, yyyy')}
            </span>

            {/* View Buttons */}
            <span className="rbc-btn-group">{renderViewNames()}</span>
        </div>
    );
}
