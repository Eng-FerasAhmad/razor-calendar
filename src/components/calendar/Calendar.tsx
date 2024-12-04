import { DateTime } from 'luxon';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Agenda from './Agenda';
import Day from './Day';
import Month from './Month';
import Toolbar from './Toolbar';
import Week from './week/Week';
import { RootState } from 'src/store/types';
import { setDate, setView } from 'src/store/ui/uiSlice';
import { navigate, NavigateAction } from 'utils/constants';

const Calendar: React.FC = () => {
    const dispatch = useDispatch();
    const { view, date } = useSelector((state: RootState) => state.ui);

    const renderView = () => {
        switch (view) {
            case 'month':
                return <Month />;
            case 'week':
                return <Week endWorkHour={9} startWorkHour={17} />;
            case 'day':
                return <Day />;
            case 'agenda':
                return <Agenda />;
            default:
                return <Month />;
        }
    };

    const handleNavigate = (action: NavigateAction, newDate?: DateTime) => {
        const updatedDate = navigate(
            view,
            date,
            action,
            newDate || DateTime.now()
        );
        dispatch(setDate(updatedDate)); // Update the date in Redux
    };

    const handleViewChange = (newView: string) => {
        dispatch(setView(newView as 'month' | 'week' | 'day' | 'agenda'));
    };

    return (
        <div className="calendar">
            <Toolbar
                view={view}
                views={['month', 'week', 'day', 'agenda']}
                label={date.toFormat('MMMM yyyy')}
                localizer={{
                    messages: {
                        today: 'Today',
                        previous: 'Previous',
                        next: 'Next',
                        month: 'Month',
                        week: 'Week',
                        day: 'Day',
                        agenda: 'Agenda',
                    },
                }}
                onNavigate={handleNavigate}
                onView={handleViewChange}
            />
            {renderView()}
        </div>
    );
};

export default Calendar;
