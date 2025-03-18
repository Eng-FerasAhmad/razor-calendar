import { SxProps, Theme, darken } from '@mui/material/styles';

export const formControlStyles = (
    theme: Theme,
    isCompact?: boolean
): SxProps<Theme> => ({
    fontSize: '17px',
    '& .MuiOutlinedInput-root': {
        overflow: 'none',
        color: isCompact
            ? theme.palette.text.primary
            : theme.palette.primary.contrastText,
        height: '34px',
        padding: '4px 14px',
        '& fieldset': {
            borderWidth: '0px',
            borderColor: isCompact
                ? darken(theme.palette.divider, 0.1)
                : theme.palette.primary.dark,
        },
        '&:hover fieldset': {
            borderColor: isCompact
                ? darken(theme.palette.divider, 0.1)
                : theme.palette.primary.dark,
        },
        '&.Mui-focused fieldset': {
            borderColor: isCompact
                ? darken(theme.palette.divider, 0.1)
                : theme.palette.primary.dark,
            borderWidth: '1px',
        },
        '& .MuiSelect-icon': {
            color: isCompact ? darken(theme.palette.divider, 0.3) : '#fff',
        },
    },
});

export const inputLabelStyles = (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.primary.contrastText,
});

export const selectStyles = (
    theme: Theme,
    borderRadius?: number
): SxProps<Theme> => ({
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    borderRadius: borderRadius || 1,
    height: '34px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    padding: 0,
    width: '100%',
    border: `1px solid ${theme.palette.borderLight}`,
    '& .MuiSelect-select': {
        paddingRight: '4px !important',
    },
    '&:hover': {
        backgroundColor: darken(theme.palette.action.hover, 0.1),
    },
});

export const menuItemStyles = (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.text.primary,
});
