import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/types';
import { setFirstDayOfWeek, setLanguage } from 'src/store/ui/uiSlice';

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
    onNavigate: (action: string) => void;
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
    const dispatch = useDispatch();
    const { language, firstDayOfWeek } = useSelector(
        (state: RootState) => state.ui
    );

    // Language options
    const languageOptions = [
        { value: 'en', label: 'English' },
        { value: 'de', label: 'Deutsch' },
    ];

    // First day of the week options
    const firstDayOptions = [
        { value: 0, label: 'Sunday' },
        { value: 1, label: 'Monday' },
    ];

    // Handlers
    const handleLanguageChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedLanguage = event.target.value;
        dispatch(setLanguage(selectedLanguage));
    };

    const handleFirstDayChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedFirstDay = Number(event.target.value);
        dispatch(setFirstDayOfWeek(selectedFirstDay));
    };

    const handleNavigate = (action: string) => {
        onNavigate(action);
    };

    const handleViewChange = (newView: string) => {
        onView(newView);
    };

    const renderViewNames = () => {
        if (views.length > 1) {
            return views.map((name) => (
                <button
                    key={name}
                    type="button"
                    onClick={() => handleViewChange(name)}
                    className={view === name ? 'rbc-active' : ''}
                >
                    {messages[name] || name}
                </button>
            ));
        }
        return null;
    };

    return (
        <div className="rbc-toolbar">
            <div className="rbc-toolbar-controls">
                {/* Language Selector */}
                <select value={language} onChange={handleLanguageChange}>
                    {languageOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* First Day of Week Selector */}
                <select value={firstDayOfWeek} onChange={handleFirstDayChange}>
                    {firstDayOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
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
};

export default Toolbar;
