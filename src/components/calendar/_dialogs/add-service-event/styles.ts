import { Box } from '@mui/material';
import { styled, SxProps, Theme } from '@mui/material/styles';

export const ContentContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1000px',
    width: '440px',
    margin: '0 auto',
    gap: '14px',
});

export const RowDateWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '15px',
});

export const RowItemWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '5px',
    width: '100%',
});

export const RowNameWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '15px',
});

export const ActionRowWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '20px',
});

// staffer list:
const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
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

export const chipBoxSx: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
};

export const menuItemSx: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
};
