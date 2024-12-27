import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { DisplayAppointmentContainer } from 'week/display-appointment/styles';
import IntervalView from 'week/display-appointment/views/IntervalView';
import StandardView from 'week/display-appointment/views/StandardView';
import ZoomIntervalView from 'week/display-appointment/views/ZoomIntervalView';

interface Props {
    title: string;
    from: string;
    to: string;
    style: { top: string; height: string };
}

export default function DisplayAppointment({
    title,
    from,
    to,
    style,
}: Props): ReactElement {
    const { config } = useCalendarContext();
    const start = DateTime.fromISO(from).toFormat('hh:mm');
    const end = DateTime.fromISO(to).toFormat('hh:mm');

    const diffInMinutes = DateTime.fromISO(to).diff(
        DateTime.fromISO(from),
        'minutes'
    ).minutes;

    // Helper function to get the appropriate view component
    const getViewComponent = (): ReactElement => {
        const { hourIntervalIndex } = config.hour;

        // Map hourIntervalIndex to conditions and components
        const viewConfig: {
            condition: (minutes: number) => boolean;
            view: ReactElement;
        }[] = [
            {
                condition: (minutes) => minutes <= 45,
                view: <IntervalView start={start} end={end} title={title} />,
            },
            {
                condition: (minutes) => minutes <= 45,
                view: (
                    <ZoomIntervalView start={start} end={end} title={title} />
                ),
            },
            {
                condition: (minutes) => minutes < 30,
                view: <IntervalView start={start} end={end} title={title} />,
            },
            {
                condition: (minutes) => minutes < 20,
                view: <IntervalView start={start} end={end} title={title} />,
            },
            {
                condition: (minutes) => minutes < 10,
                view: <IntervalView start={start} end={end} title={title} />,
            },
        ];

        // Select the appropriate view component based on the hourIntervalIndex
        if (hourIntervalIndex < viewConfig.length) {
            const { condition, view } = viewConfig[hourIntervalIndex];
            if (condition(diffInMinutes!)) {
                return view;
            }
        }

        // Default to StandardView if no condition matches
        return <StandardView start={start} end={end} title={title} />;
    };

    return (
        <DisplayAppointmentContainer
            data-testid="display-appointment-container"
            top={style.top}
            height={style.height}
            backgroundColor={config.style.primaryColor}
        >
            {getViewComponent()}
        </DisplayAppointmentContainer>
    );
}
