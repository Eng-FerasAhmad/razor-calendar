import { DateTime } from 'luxon';
import React from 'react';
import { NavigateAction, NAVIGATE } from 'utils/constants';

interface ToolbarProps {
    view: string;
    views: string[];
    label: React.ReactNode;
    localizer: {
        messages: {
            today: string;
            previous: string;
            next: string;
            [key: string]: string;
        };
    };
    onNavigate: (action: NavigateAction, newDate?: DateTime) => void; // Updated type
    onView: (view: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
    view,
    views,
    label,
    localizer: { messages },
    onNavigate,
    onView,
}) => {
    const renderViewNames = () =>
        views.map((name) => (
            <button
                key={name}
                type="button"
                className={view === name ? 'active' : ''}
                onClick={() => onView(name)}
            >
                {messages[name] || name}
            </button>
        ));

    return (
        <div className="rbc-toolbar">
            <span className="rbc-btn-group">
                <button
                    type="button"
                    onClick={() => onNavigate(NAVIGATE.TODAY)}
                >
                    {messages.today}
                </button>
                <button type="button" onClick={() => onNavigate(NAVIGATE.PREV)}>
                    {messages.previous}
                </button>
                <button type="button" onClick={() => onNavigate(NAVIGATE.NEXT)}>
                    {messages.next}
                </button>
            </span>
            <span className="rbc-toolbar-label">{label}</span>
            <span className="rbc-btn-group">{renderViewNames()}</span>
        </div>
    );
};

export default Toolbar;
