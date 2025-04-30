import { SxProps, Theme } from '@mui/material/styles';

export const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 250,
            width: 250,
        },
    },
};

export const formControlSx: SxProps<Theme> = {
    width: '100%',
    '& .MuiInputBase-root': {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
    },
};

export const renderTagBoxSx: SxProps<Theme> = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0.5,
};

export const chipSx: SxProps<Theme> = {
    height: 24,
    fontSize: 14,
    backgroundColor: '#e0e0e0',
    color: '#333',
};

export const menuItemSx: SxProps<Theme> = {
    fontSize: 16,
};

export const categoryHeaderSx: SxProps<Theme> = {
    fontSize: 14,
    fontWeight: 600,
    color: '#666',
    backgroundColor: '#fafafa',
};
