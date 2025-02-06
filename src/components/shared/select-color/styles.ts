import { SxProps, Theme } from '@mui/material/styles';

export const formControlStyles: SxProps<Theme> = {
    width: '100px',
};

export const selectStyles: SxProps<Theme> = {
    height: 44,
    borderRadius: 1,
    '& .MuiSelect-outlined': {
        display: 'flex',
        alignItems: 'center',
    },
};

export const colorBoxStyles = (backgroundColor: string): SxProps<Theme> => ({
    width: 20,
    height: 20,
    backgroundColor,
    borderRadius: '50%',
    margin: 'auto',
});
