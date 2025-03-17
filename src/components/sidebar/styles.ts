import { styled, SxProps, Theme } from '@mui/material/styles';

export const TeamListContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '0 15px',
    borderRadius: '10px',
});

export const AccordionWrapper = styled('div')(({ theme }) => ({
    border: `1px solid ${theme.palette.borderLight}`,
    borderRadius: '10px',
    overflow: 'auto',
    minWidth: '225px',
}));

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
        width: '28px',
        height: '28px',
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
    '& .MuiPickersCalendarHeader-root': {
        paddingLeft: '22px',
        paddingRight: '13px',
    },
    '& .MuiPickersArrowSwitcher-nextIconButton': {
        width: '30px',
        height: '30px',
        padding: '3px',
        borderRadius: '8px',
    },
    '& .MuiPickersArrowSwitcher-previousIconButton': {
        width: '33px',
        height: '33px',
        padding: '3px',
        borderRadius: '8px',
    },
    '& .MuiPickersArrowSwitcher-root': {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '5px',
    },
    '& .MuiPickersCalendarHeader-switchViewButton': {
        width: '28px',
        height: '28px',
        padding: '3px',
        borderRadius: '8px',
        marginLeft: '3px',
    },
    '& .MuiDayCalendar-weekDayLabel': {
        width: '28px',
        height: '32px',
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    '& .MuiPickersDay-root.MuiPickersDay-dayOutsideMonth': {
        color: palette.text.disabled,
        opacity: 0.5,
    },
});

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
    borderRadius: '10px',
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
    fontSize: '17px',
};

export const accordionDetailsStyles: SxProps<Theme> = {
    maxHeight: '250px',
    padding: 0,
    overflowY: 'auto',
};
