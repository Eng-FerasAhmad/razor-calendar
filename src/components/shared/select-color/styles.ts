import { Box } from '@mui/material';
import { styled, SxProps, Theme } from '@mui/material/styles';

export const formControlStyles: SxProps<Theme> = {
    width: '100px',
};

export const selectStyles: SxProps<Theme> = {
    height: 40,
    borderRadius: '8px',
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

export const RowItemWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '5px',
});
