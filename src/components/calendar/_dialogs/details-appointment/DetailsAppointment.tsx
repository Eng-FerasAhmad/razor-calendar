import {
    Box,
    Fade,
    IconButton,
    Paper,
    Popper,
    Typography,
} from '@mui/material';
import { ReactElement } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import CloseSymbol from 'components/shared/icons/close/CloseSymbol';

export default function DetailsAppointment(): ReactElement {
    const { popperAppointment, onPopperAppointment } = useCalendarContext();

    const handleClose = (): void => {
        onPopperAppointment(undefined); // Close the Popper
    };

    return (
        <Box>
            <Popper
                sx={{ zIndex: 1200 }}
                open={popperAppointment?.open || false}
                anchorEl={popperAppointment?.anchorEl || null}
                placement="bottom"
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper sx={{ position: 'relative', padding: 2 }}>
                            <IconButton
                                size="small"
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                }}
                                aria-label="close"
                            >
                                <CloseSymbol size={24} />
                            </IconButton>
                            <Typography>AddAppointment</Typography>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </Box>
    );
}
