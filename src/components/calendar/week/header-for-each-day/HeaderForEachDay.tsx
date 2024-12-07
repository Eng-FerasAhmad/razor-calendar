import { DateTime } from 'luxon';
import React from 'react';

interface HeaderForEachDayProps {
    day: DateTime;
}

const HeaderForEachDay: React.FC<HeaderForEachDayProps> = ({ day }) => (
    <div
        style={{
            height: '30px',
            textAlign: 'center',
            fontWeight: 'bold',
            backgroundColor: '#f9f9f9',
            borderBottom: '1px solid #ddd',
            lineHeight: '30px',
            cursor: 'pointer',
        }}
    >
        {day.toFormat('EEE, MMM d')}
    </div>
);

export default HeaderForEachDay;
