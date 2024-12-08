import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import Agenda from 'agenda/Agenda';
import Day from 'day/Day';
import Month from 'month/Month';
import { uiState } from 'src/store/ui/uiSlice';
import Toolbar from 'toolbar/Toolbar';
import Week from 'week/Week';

export default function CalendarLayout(): ReactElement {
    const { view } = useSelector(uiState);

    const renderView = (): ReactElement => {
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

    return (
        <div className="calendar">
            <Toolbar />
            {renderView()}
        </div>
    );
}
