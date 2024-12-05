import React from 'react';

interface DisplayEventsProps {
    events: any[]; // Replace `any` with the appropriate event type
}

const DisplayEvents: React.FC<DisplayEventsProps> = ({ events }) => (
    <>
        {events.map((event) => (
            <div
                key={event.id}
                style={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    padding: '2px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    marginTop: '2px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {event.title}
            </div>
        ))}
    </>
);

export default DisplayEvents;
