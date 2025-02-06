import { styled, SxProps, Theme } from '@mui/material/styles';

export const TeamListContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '0 15px',
});

export const CheckUsersWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
});

export const dateCalendarStyles = (
    palette: Theme['palette']
): SxProps<Theme> => ({
    color: '#4d4d4d',
    width: '250px',
    height: '265px',
    '& .MuiPickersDay-root': {
        width: '30px',
        height: '30px',
        fontSize: '12px',
        borderRadius: '50%',
        '&:hover': {
            backgroundColor: palette.action.hover,
            color: '#4d4d4d',
        },
        '&.Mui-selected': {
            color: '#fff',
        },
    },
    '& .MuiPickersCalendarHeader-label': {
        marginRight: 0,
        fontSize: '14px',
    },
    '& .MuiPickersYear-yearButton': {
        fontSize: '12px',
    },
    '& .MuiYearCalendar-root': {
        width: '240px',
    },
    '& .MuiPickersYear-yearButton.Mui-selected': {
        color: '#fff',
    },
});

export const textFieldStyles: SxProps<Theme> = {
    marginBottom: '20px',
    width: '100%',
};

export const accordionStyles = (theme: Theme): SxProps<Theme> => ({
    width: '100%',
    boxShadow: 'none',
    backgroundColor: '#fff',
    position: 'static',
    color: theme.palette.text.primary,
    padding: 0,
    margin: 0,
    '&.Mui-expanded': {
        margin: 0,
    },
    '& .MuiAccordionSummary-root': {
        padding: 0,
        margin: 0,
        minHeight: '30px',
        '&.Mui-expanded': {
            minHeight: '30px',
        },
    },
});

export const accordionSummaryStyles = (theme: Theme): SxProps<Theme> => ({
    padding: 0,
    borderRadius: '20px',
    margin: 0,
    '&.Mui-expanded': {
        padding: 0,
        margin: 0,
    },
    '& .MuiAccordionSummary-content': {
        margin: 0,
        padding: 0,
        '&.Mui-expanded': {
            margin: 0,
            padding: '0 20px',
        },
    },
    '& .MuiAccordionSummary-contentGutters': {
        margin: 0,
        padding: 0,
        '&.Mui-expanded': {
            margin: 0,
            padding: '0 0px',
        },
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
        marginRight: 0,
        padding: '0 20px',
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
});

export const accordionTextStyles: SxProps<Theme> = {
    padding: '5px 12px',
    margin: 0,
    flexShrink: 0,
};

export const accordionDetailsStyles: SxProps<Theme> = {
    maxHeight: '250px',
    padding: 0,
    overflowY: 'auto',
};
