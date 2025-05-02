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

export const renderHeaderBoxSx: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    mb: 0.5,
};

export const renderItemsBoxSx: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
};

export const renderMenuItemBoxSx: SxProps<Theme> = {
    fontSize: 12,
    color: 'text.secondary',
    whiteSpace: 'nowrap',
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
