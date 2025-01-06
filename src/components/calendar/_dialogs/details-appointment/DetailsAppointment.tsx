import CloseIcon from '@mui/icons-material/Close';
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

export default function DetailsAppointment(): ReactElement {
    const { dialogAppointmentDetails, onDialogAppointmentDetails } =
        useCalendarContext();

    const handleClose = (): void => {
        onDialogAppointmentDetails(undefined); // Close the Popper
    };

    return (
        <Box>
            <Popper
                sx={{ zIndex: 1200 }}
                open={dialogAppointmentDetails?.open || false}
                anchorEl={dialogAppointmentDetails?.anchorEl || null}
                placement="bottom"
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper sx={{ position: 'relative', padding: 2 }}>
                            {/* Close Button */}
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
                                <CloseIcon />
                            </IconButton>
                            {/* Popper Content */}
                            <Typography>AddAppointment</Typography>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </Box>
    );
}
