import { styled } from '@mui/material/styles';

export const MoreEventsButtonWrapper = styled('div')(({ theme }) => ({
    fontSize: '10px',
    whiteSpace: 'nowrap',
    height: '22px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    padding: '0 10px',

    '&:hover': {
        cursor: 'pointer',
        backgroundColor: theme.palette.action.hover,
        width: 'fit-content',
        margin: 'auto',
        borderRadius: '10px',
        padding: '0 10px',
    },
}));

export const DraggableEventContainer = styled('div')(({ theme }) => ({
    color: theme.palette.common.white,
    padding: '2px 5px',
    borderRadius: '2px',
    fontSize: '10px',
    cursor: 'grab',

    '&:hover': {
        cursor: 'pointer',
    },

    '&:active': {
        cursor: 'grabbing',
        transform: 'scale(0.95)',
    },
}));
