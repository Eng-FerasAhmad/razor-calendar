import { Box, Fade, Paper, Popper } from '@mui/material';
import { ReactElement, useEffect, useRef } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import DetailsContent from 'calendar/_dialogs/details-appointment/DetailsContent';

export default function DetailsAppointment(): ReactElement {
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
        <Box>
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
                            sx={{
                                position: 'relative',
                                padding: 0,
                                width: '350px',
                                borderRadius: '10px',
                                overflow: 'hidden',
                            }}
                        >
                            {popperAppointment && <DetailsContent />}
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </Box>
    );
}
