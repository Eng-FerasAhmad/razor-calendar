import React from 'react';

interface EventProps {
    title: string;
    style: React.CSSProperties;
}

const Event: React.FC<EventProps> = ({ title, style }) => {
    return (
        <div
            style={{
                position: 'absolute',
                left: '5px',
                right: '5px',
                backgroundColor: '#007bff',
                color: '#fff',
                borderRadius: '4px',
                fontSize: '10px',
                padding: '2px',
                ...style,
            }}
        >
            {title}
        </div>
    );
};

export default Event;
