import { Theme } from '@mui/material/styles';

export const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        '& .MuiSvgIcon-root': {
            fontSize: '20px',
            color: '#6B7280',
        },
    },
};

export const formHelperTextStyles = {
    minHeight: '10px',
};

export const popperStyles = (theme: Theme) => ({
    '& .MuiPaper-root': {
        borderRadius: '12px',
        padding: '0',
        fontSize: '14px',
        color: '#1F2937',
    },
    '& .MuiPickersCalendarHeader-label': {
        fontSize: '16px',
        fontWeight: '500',
        color: '#374151',
    },
    '& .MuiDayCalendar-weekDayLabel': {
        fontSize: '13px',
    },
    '& .MuiPickersDay-root': {
        fontSize: '14px',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
    },
    '& .MuiPickersDay-root.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    '& .MuiPickersDay-root.MuiPickersDay-today': {
        border: `1px solid ${theme.palette.primary.main}`,
    },
    '& .MuiPickersDay-root.MuiPickersDay-today.Mui-selected': {
        border: 'none',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
});
