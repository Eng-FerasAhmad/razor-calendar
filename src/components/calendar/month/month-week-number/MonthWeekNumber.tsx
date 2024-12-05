import { DateTime } from 'luxon';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setDate, setView } from 'src/store/ui/uiSlice';

interface WeekNumberProps {
    weekStart: DateTime;
}

const WeekNumber: React.FC<WeekNumberProps> = ({ weekStart }) => {
    const dispatch = useDispatch();

    const handleWeekClick = () => {
        dispatch(setDate(weekStart));
        dispatch(setView('week'));
    };

    return (
        <div
            onClick={handleWeekClick}
            style={{
                width: '40px',
                textAlign: 'center',
                fontWeight: 'bold',
                backgroundColor: '#f9f9f9',
                borderRight: '1px solid #ccc',
                lineHeight: '30px',
                cursor: 'pointer',
            }}
            title={`Go to week ${weekStart.weekNumber}`}
        >
            W{weekStart.weekNumber}
        </div>
    );
};

export default WeekNumber;
