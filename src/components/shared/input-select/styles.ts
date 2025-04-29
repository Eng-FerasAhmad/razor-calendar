import { SxProps, Theme } from '@mui/material/styles';
import { darken } from '@mui/system';
import { commonFontSize } from 'src/theme/theme';

export const formControlStyles = (theme: Theme): SxProps<Theme> => ({
    width: '100px',
    '& .MuiOutlinedInput-root': {
        height: '36px',
        padding: '0 12px',
        border: `1px solid ${theme.palette.borderLight}`,
        '& fieldset': {
            border: 'none',
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-focused': {
            boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
        },
        '& .MuiSelect-icon': {
            color: theme.palette.text.secondary,
        },
    },
});

export const inputLabelStyles = (): SxProps => ({
    marginBottom: '0.25rem',
});

export const selectStyles = (theme: Theme): SxProps<Theme> => ({
    padding: 0,
    backgroundColor: theme.palette.background.paper,
    '& .MuiSelect-select': {
        padding: '0',
        minHeight: 'unset',
        display: 'flex',
        alignItems: 'center',
    },
});

export const menuItemStyles = (theme: Theme): SxProps<Theme> => ({
    padding: '0.5rem 0.75rem',
    fontSize: commonFontSize,
    '&:hover': {
        backgroundColor: darken(theme.palette.action.hover, 0.05),
    },
});
