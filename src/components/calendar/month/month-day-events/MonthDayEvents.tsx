import { ReactElement } from 'react';

interface Props {
    events: any[]; // Replace `any` with the appropriate event type
}

export default function DisplayEvents({ events }: Props): ReactElement {
    return (
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
}
