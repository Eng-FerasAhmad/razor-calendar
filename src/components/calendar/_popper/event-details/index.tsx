import { Fade, Paper, Popper } from '@mui/material';
import { ReactElement, useEffect, useRef } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import DetailsContent from 'calendar/_popper/event-details/DetailsContent';

export default function PopperEventDetailsIndex(): ReactElement {
    const { popperAppointment, onPopperAppointment } = useCalendarContext();
    const popperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (
                popperRef.current &&
                !popperRef.current.contains(event.target as Node)
            ) {
                onPopperAppointment(undefined); // Close the popper
            }
        };

        if (popperAppointment?.open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popperAppointment?.open, onPopperAppointment]);

    return (
        <Popper
            sx={{ zIndex: 1200 }}
            open={popperAppointment?.open || false}
            anchorEl={popperAppointment?.anchorEl || null}
            placement="auto"
            transition
        >
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper
                        ref={popperRef}
                        elevation={4}
                        sx={{
                            position: 'relative',
                            padding: 0,
                            width: '390px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                            border: '1px solid #ccc',
                        }}
                    >
                        {popperAppointment && <DetailsContent />}
                    </Paper>
                </Fade>
            )}
        </Popper>
    );
}
