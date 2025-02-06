import { SxProps, Theme } from '@mui/material/styles';

export const checkboxStyles = (color?: string): SxProps<Theme> => ({
    color,
    fontSize: '12px',
    '&.Mui-checked': {
        color,
    },
});

export const formControlLabelStyles = (
    theme: Theme,
    width?: string,
    maxWidth?: string,
    fontSize?: string
): SxProps<Theme> => ({
    width: width || 'fit-content',
    maxWidth,
    padding: 0,
    margin: 0,
    borderRadius: '20px',
    '& .MuiFormControlLabel-label': {
        fontSize: fontSize ? '14px' : '16px',
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: maxWidth || 'inherit',
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
});
