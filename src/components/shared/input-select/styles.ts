import { SxProps, Theme } from '@mui/material/styles';
import { darken } from '@mui/system';

export const formControlStyles = (
    theme: Theme,
    isCompact?: boolean
): SxProps<Theme> => ({
    width: '100px',
    '& .MuiOutlinedInput-root': {
        height: isCompact ? '32px' : '40px',
        padding: '0 12px',
        fontSize: '15px',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: '6px',
        border: `1px solid ${theme.palette.divider}`,
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

export const inputLabelStyles = (theme: Theme): SxProps<Theme> => ({
    fontSize: '15px',
    color: theme.palette.text.secondary,
    marginBottom: '0.25rem',
});

export const selectStyles = (
    theme: Theme,
    borderRadius?: number
): SxProps<Theme> => ({
    padding: 0,
    borderRadius: borderRadius ? `${borderRadius}px` : '0.375rem',
    fontSize: '16px',
    backgroundColor: theme.palette.background.paper,
    '& .MuiSelect-select': {
        padding: '0.25rem 0',
        minHeight: 'unset',
        display: 'flex',
        alignItems: 'center',
    },
});

export const menuItemStyles = (theme: Theme): SxProps<Theme> => ({
    fontSize: '15px',
    padding: '0.5rem 0.75rem',
    color: theme.palette.text.primary,
    '&:hover': {
        backgroundColor: darken(theme.palette.action.hover, 0.05),
    },
});
