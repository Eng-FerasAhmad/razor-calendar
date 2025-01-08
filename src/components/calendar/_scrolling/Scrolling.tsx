import { useEffect } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';

export default function DisableScrolling(): null {
    const { popperAppointment } = useCalendarContext();

    useEffect(() => {
        const { body } = document;
        const scrollableContainer = document.querySelector('#time-day-wrapper');

        if (popperAppointment?.open) {
            body.classList.add('no-scroll');
            if (scrollableContainer) {
                scrollableContainer.classList.add('no-scroll');
            }
        } else {
            body.classList.remove('no-scroll');
            if (scrollableContainer) {
                scrollableContainer.classList.remove('no-scroll');
            }
        }

        // Cleanup when the component unmounts or popperAppointment changes
        return () => {
            body.classList.remove('no-scroll');
            if (scrollableContainer) {
                scrollableContainer.classList.remove('no-scroll');
            }
        };
    }, [popperAppointment?.open]);

    return null; // This component doesn't render anything
}
